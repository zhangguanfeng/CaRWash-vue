<template>
  <div>
    <!-- 搜索部分 -->
    <el-card style="margin-bottom: 15px;" shadow="hover">
      <el-row type="flex" :gutter="20" align="middle">
        <el-col :xs="12" :sm="10" :md="8" :lg="5">
          <el-input
            :placeholder="$t('search')"
            class="searchByShop"
            clearable
            v-model="filter.search"
          ></el-input>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <el-button @click="get_list" type="primary" class="search">{{$t('search_zh')}}</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="container">
      <!-- 添加管理员部分 -->
      <el-button
        type="primary"
        @click="staffFormFun('add')"
        class="addManager"
      >{{$t('staff').addStaff}}</el-button>
      <!-- 表格部分 -->
      <my-table
        :columns="columns"
        :data="list_data.list"
        :showIndex="false"
        :showSelection="false"
        :cellStyle="{padding: '6px 0'}"
        :headerCellStyle="{background:'rgba(51, 55, 68)',color:'#fff'}"
        @emitSelection="allSelect"
        @sortChange="sort_change"
      >
        <template v-slot:storeId="slotProps">
          <div>{{slotProps.callback.row.store.id}}</div>
        </template>
        <template v-slot:operation="slotProps">
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
            <el-button
              @click="staffFormFun('check',slotProps.callback.row)"
              icon="el-icon-view"
              type="success"
              size="mini"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
            <el-button
              @click="staffFormFun('edit',slotProps.callback.row)"
              icon="el-icon-edit-outline"
              type="primary"
              size="mini"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
            <el-button
                size="mini"
                type="info"
                @click="new_password(slotProps.callback.row.id)"
            >{{$t('btnTip').resetPW}}</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').delete" placement="top">
            <el-button
              @click="remove(slotProps.callback.row)"
              icon="el-icon-delete"
              type="danger"
              size="mini"
            ></el-button>
          </el-tooltip>
        </template>
      </my-table>
      <page :total="list_data.total" :page_size.sync="pageSize" :page.sync="page" />
    </el-card>

    <!-- 表单 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px">
      <form-page
        :ref-obj.sync="formInfo.ref"
        :data="formInfo.data"
        :field-list="formInfo.fieldList"
        :rules="formInfo.rules"
        :label-width="formInfo.labelWidth"
        :list-type-info="listTypeInfo"
        :disabled="formInfo.disabled"
        @handleEvent="handle_event"
      >
      </form-page>
      <span slot="footer" class="dialog-footer">
        <el-button @click="done(title)" type="primary" style="margin-left:30px;">{{title}}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('btnTip').resetPW" :visible.sync="key">
      <el-form :rules="rules" ref="form" :model="info">
        <el-form-item :label="$t('newPassword')" prop="password">
            <el-input size="medium" v-model="info.password" :placeholder="$t('inputPassword')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button size="medium" @click="key = false">{{$t('btnTip').close}}</el-button>
          <el-button type="primary" size="medium" @click="submit">{{$t('btnTip').submit}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mixin_pickerOptions, mixin_list, get_list } from "@/mixins";
import page from "@/components/page";
import { getStaff, getStaffDetail, deleteStaff, editStaff, addStaff, getStore, searchStoreArea } from '@/api/api';
import myTable from '@/components/Table'
import FormPage from '@/components/FormPage'
import { mapState } from 'vuex' 
// 添加表单信息
const formInfoData = {
  name: '',
  account: '',
  password: '',
  phone: '',
  auth: '1',
  store: '',
  area:[]
}
export default {
  name: 'staffManagement',
  mixins: [mixin_pickerOptions, mixin_list(getStaff)],
  data () {
    return {
      filter: {
        search: '',
      },
      columns: [
        {
          label: 'ID',
          sortable: true,
          prop: 'id',
        }, {
          label: this.$t('username'),
          sortable: true,
          prop: 'name',
        }, {
          label: this.$t('account'),
          sortable: true,
          prop: 'account',
        },
        {
          label: this.$t('phone'),
          sortable: true,
          prop: 'phone',
        },
        {
          label: this.$t('shopID'),
          sortable: true,
          prop: 'store',
          slot: 'storeId'
        },
        {
          label: this.$t('shopName'),
          prop: 'store.name',
        },
        {
          label: this.$t('operation'),
          prop: '',
          width: 350,
          align: 'left',
          slot: 'operation'
        }],
      formInfo: {
        ref: null,
        disabled: false,
        data: formInfoData,
        fieldList: [
          { label: this.$t('username'), value: 'name', width: '260', type: 'input', className: 'el-form-block', required: true },
          { label: this.$t('account'), value: 'account', type: 'input', width: '260', className: 'el-form-block', required: true, hidden: false },
          { label: this.$t('password'), value: 'password', type: 'input', width: '260', className: 'el-form-block', required: false, hidden: false },
          { label: this.$t('phone'), value: 'phone', type: 'input', width: '260', className: 'el-form-block', required: true, disabled: false },
          { label: this.$t('managerList.auth'), value: 'auth', type: 'input', width: '260', className: 'el-form-block', required: true, disabled: true },
          { label: this.$t('shop'), value: 'store', event:'select' ,type: 'select', width: '260', className: 'el-form-block', list: 'shopList', required: true, disabled: false },
          { label: this.$t('serviceArea.area'), value:'area', type:"remoteSelect",  width: '260', className: 'el-form-block',list:'areaList', multiple:true, required: true, hidden: false  },
        ],
        rules: {
        },
        labelWidth: '120px'
      },
      listTypeInfo: {
        shopList: [],
        areaList: [],
        authList: [
          { label: this.$t('managerList.superManager'), value: 0 },
          { label: this.$t('managerList.shopManager'), value: 1 },
        ],
      },
      // 是否显示添加表单
      dialogFormVisible: false,
      which: '',
      // 修改密码
      info: {
        id:'',
        password:''
      },
      key : false,
      rules : {
        password: [{required: true,message: this.$t('inputPassword')}],
      }
    }
  },
  components: {
    myTable,
    FormPage,
    page
  },

  computed: {
    title () {
      switch (this.which) {
        case 'add':
          return this.$t('btnTip').add;
        case 'check':
          return this.$t('btnTip').close;
        case 'edit':
          return this.$t('btnTip').edit;
      }
    },
    ...mapState(['adminUser'])
  },
  async created () {
    this.initRules()
    if(this.adminUser.auth===0){
      this.getShopList()
    }else{
      formInfoData.store=this.adminUser.store
      this.formInfo.fieldList[5].hidden=true
      this.getAreaList(formInfoData.store)
    }
  },
  methods: {
     new_password(id){
      this.key = true
      this.info = {
        id,
        password:""
      }
    },
    async submit(){
      await this.$refs["form"].validate();
      // await api_store.change_password(this.info)
      // this.$message.success('修改成功')
      // this.get_list()
      console.log(this.info)
    },
    handle_event(e,store_id){
      if(e==='select'){
        formInfoData.store=store_id
        formInfoData.area=[]
        this.formInfo.data.area=[]
        this.getAreaList(store_id)
      }
    },
    initRules () {
      const formInfo = this.formInfo
      formInfo.rules = this.$initRules(formInfo.fieldList)
    },
    async getAreaList (store_id){
      const res=await searchStoreArea({store_id})
      this.listTypeInfo.areaList = res.list.map((item) => {
        return { label: item.name, value: item.id }
      })
    },
    async getShopList () {
      const res = await getStore()
      this.listTypeInfo.shopList = res.list.map((item) => {
        return { label: item.name, value: item.id }
      })
    },
    async staffFormFun (type, data) {
      switch (type) {
        case 'check':
          var res=await getStaffDetail(data.id)
          this.formInfo.data = { ...res, store: res.store.id, auth: 1, area:res.area.map(item=>item.id) }
          this.formInfo.fieldList[2].hidden = true
          break;
        case 'edit':
          var res=await getStaffDetail(data.id)
          this.formInfo.data = { ...res, store: res.store.id, auth: 1, area:res.area.map(item=>item.id) }
          this.formInfo.fieldList[2].required = false
          this.formInfo.fieldList[2].hidden = true
          this.initRules()
          break;
        case 'add':
          this.formInfo.data = formInfoData
          this.formInfo.fieldList[2].hidden = false
          this.formInfo.fieldList[2].required = true
          this.initRules()
          break;
      }
      this.formInfo.disabled = type !== 'check' ? false : true
      this.dialogFormVisible = true
      this.which = type
    },
    remove (row) {
      this.$confirm(this.$t('staff').sureDeleteStaff + row.name, this.$t('tips'), {
        confirmButtonText: this.$t('btnTips').submit,
        cancelButtonText: this.$t('btnTips').cancel,
        type: 'warning'
      }).then(async () => {
        const res = await deleteStaff(row.id)
        if (res.errcode == 2000) {
          this.list_data.list = this.list_data.list.filter((item) => {
            return item.id != row.id
          })
          this.$message({
            type: 'success',
            message: res.errmsg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('cancelDelete')
        });
      })
    },
    async done (title) {
      var flag = false
      var arr = Object.values(this.formInfo.data)
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].length !== 0) {
          flag = true
        }
        else {
          flag = false
          break
        }
      }
      if (flag) {
        switch (this.which) {
          case 'add':
            await addStaff(this.formInfo.data)
            this.dialogFormVisible = false
            this.get_list()
            break;
          case 'check':
             this.dialogFormVisible = false
            break;
          case 'edit':
             await editStaff(this.formInfo.data)
            this.dialogFormVisible = false
            this.get_list()
            break;
        }
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('finishForm')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container /deep/ {
  // 添加管理员部分
  .addManager {
    margin-bottom: 15px;
  }
}
</style>
<template>
  <div>
    <!-- 搜索部分 -->
    <el-card class="search_card" shadow="hover">
      <el-row type="flex" :gutter="20" align="middle">
        <el-col :xs="12" :sm="10" :md="8" :lg="5">
          <el-input
            :placeholder="$t('search')"
            class="searchByName"
            clearable
            v-model="filter.search"
          ></el-input>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <el-button @click="get_list" type="primary">{{$t('search_zh')}}</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="container" shadow="hover">
      <!-- 添加管理员部分 -->
      <el-button
        type="primary"
        @click="managerFormFun('add')"
        class="addManager"
      >{{$t('managerList').addManagerList}}</el-button>
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
        <template v-slot:storeName="slotProps">
          <span>{{ slotProps.callback.row.store.name }}</span>
        </template>
        <template v-slot:auth="slotProps">
          <span>{{ auth_filters(slotProps.callback.row.auth) }}</span>
        </template>
        <template v-slot:operation="slotProps">
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
            <el-button
              @click="managerFormFun('check',slotProps.callback.row)"
              icon="el-icon-view"
              type="success"
              size="mini"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
            <el-button
              @click="managerFormFun('edit',slotProps.callback.row)"
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
              @click="remove(slotProps.callback.row.id)"
              icon="el-icon-delete"
              type="danger"
              size="mini"
            ></el-button>
          </el-tooltip>
        </template>
      </my-table>
      <page :total="list_data.total" :page_size.sync="pageSize" :page.sync="page" />
    </el-card>
    <!-- 添加表单 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px">
      <form-page
        :ref-obj.sync="formInfo.ref"
        :data="formInfo.data"
        :field-list="formInfo.fieldList"
        :rules="formInfo.rules"
        :label-width="formInfo.labelWidth"
        :list-type-info="listTypeInfo"
        :disabled="formInfo.disabled"
      ></form-page>
      <span slot="footer" class="dialog-footer">
        <el-button @click="done('managerForm')" type="primary" style="margin-left:30px;">{{title}}</el-button>
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
import { mixin_pickerOptions, mixin_list } from "@/mixins"
import page from "@/components/page"
import myTable from '@/components/Table'
import FormPage from '@/components/FormPage'
import { getManagementList, deleteManagement, addManagement, editManagement, getManagementDetail, getStore, changeManagerPW } from '@/api/api';
const formInfoData = {
  name: '',
  account: '',
  password: '',
  phone: '',
  auth: '',
  store: ''
}
export default {
  name: "managerList",
  components: {
    page,
    FormPage,
    myTable
  },
  mixins: [mixin_pickerOptions, mixin_list(getManagementList)],
  data () {
    return {
      filter: {
        search: '',
      },
      // 是否显示添加表单
      dialogFormVisible: false,
      // 添加表单信息
      which: '',
      shopList: '',
      listTypeInfo: {
        shopList: [],
        authList: [
          { label: this.$t('managerList.superManager'), value: 0 },
          { label: this.$t('managerList.shopManager'), value: 1 },
        ],
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
          label: this.$t('shop'),
          sortable: true,
          prop: 'store__name',
          slot: 'storeName'
        },
        {
          label: this.$t('managerList.auth'),
          sortable: true,
          prop: 'auth',
          slot: 'auth'
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
          { label: this.$t('password'), value: 'password', type: 'input', width: '260', className: 'el-form-block', required: true, hidden: false },
          { label: this.$t('phone'), value: 'phone', type: 'input', width: '260', className: 'el-form-block', required: true, disabled: false },
          { label: this.$t('shop'), value: 'store', type: 'select', width: '260', className: 'el-form-block', list: 'shopList', required: true, disabled: false },
          { label: this.$t('managerList.auth'), value: 'auth', type: 'select', width: '260', className: 'el-form-block', list: 'authList', required: true, disabled: false },
        ],
        rules: {
        },
        labelWidth: '120px'
      },
      // 修改密码
      info: {
        id:'',
        password:''
      },
      key : false,
      rules : {
        password: [
          {required: true,message: this.$t('inputPassword')},
          { min: 6, message: this.$t('min6'), trigger: 'blur' }
        ],
      }
    }
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
    }
  },

  filters: {
  },
  created () {
    this.getShopList()
    this.initRules()
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
      await changeManagerPW(this.info)
      this.$message.success('修改成功')
      this.key=false
      this.get_list()
    },
    initRules () {
      const formInfo = this.formInfo
      formInfo.rules = this.$initRules(formInfo.fieldList)
    },
    auth_filters (auth) {
      return auth === 0 ? this.$t('managerList.superManager') : this.$t('managerList.shopManager')
    },
    async getShopList () {
      const res = await getStore()
      this.listTypeInfo.shopList = res.list.map((item) => {
        return { label: item.name, value: item.id }
      })
    },
    async managerFormFun (type, data) {
      switch (type) {
        case 'check':
          this.formInfo.data = { ...data, store: data.store.id }
          this.formInfo.fieldList[1].hidden = false
          this.formInfo.fieldList[2].hidden = true
          break;
        case 'edit':
          this.formInfo.data = { ...data, store: data.store.id }
          this.formInfo.fieldList[2].required = false
          this.formInfo.fieldList[1].hidden = true
          this.formInfo.fieldList[2].hidden = true
          this.initRules()
          break;
        case 'add':
          this.formInfo.data = formInfoData
          this.formInfo.fieldList[1].hidden = false
          this.formInfo.fieldList[2].hidden = false
          this.formInfo.fieldList[2].required = true
          this.initRules()
          break;
      }
      this.formInfo.disabled = type !== 'check' ? false : true
      this.dialogFormVisible = true
      this.which = type
    },
    remove (id) {
      this.$confirm(this.$t('managerList').sureDeleteManager, this.$t('tips'), {
        confirmButtonText: this.$t('btnTip').submit,
        cancelButtonText: this.$t('btnTip').cancel,
        type: 'warning'
      }).then(async () => {
        let res = await deleteManagement(id)
        if (res.errcode == 2000) {
          this.list_data.list = this.list_data.list.filter((value) => {
            return value.id != id
          })
        }
      }).catch({
      })
    },
    async done (name) {
      switch (this.which) {
        case 'add':
          this.formInfo.ref.validate((valid) => {
            if (valid) {
              this.addManager(this.formInfo.data)
            }
          })
          return
        case 'check':
          this.dialogFormVisible = false
          return
        case 'edit':
          this.formInfo.ref.validate((valid) => {
            if (valid) {
              this.editManager(this.formInfo.data)
            }
          })
          return
      }
    },
    async addManager (managerForm) {
      delete managerForm.id
      await addManagement(managerForm)
      this.dialogFormVisible = false
      this.get_list()
    },
    async editManager (managerForm) {
      delete managerForm.account
      await editManagement(managerForm)
      this.dialogFormVisible = false
      this.get_list()
    },

  }
}
</script>

<style lang="scss" scoped>
// 搜索部分
.search_card /deep/ {
  margin-bottom: 15px;
}
.container /deep/ {
  // 添加管理员部分
  .addManager {
    margin-bottom: 15px;
  }
}
</style>
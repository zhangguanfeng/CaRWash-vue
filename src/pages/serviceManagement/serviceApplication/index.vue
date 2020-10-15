<template>
  <div>
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
        <template v-slot:userAccount="slotProps">
          <div>{{slotProps.callback.row.user.account}}</div>
        </template>
        <template v-slot:userPhone="slotProps">
          <div>{{slotProps.callback.row.user.phone}}</div>
        </template>
        <template v-slot:staffName="slotProps">
          <div>{{slotProps.callback.row.staff.name}}</div>
        </template>
        <template v-slot:active="slotProps">
          <div>{{status(slotProps.callback.row.active)}}</div>
        </template>
        <template v-slot:operation="slotProps">
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
            <el-button
              @click="handleClick('check',slotProps.callback.row)"
              icon="el-icon-view"
              type="success"
              size="mini"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
            <el-button
              @click="handleClick('edit',slotProps.callback.row)"
              icon="el-icon-edit-outline"
              type="primary"
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
      >
      </form-page>
      <span slot="footer" class="dialog-footer">
        <el-button @click="done(title)" type="primary" style="margin-left:30px;">{{title}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mixin_pickerOptions, mixin_list } from "@/mixins";
import page from "@/components/page";
import { getOrderList, editOrder, getStaff } from '@/api/api';
import myTable from '@/components/Table'
import FormPage from '@/components/FormPage'
import { mapState } from 'vuex' 
// 添加表单信息
const formInfoData = {
  amount:'',
  staff:'',
  active:'',
}
export default {
  name: 'serviceApplication',
  mixins: [mixin_pickerOptions, mixin_list(getOrderList)],
  data () {
    return {
      filter: {
        search: '',
        service: '',
      },
      columns: [
        {
          label: 'ID',
          sortable: true,
          prop: 'id',
        }, {
          label: this.$t('serviceApplication.create_time'),
          sortable: true,
          prop: 'create_time',
        }, {
          label: this.$t('serviceApplication.userAccount'),
          sortable: true,
          prop: 'user__account',
          slot:'userAccount'
        },
        {
          label: this.$t('serviceApplication.userPhone'),
          sortable: true,
          prop: 'user__phone',
          slot:'userPhone'
        },
        {
          label: this.$t('serviceApplication.service'),
          sortable: true,
          prop: 'service'
        },
        {
          label: this.$t('serviceApplication.store'),
          sortable: true,
          prop: 'store',
        },
        {
          label: this.$t('serviceApplication.staff'),
          sortable: true,
          prop: 'staff__name',
          slot: 'staffName'
        },
        {
          label: this.$t('serviceApplication.amount'),
          sortable: true,
          prop: 'amount',
        },
        {
          label: this.$t('serviceApplication.active'),
          sortable: true,
          prop: 'active',
          slot:'active'
        },
        {
          label: this.$t('operation'),
          prop: '',
          align: 'left',
          slot: 'operation'
        }],
      formInfo: {
        ref: null,
        disabled: false,
        data: formInfoData,
        fieldList: [
          { label: this.$t('serviceApplication.amount'), value: 'amount', width: '260', type: 'input', className: 'el-form-block', required: true },
          { label: this.$t('serviceApplication.staff'), value: 'staff',type:"select", width: '260', className: 'el-form-block',list:'staffList', multiple:true, required: true, hidden: false },
          { label: this.$t('serviceApplication.active'), value:'active',type: 'select', width: '260', className: 'el-form-block',list:'statusList', required: false, hidden: true  },
        ],
        rules: {
        },
        labelWidth: '120px'
      },
      listTypeInfo: {
        staffList: [],
        statusList:[
          {label:this.$t('serviceApplication').unConfirm,value:0},
          {label:this.$t('serviceApplication').confirm,value:1},
          {label:this.$t('serviceApplication').refuse,value:2}
        ],
      },
      // 是否显示添加表单
      dialogFormVisible: false,
      which: '',
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
        case 'edit':
          return this.$t('btnTip').edit;
      }
    },
  },
  async created () {
    this.initRules()
    this.getStaffList()
  },
  methods: {
    status(status){
      switch(status){
        case 0:
          return this.$t('serviceApplication.unConfirm')
        case 1:
          return this.$t('serviceApplication.confirm')
        case 2:
          return this.$t('serviceApplication.refuse')
      }
    },
    async getStaffList(){
        const res=await getStaff()
        this.listTypeInfo.staffList = res.list.map((item) => {
        return { label: item.name, value: item.id }
      })
    },
    initRules () {
      const formInfo = this.formInfo
      formInfo.rules = this.$initRules(formInfo.fieldList)
    },
    async handleClick (type, data) {
      switch (type) {
        case 'check':
          this.$router.push(`/serviceManagement/serviceApplication/detail?id=${data.id}`)
          break;
        case 'edit':
          this.formInfo.data = { id:data.id,amount:data.amount, active:data.active, staff:data.staff.id }
          this.formInfo.fieldList[2].required = data.active!==0?false:true
          this.formInfo.fieldList[2].hidden = data.active!==0?true:false
          this.initRules()
          break;
      }
      this.formInfo.disabled = type !== 'check' ? false : true
      this.dialogFormVisible = true
      this.which = type
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
          case 'edit':
            const res=await editOrder(this.formInfo.data)
            if(res.errcode===2000){
              this.$message.success({
                message:this.$t('changeSuccess')
              })
              this.dialogFormVisible = false
              this.get_list()
            }
            
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
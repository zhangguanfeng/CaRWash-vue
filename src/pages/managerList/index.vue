<template>
  <div>
    <!-- 搜索部分 -->
    <el-card class="search_card" shadow="hover">
      <!-- 下半部分 -->
      <div class="search_card_top">
        <h2>{{$t('search_title')}}</h2>
      </div>
      <!-- 上半部分 -->
      <div class="search_card_bottom">
        <el-input :placeholder="$t('search')" class="searchByName" clearable
          v-model="filter.search">
        </el-input>
        <!-- <el-input :placeholder="$t('inputShop')" class="searchByShop" clearable v-model="filter.store">
        </el-input> -->
        <el-button @click="get_list" class="search" round>{{$t('search_zh')}}</el-button>
      </div>
    </el-card>
    <el-card class="container">
      <!-- 添加管理员部分 -->
      <el-button type="primary" @click="managerFormFun('add')" class="addManager">
        {{$t('managerList').addManagerList}}
      </el-button>

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
        <template v-slot:auth="slotProps">
          <span>{{ auth_filters(slotProps.callback.row.auth) }}</span>
        </template>
        <template v-slot:operation="slotProps">
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
            <el-button @click="managerFormFun('check',slotProps.callback.row)" icon="el-icon-view"
              type="success" size="mini"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
            <el-button @click="managerFormFun('edit',slotProps.callback.row)" icon="el-icon-edit-outline"
              type="primary" size="mini"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').delete" placement="top">
            <el-button @click="remove(slotProps.callback.row.id)" icon="el-icon-delete" type="danger"
              size="mini"></el-button>
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
        <el-button @click="done('managerForm')" type="primary" style="margin-left:30px;">{{title}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mixin_pickerOptions, mixin_list } from "@/mixins"
import page from "@/components/page"
import myTable from '@/components/Table'
import FormPage from '@/components/FormPage'
import { getManagementList, deleteManagement, addManagement, editManagement, getManagementDetail, getStore } from '@/api/api';
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
          prop: 'name',
        }, {
          label: this.$t('account'),
          prop: 'account',
        },
        {
          label: this.$t('phone'),
          prop: 'phone',
        },
        {
          label: this.$t('shop'),
          prop: 'store.name',
        },
        {
          label: this.$t('managerList.auth'),
          prop: '',
          slot: 'auth'
        },
        {
          label: this.$t('operation'),
          prop: '',
          width: 200,
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
      this.$confirm('确定删除管理员吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
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
      managerForm.store = Number(managerForm.store)
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
  .search_card_top {
    margin-bottom: 20px;
  }
  .search_card_bottom {
    height: 50px;
    // width: 790px;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    .searchByName,
    .searchByShop {
      margin-right: 40px;
      position: relative;
      width: 245px;
      input {
        height: 50px;
        padding: 0 8px 0 47px;
      }
      input:focus {
        border: 1.5px solid #545c64ac;
      }
    }
    .searchByName:before {
      content: '\e625';
      font-family: 'iconfont' !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      position: absolute;
      top: 3px;
      left: 10px;
      font-size: 30px;
      color: #545c64ac;
    }
    .searchByShop:before {
      content: '\e62f';
      font-family: 'iconfont' !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      position: absolute;
      top: 3px;
      left: 10px;
      font-size: 28px;
      color: #545c64ac;
    }
    .search {
      width: 100px;
      height: 45px;
      color: white;
      border-radius: 10px;
      background-color: #545c64ac;
      // border: none;
      transition: all 0.3s linear;
    }
    .search:hover {
      border: none;
      background-color: #545c6466;
      transition: all 0.3s linear;
    }
  }
}
.container /deep/ {
  // 添加管理员部分
  .addManager {
    margin-bottom: 15px;
  }
  // 表格部分
  .el-table__header-wrapper {
    th {
      text-align: center;
    }
  }
  .el-table__body-wrapper {
    td {
      text-align: center;
    }
    tr:nth-child(odd) {
      background-color: #e9eef3;
    }
  }
  // 添加表单部分
}
</style>
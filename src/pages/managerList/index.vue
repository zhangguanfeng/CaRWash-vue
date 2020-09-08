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
        <el-input :placeholder="$t('inputUsername')" class="searchByName" clearable
          v-model="filter.search">
        </el-input>
        <!-- <el-input :placeholder="$t('inputShop')" class="searchByShop" clearable v-model="filter.store">
        </el-input> -->
        <el-button class="search" round>{{$t('search_zh')}}</el-button>
      </div>
    </el-card>

    <el-card class="container">
      <!-- 添加管理员部分 -->
      <el-button type="primary" @click="managerFormFun('add')" class="addManager">
        {{$t('managerList').addManagerList}}
      </el-button>

      <!-- 表格部分 -->
      <el-table :data="list_data.list" border style="width: 100%" @selection-change="allSelect" @sort-change="sort_change">
        <!-- <el-table-column type="selection" width="55">
        </el-table-column> -->
        <el-table-column prop="id" label="ID" width="100">
        </el-table-column>
        <el-table-column prop="name" :label="$t('username')">
        </el-table-column>
        <el-table-column prop="account" :label="$t('account')">
        </el-table-column>
        <el-table-column prop="phone" :label="$t('phone')" >
        </el-table-column>
        <el-table-column prop="store.name" :label="$t('shop')">
        </el-table-column>
        <el-table-column prop="auth" :label="$t('managerList.auth')">
        </el-table-column>
        <el-table-column :label="$t('operation')" width="250">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
              <el-button  @click="managerFormFun('check',scope.row.id)" icon="el-icon-user-solid" type="success" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
              <el-button  @click="managerFormFun('edit',scope.row.id)" icon="el-icon-edit-outline" type="primary" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('btnTip').delete" placement="top">
              <el-button  @click="remove([scope.row.id])" icon="el-icon-delete" type="danger" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <page :total="list_data.total" :page_size.sync="pageSize" :page.sync="page" />
    </el-card>

    <!-- 添加表单 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="managerForm" :model="managerForm" label-width="90px" label-position="left"
        style="padding-left:30px;">
        <el-form-item :label="$t('username')">
          <el-input v-model="managerForm.name" :placeholder="$t('inputUsername')"></el-input>
        </el-form-item>
        <el-form-item v-if="which!=='edit'" :label="$t('account')">
          <el-input v-model="managerForm.account" :placeholder="$t('inputAccount')"></el-input>
        </el-form-item>
        <el-form-item v-if="which==='add'" :label="$t('password')">
          <el-input v-model="managerForm.password" :placeholder="$t('inputPassword')"></el-input>
        </el-form-item>
        <el-form-item  :label="$t('phone')">
          <el-input v-model="managerForm.phone" :placeholder="$t('inputPhoneNum')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('shop')">
          <el-input v-model="managerForm.store" :placeholder="$t('inputShop')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('managerList.auth')">
          <el-select v-model="managerForm.auth" :placeholder="$t('choiceAuth')">
            <el-option :label="$t('managerList.superManager')" :value="0"></el-option>
            <el-option :label="$t('managerList.shopManager')" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button @click="done" type="primary" style="margin-left:30px;">{{title}}</el-button>
    </el-dialog>
  </div>
</template>

<script>
import {mixin_pickerOptions,mixin_list} from "@/mixins"
import page from "@/components/page";
import { getManagementList, deleteManagement, addManagement, editManagement, getManagementDetail } from '@/api/api';
export default {
  name: "managerList",
  components: {
    page
	},
  mixins:[mixin_pickerOptions,mixin_list(getManagementList)],
  data () {
    return {
      filter:{
        search:'',
        // store:''
      },
      // 是否显示添加表单
      dialogFormVisible: false,
      // 添加表单信息
      managerForm: {
        name: '',
        account: '',
        password: '',
        phone: '',
        auth: '',
        store: ''
      },
      which:''
    }
  },
  
  computed:{
    title(){
      switch(this.which){
        case 'add':
          return this.$t('btnTip').add;
        case 'check':
          return this.$t('btnTip').close;
        case 'edit':
          return this.$t('btnTip').edit;
      }
    }
  },
  methods:{
    // filter(auth){
    //   return auth===0?"$t{'managerList.superManager'}":"$t{'managerList.shopManager'}"
    // },
    async managerFormFun(type,id){
      this.dialogFormVisible = true
      this.which = type
      if(id) {
        const res = await getManagementDetail(id)
        this.managerForm = {...res,store:res.store.name}
      }else{
        this.managerForm = {
          name: '',
          account: '',
          password: '',
          phone: '',
          auth: '',
          store: ''
        }
      }
    },
    remove(arr){
      console.log(arr)
      this.$confirm('确定删除管理员吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteManagement(arr[0])
        this.get_list()
      }).catch({

      }) 
    },
    done(){
      switch(this.which){
        case 'add': 
          return this.addManager(this.managerForm)
        case 'check':
          return this.dialogFormVisible = false
        case 'edit':
          return this.editManager(this.managerForm.id,this.managerForm)
      }
    },
    async addManager(managerForm){
      delete managerForm.id
      managerForm.store=Number(managerForm.store)
      try{
        await addManagement(managerForm)
        this.dialogFormVisible = false
        this.get_list()
      }catch(err){
        return
      }
    },
    async editManager(id,managerForm){
      delete managerForm.id
      delete managerForm.account
      try{
        await editManagement({id,managerForm})
        this.dialogFormVisible = false
        this.get_list()
      }catch(err){
        return
      }
    }
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
      content: "\e625";
      font-family: "iconfont" !important;
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
      content: "\e62f";
      font-family: "iconfont" !important;
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
      margin-left:40px;
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
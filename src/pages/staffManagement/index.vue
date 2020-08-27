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
          v-model="filter.name">
        </el-input>
        <el-input :placeholder="$t('inputShop')" class="searchByShop" clearable v-model="filter.shop">
        </el-input>
        <el-button class="search" round>{{$t('search_zh')}}</el-button>
      </div>
    </el-card>

    <el-card class="container">
      <!-- 添加管理员部分 -->
      <el-button type="primary" @click="staffFormFun('add')" class="addManager">
        {{$t('staff').addStaff}}
      </el-button>

      <!-- 表格部分 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="250">
        </el-table-column>
        <el-table-column prop="username" :label="$t('username')" width="250">
        </el-table-column>
        <el-table-column prop="shop" :label="$t('shop')" width="250">
        </el-table-column>
        <el-table-column prop="phone" :label="$t('phone')" width="250">
        </el-table-column>
        <el-table-column :label="$t('operation')">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
              <el-button  @click="staffFormFun('check',scope.row)" icon="el-icon-user-solid" type="success" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
              <el-button  @click="staffFormFun('edit',scope.row)" icon="el-icon-edit-outline" type="primary" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('btnTip').delete" placement="top">
              <el-button  @click="remove(scope.row)" icon="el-icon-delete" type="danger" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加表单 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="staffForm" :model="staffForm" label-width="90px" label-position="left"
        style="padding-left:30px;">
        <el-form-item :label="$t('username')">
          <el-col :span="5">
            <el-input v-model="staffForm.username" :placeholder="$t('inputUserID')"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('phone')">
          <el-col :span="8">
            <el-input v-model="staffForm.phone" :placeholder="$t('inputPhoneNum')"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('shop')">
          <el-col :span="10">
            <el-select v-model="staffForm.shop" :placeholder="$t('choiceShop')">
              <el-option label="代理店一" value="shop1"></el-option>
              <el-option label="代理店二" value="shop2"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
      <el-button @click="done" type="primary" style="margin-left:30px;">{{title}}</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filter:{
        name:'',
        shop:''
      },
      tableData: [{
        id: 1,
        phone: 1111,
        username: '老王',
        shop: '×××官方旗舰店',
      }, {
        id: 1,
        phone: 1111,
        username: '老王',
        shop: '×××官方旗舰店',
      }, {
        id: 1,
        phone: 1111,
        username: '老王',
        shop: '×××官方旗舰店',
      }, {
        id: 1,
        phone: 1111,
        username: '老王',
        shop: '×××官方旗舰店',
      }],
      // 是否显示添加表单
      dialogFormVisible: false,
      // 添加表单信息
      staffForm: {
        id:'',
        username: '',
        phone: '',
        shop: ''
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
    staffFormFun(type,row){
      this.dialogFormVisible = true
      this.which = type
      if(row) {
        this.staffForm = row
      }else{
        this.staffFrom = {
          id:'',
          username: '',
          phone: '',
          shop: ''
        }
      }
    },
    remove({id}){

    },
    done(){
      this.dialogFormVisible = false
      switch(this.which){
        case 'add': 
          return 
        case 'check':
          return 
        case 'edit':
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
    width: 790px;
    display: flex;
    justify-content: space-between;
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
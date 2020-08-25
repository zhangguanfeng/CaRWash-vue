<template>
  <div>
    <!-- 搜索部分. -->
    <el-card class="search_card" shadow="hover">
      <!-- 上半部分 -->
      <div class="search_card_top">
        <h2>{{search_title}}</h2>
      </div>
      <!-- 下半部分 -->
      <div class="search_card_bottom">
        <el-input :placeholder="inputCategory" class="searchByCategory" clearable
          v-model="searchByCategory">
        </el-input>
        <el-input :placeholder="inputUserID" class="searchByID" clearable v-model="searchByID">
        </el-input>
        <el-date-picker v-model="orderTime" type="date" :placeholder="serviceApplication.time"
          class="orderTime">
        </el-date-picker>
        <el-input :placeholder="inputShop" class="searchByShop" clearable v-model="searchByShop">
        </el-input>
        <el-button class="search" round>{{search_zh}}</el-button>
      </div>
    </el-card>

    <el-card class="container">
      <!-- 表格部分 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="uesrID" :label="serviceApplication.userID" width="250">
        </el-table-column>
        <el-table-column prop="serviceCategory" :label="serviceApplication.category" width="250">
        </el-table-column>
        <el-table-column prop="orderTime" :label="serviceApplication.time" width="250">
        </el-table-column>
        <el-table-column :label="operation">
          <el-tooltip class="item" effect="dark" :content="btnTip.check" placement="top">
            <el-button icon="el-icon-user-solid" type="success" size="mini"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="btnTip.edit" placement="top">
            <el-button icon="el-icon-edit-outline" type="primary" size="mini"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="btnTip.delete" placement="top">
            <el-button icon="el-icon-delete" type="danger" size="mini"></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchByCategory: '',
      searchByID: '',
      searchByShop: '',
      tableData: [{
        uesrID: '1001',
        serviceCategory: '洗车',
        orderTime: '2020-08-26'
      }, {
        uesrID: '1001',
        serviceCategory: '洗车',
        orderTime: '2020-08-26'
      }, {
        uesrID: '1001',
        serviceCategory: '洗车',
        orderTime: '2020-08-26'
      }, {
        uesrID: '1001',
        serviceCategory: '洗车',
        orderTime: '2020-08-26'
      }],
      // 是否显示添加表单
      dialogFormVisible: false,
      // 添加表单信息
      addStaffForm: {
        name: '',
        phone: '',
        userID: '',
        shop: ''
      },
      orderTime: '',
      serviceApplication: this.$t('serviceApplication'),
      btnTip: this.$t('btnTip'),
      inputCategory: this.$t('inputCategory'),
      inputTime: this.$t('inputTime'),
      inputUserID: this.$t('inputUserID'),
      operation: this.$t('operation'),
      search_zh: this.$t('search_zh'),
      search_title: this.$t('search_title'),
      inputShop: this.$t('inputShop')
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
    width: 1200px;
    display: flex;
    justify-content: space-between;
    .searchByCategory,
    .searchByID,
    .orderTime,
    .searchByShop {
      position: relative;
      width: 245px;
      z-index: 0;
      input {
        height: 50px;
        padding: 0 8px 0 47px;
      }
      input:focus {
        border: 1.5px solid #545c64ac;
      }
      i {
        display: none;
      }
    }
    .searchByCategory:before {
      content: "\e699";
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
    .searchByID:before {
      content: "\e696";
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
    .orderTime:before {
      content: "\e665";
      z-index: 99;
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
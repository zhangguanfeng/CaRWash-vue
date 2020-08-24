<template>
  <div>
    <el-card class="container">
      <!-- 搜索部分. -->
      <el-card class="search_card" shadow="hover">
        <!-- 上半部分 -->
        <div class="search_card_top">
          <h2>筛选查询</h2>
        </div>
        <!-- 下半部分 -->
        <div class="search_card_bottom">
          <el-input placeholder="请输入服务种类" class="searchByCategory" clearable
            v-model="searchByCategory">
          </el-input>
          <el-input placeholder="请输入用户ID" class="searchByID" clearable v-model="searchByID">
          </el-input>
          <el-date-picker v-model="orderTime" type="date" placeholder="下单时间" class="orderTime">
          </el-date-picker>
          <el-input placeholder="请输入代理店" class="searchByShop" clearable v-model="searchByShop">
          </el-input>
          <el-button class="search" round>搜索</el-button>
        </div>
      </el-card>

      <!-- 表格部分 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="uesrID" label="用户ID" width="250">
        </el-table-column>
        <el-table-column prop="serviceCategory" label="服务种类" width="250">
        </el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="250">
        </el-table-column>
        <el-table-column label="操作">
          <el-tooltip class="item" effect="dark" content="查看" placement="top">
            <el-button icon="el-icon-user-solid" type="success" size="mini"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button icon="el-icon-edit-outline" type="primary" size="mini"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
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
      orderTime: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.container /deep/ {
  // 搜索部分
  .search_card {
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
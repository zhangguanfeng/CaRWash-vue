<template>
  <div>
    <el-card class="container">

      <!-- 搜索部分 -->
      <el-card class="search_card" shadow="hover">
        <!-- 上半部分 -->
        <div class="search_card_top">
          <!-- <i class="iconfont iconsousuo"></i> -->
          <h2>筛选查询</h2>
        </div>
        <!-- 下半部分 -->
        <div class="search_card_bottom">
          <el-input placeholder="请输入用户ID" class="searchById" clearable v-model="searchById">
          </el-input>
          <el-input placeholder="请输入手机号" class="searchByPhone" clearable v-model="searchByPhone">
          </el-input>
          <el-button class="search" icon="el-icon-search" round>搜索</el-button>
        </div>
      </el-card>

      <!-- 表格部分 -->
      <el-table :data="tableData" border style="width: 100%" highlight-current-row>
        <el-table-column prop="userID" label="用户ID" width="250">
        </el-table-column>
        <el-table-column prop="phoneNum" label="手机号" width="250">
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
      searchById: '',
      searchByPhone: '',
      tableData: [{
        userID: '12',
        phoneNum: '13507643552',
      }, {
        userID: '12',
        phoneNum: '13507643552',
      }, {
        userID: '12',
        phoneNum: '13507643552',
      }, {
        userID: '12',
        phoneNum: '13507643552',
      }]
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
      width: 790px;
      display: flex;
      justify-content: space-between;
      .searchById,
      .searchByPhone {
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
      .searchById:before {
        content: "\e696";
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
      .searchByPhone:before {
        content: "\e602";
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
        border: 1px solid #545c64ac;
        transition: all 0.3s linear;
      }
      .search:hover {
        border: none;
        background-color: #545c6466;
        transition: all 0.3s linear;
      }
    }
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
}
</style>
<template>
  <div>
    <!-- 搜索部分. -->
    <el-card class="search_card" shadow="hover">
      <!-- 上半部分 -->
      <div class="search_card_top">
        <h2>{{$t('search_title')}}</h2>
      </div>
      <!-- 下半部分 -->
      <div class="search_card_bottom">
        <el-input :placeholder="$t('inputCategory')" class="searchByCategory" clearable
          v-model="filter.searchByCategory">
        </el-input>
        <el-input :placeholder="$t('inputUserID')" class="searchByID" clearable
          v-model="filter.searchByID">
        </el-input>
        <el-date-picker v-model="filter.time" type="daterange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" class="orderTime">
        </el-date-picker>
        <el-input :placeholder="$t('inputShop')" class="searchByShop" clearable
          v-model="filter.searchByShop">
        </el-input>
        <el-button class="search" round>{{$t('search_zh')}}</el-button>
      </div>
    </el-card>
    <div class="fiveIcon mt20">
      <ul @click="select">
        <li>
          <div data-index="1">
            <i class="el-icon-present"></i>
            <p>全部日程</p>
          </div>
        </li>
        <li>
          <div data-index="2">
            <i class="el-icon-pie-chart"></i>
            <p>未洗车</p>
          </div>
        </li>
        <li>
          <div data-index="3">
            <i class="el-icon-delete"></i>
            <p>已完成</p>
          </div>
        </li>
        <li>
          <div data-index="4">
            <i class="el-icon-edit-outline"></i>
            <p>未找到车辆</p>
          </div>
        </li>
        <li>
          <div data-index="5">
            <i class="el-icon-edit-outline"></i>
            <p>延迟日程</p>
          </div>
        </li>
      </ul>
    </div>
    <el-card class="container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" min-width="1/8">
        </el-table-column>
        <el-table-column prop="username" :label="$t('username')" min-width="1/8">
        </el-table-column>
        <el-table-column prop="category" :label="$t('category')" min-width="1/8">
        </el-table-column>
        <el-table-column prop="shop" :label="$t('shop')" min-width="1/8">
        </el-table-column>
        <el-table-column prop="time" :label="$t('shecheduleManagement').time" min-width="1/8">
        </el-table-column>

        <el-table-column :label="$t('shecheduleManagement').state" min-width="1/8">
          <template slot-scope="scope">
            <span v-if="scope.row.state === '已完成'" style="color:#73d13d;">
              <span class="iconfont iconqiche"></span>
              {{scope.row.state}}
            </span>
            <span v-else-if="scope.row.state === '未洗'" style="color:red;">
              <span class="iconfont iconqiche"></span>
              {{scope.row.state}}
            </span>
            <span v-else-if="scope.row.state === '未找到车辆'" style="color:#ffa940;">
              <span class="iconfont iconqiche"></span>
              {{scope.row.state}}
            </span>
            <span v-else style="color:#597cf4;">
              <span class="iconfont iconqiche"></span>
              {{scope.row.state}}
            </span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('operation')" min-width="2/8">
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
            <el-button @click="go(1)" icon="el-icon-view" type="success" size="mini">
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
            <el-button @click="go(2)" icon="el-icon-edit-outline" type="primary" size="mini">
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').delete" placement="top">
            <el-button icon="el-icon-delete" type="danger" size="mini"></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'scheduleManagement',
  data () {
    return {
      filter: {
        searchByCategory: '',
        searchByID: '',
        searchByShop: '',
        time: ''
      },
      tableData: [{
        id: '1001',
        username: '12321',
        category: '洗车',
        time: '2020-08-26',
        shop: 'xx店',
        state: '已完成'

      }, {
        id: '1001',
        username: '12321',
        category: '洗车',
        time: '2020-08-26',
        shop: 'xx店',
        state: '未洗'
      }, {
        id: '1001',
        username: '12321',
        category: '洗车',
        time: '2020-08-26',
        shop: 'xx店',
        state: '未找到车辆'
      }, {
        id: '1001',
        username: '12321',
        category: '洗车',
        time: '2020-08-26',
        shop: 'xx店',
        state: '延迟洗车'
      }],
    }
  },
  methods: {
    select (e) {
      let dom = e.target;
      let index = dom.getAttribute("data-index")
      // console.log("index",index)
    },
    go (type) {
      switch (type) {
        case 1:
          return this.$router.push('scheduleManagement/detail')
        case 2:
          return this.$router.push('scheduleManagement/edit')
      }
    }
  }
}
</script>
<style lang='scss' scoped>
// 搜索部分
.el-date-editor {
  height: 50px;
}
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
      content: "";

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
.fiveIcon {
  width: 100%;
  display: flex;
  margin-bottom: 15px;
  ul {
    display: flex;
    width: 100%;
    li {
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        padding: 20px 0;
        color: #fff;
        flex-direction: column;
        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
        -o-transition: all 0.5s;
        box-shadow: 0 5px 10px rgba(100, 100, 100, 0.2);
        i {
          font-size: 32px;
          margin-bottom: 5px;
          transition: all 0.5s;
          -webkit-transition: all 0.5s;
          -moz-transition: all 0.5s;
          -o-transition: all 0.5s;
        }
        &:hover {
          background: #0000fe;
        }
      }
    }
    li:nth-child(1) div {
      background: #36cfca;
    }
    li:nth-child(1):hover div {
      background: #30a19d;
    }
    li:nth-child(2) div {
      background: #597cf4;
    }
    li:nth-child(2):hover div {
      background: #1e3a9a;
    }
    li:nth-child(3) div {
      background: #9253df;
    }
    li:nth-child(3):hover div {
      background: #693e9e;
    }
    li:nth-child(4) div {
      background: #73d13d;
    }
    li:nth-child(4):hover div {
      background: #589a32;
    }
    li:nth-child(5) div {
      background: #ffa940;
    }
    li:nth-child(5):hover div {
      background: #cb8835;
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

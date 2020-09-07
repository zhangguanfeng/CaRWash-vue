<template>
  <div>
    <el-card class="search_card">
      <div class="search_card_top">
        <h2>{{$t('search_title')}}</h2>
      </div>
      <div class="search_card_bottom">
        <el-input :placeholder="$t('inputUserID')" class="searchById" clearable
          v-model="filter.searchById"></el-input>
        <el-input :placeholder="$t('inputPhoneNum')" class="searchByPhone" clearable
          v-model="filter.searchByPhone"></el-input>
        <el-button class="search" icon="el-icon-search" round>{{$t('search_zh')}}</el-button>
      </div>
    </el-card>
    <el-card class="container">
      <el-table :data="tableData" border style="width: 100%" highlight-current-row>
        <el-table-column prop="id" label="ID" width="250"></el-table-column>
        <el-table-column prop="phone" :label="$t('phone')" width="250"></el-table-column>
        <el-table-column prop="phone" :label="$t('member.service')" width="250"></el-table-column>
        <el-table-column :label="$t('operation')">
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
            <el-button icon="el-icon-user-solid" type="success" size="mini" @click="go(1)">
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
            <el-button icon="el-icon-edit-outline" type="primary" size="mini" @click="go(2)">
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
  data () {
    return {
      filter: {
        searchById: "",
        searchByPhone: "",
      },
      tableData: [
        {
          id: "1111",
          phone: "13507643552",
        },
        {
          id: "1222222",
          phone: "13507643552",
        },
        {
          id: "133332",
          phone: "13507643552",
        },
        {
          id: "14442",
          phone: "13507643552",
        },
      ]
    };
  },
  methods: {
    go (type) {
      switch (type) {
        case 1:
          this.$router.push(`memberManagement/detail`)
          break
        case 2:
          this.$router.push(`memberManagement/edit`)
          break
      }
    }
  }
};
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
.container /deep/ {
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
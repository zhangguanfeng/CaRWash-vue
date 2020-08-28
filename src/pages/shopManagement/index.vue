<template>
    <div>
        <!-- 搜索部分 -->
        <el-card class="search_card" shadow="hover">
            <div class="search_card_top">
                <h2>{{$t('search_title')}}</h2>
            </div>
            <!-- 上半部分 -->
            <div class="search_card_bottom">
                <el-input :placeholder="$t('inputShop')" class="searchByShop" clearable v-model="filter.shop">
                </el-input>
                <el-input :placeholder="$t('shopManagement').area" class="searchByArea" clearable v-model="filter.area">
                </el-input>
                <el-button class="search" round>{{$t('search_zh')}}</el-button>
            </div>
        </el-card>
        <el-card class="container">
            <el-button type="primary" @click="go(2)" class="addManager">
        {{$t('shopManagement').addShop}}
            </el-button>
            <!-- 表单部分 -->
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="ID">
                </el-table-column>
                <el-table-column prop="shop" :label="$t('shop')">
                </el-table-column>
                <el-table-column prop="address" :label="$t('address')">
                </el-table-column>
                <el-table-column prop="introduce" :label="$t('introduce')">
                </el-table-column>
                <el-table-column prop="scoped" :label="$t('shopManagement').scoped">
                </el-table-column>
                <el-table-column prop="contact" :label="$t('shopManagement').contact">
                </el-table-column>
                <el-table-column prop="business" :label="$t('shopManagement').business">
                </el-table-column>
                <el-table-column :label="$t('operation')">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
                    <el-button  @click="go(1)" icon="el-icon-user-solid" type="success" size="mini"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
                    <el-button  @click="go(2)" icon="el-icon-edit-outline" type="primary" size="mini"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="$t('btnTip').delete" placement="top">
                    <el-button  @click="remove(scope.row)" icon="el-icon-delete" type="danger" size="mini"></el-button>
                    </el-tooltip>
                </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
    name: 'shopManagement',
    data () {
        return {
            filter: {
                name:'',
                area:'',
            },
            tableData: [{
                id: 1,
                shop: '×××官方旗舰店',
                address:'xx街道',
                introduce: '服务周到',
                scoped: 'xx区域',
                contact: '400-66666666',
                business: '每天08:00-18:00'
            }, {
                id: 1,
                shop: '×××官方旗舰店',
                address:'xx街道',
                introduce: '服务周到',
                scoped: 'xx区域',
                contact: '400-66666666',
                business: '每天08:00-18:00'
            }, {
                id: 1,
                shop: '×××官方旗舰店',
                address:'xx街道',
                introduce: '服务周到',
                scoped: 'xx区域',
                contact: '400-66666666',
                business: '每天08:00-18:00'
            }, {
               id: 1,
                shop: '×××官方旗舰店',
                address:'xx街道',
                introduce: '服务周到',
                scoped: 'xx区域',
                contact: '400-66666666',
                business: '每天08:00-18:00'
            }],
        }
    },
    methods:{
        go(type){
      switch(type){
        case 1:
          return this.$router.push('shopManagement/detail')
        case 2:
          return this.$router.push('shopManagement/edit')
      }
    }
    }
}
</script>
<style lang="scss" scoped>
/* 搜索部分 */
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
    .searchByArea,
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
    .searchByArea:before {
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
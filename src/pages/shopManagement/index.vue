<template>
  <div>
    <!-- 搜索部分 -->
    <el-card class="search_card" shadow="hover">
      <div class="search_card_top">
        <h2>{{$t('search_title')}}</h2>
      </div>
      <!-- 上半部分 -->
      <div class="search_card_bottom">
        <el-input :placeholder="$t('inputShopAddress')" class="searchByShop" clearable
          v-model="filter.search">
        </el-input>
        <!-- <el-input :placeholder="$t('shopManagement').area" class="searchByArea" clearable v-model="filter.area">
                </el-input> -->
        <el-button @click="get_list" class="search" round>{{$t('search_zh')}}</el-button>
      </div>
    </el-card>
    <el-card class="container">
      <el-button type="primary" @click="add" class="addManager">
        {{$t('shopManagement').addShop}}
      </el-button>
      <!-- 表单部分 -->
      <el-table :data="list_data.list" border style="width: 100%">
        <el-table-column sortable prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="name" :label="$t('shop')">
        </el-table-column>
        <el-table-column prop="address" :label="$t('address')">
        </el-table-column>
        <el-table-column prop="description" :label="$t('introduce')">
        </el-table-column>
        <el-table-column prop="service_range" :label="$t('shopManagement').scoped">
        </el-table-column>
        <el-table-column prop="phone" :label="$t('shopManagement').contact">
        </el-table-column>
        <el-table-column sortable prop="open_hours" :label="$t('shopManagement').business">
        </el-table-column>
        <el-table-column :label="$t('operation')" width="250">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
              <el-button @click="check(scope.row.id)" icon="el-icon-view" type="success"
                size="mini"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
              <el-button @click="edit(scope.row.id)" icon="el-icon-edit-outline" type="primary"
                size="mini"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('btnTip').delete" placement="top">
              <el-button @click="remove([scope.row.id])" icon="el-icon-delete" type="danger"
                size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <page :total="list_data.total" :page_size.sync="pageSize" :page.sync="page" />
    </el-card>
  </div>
</template>
<script>
import { mixin_pickerOptions, mixin_list } from "@/mixins"
import page from "@/components/page";
import { getStore, deleteStore } from "@/api/api"
export default {
  name: 'shopManagement',
  data () {
    return {
      filter: {
        search: ''
      },
    }
  },
  components: {
    page
  },
  mixins: [mixin_pickerOptions, mixin_list(getStore)],
  methods: {
    add () {
      this.$router.push("/shopManagement/edit")
    },
    check (id) {
      this.$router.push(`/shopManagement/detail?id=${id}`)
    },
    edit (id) {
      this.$router.push(`/shopManagement/edit?id=${id}`)
    },
    remove (arr) {
      console.log('arr', arr)
      const id = arr[0]
      this.$confirm('确定删除店铺吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await delete deleteStore(id)
        this.get_list()
      }).catch({

      })
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
    display: flex;
    align-items: center;
    .searchByArea,
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
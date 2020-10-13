<template>
  <div>
    <!-- 搜索部分 -->
    <el-card style="margin-bottom: 15px;" shadow="hover">
      <el-row type="flex" :gutter="20" align="middle">
        <el-col :xs="12" :sm="10" :md="8" :lg="5">
          <el-input
            :placeholder="$t('inputShopAddress')"
            class="searchByShop"
            clearable
            v-model="filter.search"
          ></el-input>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <el-button @click="get_list" type="primary" class="search">{{$t('search_zh')}}</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="container">
      <el-button type="primary" @click="add" class="addManager">{{$t('shopManagement').addShop}}</el-button>
      <!-- 表单部分 -->
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
        <template v-slot:operation="slotProps">
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
            <el-button
              @click="check(slotProps.callback.row.id)"
              icon="el-icon-view"
              type="success"
              size="mini"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
            <el-button
              @click="edit(slotProps.callback.row.id)"
              icon="el-icon-edit-outline"
              type="primary"
              size="mini"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').delete" placement="top">
            <el-button
              @click="remove([slotProps.callback.row.id])"
              icon="el-icon-delete"
              type="danger"
              size="mini"
            ></el-button>
          </el-tooltip>
        </template>
      </my-table>
      <page :total="list_data.total" :page_size.sync="pageSize" :page.sync="page" />
    </el-card>
  </div>
</template>
<script>
import { mixin_pickerOptions, mixin_list } from "@/mixins"
import page from "@/components/page";
import myTable from '@/components/Table'
import { getStore, deleteStore } from "@/api/api"
export default {
  name: 'shopManagement',
  data () {
    return {
      filter: {
        search: ''
      },
      columns: [
        {
          label: 'ID',
          sortable: true,
          prop: 'id',
        }, {
          label: this.$t('shop'),
          prop: 'name',
        }, {
          label: this.$t('address'),
          prop: 'address',
        },
        {
          label: this.$t('introduce'),
          prop: 'description',
        },
        // {
        //   label: this.$t('shopManagement.scoped'),
        //   prop: 'area',
        // },
        {
          label: this.$t('shopManagement.contact'),
          prop: 'phone',
        },
        {
          label: this.$t('shopManagement.business'),
          prop: 'open_hours',
          sortable: true,
        },
        {
          label: this.$t('operation'),
          prop: '',
          width: 200,
          align: 'left',
          slot: 'operation'
        }],
    }
  },
  components: {
    page,
    myTable
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
      const id = arr[0]
      this.$confirm('确定删除店铺吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteStore(id)
        this.get_list()
      }).catch({

      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container /deep/ {
  // 添加管理员部分
  .addManager {
    margin-bottom: 15px;
  }
}
</style>
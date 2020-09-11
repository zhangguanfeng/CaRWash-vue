<template>
  <div>
    <el-card class="container">
      <!-- 表格部分 -->
      <el-table :data="list_data.list " border style="width: 100%">
        <el-table-column prop="id" :label="$t('serviceList').id" width="250">
        </el-table-column>
        <el-table-column prop="name" :label="$t('serviceList').name" width="250">
        </el-table-column>
        <el-table-column prop="times" :label="$t('serviceList').frequentness" width="250">
        </el-table-column>
        <el-table-column :label="$t('serviceList').img" width="250">
          <template slot-scope="scope">
            <img slot="reference" :src="scope.row.image" style="width: 5vw;height: 5vw">
          </template>
        </el-table-column>
        <el-table-column :label="$t('operation')">
          <template slot-scope="scope">

            <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
              <el-button @click="go(1,scope.row)" icon="el-icon-user-solid" type="success"
                size="mini">
              </el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
              <el-button @click="go(2,scope.row)" icon="el-icon-edit-outline" type="primary"
                size="mini">
              </el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mixin_pickerOptions, mixin_list, get_list } from "@/mixins";
import page from "@/components/page";
import { getService, getServiceDetail, editService } from '@/api/api';

export default {
  mixins: [mixin_pickerOptions, mixin_list(getService)],
  data () {
    return {
    }
  },
  methods: {
    go (type, row) {
      switch (type) {
        case 1:
          this.$router.push({
            name: 'serviceListDetail',
            params: row
          })
          break;
        case 2:
          this.$router.push({
            name: 'serviceListEdit',
            params: row
          })
          break;
      }
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
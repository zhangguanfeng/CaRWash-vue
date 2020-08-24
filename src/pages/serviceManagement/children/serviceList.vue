<template>
  <div>
    <el-card class="container">
      <!-- 表格部分 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="serviceName" label="服务名称" width="250">
        </el-table-column>
        <el-table-column prop="frequentness" label="每周次数" width="250">
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
      tableData: [{
        serviceName: '洗车',
        frequentness: '5',
      }, {
        serviceName: '洗车',
        frequentness: '5',
      }, {
        serviceName: '洗车',
        frequentness: '5',
      }, {
        serviceName: '洗车',
        frequentness: '5',
      }]
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
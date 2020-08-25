<template>
  <div>
    <el-card class="container">
      <!-- 表格部分 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="serviceName" :label="$t('serviceList').name" width="250">
        </el-table-column>
        <el-table-column prop="frequentness" :label="$t('serviceList').frequentness" width="250">
        </el-table-column>
        <el-table-column :label="$t('operation')">
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
            <el-button @click="go(1)" icon="el-icon-user-solid" type="success" size="mini"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
            <el-button @click="go(2)" icon="el-icon-edit-outline" type="primary" size="mini"></el-button>
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
  },
  methods:{
    go(type){
      switch(type){
        case 1:
          this.$router.push('serviceList/detail')
          break;
        case 2:
          this.$router.push('serviceList/edit')
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
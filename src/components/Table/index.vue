<template>
  <div class="table-container">
    <div class="table-content">
      <el-table
        :data="data"
        ref="table"
        :header-cell-style="config.headerCellStyle"
        :cell-style="config.cellStyle"
        :border="config.border"
        @selection-change="handleSelectionChange"
        :show-summary="config.showSummary"
        @sort-change="handleSortChange"
        style="width: 100%">
        <el-table-column v-if="config.showSelection" type="selection" align="center" width="50"></el-table-column>
        <el-table-column v-if="config.showIndex" type="index" label="" :index="indexMethod" align="center" width="80"></el-table-column>
        <el-table-column
          v-for="(column, index) in columns"
          :key="index"
          :fixed="column.fixed"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :sortable="column.sortable"
          :show-overflow-tooltip="column.showOverflowTooltip"
          :align="column.align || 'center'"
        >
          <template slot-scope="scope">
            <div v-if="column.slot">
              <slot :name="column.slot" :callback="{row:scope.row,index: scope.$index}"></slot>
            </div>
            <span v-else-if="column.price">{{scope.row[column.prop] | toThousandFilter}}</span>
            <span v-else>{{getKeyValue(scope.row, column.prop)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="table-pagination" :style="{textAlign:pagination.align || 'center'}" v-if="pagination.show === undefined ? true : pagination.show">
      <el-pagination
        ref="pagination"
        @current-change="handleCurrentChange"
        :current-page.sync="pagination.currentPage || 1"
        :page-size="pagination.pageSize || 10"
        :layout="pagination.layout || 'slot, prev, pager, next'"
        :total="pagination.total || 0">
        <span class="el-pagination__total">Total {{pagination.total}}</span>
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'mytable',
  data () {
    return {
      config: {},
      multipleSelection: []
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    pagination: {
      type: Object
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.config = this.$attrs
  },
  methods: {
    getKeyValue (row, prop) {
      const arr = prop.split('.')
      if (arr.length > 1) {
        let lastKey = row
        arr.some(element => {
          if (lastKey[element]) {
            lastKey = lastKey[element]
          } else {
            return true
          }
        })
        if (typeof lastKey === 'string') {
          return lastKey
        } else {
          return ''
        }
      } else {
        return row[prop]
      }
    },
    indexMethod (index) {
      return index + ((this.pagination.currentPage || 1) - 1) * (this.pagination.pageSize || 10) + 1
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.$emit('emitSelection', val)
    },
    handleCurrentChange (val) {
      this.$emit('currentChange', val)
    },
    handleSortChange (val) {
      this.$emit('sortChange', val)
    },

  }
}
</script>

<style lang="scss" scoped>
.table-pagination{
  padding: 15px 0;
}
.table-content .el-table .sort-caret.ascending {
  color: #ccc;
}
</style>

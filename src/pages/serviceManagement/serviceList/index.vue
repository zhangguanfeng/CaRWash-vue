<template>
  <div>
    <el-card class="container">
      <!-- 表格部分 -->
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
        <template v-slot:img="slotProps">
          <img :src="slotProps.callback.row.image" style="width: 5vw;height: 5vw">
        </template>
        <template v-slot:operation="slotProps">
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
            <el-button @click="go(1,slotProps.callback.row)" icon="el-icon-user-solid" type="success"
              size="mini">
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
            <el-button @click="go(2,slotProps.callback.row)" icon="el-icon-edit-outline" type="primary"
              size="mini">
            </el-button>
          </el-tooltip>
        </template>
      </my-table>
    </el-card>
  </div>
</template>

<script>
import { mixin_pickerOptions, mixin_list, get_list } from "@/mixins";
import myTable from '@/components/Table'
import { getService, getServiceDetail, editService } from '@/api/api';

export default {
  mixins: [mixin_pickerOptions, mixin_list(getService)],
  data () {
    return {
      columns: [
        {
          label: this.$t('serviceList.id'),
          width:200,
          sortable:true,
          prop: 'id',
        }, {
          label: this.$t('serviceList.name'),
          sortable:true,
          prop: 'name',
        },
        {
          label: this.$t('serviceList.frequentness'),
          sortable:true,
          prop: 'times',
        },
        {
          label: this.$t('serviceList.img'),
          sortable:true,
          prop: 'image',
          slot:'img'
        },
        {
          label: this.$t('operation'),
          prop: '',
          align: 'center',
          slot: 'operation'
        }],
    }
  },
  components:{
    myTable
  },
  methods: {
    go (type, row) {
      switch (type) {
        case 1:
          this.$router.push(`/serviceManagement/serviceList/detail?id=${row.id}`)
          break;
        case 2:
          this.$router.push(`/serviceManagement/serviceList/edit?id=${row.id}`)
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
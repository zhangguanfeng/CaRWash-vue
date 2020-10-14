<template>
  <div>
    <!-- 表单部分 -->
    <el-card class="container">
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
              @click="handleClick('check',slotProps.callback.row)"
              icon="el-icon-view"
              type="success"
              size="mini"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
            <el-button
              @click="handleClick('edit',slotProps.callback.row)"
              icon="el-icon-edit-outline"
              type="primary"
              size="mini"
            ></el-button>
          </el-tooltip>
          <!-- <el-tooltip class="item" effect="dark" :content="$t('btnTip').delete" placement="top">
            <el-button
              @click="remove(slotProps.callback.row.id)"
              icon="el-icon-delete"
              type="danger"
              size="mini"
            ></el-button>
          </el-tooltip>-->
        </template>
      </my-table>
    </el-card>
    <!-- <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px">
      <form-page
        :ref-obj.sync="formInfo.ref"
        :data="formInfo.data"
        :field-list="formInfo.fieldList"
        :rules="formInfo.rules"
        :label-width="formInfo.labelWidth"
        :list-type-info="listTypeInfo"
        :disabled="formInfo.disabled"
      ></form-page>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{submitBut}}</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import { mixin_pickerOptions, mixin_list, get_list } from "@/mixins";
import myTable from '@/components/Table'
// import FormPage from '@/components/FormPage'
import { getServiceTerm } from '@/api/api';
export default {
  mixins: [mixin_pickerOptions, mixin_list(getServiceTerm)],
  components: {
    myTable
  },
  data () {
    return {
      clickType: '',
      columns: [
        {
          label: 'ID',
          prop: 'id',
          width:200
        }, {
          label: this.$t('serviceTerms.type'),
          prop: 'name',
        }, 
        // {
        //   label: this.$t('serviceTerms.content'),
        //   prop: 'content',
        // },
        {
          label: this.$t('operation'),
          prop: '',
          width: 200,
          align: 'left',
          slot: 'operation'
        }],
    }
  },
  created () {
    
  },
  methods: {
    handleClick (value, item) {
      this.clickType = value
      switch (value) {
        case 'edit':
          this.$router.push(`/setting/use/edit?id=${item.id}&type=edit`)
          break;
        case 'check':
           this.$router.push(`/setting/use/edit?id=${item.id}&type=check`)
      }
    },
  }
}
</script>
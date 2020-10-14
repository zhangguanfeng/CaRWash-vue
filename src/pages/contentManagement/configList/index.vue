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
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
            <el-button
              @click="handleClick('edit',slotProps.callback.row)"
              icon="el-icon-edit-outline"
              type="primary"
              size="mini"
            ></el-button>
          </el-tooltip>
        </template>
      </my-table>
    </el-card>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px">
      <form-page
        :ref-obj.sync="formInfo.ref"
        :data="formInfo.data"
        :field-list="formInfo.fieldList"
        :rules="formInfo.rules"
        :label-width="formInfo.labelWidth"
        :list-type-info="listTypeInfo"
        :disabled="formInfo.disabled"
      >
      </form-page>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{submitBut}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mixin_pickerOptions, mixin_list } from "@/mixins";
import myTable from '@/components/Table'
import FormPage from '@/components/FormPage'
import { getConfigList, editConfig } from '@/api/api';
const formInfoData = {
  id:'',
  name:'',
  value:''
}
export default {
  mixins: [mixin_pickerOptions, mixin_list(getConfigList)],
  components: {
    FormPage,
    myTable
  },
  data () {
    return {
      columns: [
        {
          label: 'ID',
          prop: 'id',
          sortable: true
        }, {
          label: this.$t('configList.name'),
          prop: 'name',
          sortable: true
        }, {
          label: this.$t('configList.value'),
          prop: 'value',
          sortable: true
        },
        {
          label: this.$t('operation'),
          prop: '',
          width: 200,
          align: 'left',
          slot: 'operation'
        }],
      formInfo: {
        ref: null,
        disabled: false,
        data: formInfoData,
        fieldList: [
          { label: this.$t('configList.value'), value: 'value', type: 'input', width: '260', className: 'el-form-block', required: true, hidden: false },
        ],
        rules: {
        },
        labelWidth: '120px'
      },
      listTypeInfo: {
      },
      clickType:'',
      dialogFormVisible: false,
      title: '',
      submitBut: ''
    }
  },
  created () {
    this.initRules()
  },
  methods: {
    initRules () {
      const formInfo = this.formInfo
      formInfo.rules = this.$initRules(formInfo.fieldList)
    },
    handleClick (value, item) {
      this.clickType = value
      this.dialogFormVisible = true
      switch (value) {
        case 'edit':
          this.title = this.$t('btnTip.edit')
          this.submitBut = this.$t('btnTip.submit')
          this.formInfo.data = { ...item }
          this.formInfo.disabled = false
          break;
      }
    },
    submitForm () {
      switch (this.clickType) {
        case 'edit':
          this.formInfo.ref.validate(async (valid) => {
            if (valid) {
              const res = await editConfig(this.formInfo.data)
              if (res.errcode == 2000) {
                this.get_list()
                this.$message.success(res.errmsg)
              }
              this.dialogFormVisible = false
            }
          })
          break;
      }
    },
  }
}
</script>
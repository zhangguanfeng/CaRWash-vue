<template>
  <div>
    <!-- 表单部分 -->
    <el-card class="container">
      <el-button
        type="primary"
        @click="handleClick('add')"
        style="margin-bottom:15px;"
      >{{$t('btnTip.add')}}</el-button>
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
        <template v-slot:star="slotProps">
          <el-rate v-model="slotProps.callback.row.star" disabled style="margin-top:6px;"></el-rate>
        </template>
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
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').delete" placement="top">
            <el-button
              @click="remove(slotProps.callback.row.id)"
              icon="el-icon-delete"
              type="danger"
              size="mini"
            ></el-button>
          </el-tooltip>
        </template>
      </my-table>
      <page :total="list_data.total" :page_size.sync="pageSize" :page.sync="page" />
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
        <template v-slot:form-item-star>
          <el-rate v-model="formInfo.data.star" style="margin-top:6px;"></el-rate>
        </template>
      </form-page>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{submitBut}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mixin_pickerOptions, mixin_list, get_list } from "@/mixins";
import myTable from '@/components/Table'
import FormPage from '@/components/FormPage'
import page from "@/components/page";
import { addEvalution, editEvalution, deleteEvalution, getEvalution, getService,getCarList } from '@/api/api';
const formInfoData = {
  username: '',
  address: '',
  service: '',
  car_type: '',
  star: 5,
  content: ''
}
export default {
  mixins: [mixin_pickerOptions, mixin_list(getEvalution)],
  components: {
    page,
    FormPage,
    myTable
  },
  data () {
    return {
      clickType: '',
      columns: [
        {
          label: this.$t('FAQ.id'),
          prop: 'id',
          sortable: true
        }, {
          label: this.$t('commentList.name'),
          prop: 'username',
          sortable: true
        }, {
          label: this.$t('commentList.address'),
          prop: 'address',
          sortable: true
        },
        {
          label: this.$t('commentList.service'),
          prop: 'service.name'
        },
        {
          label: this.$t('commentList.car_type'),
          prop: 'car_type',
          sortable: true
        },
        {
          label: this.$t('commentList.star'),
          prop: 'star',
          slot: 'star',
          sortable: true
        },
        {
          label: this.$t('commentList.content'),
          prop: 'content',
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
          { label: this.$t('commentList.name'), value: 'username', type: 'input', width: '260', className: 'el-form-block', required: true, hidden: false },
          { label: this.$t('commentList.address'), value: 'address', type: 'input', width: '260', className: 'el-form-block', required: true, hidden: false },
          { label: this.$t('commentList.service'), value: 'service', type: 'select', width: '260', className: 'el-form-block', list: 'serviceList', required: true },
          { label: this.$t('commentList.car_type'), value: 'car_type', type: 'select', width: '260', className: 'el-form-block',list: 'carList', required: true, disabled: false },
          { label: this.$t('commentList.star'), value: 'star', slot: true, width: '260', className: 'el-form-block', required: true },
          { label: this.$t('commentList.content'), value: 'content', type: 'textarea', width: '260', className: 'el-form-block', required: true, disabled: false },
        ],
        rules: {
        },
        labelWidth: '120px'
      },
      listTypeInfo: {
        serviceList: [],
        carList: []
      },
      dialogFormVisible: false,
      title: '',
      submitBut: ''
    }
  },
  created () {
    this.getCarList()
    this.getServiceList()
    this.initRules()
  },
  methods: {
    // 获取车型
    async getCarList () {
      const res = await getCarList()
      this.listTypeInfo.carList = res.list.map((item) => {
        return {
          label: item.name,
          value: item.name
        }
      })
    },
    // 获取服务类型列表
    async getServiceList () {
      const res = await getService()
      this.listTypeInfo.serviceList = res.list.map((item) => {
        return {
          label: item.name,
          value: +item.id
        }
      })
    },
    initRules () {
      const formInfo = this.formInfo
      formInfo.rules = this.$initRules(formInfo.fieldList)
    },
    handleClick (value, item) {
      this.clickType = value
      this.dialogFormVisible = true
      switch (value) {
        case 'add':
          this.title = this.$t('FAQ.ask')
          this.submitBut = this.$t('btnTip.add')
          this.formInfo.data = { ...formInfoData }
          this.formInfo.disabled = false
          break;
        case 'edit':
          this.title = this.$t('btnTip.edit')
          this.submitBut = this.$t('btnTip.submit')
          this.formInfo.data = { ...item, service: item.service.id }
          this.formInfo.disabled = false
          break;
        case 'check':
          this.title = this.$t('btnTip.check')
          this.submitBut = this.$t('btnTip.close')
          this.formInfo.disabled = true
          this.formInfo.data = { ...item, service: item.service.id }
          break;
      }
    },
    remove (id) {
      this.$confirm(this.$t('commentList').sureDeleteComment, this.$t('tips'), {
        confirmButtonText: this.$t('btnTips').submit,
        cancelButtonText: this.$t('btnTips').cancel,
        type: 'warning'
      }).then(async () => {
        const res = await deleteEvalution(id)
        if (res.errcode == 2000) {
          this.list_data.list = this.list_data.list.filter((value) => {
            return value.id !== id
          })
          this.$message.success(res.errmsg)
        }
      }).catch(() => {
        // this.$message('取消了删除')
      })
    },
    submitForm () {
      switch (this.clickType) {
        case 'add':
          this.formInfo.ref.validate(async (valid) => {
            if (valid) {
              const res = await addEvalution(this.formInfo.data)
              if (res.errcode == 2000) {
                this.get_list()
                this.$message.success(res.errmsg)
              }
              this.dialogFormVisible = false
            }
          })
          break;
        case 'edit':
          this.formInfo.ref.validate(async (valid) => {
            if (valid) {
              const res = await editEvalution(this.formInfo.data)
              if (res.errcode == 2000) {
                this.get_list()
                this.$message.success(res.errmsg)
              }
              this.dialogFormVisible = false
            }
          })
          break;
        case 'check':
          this.dialogFormVisible = false
          break;
      }
    },
  }
}
</script>
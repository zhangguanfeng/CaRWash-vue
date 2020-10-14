<template>
  <div>
    <!-- 搜索部分 -->
    <el-card style="margin-bottom: 15px;" shadow="hover">
      <el-row type="flex" :gutter="20" align="middle">
        <el-col :xs="12" :sm="10" :md="8" :lg="5">
          <el-input
            :placeholder="$t('search')"
            class="searchByName"
            clearable
            v-model="filter.search"
          ></el-input>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <el-button @click="get_list" type="primary">{{$t('search_zh')}}</el-button>
        </el-col>
      </el-row>
    </el-card>
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
          <!-- <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
            <el-button
              @click="handleClick('check',slotProps.callback.row)"
              icon="el-icon-view"
              type="success"
              size="mini"
            ></el-button>
          </el-tooltip> -->
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
      ></form-page>
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
import {  editQA, getQA, getQADetail, deleteQA } from '@/api/api';
const formInfoData = {
  answer: ''
}
export default {
  mixins: [mixin_pickerOptions, mixin_list(getQA)],
  components: {
    page,
    FormPage,
    myTable
  },
  data () {
    return {
      filter: {
        search: ''
      },
      clickType: '',
      columns: [
        {
          label: 'ID',
          prop: 'id',
          sortable:true
        }, {
          label: this.$t('QA.title'),
          prop: 'title',
          sortable:true
        },
        {
          label: this.$t('QA.content'),
          prop: 'content',
          sortable:true
        },
        {
          label: this.$t('QA.answer'),
          prop: 'answer',
          sortable:true
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
          { label: this.$t('QA.answer'), value: 'answer', type: 'textarea', width: '260', className: 'el-form-block', required: true, disabled: false },
        ],
        rules: {
        },
        labelWidth: '120px'
      },
      listTypeInfo: {
      },
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
        // case 'add':
        //   this.title = this.$t('FAQ.ask')
        //   this.submitBut = this.$t('btnTip.add')
        //   this.formInfo.data = { ...formInfoData }
        //   this.formInfo.disabled = false
        //   break;
        case 'edit':
          this.title = this.$t('btnTip.edit')
          this.submitBut = this.$t('btnTip.submit')
          this.formInfo.data = { ...item }
          this.formInfo.disabled = false
          break;
        // case 'check':
        //   this.title = this.$t('btnTip.check')
        //   this.submitBut = this.$t('btnTip.close')
        //   this.formInfo.disabled = true
        //   this.formInfo.data = { ...item }
        //   break;
      }
    },
    remove (id) {
      this.$confirm(this.$t('QA.sureDeleteQA'), this.$t('tips'), {
        confirmButtonText: this.$t('btnTip.submit'),
        cancelButtonText: this.$t('btnTip.cancel'),
        type: 'warning'
      }).then(async () => {
        const res = await deleteQA(id)
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
        // case 'add':
        //   this.formInfo.ref.validate(async (valid) => {
        //     if (valid) {
        //       const res = await addFAQ(this.formInfo.data)
        //       if (res.errcode == 2000) {
        //         this.get_list()
        //         this.$message.success(res.errmsg)
        //       }
        //       this.dialogFormVisible = false
        //     }
        //   })
        //   break;
        case 'edit':
          this.formInfo.ref.validate(async (valid) => {
            if (valid) {
              const res = await editQA(this.formInfo.data)
              if (res.errcode == 2000) {
                this.get_list()
                this.$message.success(res.errmsg)
              }
              this.dialogFormVisible = false
            }
          })
          break;
        // case 'check':
        //   this.dialogFormVisible = false
        //   break;
      }
    },
  }
}
</script>
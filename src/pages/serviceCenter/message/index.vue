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
    <div class="fiveIcon mt20">
      <ul @click="select">
        <li>
          <div data-index="0">
            <i data-index="0" class="el-icon-present"></i>
            <p data-index="0">全部</p>
          </div>
        </li>
        <li>
          <div data-index="1">
            <i data-index="1" class="el-icon-pie-chart"></i>
            <p data-index="1">所有客户</p>
          </div>
        </li>
        <li>
          <div data-index="2">
            <i data-index="2" class="el-icon-edit-outline"></i>
            <p data-index="2">所有职员</p>
          </div>
        </li>
        <li>
          <div data-index="3">
            <i data-index="3" class="el-icon-edit-outline"></i>
            <p data-index="3">单个用户</p>
          </div>
        </li>
      </ul>
    </div>
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
import { addMessage, editMessage, getMessage, deleteMessage } from '@/api/api';
const formInfoData = {
  type: '',
  title: '',
  content: ''
}
export default {
  mixins: [mixin_pickerOptions, mixin_list(getMessage)],
  components: {
    page,
    FormPage,
    myTable
  },
  data () {
    return {
      filter: {
        search: '',
        type:0
      },
      clickType: '',
      columns: [
        {
          label: this.$t('FAQ.id'),
          prop: 'id',
        }, {
          label: this.$t('FAQ.create_time'),
          prop: 'create_time',
        }, {
          label: this.$t('FAQ.category'),
          prop: 'category',
        },
        {
          label: this.$t('FAQ.title'),
          prop: 'title',
        },
        {
          label: this.$t('FAQ.answer'),
          prop: 'answer',
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
          { label: this.$t('message.type'), value: 'type', type: 'select', width: '260', className: 'el-form-block', list: 'messageType', required: true, hidden: false },
          { label: this.$t('message.title'), value: 'title', type: 'input', width: '260', className: 'el-form-block', required: true, hidden: false },
          { label: this.$t('message.content'), value: 'content', type: 'textarea', width: '260', className: 'el-form-block', required: true, disabled: false },
        ],
        rules: {
        },
        labelWidth: '120px'
      },
      listTypeInfo: {
        messageType: [
          { value: 0, label: this.$t('message.typeText0') },
          { value: 1, label: this.$t('message.typeText1') },
          { value: 2, label: this.$t('message.typeText2') },
          { value: 3, label: this.$t('message.typeText3') },
        ]
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
    select (e) {
      console.log(e)
      let dom = e.target;
      let index = dom.getAttribute("data-index")
      if(index===null) return
      this.filter.type=index
      this.get_list()
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
          this.title = this.$t('btnTip.add')
          this.submitBut = this.$t('btnTip.add')
          this.formInfo.data = { ...formInfoData }
          this.formInfo.disabled = false
          break;
        case 'edit':
          this.title = this.$t('btnTip.edit')
          this.submitBut = this.$t('btnTip.submit')
          this.formInfo.data = { ...item }
          this.formInfo.disabled = false
          break;
        case 'check':
          this.title = this.$t('btnTip.check')
          this.submitBut = this.$t('btnTip.close')
          this.formInfo.disabled = true
          this.formInfo.data = { ...item }
          break;
      }
    },
    remove (id) {
      this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await deleteMessage(id)
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
              const res = await addMessage(this.formInfo.data)
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
              const res = await editMessage(this.formInfo.data)
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
<style  lang='scss' scoped>
.fiveIcon {
  width: 100%;
  display: flex;
  margin-bottom: 15px;
  ul {
    display: flex;
    width: 100%;
    li {
      width: 33%;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        padding: 20px 0;
        color: #fff;
        flex-direction: column;
        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
        -o-transition: all 0.5s;
        box-shadow: 0 5px 10px rgba(100, 100, 100, 0.2);
        i {
          font-size: 32px;
          margin-bottom: 5px;
          transition: all 0.5s;
          -webkit-transition: all 0.5s;
          -moz-transition: all 0.5s;
          -o-transition: all 0.5s;
        }
        &:hover {
          background: #0000fe;
        }
      }
    }
    li:nth-child(1) div {
      background: #36cfca;
    }
    li:nth-child(1):hover div {
      background: #30a19d;
    }
    li:nth-child(2) div {
      background: #597cf4;
    }
    li:nth-child(2):hover div {
      background: #1e3a9a;
    }
    li:nth-child(3) div {
      background: #9253df;
    }
    li:nth-child(3):hover div {
      background: #693e9e;
    }
    li:nth-child(4) div {
      background: #73d13d;
    }
    li:nth-child(4):hover div {
      background: #589a32;
    }
  }
}
</style>
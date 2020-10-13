<template>
  <div>
    <el-card class="container" shadow="hover">
       <el-button
        type="primary"
        @click="carFormFun('add')"
        class="addArea"
      >{{$t('carList').add_car}}</el-button>
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
              @click="carFormFun('edit',slotProps.callback.index)"
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
          </el-tooltip> -->
        </template>
      </my-table>
    </el-card>
    <!-- 添加表单 -->
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
        <el-button @click="done()" type="primary" style="margin-left:30px;">{{title}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mixin_pickerOptions, mixin_list } from "@/mixins"
import myTable from '@/components/Table'
import FormPage from '@/components/FormPage'
import { getCarList, addCar, editCar  } from '@/api/api';
const formInfoData = {
  name: ''
}
export default {
  name: "carList",
  components: {
    FormPage,
    myTable
  },
  mixins: [mixin_pickerOptions, mixin_list(getCarList)],
  data () {
    return {
      filter: {
        search: '',
      },
      // 是否显示添加表单
      dialogFormVisible: false,
      // 添加表单信息
      which: '',
    //   shopList: '',
      listTypeInfo: {
        
      },
      columns: [
        {
          label: 'ID',
          width:200,
          sortable:true,
          prop: 'id',
        }, {
          label: this.$t('carList').car_type,
          sortable:true,
          prop: 'name',
        },
        {
          label: this.$t('operation'),
          prop: '',
          align: 'center',
          slot: 'operation'
        }],
      formInfo: {
        ref: null,
        disabled: false,
        data: formInfoData,
        fieldList: [
          { label: this.$t('carList').car_type, value:'name',width: '260', type: 'input', className: 'el-form-block', required: true, hidden: false },
        ],
        rules: {
        },
        labelWidth: '120px'
      },
    }
  },

  computed: {
    title () {
      switch (this.which) {
        case 'add':
          return this.$t('btnTip').add;
        case 'check':
          return this.$t('btnTip').close;
        case 'edit':
          return this.$t('btnTip').edit;
      }
    }
  },

  filters: {
  },
  created () {
    this.initRules()
  },
  methods: {
    initRules () {
      const formInfo = this.formInfo
      formInfo.rules = this.$initRules(formInfo.fieldList)
    },
    async carFormFun (type, data) {
      switch (type) {
        case 'edit':
            this.formInfo.data = { ...this.list_data.list[data]}
            this.initRules()
          break;
        case 'add':
            this.formInfo.data = formInfoData
            this.initRules()
            break;
      }
      this.dialogFormVisible = true
      this.which = type
    },
    remove (id) {
      this.$confirm(this.$t('serviceArea').sureDeleteArea, this.$t('tips'), {
        confirmButtonText: this.$t('btnTips').submit,
        cancelButtonText: this.$t('btnTips').cancel,
        type: 'warning'
      }).then(async () => {
        let res = await deleteServiceArea(id)
        if (res.errcode == 2000) {
        this.dialogFormVisible = false
        this.get_list()
        }
      }).catch({
      })
    },
    done () {
      switch (this.which) {
        case 'add':
          this.formInfo.ref.validate((valid) => {
            if (valid) {
              this.addCar(this.formInfo.data)
            }
          })
          return
        case 'check':
          this.dialogFormVisible = false
          return
        case 'edit':
          this.formInfo.ref.validate((valid) => {
            if (valid) {
              this.editCar(this.formInfo.data)
            }
          })
          return
      }
    },
    async addCar (form) {
      await addCar(form)
      this.dialogFormVisible = false
      this.get_list()
    },
    async editCar (form) {
      await editCar(form)
      this.dialogFormVisible = false
      this.get_list()
    },

  }
}
</script>

<style lang="scss" scoped>
// 搜索部分
.search_card /deep/ {
  margin-bottom: 15px;
}
.container /deep/ {
  // 添加管理员部分
  .addArea {
    margin-bottom: 15px;
  }
}
.el-tag {
margin-right: 10px;
margin-bottom:5px;
}
.button-new-tag {
height: 32px;
line-height: 30px;
padding-top: 0;
padding-bottom: 0;
}
.input-new-tag {
width: 100px;
vertical-align: bottom;
}
</style>
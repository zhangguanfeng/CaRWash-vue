<template>
  <div>
    <div class="box">
      <el-page-header @back="$router.go(-1)"></el-page-header>
    </div>
    <el-card class="content mt20">
      <el-form label-position="left" :model="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item :label="$t('serviceList').name + '：'" prop="name">
          <span>{{list.name}}</span>
        </el-form-item>
        <el-form-item :label="$t('serviceList').frequentness + '：'" prop="name">
          <span>{{list.times}}</span>
        </el-form-item>
        <el-form-item :label="$t('serviceList').price + '：'">
          <el-table stripe :data="list_data.list" border style="width: 100%">
            <el-table-column prop="car_type" :label="$t('serviceList').category" min-width="40%">
            </el-table-column>
            <el-table-column prop="amount" :label="$t('serviceList').price" min-width="40%">
            </el-table-column>
            <el-table-column :label="$t('operation')" min-width="10%" align="center">
               <template slot-scope="scope">
                 <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
                  <el-button
                    @click="change('edit',scope.row)"
                    icon="el-icon-edit-outline"
                    type="primary"
                    size="mini"
                  ></el-button>
                </el-tooltip>
               </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item :label="$t('serviceList').img + '：'">
          <el-image style="width: 100px; height: 100px" :src="list.image" :preview-src-list="[list.image]">
          </el-image>
        </el-form-item>
      </el-form>
    </el-card>
     <!-- 表单 -->
    <el-dialog  :visible.sync="dialogFormVisible" width="500px">
      <form-page
        :ref-obj.sync="formInfo.ref"
        :data="formInfo.data"
        :field-list="formInfo.fieldList"
        :rules="formInfo.rules"
        :label-width="formInfo.labelWidth"
        :disabled="formInfo.disabled"
      >
      </form-page>
      <span slot="footer" class="dialog-footer">
        <el-button @click="done()" type="primary" style="margin-left:30px;">{{$t('btnTip').edit}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import { mixin_pickerOptions, mixin_list } from "@/mixins";
// import page from "@/components/page";
import FormPage from '@/components/FormPage'
import { getPrice, editPrice, getServiceDetail } from '@/api/api';

// 添加表单信息
const formInfoData = {
  id:'',
  cart_type:'',
  amount:''
}
export default {
  data () {
    return {
      // 地图弹窗
      // mapDialog: false,
      // 修改之后地图
      // locationInfo: {},
      ruleForm: {
        name: '',
        address: '',
        description: '',
        phone: '',
        service_range: '',
        startTime: '',
        endTime: ''
      },
      list:'',
      basicData: '',
      list_data: [],
      // url: this.$route.params.image,
      srcList: [
        // this.$route.params.image
      ],
      formInfo: {
        ref: null,
        disabled: false,
        data: formInfoData,
        fieldList: [
          { label: this.$t('serviceList').category, value: 'car_type', width: '260', type: 'input', className: 'el-form-block', required: false,disabled: true },
          { label: this.$t('serviceList').price, value: 'amount', type: 'input', width: '260', className: 'el-form-block', required: true, hidden: false },
          { label: this.$t('serviceList').price, value: 'is_delete', type: 'input', width: '260', className: 'el-form-block', required: false, hidden: true }
        ],
        rules: {
        },
        labelWidth: '120px'
      },
       // 是否显示添加表单
      dialogFormVisible: false,
    }
  },
  components: {
    FormPage
  },
  computed:{
    id(){
			return Number.isNaN(Number(this.$route.query.id)) ? undefined : Number(this.$route.query.id)
    },
  },
  created(){
    if(this.id === undefined) return
    this.get_info()

  },
  methods: {
    async get_info(){
      const res = await getServiceDetail(this.id)
      this.list=res
      this.getPriceInfo()
    },
     done(){
      this.formInfo.ref.validate(async(valid) => {
        if (valid) {
          this.editPrice(this.formInfo.data)
        }
      })
    },
    async editPrice(data){
      delete data.is_delete
      delete data.car_type
      await editPrice(data)
      this.dialogFormVisible = false
      this.getPriceInfo()
    },
     initRules () {
      const formInfo = this.formInfo
      formInfo.rules = this.$initRules(formInfo.fieldList)
    },
    async change(type, data){
      this.formInfo.data={...data}
      this.initRules()
       this.dialogFormVisible = true
    },
    async getPriceInfo () {
      this.list_data = await getPrice({
        service: this.list.times / 4
      })
    }
  }
}
</script>
<style land="scss" scoped>
.el-date-editor {
  margin-right: 10px;
}
</style>
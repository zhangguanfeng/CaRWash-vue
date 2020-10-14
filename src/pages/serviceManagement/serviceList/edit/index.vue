<template>
  <div>
    <div class="box">
      <el-page-header @back="$router.go(-1)"></el-page-header>
    </div>
    <el-card class="content mt20">
      <el-form label-position="left" :model="ruleForm" label-width="100px"  ref="ruleForm" class="demo-ruleForm">
        <el-form-item :label="$t('serviceList').name" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('serviceList').frequentness" prop="times">
          <el-input v-model="ruleForm.times"></el-input>
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item :label="$t('inputImage')">
          <component-upload-img
            :limitMax="1"
            :file-list="ruleForm.image"
            @changeImgList="changeImgList"
          ></component-upload-img>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">
            {{$t('btnTip').edit}}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import componentUploadImg from '@/components/uploadImg'
import { editService, getServiceDetail } from '@/api/api'
export default {
  name: 'serviceEdit',
  data () {
    return {
      ruleForm: {
        id:'',
        name: '',
        times:'',
        image:''
      },
       rules: {
        name: [
            { required: true, message: this.$t('shopManagement').inputName, trigger: 'blur' },
        ],
        times: [
            { required: true, message: this.$t('shopManagement').inputAddress, trigger: 'change' },
            { type: 'number', message: '次数必须为数字值'}
        ],
        images: [
            { required: true, message: this.$t('shopManagement').inputShopDesc, trigger: 'blur' }
        ],
    },
    }
  },
  components: {
    componentUploadImg
  },
  computed:{
    id(){
			return Number.isNaN(Number(this.$route.query.id)) ? undefined : Number(this.$route.query.id)
    },
  },
  created(){
    this.get_info()
  },
  methods: {
    changeImgList(arr){
      if(arr.length===0){
        this.ruleForm.image=''
      }else{
        this.ruleForm.image=arr[0]
      }
    },
    async get_info(){
      const res = await getServiceDetail(this.id)
      this.ruleForm = res
    },
    async submitForm (formName) {
      if(!isNaN(Number(this.ruleForm.times))){
        this.ruleForm.times=Number(this.ruleForm.times)
      }
      await this.$refs[formName].validate()
      const res = await editService(this.ruleForm)
      this.$router.go(-1)
    },
  }
}
</script>
<style land="scss" scoped>
.el-date-editor {
  margin-right: 10px;
}
</style>
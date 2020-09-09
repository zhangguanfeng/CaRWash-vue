<template>
  <div>
    <div class="box">
      <el-page-header @back="$router.go(-1)"></el-page-header>
    </div>
    <el-card class="content mt20">
      <el-form label-position="left" :model="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item :label="$t('serviceList').name" prop="name">
          <el-input v-model="list_data.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('serviceList').frequentness" prop="name">
          <el-input v-model="list_data.times"></el-input>
        </el-form-item>
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
          :file-list="fileList" list-type="picture">
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
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
import vueMapSmall from '@/components/global/vueMap'
import { getStoreDetail } from '@/api/api'
export default {
  name: 'serviceEdit',
  created () {
  },
  data () {
    return {
      fileList: [{
        name: this.$route.params.name,
        url: this.$route.params.image
      }],
      // 地图弹窗
      mapDialog: false,
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
      list_data: this.$route.params
    }
  },
  components: {
    vueMapSmall
  },
  methods: {
    submitForm () {
      console.log(this.fileList)
    }
  }
}
</script>
<style land="scss" scoped>
.el-date-editor {
  margin-right: 10px;
}
</style>
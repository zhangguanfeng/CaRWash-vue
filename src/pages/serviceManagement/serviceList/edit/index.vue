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
        <!-- 图片上传 -->
        <el-form-item :label="$t('inputImage')">
          <el-upload ref="showUp" action="#" list-type="picture-card" :auto-upload="false"
            :limit="1" :on-exceed="handleExceed" :file-list="file" :on-change="handleChange">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete"
                  @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
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
import { uploadImg, unloadImg, editServiceTerm } from '@/api/api'
export default {
  name: 'serviceEdit',
  mounted () {
    var box = document.getElementsByClassName('el-upload--picture-card')[0]
    box.style.display = 'none'
  },
  data () {
    return {
      hideUpload: false,
      file: [{
        name: this.$route.params.name,
        url: this.$route.params.image
      }],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
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
      list_data: this.$route.params,
      fileUrl: ''
    }
  },
  components: {
    vueMapSmall
  },
  methods: {
    // 删除图片
    async handleRemove (file) {
      var box = document.getElementsByClassName('el-upload--picture-card')[0]
      box.style.display = 'inline-block'
      const res = await unloadImg(file.url)
      this.file = []
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async submitForm () {
      var data = {
        id: this.list_data.id,
        name: this.list_data.name,
        times: this.list_data.times,
        image: this.file.url
      }
      const res = await editServiceTerm(data)
      console.log(res)
    },
    // 选中图片
    async handleChange (file, fileList) {
      var box = document.getElementsByClassName('el-upload--picture-card')[0]
      this.file.push({
        name: file.name,
        url: file.url
      })
      if (this.file.length > 0) {
        box.style.display = 'none'
      }
      console.log(file.raw)
      const res = await uploadImg(file)
      console.log(res)
    },
    handleExceed (file) {
      this.$message('最多只允许添加一张图片')
    }
  }
}
</script>
<style land="scss" scoped>
.el-date-editor {
  margin-right: 10px;
}
</style>
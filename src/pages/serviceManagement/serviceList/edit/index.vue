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
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete"
                @click="handleDownload(file)">
                <i class="el-icon-download"></i>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete"
                @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
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
import { getStoreDetail, uploadImg, unloadImg } from '@/api/api'
export default {
  name: 'serviceEdit',
  created () {
  },
  data () {
    return {
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
    async handleRemove (file) {
      const res = await unloadImg(file.url)
      console.log(res)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async handleDownload (file) {
      const res = await uploadImg(file)
      this.fileUrl = file.url
      console.log(this.fileUrl)
    },
    submitForm () {
      console.log(this.dialogImageUrl)
    }
  }
}
</script>
<style land="scss" scoped>
.el-date-editor {
  margin-right: 10px;
}
</style>
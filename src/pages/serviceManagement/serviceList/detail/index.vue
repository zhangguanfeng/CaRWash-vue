<template>
  <div>
    <div class="box">
      <el-page-header @back="$router.go(-1)"></el-page-header>
    </div>
    <el-card class="content mt20">
      <el-form label-position="left" :model="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item :label="$t('serviceList').name + '：'" prop="name">
          <span>{{basicData.name}}</span>
        </el-form-item>
        <el-form-item :label="$t('serviceList').frequentness + '：'" prop="name">
          <span>{{basicData.times}}</span>
        </el-form-item>
        <el-form-item :label="$t('serviceList').price + '：'">
          <el-table stripe :data="list_data.list" border style="width: 100%">
            <el-table-column prop="car_type" :label="$t('serviceList').category" min-width="50%">
            </el-table-column>
            <el-table-column prop="amount" :label="$t('serviceList').price" min-width="50%">
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item :label="$t('serviceList').img + '：'">
          <el-image style="width: 100px; height: 100px" :src="url" :preview-src-list="srcList">
          </el-image>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mixin_pickerOptions, mixin_list } from "@/mixins";
import page from "@/components/page";
import { getPrice } from '@/api/api';

export default {
  created () {
    this.getPriceInfo()
  },
  data () {
    return {
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
      basicData: this.$route.params,
      list_data: [],
      url: this.$route.params.image,
      srcList: [
        this.$route.params.image
      ]
    }
  },
  methods: {
    async getPriceInfo () {
      this.list_data = await getPrice({
        service: this.$route.params.times / 4
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
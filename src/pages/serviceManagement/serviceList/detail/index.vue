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
        <el-form-item :label="$t('serviceList').category + '：'" prop="name">
          <span>{{list_data.car_type}}</span>
        </el-form-item>
        <el-form-item :label="$t('serviceList').price + '：'" prop="name">
          <span>{{list_data.amount}}</span>
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
  async created () {
    this.list_data = await getPrice(this.$route.params.id)
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
      list_data: {}
    }
  },
  methods: {
  }
}
</script>
<style land="scss" scoped>
.el-date-editor {
  margin-right: 10px;
}
</style>
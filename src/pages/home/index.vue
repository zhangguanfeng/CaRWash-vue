<template>
  <div class="home">
    <el-row class="infoCrads" :gutter="30">
      <el-col :span="6">
        <el-card class="cardItem">
          <div class="cardItem_txt">
            <count-to class="cardItem_p0 color-green1" :startVal="startVal" :endVal="vistors"
              :duration="2000" style="color:#409eff"></count-to>
            <p class="cardItem_p1">Total Visitors</p>
          </div>
          <div class="cardItem_icon">
            <i class="el-icon-user color-green1" style="color:#409eff"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="cardItem">
          <div class="cardItem_txt">
            <count-to class="cardItem_p0 color-blue" :startVal="startVal" :endVal="message"
              :duration="2000" style="color:#ff4406"></count-to>
            <p class="cardItem_p1">Messages</p>
          </div>
          <div class="cardItem_icon">
            <i class="el-icon-s-comment color-blue" style="color:#ff4406"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="cardItem">
          <div class="cardItem_txt">
            <count-to class="cardItem_p0 color-red" :startVal="startVal" :endVal="order"
              :duration="2000" style="color:#F60EC0"></count-to>
            <p class="cardItem_p1">Total Order</p>
          </div>
          <div class="cardItem_icon">
            <i class="el-icon-shopping-cart-2 color-red" style="color:#F60EC0"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="cardItem">
          <div class="cardItem_txt">
            <count-to class="cardItem_p0 color-green2" :startVal="startVal" :endVal="profit"
              :duration="2000" style="color:#67c23a"></count-to>
            <p class="cardItem_p1">Total Profit</p>
          </div>
          <div class="cardItem_icon">
            <i class="el-icon-wallet color-green2" style="color:#67c23a"></i>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="bottom-img animated lightSpeedIn">
      <img src="@/assets/img/background.png" alt="">
    </div>
  </div>
</template>
<script>
import CountTo from "vue-count-to";
export default {
  data () {
    return {
      startVal: 0,
      vistors: 0,
      message: 0,
      order: 0,
      profit: 0,
    }
  },
  activated () {
    this.vistors = 12132;
    this.message = 23232;
    this.order = 233;
    this.profit = 342354;
  },
  deactivated () {
    setTimeout(() => {
      this.vistors = 0;
      this.message = 0;
      this.order = 0;
      this.profit = 0;
    }, 1000);
  },

  components: {
    CountTo,
  },
}
</script>
<style lang="scss" scoped>
.home /deep/ {
  .el-card__body {
    color: #666;
    display: flex;
    justify-content: space-between;
    .cardItem_txt {
      margin: 0 0 0 20px;
      .cardItem_p0 {
        font-size: 20px;
        font-weight: bold;
      }
      .cardItem_p1 {
        font-size: 16px;
      }
    }
    .cardItem_icon {
      margin: 0 20px 0 0;
      i {
        font-size: 55px;
      }
    }
  }
  .bottom-img {
    // box-shadow: #666 1px 6px 2px 6px;
    padding: 20px;
    height: 70vh;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
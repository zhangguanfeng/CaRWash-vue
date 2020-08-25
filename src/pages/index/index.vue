<template>
  <el-container class="main">
    <el-header>
      <v-header @changeCollapse="changeCollapse"></v-header>
    </el-header>
    <el-container class="middle_content">
      <left-slide :collapse="collapse"></left-slide>
      <el-scrollbar style="height: 100%;background: #E9EEF3;flex:1" ref="box">
        <el-main>
          <!-- 面包屑 -->
          <breadcrumb></breadcrumb>
          <!-- 视图内容 -->
          <!-- <transition name="fade-page" mode="out-in">
            <router-view></router-view>

          </transition>-->
          <cTransition>
          <!-- <keep-alive v-if="$route.meta.noCache">
            <router-view></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.noCache"></router-view> -->
		      </cTransition>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>
<script>
// 动画效果 缓存
import cTransition from "@/components/transform"
// 左侧
import leftSlide from "./leftSlide/leftSlide";
import header from "./header/header";
// 时间
import timeShow from "@/components/global/time";
// 左侧面包屑
import breadcrumb from "@/components/global/breadcrumb";
// vuex
import { mapState, mapMutations } from "vuex";
export default {
  name: "index",
  data() {
    return {
      collapse: false,
    };
  },
  methods: {
    // 切换导航栏显示方式
    changeCollapse() {
      this.collapse = !this.collapse;
    },
  },
  components: {
    // 侧边栏
    leftSlide,
    // 时间
    timeShow,
    // 面包屑
    breadcrumb,
	"v-header": header,
	// 动画效果 缓存
	  cTransition
  },
};
</script>
<style lang="scss" scoped>
.main /deep/ {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-header {
    padding: 0;
  }
}
</style>

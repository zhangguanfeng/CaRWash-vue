<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadList" :to="item.path" :key="index">
        {{$t(item.meta.title)}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadList: [],

    }
  },
  watch: {
    $route: {
      handler (route) {

        let allList = route.matched.filter(item => {
          if (item.meta && item.meta.title) {
            if (item.redirect == "/home") {
              item.path = "/";
            } else {
              item.path = ''
            }
            return true;
          }
        });
        if (allList[0].path !== "/" && allList[0].path !== "/home") {
          allList.unshift({ path: "/", meta: { title: "tIndex" } });
        }
        this.breadList = allList;
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin-bottom: 20px;
}
</style>
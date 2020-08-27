<template>
  <div class="rightContent">
    <transition name="fade-page" mode="out-in">
      <!-- 不能使用缓存路由页面,出现url改变跳转不到对应页面 -->
      <!-- <keep-alive v-if="$route.meta.noCache"> -->
      <router-view></router-view>
      <!-- </keep-alive>
      <router-view v-if="!$route.meta.noCache"></router-view> -->
    </transition>
  </div>
</template>

<script>
export default {
  name: 'rightContent'
}
</script>

<style lang = 'scss'>
</style>
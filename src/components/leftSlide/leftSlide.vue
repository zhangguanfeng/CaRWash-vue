<template>
  <el-aside class="leftSlide" style="width:auto">
    <el-scrollbar style="height:100%;width:auto">
      <el-menu router unique-opened :default-active="activerouter" class="el-menu-vertical-demo"
        @open="handleOpen" @close="handleClose" :collapse="collapse" background-color="#545c64"
        text-color="#fff" active-text-color="#409EFF">
        <el-menu-item index="/">
          <i class="el-icon-setting"></i>
          <span slot="title">{{$t('tIndex')}}</span>
        </el-menu-item>
        <el-menu-item index="/memberManagement">
          <i class="el-icon-setting"></i>
          <span slot="title">{{$t('tMemberManagement')}}</span>
        </el-menu-item>
        <el-menu-item index="/staffManagement">
          <i class="el-icon-setting"></i>
          <span slot="title">{{$t('tStaffManagement')}}</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{$t('tServiceManagement')}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/serviceManagement/serviceList">{{$t('tServiceList')}}
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/serviceManagement/serviceApplication">
              {{$t('tServiceApplication')}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script>
export default {
  name: 'leftSlide',
  props: ['collapse'],
  data () {
    return {
      // 当前激活的router
      activerouter: ''
    }
  },
  methods: {
    // 导航栏打开事件
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    // 导航栏关闭事件
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted () {
  },
  watch: {
    $route: {
      handler (route) {
        this.activerouter = this.$route.path === '/home' ? '/' : this.$route.path
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.leftSlide {
  background: #545c64;
  position: relative;
  height: 100%;
  overflow: hidden;
  color: rgb(88, 65, 214);
  .el-menu {
    border: none;
  }
}
</style>
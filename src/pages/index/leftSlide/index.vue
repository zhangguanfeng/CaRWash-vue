<template>
  <el-aside class="leftSlide" style="width:auto">
    <el-scrollbar style="height:100%;width:auto">
      <el-menu router unique-opened :default-active="activerouter" class="el-menu-vertical-demo"
        @open="handleOpen" @close="handleClose" @select="handleselect" :collapse="collapse"
        background-color="#545c64" text-color="#fff" active-text-color="#409EFF">
        <template v-for="(item , index) in routerList">
          <el-submenu :index="item.path" v-if="!item.meta.hide && item.children">
            <template slot="title">
              {{$t(`${item.meta.title}`)}}
            </template>
            <el-menu-item v-for="(itemChild , index) in item.children"
              :index="'/'+ item.path + '/' + itemChild.path" :key="index">
              <span>{{$t(`${itemChild.meta.title}`)}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item :index="'/'+ item.path" v-else>
            {{$t(`${item.meta.title}`)}}
          </el-menu-item>
        </template>

        <el-menu-item index="/">
          <i class="iconfont iconicon95"></i>
          <span slot="title">{{$t('tIndex')}}</span>
        </el-menu-item>
        <el-menu-item index="/managerList" v-if="adminUser.auth">
          <i class="iconfont iconhuiyuan1"></i>
          <span slot="title">{{$t('tManagerList')}}</span>
        </el-menu-item>
        <el-menu-item index="/shopManagement" v-if="adminUser.auth">
          <i class="iconfont iconhuiyuan1"></i>
          <span slot="title">{{$t('tShopManagement')}}</span>
        </el-menu-item>
        <el-menu-item index="/memberManagement">
          <i class="iconfont iconhuiyuan1"></i>
          <span slot="title">{{$t('tMemberManagement')}}</span>
        </el-menu-item>
        <el-menu-item index="/staffManagement">
          <i class="iconfont iconhuiyuan"></i>
          <span slot="title">{{$t('tStaffManagement')}}</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="iconfont iconfuwu1"></i>
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
import { mapState } from 'vuex'
export default {
  name: 'leftSlide',
  props: ['collapse'],
  data () {
    return {
      // 当前激活的router
      activerouter: '',
      routerList: [],
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
    },
    // 选中的栏目
    handleselect (key, keyPath) {
      console.log(keyPath);
    }
  },
  computed: {
    ...mapState(['adminUser'])
  },
  mounted () {
    this.routerList = this.$router.options.routes[0].children
    console.log(this.routerList, ' this.routerList');
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
  i {
    margin-right: 10px;
  }
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
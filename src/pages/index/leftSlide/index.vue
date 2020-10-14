<template>
  <el-aside class="leftSlide" style="width:auto">
    <el-scrollbar style="height:100%;width:auto">
      <el-menu
        router
        unique-opened
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleselect"
        :collapse="collapse"
        background-color="#333744"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <!-- <template v-for="(item , index) in routerList">

          <el-submenu :index="item.path" v-if="!item.meta.hide && item.children">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{$t(`${item.meta.title}`)}}</span>
            </template>
            <el-menu-item v-for="(itemChild , index) in item.children"
              :index="'/'+ item.path + '/' + itemChild.path" :key="index">
              <span>{{$t(`${itemChild.meta.title}`)}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item :index="'/'+ item.path" v-else>
            <i :class="item.meta.icon"></i>
            <span slot="title">{{$t(`${item.meta.title}`)}}</span>
          </el-menu-item>
        </template>-->

        <el-menu-item index="/">
          <i class="iconfont iconicon95"></i>
          <span slot="title">{{$t('tIndex')}}</span>
        </el-menu-item>
        <el-menu-item index="/managerList" v-if="adminUser.auth===0">
          <i class="iconfont iconyonghu"></i>
          <span slot="title">{{$t('tManagerList')}}</span>
        </el-menu-item>
        <el-menu-item index="/shopManagement" v-if="adminUser.auth===0">
          <i class="iconfont icongongsimingcheng"></i>
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
          <el-menu-item-group v-if="adminUser.auth===0">
            <el-menu-item index="/serviceManagement/serviceArea">{{$t('tServiceArea')}}</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group v-if="adminUser.auth===0">
            <el-menu-item index="/serviceManagement/serviceList">{{$t('tServiceList')}}</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item
              index="/serviceManagement/serviceApplication"
            >{{$t('tServiceApplication')}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/scheduleManagement">
          <i class="iconfont iconriqi"></i>
          <span slot="title">{{$t('tScheduleManagement')}}</span>
        </el-menu-item>
        <!-- <el-menu-item index="/resultManagement">
          <i class="iconfont iconhuiyuan1"></i>
          <span slot="title">{{$t('tResultManagement')}}</span>
        </el-menu-item>-->
        <el-submenu index="3">
          <template slot="title">
            <i class="iconfont iconbianhao"></i>
            <span slot="title">{{$t('tSettlementManagement')}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/settlementManagement/settlementList">{{$t('tSettlementList')}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4" v-if="adminUser.auth===0">
          <template slot="title">
            <i class="iconfont iconziyuan"></i>
            <span slot="title">{{$t('tContentManagement')}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/contentManagement/commentList">{{$t('tCommentList')}}</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/contentManagement/carList">{{$t('tCarList')}}
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/contentManagement/configList">{{$t('tConfigList')}}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5" v-if="adminUser.auth===0">
          <template slot="title">
            <i class="iconfont iconsousuo"></i>
            <span slot="title">{{$t('tServiceCenter')}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/serviceCenter/message">{{$t('tMessage')}}</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/serviceCenter/commonQuestion">{{$t('tCommonQuestion')}}</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/serviceCenter/difficultQuestion">{{$t('tDifficultQuestion')}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6" v-if="adminUser.auth===0">
          <template slot="title">
            <i class="iconfont iconfuwu1"></i>
            <span slot="title">{{$t('tSetting')}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/setting/use">{{$t('tUse')}}</el-menu-item>
          </el-menu-item-group>
          <!-- <el-menu-item-group>
            <el-menu-item index="/setting/information">{{$t('tInformation')}}</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/setting/position">{{$t('tPosition')}}</el-menu-item>
          </el-menu-item-group>-->
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

      routerList: [],
    }
  },
  methods: {
    // 导航栏打开事件
    handleOpen (key, keyPath) {
      //   console.log(key, keyPath);
    },
    // 导航栏关闭事件
    handleClose (key, keyPath) {
      //   console.log(key, keyPath);
    },
    // 选中的栏目
    handleselect (key, keyPath) {

    }
  },
  computed: {
    ...mapState(['adminUser'])
  },
  mounted () {
    this.routerList = this.$router.options.routes[0].children
  },
  watch: {

  }
}
</script>
<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
  i {
    margin-right: 10px;
  }
}
.leftSlide {
  background: #333744;
  position: relative;
  top: -10px;
  height: 101%;
  overflow: hidden;
  .el-menu {
    border: none;
  }
}
</style>

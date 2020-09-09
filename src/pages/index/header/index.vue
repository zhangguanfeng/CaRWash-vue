<template>
  <div class="el-header" :class="{'closeBar':collapse}">
    <div class="header-logo">
      <a href="javascript:;" class="logoLink">
        <i class="iconfont iconguanlihoutai logoIcon">
        </i>
        {{$t('backstageName')}}</a>
    </div>
    <div class="rightTop flexBC header_r">
      <div class="flex rightTopLeft">
        <el-button @click="changeCollapse">
          <i class="el-icon-s-operation fs20 "></i>
        </el-button>
        <el-input prefix-icon="el-icon-search" v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="rightTopRight flex">
        <div class="numberBadge">
          <el-dropdown class='changeLang' trigger="click" @command='changeValue'>
            <span class="el-dropdown-link ">
              {{selectLanguage}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class='switchYy'>
              <el-dropdown-item v-for="(item, index) in switchLanguagesArr" :key="item"
                :command='index'>{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-button>
          <i class="el-icon-message-solid fs20 "></i>
        </el-button>
        <el-button>
          <i class="el-icon-chat-dot-round fs20 "></i>
        </el-button>
        <div>
          <el-dropdown trigger="click">
            <div class="ml20 flex">
              <el-avatar icon="el-icon-user-solid"></el-avatar>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="exit">{{$t('exit')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入storage
import storage from '@/utils/storage.js'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 切换语言
      switchLanguagesArr: [
        '中文',
        'English',
        '한국어'
      ],
      input: '',
      // 当前导航栏显示方式
      collapse: false,
    }
  },
  methods: {
    ...mapMutations(['saveUserInfo', 'saveLanguage']),
    exit () {
      this.$message.success('退出成功')
      // this.saveUserInfo(null)
      storage.removeLocal('token')
      storage.removeLocal('userinfo')
      this.$router.push('/login')
    },
    changeValue (index) {
      let obj = {}
      switch (index) {
        case 0:
          obj = {
            name: '中文',
            txt: 'zh',
            index: index
          }
          break;
        case 1:
          obj = {
            name: 'English',
            txt: 'en',
            index: index
          }
          break;
        case 2:
          obj = {
            name: '한국어',
            txt: 'ko',
            index: index
          }
          break;
      }
      this.saveLanguage(obj)
      location.reload();
    },
    // 切换导航栏显示方式
    changeCollapse () {
      this.collapse = !this.collapse
      this.$emit('changeCollapse')
    },
  },
  computed: {
    ...mapState(['adminUser', 'selectLanguage'])
  },
}
</script>
<style lang="scss" scoped>
.el-header {
  width: 100%;
  padding: 0;
  .header-logo {
    width: 250px;
    height: 59px;
    float: left;
    background-color: #333744;
    box-sizing: border-box;
    transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out;
    overflow: hidden;
  }
  .logoLink {
    color: #fff !important;
    font-size: 15px;
    margin-left: 14px;
    display: inline-block;
    font-weight: bold;
    height: 100%;
    line-height: 59px;
    .logoIcon {
      font-size: 28px;
      color: #fff;
      // margin-right: 20px;
      margin-right: 8px;

      vertical-align: middle;
    }
    // img {
    //   height: 28px;
    //   position: relative;
    //   border-radius: 50%;
    //   top: -3px;
    // }
  }
  .rightTop {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    background: #fff;
    line-height: 59px;
    .rightTopLeft,
    .rightTopRight {
      min-width: 400px;
      button {
        background: transparent;
        border: 0;
      }
      .numberBadge {
        cursor: pointer;
      }
    }
    .rightTopRight {
      min-width: 270px;
    }
  }
}
</style>
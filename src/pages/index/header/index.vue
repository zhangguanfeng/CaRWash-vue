<template>
  <div class="el-header" :class="{'closeBar':collapse}">
    <div class="header-logo">
      <a href="javascript:;" class="logoLink">
        <img src="../../../assets/img/1.jpg" alt="logo" />
        后台管理系统</a>
    </div>
    <div class="rightTop flexBC header_r">
      <div class="flex rightTopLeft">
        <el-button @click="changeCollapse">
          <i class="el-icon-s-operation fs20 fc255"></i>
        </el-button>
        <el-input prefix-icon="el-icon-search" v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="rightTopRight flex">
        <div class="numberBadge">
          <el-dropdown class='changeLang' trigger="click" @command='changeValue'>
            <span class="el-dropdown-link fc255">
              {{selectLanguage}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class='switchYy'>
              <el-dropdown-item v-for="(item, index) in switchLanguagesArr" :key="item"
                :command='index'>{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-button>
          <i class="el-icon-message-solid fs20 fc255"></i>
        </el-button>
        <el-button>
          <i class="el-icon-chat-dot-round fs20 fc255"></i>
        </el-button>
        <div>
          <el-dropdown  trigger="click">
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
    ...mapMutations(['saveUserInfo','saveLanguage']),
    exit(){
      this.$message.success('退出成功')
      storage.removeLocal('token')
      this.saveUserInfo(null)
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
  background-color: #545c64;
  padding: 0;
  .header-logo {
    width: 200px;
    height: 100%;
    float: left;
    background-color: #545c64;
    box-sizing: border-box;
    border-bottom: 1px solid #899082;
    border-right: 1px solid #899082;
    transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out;

    overflow: hidden;
  }
  .logoLink {
    color: #fff !important;
    font-size: 15px;
    margin-left: 18px;
    display: inline-block;
    font-weight: bold;
    height: 100%;
    line-height: 59px;
    img {
      height: 28px;
      vertical-align: middle;
      margin-right: 8px;
      position: relative;
      border-radius: 50%;
      top: -3px;
    }
  }
  .rightTop {
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
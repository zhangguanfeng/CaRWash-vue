<template>
  <div class="main" :style="loginContainerStyle">
    <bg-canvas :color="0x097bdb"></bg-canvas>
    <div class="login">
      <h4>汽车服务后台管理系统</h4>
      <div class="loginDiv">
        <el-form :model = "ruleForm" :rules = "rules" ref = "adminForm">
          <el-form-item prop = "username">
            <el-input
                placeholder="请输入账号/用户名"
                prefix-icon="el-icon-user"
                v-model="ruleForm.username">
              </el-input>
          </el-form-item>
          <el-form-item prop = "password">
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password"
              show-password>
              </el-input>
          </el-form-item>
          <div class="btn">
            <el-button :loading = "isShow" type = "primary" @click = "submitAdmin('adminForm')">{{isShow ? '登录中' : '登录'}}</el-button>
          </div>
          <div class="forget">
            <!-- <router-link to = '/xx'>忘记密码?</router-link> -->
            <!-- <router-link to = '/reg'>
              极速注册
            </router-link> -->
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// 引入粒子背景
import bgCanvas from '@/components/bgCanvas'
import bgImg from '@/assets/img/background.png'
// 登录api
// import {postLogin} from '@/api/api'
// 引入storage
// import storage from '@/utils/storage.js'
// 引入vuex
import {mapMutations} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      // 是否登录中
      isShow: false,
      // 表单数据
      ruleForm: {
        // 用户名
        username: '',
        // 密码
        password: ''
      },
      // 表单验证规则
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, message: '长度不少于3个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, message: '长度不少于6个字符', trigger: 'blur'}
        ]
      }
    }
  },
  components: {
    bgCanvas
  },
  computed: {
    loginContainerStyle () {
      return {
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: '50%'
      }
    }
  },
  methods: {
    // vuex
    ...mapMutations(['saveUserInfo']),
    // 判断表单验证
    submitAdmin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginHandle()
        } else {
          console.log('失败')
          return false
        }
      })
    },
    // 登录
    // 用户名 name, 密码 pwd, 重定向 url
    async loginHandle (name, pwd, url) {
      this.isShow = true
      const res = await postLogin(
        this.ruleForm.username,
        this.ruleForm.password,
        '/'
      )
      switch (res.errcode) {
        case 5001:
          this.$message.error(this.$t('tGlobal.tError'))
          break
        case 5002:
          this.$message.error('用户不存在，请重新输入')
          this.ruleForm.username = ''
          this.ruleForm.password = ''
          break
        case 5003:
          this.$message.error('用户名或密码错误')
          this.ruleForm.username = ''
          this.ruleForm.password = ''
          break
        case 5004:
          this.$message.error('账号被删除或禁用')
          this.ruleForm.username = ''
          this.ruleForm.password = ''
          break
        case 5005:
          this.$message.error('设置session失败')
          this.ruleForm.username = ''
          this.ruleForm.password = ''
          break
        default:
          this.$message.success('登录成功')
          // storage.setLocal('token', res.token)
          // storage.setLocal('role', res.auth)
          this.saveUserInfo(res)
          this.$router.push('/')
      }
      if (res.errcode) {
        this.isShow = false
      }
      console.log(res)
      // postLogin(
      //   name,
      //   pwd,
      //   url
      // ).then(res => {
      //   console.log(res)
      // }, err => {
      //   console.log(err)
      // })
    }
  }
}
</script>

<style lang = "scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    .login {
      width: 420px;
      height: 400px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      text-align: center;
      h4 {
        color: #fff;
        font-size: 36px;
        height: 50px;
      }
      .loginDiv {
        background: rgba(255, 255, 255, .4);
        box-shadow: rgba(255, 255, 255, 0.9);
        border-radius: 5px;
        margin-top: 20px;
        box-sizing: border-box;
        padding: 30px;
        -webkit-box-reflect: below 10px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(250, 250, 250, 0.1)));
        .btn button {
          width: 100%;
        }
        .forget {
          margin: 5px 0 0 0;
          text-align: left;
          a {
            color: #fff
          }
        }
      }
    }
  }
  #indexLizi {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }
</style>

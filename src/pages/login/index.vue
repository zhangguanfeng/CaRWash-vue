<template>
  <div class="main" :style="loginContainerStyle">
    <!-- <bg-canvas :color="0x097bdb"></bg-canvas> -->
    <div class="centen-box">
      <div class="login">
        <h4><i class="iconfont iconguanlihoutai logoIcon"></i>{{$t('backstageName')}}</h4>
        <div class="loginDiv">
          <el-form :model="ruleForm" :rules="rules" ref="adminForm" :inline="true">
            <el-form-item prop="username">
              <el-input placeholder="请输入账号/用户名" prefix-icon="el-icon-user"
                v-model="ruleForm.username">
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="ruleForm.password"
                show-password>
              </el-input>
            </el-form-item>
            <el-form-item>
              <div class="btn" :loading="isShow" @click="submitAdmin('adminForm')">
                <i class="iconfont iconziyuan loginBut"></i>
              </div>
            </el-form-item>
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
  </div>
</template>

<script>
// 引入粒子背景
import bgCanvas from '@/components/bgCanvas'
import bgImg from '@/assets/img/login.png'
// 登录api
// import {postLogin} from '@/api/api'
// 引入storage
import storage from '@/utils/storage.js'
// 引入vuex
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      // 是否登录中
      isShow: false,
      // 表单数据
      ruleForm: {
        // 用户名
        username: 'admin',
        // 密码
        password: '123456'
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '长度不少于3个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度不少于6个字符', trigger: 'blur' }
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
        console.log(valid)
        if (valid) {
          this.loginHandle(this.ruleForm)
        } else {
          console.log('失败')
          return false
        }
      })
    },
    // 登录
    // 用户名 name, 密码 pwd, 重定向 url
    async loginHandle (ruleForm) {
      this.isShow = true
      if (ruleForm.username === 'admin' && ruleForm.password == 123456) {
        this.$message.success('超级管理登录成功')
        storage.setLocal('token', 123)
        this.saveUserInfo({ auth: true, token: 123 })
        this.$router.push('/')
      } else if (ruleForm.username === 'admin123' && ruleForm.password == 123456) {
        this.$message.success('普通管理登录成功')
        storage.setLocal('token', 123)
        this.saveUserInfo({ auth: false, token: 123 })
        this.$router.push('/')
      } else {
        this.$message.error('帐号或密码错误')
      }
      this.isShow = false

      // const res = await postLogin(
      //   this.ruleForm.username,
      //   this.ruleForm.password,
      //   '/'
      // )
      // switch (res.errcode) {
      //   case 5001:
      //     this.$message.error(this.$t('tGlobal.tError'))
      //     break
      //   case 5002:
      //     this.$message.error('用户不存在，请重新输入')
      //     this.ruleForm.username = ''
      //     this.ruleForm.password = ''
      //     break
      //   case 5003:
      //     this.$message.error('用户名或密码错误')
      //     this.ruleForm.username = ''
      //     this.ruleForm.password = ''
      //     break
      //   case 5004:
      //     this.$message.error('账号被删除或禁用')
      //     this.ruleForm.username = ''
      //     this.ruleForm.password = ''
      //     break
      //   case 5005:
      //     this.$message.error('设置session失败')
      //     this.ruleForm.username = ''
      //     this.ruleForm.password = ''
      //     break
      //   default:
      //     this.$message.success('登录成功')
      //     // storage.setLocal('token', res.token)
      //     // storage.setLocal('role', res.auth)
      //     this.saveUserInfo(res)
      //     this.$router.push('/')
      // }
      // if (res.errcode) {
      //   this.isShow = false
      // }
      // console.log(res)
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
  .centen-box {
    width: 100%;
    height: 220px;
    position: absolute;
    top: calc(50% - 110px);
    /* left: 0;
    right: 0; */
    /* bottom: 0; */
    background: rgba(0, 0, 0, 0.4);
  }
  .login {
    /* width: 420px;
    height: 400px; */
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    h4 {
      color: #fff;
      margin-left: -50px;
      font-size: 36px;
      height: 50px;
    }
    .loginDiv {
      border-radius: 5px;
      box-sizing: border-box;
      padding: 30px;
      .forget {
        margin: 5px 0 0 0;
        text-align: left;
        a {
          color: #fff;
        }
      }
    }
    .loginBut {
      font-size: 35px;
      color: #fff;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
    .logoIcon {
      font-size: 40px;
      color: #fff;
      margin-right: 20px;
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

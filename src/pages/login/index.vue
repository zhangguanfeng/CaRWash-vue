<template>
  <div class="main" :style="loginContainerStyle">
    <!-- <bg-canvas :color="0x097bdb"></bg-canvas> -->
    <div class="centen-box">
      <div class="login">
        <h4><i class="iconfont iconguanlihoutai logoIcon"></i>{{$t('backstageName')}}</h4>
        <div class="loginDiv">
          <el-form :model="ruleForm" :rules="rules" ref="adminForm" :inline="true">
            <el-form-item prop="account">
              <el-input placeholder="请输入账号/用户名" prefix-icon="el-icon-user"
                v-model="ruleForm.account">
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
import {login} from '@/api/api'
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
        account: 'admin',
        // 密码
        password: 'admin123456'
      },
      // 表单验证规则
      rules: {
        account: [
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
    async submitAdmin (formName) {
      await this.$refs[formName].validate()
      this.loginHandle(this.ruleForm)
    },
    // 登录
    // 用户名 name, 密码 pwd, 重定向 url
    async loginHandle (ruleForm) {
      this.isShow = true
      try{
				let res = await login(ruleForm)
        this.saveUserInfo(res);
				this.$router.push("/home");
				this.$message.success("登录成功!");
				this.isShow = false;
			}catch(e){
				console.log(e)
				this.isShow = false;
			}
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

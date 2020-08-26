import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入vuex
import store from '@/store/index.js'
// 引入全局reset样式
import '@/assets/css/reset.css'
import '@/assets/css/index.scss'
// 引入全局图标样式
import '@/assets/iconfont/iconfont.css'
// 引入storage
import storage from '@/utils/storage.js'
// 国际化
import i18n from './i18n/i18n'
// 引入c3动画
import animated from 'animate.css'
// 按需引入需要使用的element
import "@/utils/element.js";
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(animated)
Vue.config.productionTip = false
// 跳转页面之后回到最顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

// 判断用户是否登录,验证本地存储是否有token
// 然后在router.js 页面给需要登录的路由页面添加一个meta
router.beforeEach((to, from, next) => {
  const type = to.meta.requiresAuth
  // 判断该路由是否需要登录权限
  if (type) {
    if (storage.getLocal('userinfo') && storage.getLocal('userinfo').token) {
      if(!storage.getLocal('userinfo').auth && to.meta.limit){
        next('/login')
      }else{
        next()
      }
    } else {
      storage.removeLocal('userinfo')
      next('/login')
    }
  } else {
    // 确保一定要有next()被调用
    next()
  }
})
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

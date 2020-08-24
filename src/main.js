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

// 国际化
import i18n from './i18n/i18n'
// 引入c3动画
import animated from 'animate.css'
// 按需引入需要使用的element
import "@/utils/element.js";
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(animated)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

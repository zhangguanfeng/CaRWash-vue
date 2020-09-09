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
// 引入css3动画
import animated from 'animate.css'
// 引入地图文件
import VueAMap from 'vue-amap'
// 按需引入需要使用的element
import "@/utils/element.js";
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
Vue.use(animated)
Vue.config.productionTip = false

router.afterEach(() => {
	window.scrollTo(0, 0)
})
//跳转相同路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
// 挂载地图
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'ee07ef0b2810f58816069933c5a5bf1c',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4',
  uiVersion: '1.0'
})
// 判断用户是否登录,验证本地存储是否有token
// 然后在router.js 页面给需要登录的路由页面添加一个meta
router.beforeEach((to, from, next) => {
	const type = to.meta.requiresAuth
	if (type) {
		if (storage.getLocal('userinfo') && storage.getLocal('userinfo').token) {
			next()
			// if (storage.getLocal('userinfo').auth===1 && to.meta.limit) {
			// 	next('/login')
			// } else {
			// 	next()
			// }
		} else {
			storage.removeLocal('userinfo')
			next('/login')
		}
	} else {
		next()
	}
})
export default new Vue({
	router,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'
// import { hasOwnMetadata } from 'core-js/fn/reflect'

const Transform = () => import('@/components/transform')
const memberEdit = () => import('@/pages/memberManagement/edit')
const memberDetail = () => import('@/pages/memberManagement/detail')
const login = () => import('@/pages/login')
const reg = () => import('@/pages/reg')
const index = () => import('@/pages/index')
const home = () => import('@/pages/home')
const memberManagement = () => import('@/pages/memberManagement')
const staffManagement = () => import('@/pages/staffManagement')
const serviceList = () => import('@/pages/serviceManagement/serviceList')
const serviceApplication = () => import('@/pages/serviceManagement/serviceApplication')
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'index',
		// 是否需要验证登录
		meta: {
			requiresAuth: true,
			title: 'tIndex',
			noCache: true,
		},
		component: index,
		redirect: '/home',
		children: [
			// 首页
			{
				path: 'home',
				name: 'home',
				component: home,
				meta: {
					requiresAuth: true,
					noCache: true,
				},
			},
			// 会员管理
			{
				path: 'memberManagement',
				name: 'Transform',
				component: Transform,
				redirect: 'memberManagement',
				meta: {
					requiresAuth: true,
					noCache: true,
					title: 'tMemberManagement'
				},
				children: [
					// 会员管理
					{
						path: '',
						name: 'memberManagement',
						component: memberManagement,
						meta: {
							requiresAuth: true,
							noCache: true
						},
					},
					// 会员编辑
					{
						path: 'edit',
						name: 'edit',
						component: memberEdit,
						meta: {
							requiresAuth: true,
							noCache: false,
							title: 'tMemberEdit'
						},
					},
					// 会员详情
					{
						path: 'detail',
						name: 'detail',
						component: memberDetail,
						meta: {
							requiresAuth: true,
							noCache: false,
							title: 'tMemberDetail'
						},
					}
				]
			},
			// 职员管理
			{
				path: 'staffManagement',
				name: 'staffManagement',
				component: staffManagement,
				meta: {
					requiresAuth: true,
					noCache: true,
					title: 'tStaffManagement'
				}
			},
			// 服务父板块
			{
				path: 'serviceManagement',
				name: 'serviceManagement',
				component: Transform,
				redirect: '/serviceManagement/serviceList',
				meta: {
					requiresAuth: true,
					noCache: true,
					title: 'tServiceManagement'
				},
				children: [
					// 子版块 服务列表
					{
						path: 'serviceList',
						name: 'serviceList',
						component: serviceList,
						meta: {
							requiresAuth: true,
							noCache: true,
							title: 'tServiceList'
						}
					},
					// 子板块 服务申请列表
					{
						path: 'serviceApplication',
						name: 'serviceApplication',
						component: serviceApplication,
						meta: {
							requiresAuth: true,
							noCache: true,
							title: 'tServiceApplication'
						}
					}
				]
			},
		]
	},
	// 登录
	{
		path: '/login',
		name: 'login',
		component: login,
		meta: {
			title: '登录',
			requiresAuth: false
		}
	},
	{
		path: '/reg',
		name: 'reg',
		component: reg
	},
	// {
	//   path: '/about',
	//   name: 'About',
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	// }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router

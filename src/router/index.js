import Vue from 'vue'
import VueRouter from 'vue-router'
// import { hasOwnMetadata } from 'core-js/fn/reflect'
// 登录页
const login = () => import('@/pages/login/login')
// 注册页
const reg = () => import('@/pages/reg/reg')
// 后台首页
const index = () => import('@/pages/index/index')
// 主页第一板块
const home = () => import('@/pages/home/home')
// 会员管理
const memberManagement = () => import('@/pages/memberManagement/memberManagement')
// 职员管理
const staffManagement = () => import('@/pages/staffManagement/staffManagement')
// 服务父板块
const serviceManagement = () => import('@/pages/serviceManagement/index')
// 服务列表
const serviceList = () => import('@/pages/serviceManagement/children/serviceList')
// 服务申请列表
const serviceApplication = () => import('@/pages/serviceManagement/children/serviceApplication')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    // 是否需要验证登录
    meta: {
      requiresAuth: true,
      title: 'tIndex',
      // noCache: true,
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
        }
      },
      // 会员管理
      {
        path: 'memberManagement',
        name: 'memberManagement',
        component: memberManagement,
        meta: {
          requiresAuth: true,
          noCache: true,
          title: 'tMemberManagement'
        }
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
        component: serviceManagement,
        redirect: '/serviceManagement/serviceList',
        meta: {
          requiresAuth: true,
          // noCache: true,
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
              title: 'tServiceList',
              noCache: true,
            }
          },
          // 子板块 服务申请列表
          {
            path: 'serviceApplication',
            name: 'serviceApplication',
            component: serviceApplication,
            meta: {
              requiresAuth: true,
              title: 'tServiceApplication',
              noCache: true,
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

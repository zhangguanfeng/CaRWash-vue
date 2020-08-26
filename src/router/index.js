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
const serviceListEdit = () => import('@/pages/serviceManagement/serviceList/edit')
const serviceListDetail = () => import('@/pages/serviceManagement/serviceList/detail')
const serviceApplication = () => import('@/pages/serviceManagement/serviceApplication')
const serviceOrderDetail = () => import('@/pages/serviceManagement/serviceApplication/detail')
const serviceOrderEdit = () => import('@/pages/serviceManagement/serviceApplication/edit')
const managerList = () => import('@/pages/managerList')
const shopManagement = () => import('@/pages/shopManagement')
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
          title: 'tIndex',

          noCache: true,
        },
      },
      // 管理员列表
      {
        path: 'managerList',
        name: 'managerList',
        component: managerList,
        meta: {
          limit: true,
          requiresAuth: true,
          noCache: true,
          title: 'tManagerList'
        }
      },
      // 代理店管理
      {
        path: 'shopManagement',
        name: 'shopManagement',
        component: shopManagement,
        meta: {
          limit: true,
          requiresAuth: true,
          noCache: true,
          title: 'tShopManagement'
        }
      },
      // 会员管理
      {
        path: 'memberManagement',
        component: Transform,
        redirect: 'memberManagement',
        meta: {
          requiresAuth: true,
          hide: true,
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
            name: 'memberEdit',
            component: memberEdit,
            meta: {
              requiresAuth: true,
              noCache: false,
              title: 'tEdit'
            },
          },
          // 会员详情
          {
            path: 'detail',
            name: 'memberDetail',
            component: memberDetail,
            meta: {
              requiresAuth: true,
              noCache: false,
              title: 'tDetail'
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
            component: Transform,
            redirect: 'serviceList',
            meta: {
              requiresAuth: true,
              noCache: true,
              title: 'tServiceList'
            },
            children: [
              // 服务列表
              {
                path: '',
                name: 'serviceList',
                component: serviceList,
                meta: {
                  requiresAuth: true,
                  noCache: true
                },
              },
              {
                path: 'edit',
                name: 'serviceListEdit',
                component: serviceListEdit,
                meta: {
                  requiresAuth: true,
                  noCache: false,
                  title: 'tEdit'
                }
              },
              {
                path: 'detail',
                name: 'serviceListDetail',
                component: serviceListDetail,
                meta: {
                  requiresAuth: true,
                  noCache: false,
                  title: 'tDetail'
                }
              }
            ]
          },
          // 子板块 服务订单列表
          {
            path: 'serviceApplication',
            component: Transform,
            redirect: 'serviceApplication',
            meta: {
              requiresAuth: true,
              noCache: true,
              title: 'tServiceApplication'
            },
            children: [
              // 服务订单列表
              {
                path: '',
                name: 'serviceApplication',
                component: serviceApplication,
                meta: {
                  requiresAuth: true,
                  noCache: true
                },
              },
              {
                path: 'edit',
                name: 'serviceOrderEdit',
                component: serviceOrderEdit,
                meta: {
                  requiresAuth: true,
                  noCache: false,
                  title: 'tEdit'
                }
              },
              {
                path: 'detail',
                name: 'serviceOrderDetail',
                component: serviceOrderDetail,
                meta: {
                  requiresAuth: true,
                  noCache: false,
                  title: 'tDetail'
                }
              }
            ]
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

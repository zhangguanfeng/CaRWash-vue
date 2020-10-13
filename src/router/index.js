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
const serviceArea = () => import('@/pages/serviceManagement/serviceArea')
const managerList = () => import('@/pages/managerList')
const shopManagement = () => import('@/pages/shopManagement')
const shopDetail = () => import('@/pages/shopManagement/detail')
const shopEdit = () => import('@/pages/shopManagement/edit')
const scheduleManagement = () => import('@/pages/scheduleManagement')
const scheduleEdit = () => import('@/pages/scheduleManagement/edit')
const scheduleDetail = () => import('@/pages/scheduleManagement/detail')
const resultManagement = () => import('@/pages/resultManagement')
const settlementList = () => import('@/pages/settlementManagement/settlementList')
const carList = () => import('@/pages/contentManagement/carList')
const commentList = () => import('@/pages/contentManagement/commentList')
const message = () => import('@/pages/serviceCenter/message')
const commonQuestion = () => import('@/pages/serviceCenter/commonQuestion')
const difficultQuestion = () => import('@/pages/serviceCenter/difficultQuestion')
const use = () => import('@/pages/setting/use')
const information = () => import('@/pages/setting/information')
const position = () => import('@/pages/setting/position')
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'index',
    // 是否需要验证登录
    meta: {
      requiresAuth: true,
      // title: 'tIndex',
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
          icon: 'iconfont iconicon95',
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
          icon: 'iconfont iconhuiyuan1',
          title: 'tManagerList'
        }
      },
      // 代理店管理
      {
        path: 'shopManagement',
        component: Transform,
        redirect: 'shopManagement',
        meta: {
          limit: true,
          requiresAuth: true,
          noCache: true,
          icon: 'iconfont iconhuiyuan1',
          title: 'tShopManagement'
        },
        children: [
          // 代理店管理
          {
            path: '',
            name: 'shopManagement',
            component: shopManagement,
            meta: {
              requiresAuth: true,
              noCache: true
            },
          },
          // 代理店编辑
          {
            path: 'edit',
            name: 'shopEdit',
            component: shopEdit,
            meta: {
              requiresAuth: true,
              noCache: false,
              title: 'tEdit'
            },
          },
          // 代理店详情
          {
            path: 'detail',
            name: 'shopDetail',
            component: shopDetail,
            meta: {
              requiresAuth: true,
              noCache: false,
              title: 'tDetail'
            },
          }
        ]
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
          icon: 'iconfont iconhuiyuan',
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
          icon: 'iconfont iconhuiyuan',
          title: 'tStaffManagement'
        }
      },
      // 服务父板块 这一块不能使用缓存路由页面,会出现BUG
      {
        path: 'serviceManagement',
        component: Transform,
        redirect: '/serviceManagement/serviceList',
        meta: {
          requiresAuth: true,
          noCache: true,
          icon: 'iconfont iconfuwu1',
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
              noCache: false,
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
                  noCache: false
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
                  noCache: false
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
          },
          {
            path: 'serviceArea',
            component: serviceArea,
            meta: {
              requiresAuth: true,
              noCache: true,
              title: 'tServiceArea'
            },
          }
        ]
      },
      // 日程管理
      {
        path: 'scheduleManagement',
        component: Transform,
        redirect: 'scheduleManagement',
        meta: {
          requiresAuth: true,
          noCache: true,
          title: 'tScheduleManagement'
        },
        children: [
          {
            path: '',
            name: 'scheduleManagement',
            component: scheduleManagement,
            meta: {
              requiresAuth: true,
              noCache: true,
            }
          },
          {
            path: 'edit',
            name: 'scheduleEdit',
            component: scheduleEdit,
            meta: {
              requiresAuth: true,
              noCache: false,
              title: 'tEdit'
            }
          },
          {
            path: 'detail',
            name: 'scheduleDetail',
            component: scheduleDetail,
            meta: {
              requiresAuth: true,
              noCache: false,
              title: 'tDetail'
            }
          }
        ]
      },
      // 结果管理
      // {
      //   path: 'resultManagement',
      //   component: Transform,
      //   redirect: 'resultManagement',
      //   meta: {
      //     requiresAuth: true,
      //     noCache: true,
      //     title: 'tResultManagement'
      //   },
      //   children: [
      //     {
      //       path: '',
      //       name: 'resultManagementt',
      //       component: resultManagement,
      //       meta: {
      //         requiresAuth: true,
      //         noCache: true,
      //       }
      //     },
      //   ]
      // },
      // 结算管理
      {
        path: 'settlementManagement',
        component: Transform,
        redirect: '/settlementManagement/settlementList',
        meta: {
          requiresAuth: true,
          noCache: false,
          title: 'tSettlementManagement'
        },
        children: [
          {
            path: 'settlementList',
            component: Transform,
            redirect: 'settlementList',
            meta: {
              requiresAuth: true,
              noCache: false,
              title: 'tSettlementList'
            },
            children: [
              {
                path: '',
                name: 'settlementList',
                component: settlementList,
                meta: {
                  requiresAuth: true,
                  noCache: false
                }
              }
            ]
          }
        ]
      },
      // 内容管理
      {
        path: 'contentManagement',
        component: Transform,
        redirect: '/contentManagement/commentList',
        meta: {
          requiresAuth: true,
          noCache: false,
          title: 'tContentManagement'
        },
        children: [
          // 评论列表
          {
            path: 'commentList',
            component: Transform,
            redirect: 'commentList',
            meta: {
              requiresAuth: true,
              noCache: false,
              title: 'tCommentList'
            },
            children: [
              {
                path: '',
                name: 'commentList',
                component: commentList,
                meta: {
                  requiresAuth: true,
                  noCache: false
                }
              },
            ]
          },
          // 车型列表
          {
            path: 'carList',
            name: 'carList',
            component: carList,
            meta: {
              requiresAuth: true,
              noCache: false,
              title: 'tCarList'
            },
          },
        ]
      },
      // 服务条款管理
      {
        path: 'setting',
        component: Transform,
        redirect: '/setting/user',
        meta: {
          requiresAuth: true,
          noCache: false,
          title: 'tSetting'
        },
        children: [
          // 服务使用条款
          {
            path: 'use',
            component: Transform,
            redirect: 'use',
            meta: {
              requiresAuth: true,
              noCache: false,
              title: 'tUse'
            },
            children: [
              {
                path: '',
                name: 'use',
                component: use,
                meta: {
                  requiresAuth: true,
                  noCache: false
                }
              }
            ]
          },
          // 个人信息管理条款
          // {
          //   path: 'information',
          //   component: Transform,
          //   redirect: 'information',
          //   meta: {
          //     requiresAuth: true,
          //     noCache: false,
          //     title: 'tInformation'
          //   },
          //   children: [
          //     {
          //       path: '',
          //       name: 'information',
          //       component: information,
          //       meta: {
          //         requiresAuth: true,
          //         noCache: false
          //       }
          //     }
          //   ]
          // },
          // 位置信息使用条款
          // {
          //   path: 'position',
          //   component: Transform,
          //   redirect: 'position',
          //   meta: {
          //     requiresAuth: true,
          //     noCache: false,
          //     title: 'tPosition'
          //   },
          //   children: [
          //     {
          //       path: '',
          //       name: 'position',
          //       component: position,
          //       meta: {
          //         requiresAuth: true,
          //         noCache: false
          //       }
          //     }
          //   ]
          // }
        ]
      },
      // 客服中心
      {
        path: 'serviceCenter',
        component: Transform,
        redirect: '/serviceCenter/message',
        meta: {
          requiresAuth: true,
          noCache: false,
          title: 'tServiceCenter'
        },
        children: [
          // 消息通知
          {
            path: 'message',
            component: Transform,
            redirect: 'message',
            meta: {
              requiresAuth: true,
              noCache: false,
              title: 'tMessage'
            },
            children: [
              {
                path: '',
                name: 'message',
                component: message,
                meta: {
                  requiresAuth: true,
                  noCache: false
                }
              }
            ]
          },
          // 常见疑问
          {
            path: 'commonQuestion',
            component: Transform,
            redirect: 'commonQuestion',
            meta: {
              requiresAuth: true,
              noCache: false,
              title: 'tCommonQuestion'
            },
            children: [
              {
                path: '',
                name: 'commonQuestion',
                component: commonQuestion,
                meta: {
                  requiresAuth: true,
                  noCache: false
                }
              }
            ]
          },
          // 疑难解答
          {
            path: 'difficultQuestion',
            component: Transform,
            redirect: 'difficultQuestion',
            meta: {
              requiresAuth: true,
              noCache: false,
              title: 'tDifficultQuestion'
            },
            children: [
              {
                path: '',
                name: 'difficultQuestion',
                component: difficultQuestion,
                meta: {
                  requiresAuth: true,
                  noCache: false
                }
              }
            ]
          }
        ]
      }
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

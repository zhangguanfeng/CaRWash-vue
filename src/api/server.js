// 此文件用于对axios拦截器的一些处理
// 引入axios
import axios from 'axios'
import Vue from 'vue'
import store from '../store'
import router from '../router'
import { Message, Loading } from 'element-ui';
import baseURL from './baseUrl';
let loading        //定义loading变量
function startLoading () {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: 'Loading...',
    background: 'rgba(0, 0, 0, 0.1)',
    // target: document.querySelector('.content')
  })
}
function endLoading () {    //使用Element loading-close 方法
  loading.close()
}
//声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;
function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
};
function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};
// 创建axios实例
const server = axios.create({
  baseURL: baseURL.DOMIN,
  // 响应时长
  timeout: 50000,
  // 自定义请求头
  headers: {
    // 代表客户端希望接受的数据类型
    'Accept': 'application/json',
    // 代表客户端发送的数据类型
    'Content-Type': 'application/json'
  }
})
// 定义axios请求拦截器
// 请求数据之前进行的操作, 例如遮罩显示, 例如发送token
server.interceptors.request.use(config => {
  // const userInfo = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
  // if (userInfo) {
  //   config.headers['X-Access-Token'] = userInfo.token
  //   config.headers['user'] = userInfo.user_info.user
  // }
  return config
}, err => {
  Message.error({ message: 'Request timeout, please try again' });
  return Promise.reject(err)
})
// 定义axios响应拦截器
server.interceptors.response.use(res => {
  if (res.data.error_code != 0) {
    Message.error({ message: res.data.message });
  }
  return res.data
}, err => {

  // if (err.response && err.response.status == 403) {
  //   Message.error({ message: 'Login expired, please login again' });
  //   router.push('/login')
  // } else if (err.response && err.response.status == 404) {
  //   router.push('/404')
  // } else if (err.response && err.response.status == 500) {
  //   router.push('/500')
  // }
  // else {
  //   Message.error({ message: 'An unknown error' });
  // }
  return Promise.reject(err)
})

// 导出server, 方便其他页面使用
// 采用es6导出, 其他页面使用采用如下方式
// import server from 'xx'
export default server

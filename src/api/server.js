import Vue from '@/main'
import axios from 'axios'

import { Message } from 'element-ui';
import baseURL from './baseUrl';
import storage from '@/utils/storage'
import Load from "./loading"

const server = axios.create({
  baseURL: baseURL.DOMIN,
  timeout: 50000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

server.interceptors.request.use(config => {
	const token = storage.getLocal('token')
	if (token) {
		config.headers.Authorization = 'token=' + token
	}
	Load.showLoading()
	return config
}, err => {
  Message.error({ message: 'Request timeout, please try again' });
  Load.hideLoading()
  return Promise.reject(err)
})

server.interceptors.response.use(res => {
	Load.hideLoading()
	console.log(res.data.data)
	if(res.data.errcode === 4000 ||res.data.errcode === 4001 ||res.data.errcode === 4002 ||res.data.errcode === 4003 ){
		Message.error({ message: res.data.errmsg });
		Vue.$router.push('/login')
		storage.removeLocal('userinfo')
	}
	return res.data.data
}, err => {
  console.log(err)
  Load.hideLoading()
  if (err.response && err.response.status === 401) {
    Vue.$router.push('/login')
    storage.removeLocal('userinfo')
    Vue.$message.error("登录状态过期，请重新登录")
    return Promise.reject(err)
  }
  Vue.$message.error('数据响应发生错误,请重试')
  return Promise.reject(err)
})


export default server

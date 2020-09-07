
import axios from 'axios'

import { Message } from 'element-ui';
import baseURL from './baseUrl';

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
	return config
}, err => {
	Message.error({ message: 'Request timeout, please try again' });
	return Promise.reject(err)
})

server.interceptors.response.use(res => {
	console.log(res)
	if (res.data.error_code != 0) {
		Message.error({ message: res.data.message });
	}
	return res.data
}, err => {
	return Promise.reject(err)
})


export default server

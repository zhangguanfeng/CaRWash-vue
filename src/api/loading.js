/*
 * @Author: your name
 * @Date: 2020-07-23 14:55:19
 * @LastEditTime: 2020-07-23 15:33:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mipinshopmall\src\api\loading.js
 */
import { Loading } from 'element-ui'

const startLoading = Symbol('startLoading')
const endLoading = Symbol('endLoading')
const loadingCount = Symbol('loadingCount')
const loading = Symbol('loading')
function Load(){
	this[loadingCount] = 0
	this[loading] = 0
}
Load.prototype[startLoading] = function(){
	this[loading] = Loading.service({
		lock: true,
		text: '拼命加载中……',
		background: 'rgba(0, 0, 0, 0.7)'
	});
}

Load.prototype[endLoading] = function(){
	this[loading].close();
}

Load.prototype.showLoading = function(){
	if (this[loadingCount] === 0) {
		this[startLoading]();
	}
	this[loadingCount] += 1;
}

Load.prototype.hideLoading = function(){
	if (this[loadingCount] <= 0) {
		return;
	}
	this[loadingCount] -= 1;
	if (this[loadingCount] === 0) {
		this[endLoading]();
	}
}

let that = null//单例
Load.create = function(){
	if(that === null){
		that = new Load()
	}
	return that
}

export default Load.create()

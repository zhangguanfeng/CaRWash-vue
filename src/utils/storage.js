// 封装localStorage和sessionStorage
// 其他页面使用方式如下：
// import storage from '@/utils/storage.js'
export default {
  // sessionStorage 用于保存数据，有效期一次会话结束
  // 获取
  getSession: function (name) {
    if (!name) {
      return
    }
    return JSON.parse(window.sessionStorage.getItem(name))
  },
  // 设置
  setSession: function (name, context) {
    if (!name) {
      return
    }
    if (context !== 'String') {
      context = JSON.stringify(context)
    }
    window.sessionStorage.setItem(name, context)
  },
  // 删除
  removeSession: function (name) {
    if (!name) {
      return
    }
    return window.sessionStorage.removeItem(name)
  },
  // localStorage 用户保存数据，有效期永久，除非手动删除
  // 获取
  getLocal: function (name) {
    if (!name) {
      return
    }
    return JSON.parse(window.localStorage.getItem(name))
  },
  // 设置
  setLocal: function (name, context) {
    if (!name) {
      return
    }
    if (context !== 'String') {
      context = JSON.stringify(context)
    }
    window.localStorage.setItem(name, context)
  },
  // 删除
  removeLocal: function (name) {
    if (!name) {
      return
    }
    return window.localStorage.removeItem(name)
  }
}

// 此处定义同步方法。通过commit分发。可以在actions中调用此处方法。
// vuex的状态之只能通过mutations修改
import storage from '@/utils/storage.js'
const mutations = {
  // 保存用户数据
  saveUserInfo (state, data) {
    storage.setLocal('userinfo', data)
    state.adminUser = data
  },
  // 保存用户语言
  saveLanguage (state, data) {
    storage.setLocal('localeLaguage', data)
    state.selectLanguage = data.name
    state.elementLanguage = data.txt
  }
}

// 导出
export default mutations

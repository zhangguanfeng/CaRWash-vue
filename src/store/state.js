import storage from '@/utils/storage.js'
// 此处定义vuex变量
const state = {
  // 用户信息
  adminUser: storage.getLocal('userinfo') || null,
  // 选择语言
  selectLanguage: storage.getLocal('localeLaguage') ? storage.getLocal('localeLaguage').name : '中文',
  // elementUi 语言环境
  elementLanguage: storage.getLocal('localeLaguage') ? storage.getLocal('localeLaguage').txt : 'zh'
}

// 导出
export default state

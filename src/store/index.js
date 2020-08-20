import Vue from 'vue'
import Vuex from 'vuex'

// 导入state, getters, mutations, actions
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

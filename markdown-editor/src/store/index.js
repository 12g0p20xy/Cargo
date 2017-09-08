import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    rawHTML: '## 在此处输入 markdown 源码',     // 保存 markdown 源码
    renderHTML: ''                              // 保存转换的结果
  },

  actions,

  getters: {
    getRawHTML: state => {
      return state.rawHTML
    },
    getRenderHTML: state => {
      return state.renderHTML
    },
  },

  mutations: {
    SHOW_RESULT(state, _inputHTML) {
      state.rawHTML = _inputHTML.before
      state.renderHTML = _inputHTML.after
    }
  }

})
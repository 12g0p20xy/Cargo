import Vue from 'vue'
import marked from 'marked'

// 配置 marked
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

// actions
export const GET_RESULT = ({ commit }, e) => {
  let _inputHTML = {
    before: e.target.value,         // 输入框中的源码
    after: marked(e.target.value)   // marked 转换后的 html
  }
  // 提交给 mutations
  commit('SHOW_RESULT', _inputHTML)
}
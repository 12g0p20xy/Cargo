import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 标识 Todo
    todoKey: 0,
    // 保存所有的 Todo
    todoLists: []
  },
  mutations: {
    addTodo(state, newTodo) {
      state.todoLists.push({
        title: newTodo.title,
        msg: newTodo.msg,
        key: state.todoKey
      })
      state.todoKey ++
    },

    updateTodo(state, arr) {
      state.todoLists.forEach(function(el) {
        if (el.key === arr[0]) {
          el.title = arr[1]
          el.msg = arr[2]
        }
      })
    },

    removeTodo(state, key) {
      state.todoLists = state.todoLists.filter(function(el) {
        return el.key !== key
      })
    },

    clearTodo(state) {
      state.todoLists = []
    }
  }
})
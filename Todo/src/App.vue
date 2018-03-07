<template>
  <div id="app">
    <div class="add-bar">
      <label for="">标题</label>
      <input v-model="newTodo.title">
      <label for="">内容</label>
      <input v-model="newTodo.msg">
      <button @click="addTodo" class="btn btn-sm btn-success">新建 Todo</button>
      <button @click="clearAll" class="btn btn-sm btn-danger">清扫一切</button>
    </div>
    <div class="wrap">
      <todo
        v-for="list in todoLists"
        :title="list.title"
        :msg="list.msg"
        :key="list.title"
        :todoKey="list.key"
      ></todo>
    </div>
    <div class="test">
      <h4>store 数据状态：</h4>
      <p>{{ todoLists }}</p>
    </div>
  </div>
</template>

<script>

import Todo from './components/todo.vue'

export default {
  name: 'app',
  components: { Todo },
  data () {
    return {
      newTodo: { title: 'aaa', msg: 'bbb' }
    }
  },
  computed: {
    // 从 store 获取 Todo 列表
    todoLists() {
      return this.$store.state.todoLists
    },
    // 标识 Todo
    todoKey() {
      return this.$store.state.todoKey
    }
  },
  methods: {
    // 给 store 里添加新 Todo
    addTodo() {
      this.$store.commit('addTodo', this.newTodo)
    },
    clearAll() {
      this.$store.commit('clearTodo')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html ,body {
  height: 100%;
}
body {
  background: rgb(237,120,215);
  background: -moz-linear-gradient(45deg,  rgb(237,120,215) 0%, rgb(239,220,112) 100%);
  background: -webkit-linear-gradient(45deg,  rgb(237,120,215) 0%,rgb(239,220,112) 100%);
  background: linear-gradient(45deg,  rgb(237,120,215) 0%,rgb(239,220,112) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ed78d7', endColorstr='#efdc70',GradientType=1 );
}
.add-bar {
  padding: 10px;
  background: rgba(255,255,255,.8);
}
.wrap {
  margin: 0 auto;
  padding: 25px;
  max-width: 1000px;
}
.test {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 210px;
  overflow-y: scroll;
  padding: 20px;
  text-align: left;
  color: #FFDD3B;
  background: #2F3C40;
}
.test p {
  width: 277px;
}
</style>

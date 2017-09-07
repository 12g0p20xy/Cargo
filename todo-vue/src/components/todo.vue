<template>
  <div class="todo">
    <div v-if="isEdit">
      <input v-model="temp.title">
      <input v-model="temp.msg">
      <button @click="editHandler('confirm')" class="btn btn-sm btn-success">确定</button>
      <button @click="editHandler('cancel')" class="btn btn-sm btn-default">取消</button>
    </div>
    
    <div v-else>
      <h3>{{ todoTitle }}</h3>
      <p>{{ todoMsg }}</p>
      <button @click="editTodo" class="btn btn-sm btn-success">编辑</button>
      <button @click="removeTodo" class="btn btn-sm btn-danger">删除</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo',
  props: [ 'title', 'msg', 'todoKey' ],
  data() {
    return {
      isEdit: false,
      temp: { title: '', msg: ''},
      todoTitle: this.title,
      todoMsg: this.msg
    }
  },
  methods: {
    editTodo() {
      this.temp.title = this.todoTitle
      this.temp.msg = this.todoMsg
      this.isEdit = true
    },
    editHandler(type) {
      if (type ==='confirm') {
        this.todoTitle = this.temp.title
        this.todoMsg = this.temp.msg
        this.isEdit = false
        this.temp.title = this.temp.msg = ''
        // 更新 store
        this.$store.commit('updateTodo', [this.todoKey, this.todoTitle, this.todoMsg])
      }
      if (type === 'cancel') {
        this.isEdit = false
        this.temp.title = this.temp.msg = ''
      }
    },
    removeTodo() {
      // 通过比对 todoKey 从 store 查询并删除此 Todo
      this.$store.commit('removeTodo', this.todoKey)
    }
  }
}
</script>

<style lang="less" scoped>
.todo {
  display: inline-block;
  margin: 15px;
  width: 200px;
  padding: 15px;
  padding: 15px;
  background: rgba(255,255,255,.8);
  border-radius: 6px;
}
input {
  display: block;
}
</style>
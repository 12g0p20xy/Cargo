<template>
  <div id="editor">
    <textarea
      :value="rawHTML"
      @input="renderAction"
      class="form-control">
    </textarea>
    <!-- <p>测试用</p>
    <small>rawHTML: {{ rawHTML }}</small>
    <br>
    <small>renderHTML: {{ renderHTML }}</small> -->
  </div>
</template>

<script>
  export default {
    // 从 getters 获取 getRawHTML
    computed: {
      rawHTML() {
        return this.$store.getters.getRawHTML
      }
    },
    // 通过 input 事件触发 actions
    methods: {
      renderAction(e) {
        this.$store.dispatch('GET_RESULT', e)
      }
    }
  }
</script>

<style>
#editor {
  float: left;
  width: 48%;
  height: 100%;
}
textarea.form-control {
  height: 100%;
  border-radius: 0;
  resize: none;
}
</style>
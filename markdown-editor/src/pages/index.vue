<template>
  <div class="wrap">
    <h1>Markdown 编辑器</h1>
    <editor></editor>
    <render></render>
  </div>
</template>

<script>
import Editor from '../components/editor.vue'
import Render from '../components/render.vue'

export default {
  components: { Editor, Render }
}
</script>

<style>
.wrap {
  padding: 15px;
  width: 80%;
  min-width: 1000px;
  height: 80%;
  min-height: 450px;
}
h1 {
  margin-bottom: .5em;
}
</style>

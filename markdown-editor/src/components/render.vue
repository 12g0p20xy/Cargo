<template>
  <div id="render">
    <div v-html="renderHTML"></div>
  </div>
</template>

<script>
  export default {
    computed: {
      renderHTML() {
        return this.$store.getters.getRenderHTML
      }
    }
  }
</script>

<style>
#render {
  float: right;
  width: 52%;
  height: 100%;
  padding: 15px;
  background: #eee;
  overflow-y: scroll;
}
pre {
  padding: 10px;
  background: #fff;
}
</style>
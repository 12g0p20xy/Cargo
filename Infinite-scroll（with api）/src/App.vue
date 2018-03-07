<template>
  <div id="app">
    <list :page="page"></list>
    <button class="btn" @click="page ++">Next</button>
  </div>
</template>

<script>
import List from './components/list.vue'

export default {
  components: {
    List
  },
  data () {
    return {
      page: 1
    }
  }
}
</script>

<!-- 全局样式 -->
<style lang="less">
@import './less/style.less';
</style>

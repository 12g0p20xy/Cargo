<template>
  <div id="app">
    <board></board>
  </div>
</template>

<script>
import Board from './components/board.vue'

export default {
  name: 'app',
  components: {
    Board
  },
  data () {
    return {}
  }
}
</script>

<!-- 全局样式 -->
<style lang="less">
@import './less/style.less';
</style>

<template>
  <div id="main-page">
    <router-view></router-view>
    <to-top></to-top>
  </div>
</template>

<script>
import toTop from './components/to-top.vue'

export default {
  name: 'app',
  components: {
    toTop
  },
  data () {
    return {}
  }
}
</script>

<!-- 全局样式 -->
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

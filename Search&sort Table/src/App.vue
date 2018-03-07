<template>
  <div class="container">
    <div class="search">
      <input type="text" v-model.trim="searchQuery" placeholder="搜索关键词...">
    </div>
    <v-table :data="filter"></v-table>
    <loading v-if="isLoad"></loading>
  </div>
</template>

<script>
import vTable from './components/table.vue'
import Loading from './components/loading.vue'

export default {
  components: {
    vTable, Loading
  },
  data () {
    return {
      searchQuery: '',
      items: [],
      isLoad: false
    }
  },
  created() {
    this.isLoad = true
    fetch('https://www.easy-mock.com/mock/5a5f0226ecfe6156cc99b88d/table/power')
      .then(response => response.json())
      .then((json) => {
        this.items = json.data.projects
        this.isLoad = false
      })
  },
  computed: {
    searchKey() {
      return this.searchQuery.toString().toLowerCase()
    },
    filter() {
      return this.items.filter((el) => {
        return el.name.toLowerCase().indexOf(this.searchKey) !== -1 || el.power.toString().indexOf(this.searchKey) !== -1
      })
    }
  }
}
</script>

<!-- 全局样式 -->
<style lang="less">
@import './less/style.less';
</style>

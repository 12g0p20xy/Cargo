<template>
  <div class="result">
    <loading v-if="loadShow"></loading>
    <div class="container"><div class="row">
      <h3>搜索：<i style="color: #06ab1d;">{{ key }}</i></h3>
      <div v-for="book in bookLists.books" class="media">
        <router-link
          :to="{name: 'detail', params: { id: book.id }}"
          @click="loadShow=true">
          <div class="media-left media-middle">
            <img :src="book.images.small" alt="">
          </div>
          <div class="media-body">
            <h3>{{ book.title }}</h3>
            <p>{{ book.subtitle }}</p>
            <p>评分：{{ book.rating.average }}</p>
          </div>
        </router-link>
      </div>
      <button @click="next" class="btn btn-success btn-block">换一组</button>
    </div></div>
  </div>
</template>

<script>
import Loading from './loading.vue'

export default {
  components: {
    Loading
  },
  data() {
    return {
      loadShow: true,
      page: 1
    }
  },
  watch: {
    bookLists() {
      this.loadShow = false
    }
  },
  mounted() {
    this.loadShow = false
  },
  computed: {
    key() {
      return this.$store.state.key
    },
    bookLists() {
      return this.$store.state.result
    }
  },
  methods: {
    next() {
      let para = {
        q: this.key,
        // 每次显示5条
        count: 5,
        // 搜索结果的offset
        start: this.page * 5
      }
      this.$store.dispatch('searchKey', para)
      this.page ++
      this.loadShow = true
    }
  }
}
</script>

<style lang="less" scoped>
a:hover {
  text-decoration: none;
}

.container {
  margin-top: 2%;
  max-width: 400px;
}

.media {
  padding: 5px;
  padding-left: 20px;
  border: 1px solid #eee;
  border-radius: 6px;
  transition: .3s ease-out;

  &:hover {
    box-shadow: 0 8px 18px rgba(0,0,0,.1);
  }
}

button {
  margin-top: 2em;
}
</style>
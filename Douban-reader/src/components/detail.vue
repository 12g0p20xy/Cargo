<template>
  <div class="detail">
    <main class="container">
      <loading v-if="loadShow"></loading>
      <div class="row book-info" v-else>
        <div class="cover col-xs-4">
          <a :href="book.alt"><img :src="book.image" alt="book.title"></a>
        </div>
        <div class="col-xs-8">
          <h3>{{ book.title }}</h3>
          <p>
            <span v-for="author in book.author">作者：{{ author }}</span>
            <span v-for="translator in book.translator">译者：{{ translator }}</span>
            <br>
            出版社：{{ book.publisher }}
            <br>
            定价：{{ book.price }}
          </p>
          <h4>
            评分：
            <b>{{ book.rating.average }}</b>
            <small>共有{{ book.rating.numRaters }}人参与评分</small>
          </h4>
        </div>
        <hr>
      </div>
      <div class="row">
        <div class="col-xs-12">
          
          <p class="tags">相关标签：
            <i
              v-for="tag in book.tags"
              @click="search(tag.name)">
              {{ tag.name }}
            </i>
          </p>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-xs-12">
          <h4>【内容简介】</h4>
          <p
            :class="{ active: show }"
            class="summary">
            {{ book.summary }}
          </p>
          <span
            @click="showAll(1)"
            v-if="!show"
            class="show-all">
            显示全部
          </span>
          <span
            @click="showAll(0)"
            v-else
            class="show-all">
            收起文字
          </span>
        </div>
      </div>
      <hr>
      <div>
        <h4>【热门笔记】</h4>
        <ul class="user media-list">
          <li v-for="note in notes" class="media">
            <div class="media-left">
              <a :href="note.author_user.alt">
                <img :src="note.author_user.avatar" class="media-object">
                {{ note.author_user.name }}
              </a>
            </div>
            <div class="media-body">
              {{ note.abstract }}
            </div>
          </li>
        </ul>
      </div>
    </main>
    
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
      show: false
    }
  },
  computed: {
    book() {
      return this.$store.state.bookLists
    },
    notes() {
      return this.$store.state.bookNotes.annotations
    }
  },
  watch: {
    book() {
      this.loadShow = false
    }
  },
  mounted() {
    // 通过 id 获取书籍内容
    this.$store.dispatch('getLists', this.$route.params.id)
    this.$store.dispatch('getNotes', this.$route.params.id)
  },
  methods: {
    search(tag) {
      let para = {
        tag: tag,
        // 每次显示5条
        count: 5
      }
      this.$store.dispatch('searchTag', para)
      this.$router.push({path: '/result'})
    },
    showAll(type) {
      this.show = type ? true : false
    }
  }
}

</script>

<style lang="less">
@primary-color: #06ab1d;

.container {
  margin-top: 2%;
  max-width: 400px;
}

h4 {
  color: @primary-color;
}

.book-info {
  .cover {
    margin-top: 20px;
  }

  h4 {
    font-size: 14px;
    color: #333;

    b {
      font-weight: normal;
      font-size: 26px;
      color: #ff6900;
    }
  }
}

.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
}

.tags {
  i {
    display: inline-block;
    font-size: 13px;
    margin: .2em;
    padding: .2em .6em;
    border-radius: 100px;
    color: @primary-color;
    border: 1px solid;
    cursor: pointer;

    &:hover {
      background: lighten(@primary-color, 63%);
    }
  }
}

.summary {
  height: 12.8em;
  overflow: hidden;

  &.active {
    height: auto;
  }
}

.show-all {
  color: @primary-color;
  cursor: pointer;
}

.user {
  .media {
    margin-top: 1.5em;
  }

  .media-left {
    padding-right: 1.5em;
    text-align: center;

    img {
      border-radius: 50%;
    }
  }
  
  .media-body {
    font-size: 14px;
    color: #666;
  }
}
</style>
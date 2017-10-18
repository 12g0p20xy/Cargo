<template>
  <div class="index">

    <!-- <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/detail">书</router-link>
    </nav> -->

    <main class="container">
      <img id="logo" src="../assets/logo.png" alt="">
      <div class="searchbar input-group input-group-lg">
        <input
          v-model="searchKey"
          @keyup="hint(searchKey)"
          @blur="hintHide"
          class="form-control"
          placeholder="可搜索关键词或 tag...">
        <div class="hint" v-show="hintShow">
          <div class="media" v-for="book in bookLists.books">
            <router-link :to="{name: 'detail', params: { id: book.id }}">
              <div class="media-left media-middle">
                <img :src="book.images.small" alt="">
              </div>
              <div class="media-body">
                <h4>{{ book.title }}</h4>
                <small>{{ book.subtitle }}</small>
              </div>
            </router-link>
          </div>
        </div>
        <span class="input-group-btn">
          <button @click="search(searchKey)" class="btn btn-success">搜索</button>
        </span>
      </div>
      <hr>
      <div class="quick-link">
        <b>热门搜索：</b>
        <span @click="search('雪国')">雪国</span>
        <span @click="search('川端康成')">川端康成</span>
        <span @click="search('神经漫游者')">神经漫游者</span>
        <span @click="search('时间旅行者的妻子')">时间旅行者的妻子</span>
      </div>
    </main>
    
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchKey: '',
      hintShow: false
    }
  },
  computed: {
    bookLists() {
      return this.$store.state.result
    }
  },
  methods: {
    search(key) {
      let para = {
        q: key,
        // 每次显示5条
        count: 5,
        // 搜索结果的offset
        start: 0
      }
      this.$store.dispatch('searchKey', para)
      this.$router.push('result')
    },
    hint(key) {
      let t
      clearTimeout(t)

      if (key) {
        // 节流
        t = setTimeout(() => {
          let para = {
            q: key,
            // 每次显示5条
            count: 5,
            // 搜索结果的offset
            start: 0
          }
          this.$store.dispatch('searchKey', para)
          this.hintShow = true
        }, 500)
      }
    },
    hintHide() {
      setTimeout(() => {
        this.hintShow = false
      }, 500)
    }
  }
}

</script>

<style lang="less">
@primary-color: #06ab1d;

nav {
  position: fixed;
  background: #333;
  bottom: 0;
  left: 0;
  right: 0;

  a {
    display: inline-block;
    padding: .8em;
    color: #eee;
  }
}

.container {
  margin-top: 2%;
  max-width: 400px;
}

.index {
  margin-top: 10rem;
}

#logo {
  display: block;
  margin: 3em auto;
  width: 60%;
  max-width: 274px;
}

.searchbar {
  position: relative;

  .hint {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    z-index: 99;
    padding: 15px;
    border: 1px solid #ccc;
    background: #fff;
    box-shadow: 0 8px 18px rgba(0,0,0,.1);

    .media {
      img {
        width: 48px;
        height: 60px;
      }

      h4 {
        margin-bottom: 5px;
      }

      a {
        display: block;
        text-decoration: none;
        color: #999;

        &:hover {
          color: @primary-color;
        }
      }

      .media-body {
        padding-bottom: 1em;
        border-bottom: 1px solid #eee;
      }

      &:hover {
        background: #eee;
      }
    }
  }
}

.quick-link {
  b {
    color: @primary-color;
  }

  span {
    color: #666;
    cursor: pointer;

    &:hover {
      color: @primary-color;
    }
  }
}
</style>
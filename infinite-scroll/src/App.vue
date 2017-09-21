<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <transition-group name="shuffle">
          <div v-for="list in lists" key="list.id" class="col-md-3">
            <div class="thumbnail">
              <img :src="list.img" alt="">
              <div class="caption">
                <h3>{{ list.name }}</h3>
                <p>&#36; {{ list.price }}</p>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <!-- 加载提示 -->
    <transition name="fade">
      <img v-if="hintShow" class="loading" src="./assets/load.gif">
      <span class="loading" v-if="isEnd">没有更多了！</span>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [],
      page: 1,          // 记录当前加载的页面
      isLoad: false,    // 用于阻止重复加载
      hintShow: false,  // 显示 loading 提示
      isEnd: false      // 到达底部
    }
  },
  created() {
    // faker.js
    fetch('http://localhost:3000/list_data')
      .then(response => 
        response.json()
      )
      .then(json => {
        console.log('a')
        this.lists = json
      })
      .catch(ex => {
        console.log('读取失败')
      })
  },
  mounted() {
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop

      if (scrollTop + window.innerHeight > document.body.clientHeight -30 && !this.isLoad) {
        // 阻止重复加载
        this.isLoad = true
        fetch('http://localhost:3000/list_data_' + this.page)
          .then(response => {
            return response.json()
          })
          .then(json => {
            if (!json.length) {
              // 显示提示文字
              this.hintShow = false
              this.isEnd = true
              setTimeout(() => {
                this.isEnd = false
              }, 1000)
              return
            }
            this.lists = this.lists.concat(json)
            this.page ++
            // 可以加载
            this.isLoad = false
            // 显示 loading 图标
            this.hintShow = true
            // 关闭 loading 图标
            setTimeout(() => {
              this.hintShow = false
            }, 600)
          })
          .catch(ex => {
            console.log('加载失败！', ex)
          })
      }
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
img {
  border-radius: 50%;
}
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 99;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 6px;
  background: #fff;
  text-align: center;
  line-height: 100px;
}
.loading img {
  width: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.shuffle-enter-active, .shuffle-leave-active {
  transition: transform .3s;
}
.shuffle-enter, .shuffle-leave-active {
  transform: translate3d(0, 300px, 0);
}
</style>

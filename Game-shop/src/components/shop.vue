<template>
  <div class="shop">
    <top-nav :navActive="2"></top-nav>
    <div class="container">
      <template>
        <slider width="100%" height="360px" ref="slider">
          <slider-list
            v-for="(img, index) in imgLists"
            :key="index"
            :style="{
              background: `url(${img}) center`,
              backgroundSize: 'cover'
            }">
          </slider-list>
        </slider>
      </template>
      <!-- 排序 -->
      <div class="row">
        <div class="sort-bar col-md-2 col-md-offset-10">
          <el-select
            v-model="filter"
            @change="sortList(filter)"
            size="small"
            placeholder="按条件排序">
            <el-option
              v-for="option in options"
              :key="option.value"
              :label="option.label"
              :value="option.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="row">
        <transition-group name="shuffle">
          <div
            v-for="(item, index) in shopList"
            :key="item.id"
            class="item col-sm-4 col-md-3">
            <div class="thumbnail">
              <router-link :to="{ name: 'detail', params: { id: item.id }}">
                <img :src="item.img" class="cover">
              </router-link>
              <div class="caption">
                <h4>{{ item.name }}</h4>
                <p>HK${{ item.prize }} <span v-if="item.discount" class="label label-success">{{ item.discount }}</span></p>
                <p>
                  <el-button type="text" @click="addToCart(item)">
                    <i class="zmdi zmdi-shopping-cart-plus"></i> 加入购物车
                  </el-button>
                  <el-button
                    type="text"
                    v-if="!favLists.some(function(el) {
                      return el.id === item.id
                    })"
                    @click="addToFav(item)">
                    <i class="zmdi zmdi-favorite-outline"></i> 加入收藏
                  </el-button>
                  <el-button
                    type="text"
                    v-if="favLists.some(function(el) {
                      return el.id === item.id
                    })"
                    @click="removeFromFav(item)">
                    <i class="zmdi zmdi-favorite"></i> 取消收藏
                  </el-button>
                </p>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
      <transition name="fade">
        <span v-if="hintShow" class="loading">
          <!-- <img src="src/assets/load.gif"> -->
          正在加载{{ page }}
        </span>
        <span class="loading" v-if="isEnd">没有更多了！</span>
      </transition>
    </div>
  </div>
</template>

<script>
import topNav from './top-nav.vue'
import slider from './slider/slider.vue'
import sliderList from './slider/slider-list.vue'

export default {
  components: {
    topNav, slider, sliderList
  },
  data() {
    return {
      isLoad: false,    // 用于阻止重复加载
      hintShow: false,  // 显示 loading 提示
      isEnd: false,     // 到达底部
      filter: '',
      options: [
        { value: 'discount',  label: '按折扣' },
        { value: 'prize', label: '按价格'}
      ],
      imgLists: [
        'http://olrr17ktb.bkt.clouddn.com/17-10-23/63638966.jpg',
        'http://olrr17ktb.bkt.clouddn.com/17-10-23/35870469.jpg',
        'http://olrr17ktb.bkt.clouddn.com/17-10-23/52770.jpg'
      ]
    }
  },
  created() {
    // 首次加载
    if (!this.shopList.length) {
      console.log(this.shopList.length)
      this.$store.dispatch('updateShopList', this.page)
    }
  },
  mounted() {
    // 无限加载
    window.onscroll = () => {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      if (scrollTop + window.innerHeight > document.body.clientHeight - 30 && !this.isLoad) {

        // 到达底部
        if (this.page >= 3) {
          this.hintShow = false
          this.isEnd = true
          setTimeout(() => {
            this.isEnd = false
          }, 1000)
        }

        else {
          // 阻止重复加载
          this.isLoad = true

          this.$store.commit('addPage')
          // 更新 state 保存的商品列表
          this.$store.dispatch('updateShopList', this.page)

          // 可以加载
          this.isLoad = false
          // 显示提示图标
          this.hintShow = true
          setTimeout(() => {
            this.hintShow = false
          }, 600)
        }
      }
    }
  },
  computed: {
    shopList() {
      // 从 store 获取商品列表
      return this.$store.state.shopLists
    },
    // 从 store 获取购物车列表
    cartLists() {
      return this.$store.state.cartBox
    },
    // 从 store 获取收藏夹列表
    favLists() {
      return this.$store.state.favBox
    },
    page() {
      return this.$store.state.page
    }
  },
  methods: {
    // 加入购物车
    addToCart(item) {
      // 如果存在相同物品则只合并数量
      if (this.cartLists.some(el => el.id === item.id)) {
        this.cartLists.forEach(el => {
          if (el.id === item.id) {
            el.value += 1
          }
        })
      }
      // 不存在相同物品则新增一项
      else {
        this.cartLists.unshift(item)
      }
      this.$store.dispatch('updateCartBox', this.cartLists)
      // this.favLists.splice(i, 1)
      // this.$store.commit('updateFavBox', this.favLists)
      this.$notify({
        message: '成功加入购物车',
        type: 'success',
        duration: 1000,
        offset: 30
      })
    },

    // 加入收藏
    addToFav(item) {
      this.favLists.push(item)
      this.$store.dispatch('updateFavBox', this.favLists)
      this.$notify({
        message: '收藏成功！',
        type: 'success',
        duration: 1000,
        offset: 30
      })
    },

    // 取消收藏
    removeFromFav(item) {
      let i = this.favLists.indexOf(item)
      // console.log(i)
      this.favLists.splice(i, 1)
      this.$store.dispatch('updateFavBox', this.favLists)
      this.$notify({
        message: '已取消收藏！',
        type: 'info',
        duration: 1000,
        offset: 30
      })
    },

    // 排序
    sortList(type) {
      this.shopList.sort(function(a, b) {
        return parseInt(a[type]) - parseInt(b[type])
      })
    }

  }
}
</script>

<style lang="less">
body {
  background: #f3f3f3;
  line-height: 1.7;
}
.m-slider, .el-select {
  margin-bottom: 15px;
}
.item {
  margin-bottom: 15px;

  .thumbnail {
    padding: 0;
    border: none;
    border-radius: 0;
    overflow: hidden;
    box-shadow: 0 2px 0 #ddd;
    transition: .2s ease-out;

    > a {
      display: block;
      overflow: hidden;
    }

    h4 {
      height: 2em;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    &:hover {
      box-shadow: 0 6px 6px #d8d8d8;

      img {
        transform: scale(1.1);
      }
    }
  }

  .cover {
    width: 100%;
    transition: .3s ease-out;
  }
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

  img {
    width: 100%;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.shuffle-move {
  transition: transform .3s ease-out;
}
</style>
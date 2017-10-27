<template>
  <div class="detail">
    <top-nav :navActive="3"></top-nav>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div v-if="!selfItem"><i class="el-icon-loading"></i></div>
          <img v-else :src="selfItem.img" :alt="selfItem.name">
        </div>
        <div class="col-md-6">
          <div v-if="!selfItem"><i class="el-icon-loading"></i></div>
          <div v-else>
            <h3>{{ selfItem.name }}</h3>
            <p>HK${{ selfItem.prize }} <span v-if="selfItem.discount" class="label label-success">{{ selfItem.discount }}</span></p>
            <el-input-number
              v-model="selfItem.value"
              :min="1"
              :max="100"
              size="small">
            </el-input-number>
            <el-button @click="addToCart">
              <i class="zmdi zmdi-shopping-cart-plus"></i> 加入购物车
            </el-button>
            <el-button
              v-if="!favLists.some(function(el) {
                return el.id === selfItem.id
              })"
              @click="addToFav(selfItem)">
              <i class="zmdi zmdi-favorite-outline"></i> 加入收藏
            </el-button>
            <el-button
              v-else
              @click="removeFromFav(selfItem)">
              <i class="zmdi zmdi-favorite"></i> 取消收藏
            </el-button>
            <hr>
            <p>海绵宝宝和派大星找到了专门与邪恶势力作斗争的美人鱼战士和企鹅男孩，但不巧的是他们已经退休了。</p>
            <p>为了能让美人鱼战士和企鹅男孩再次复出，海绵宝宝和派大星进行了各种努力。美人鱼战士和企鹅男孩还能再次复出吗?海霸王在吃海绵宝宝做的蟹黄堡时说没有加腌椰菜，还吵着让蟹老板给它退钱。海绵宝宝也因此被弄得对做汉堡失去了信心。这到底是怎么回事呢?</p>
            <p>珊迪制造了一艘火箭，她打算驾驶火箭去月球。海绵宝宝也吵着要和珊迪一起去，珊迪最终同意了海绵宝宝的请求。海绵宝宝的月球之行会怎样呢?蟹老板的女儿珍珍过生日，蟹老板送给女儿了一双雨鞋。但珍珍并不喜欢这双雨鞋，蟹老板把这双雨鞋转送给了海绵宝宝，还说这是唯一的一双正式的汉堡厨师靴。海绵宝宝和这双靴子之间会发生什么样的故事呢?</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topNav from './top-nav.vue'

export default {
  components: {
    topNav
  },
  computed: {
    url() {
      return this.$route.params.id
    },
    // 从 store 获取商品信息
    selfItem() {
      let shopList = this.$store.state.shopLists
      return shopList.filter(el => el.id == this.url)[0]
    },
    // 从 store 获取购物车列表
    cartLists() {
      return this.$store.state.cartBox
    },
    // 从 store 获取收藏夹列表
    favLists() {
      return this.$store.state.favBox
    }
  },
  methods: {
    // 加入购物车
    addToCart() {
      // 如果存在相同物品则只合并数量
      if (this.cartLists.some(el => el.id === this.selfItem.id)) {
        this.cartLists.forEach(el => {
          if (el.id === this.selfItem.id) {
            el.value += this.selfItem.value
          }
        })
      }
      // 不存在相同物品则新增一项
      else {
        this.cartLists.unshift(this.selfItem)
      }
      this.$store.dispatch('updateCartBox', this.cartLists)
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
      this.favLists.forEach((el, index) => {
        if (el.id === item.id) {
          this.favLists.splice(index, 1)
        }
      })
      this.$store.dispatch('updateFavBox', this.favLists)
      this.$notify({
        message: '已取消收藏！',
        type: 'info',
        duration: 1000,
        offset: 30
      })
    },
  }
}
</script>
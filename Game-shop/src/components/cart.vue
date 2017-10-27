<template>
  <div class="cart">
    <top-nav :navActive="4"></top-nav>
    <div class="container">
      <div class="row">
        <!-- tab 按钮 -->
        <template>
          <el-tabs v-model="activeName">
            <el-tab-pane label="购物车" name="cart">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        v-model="isChecked"
                        @change="
                          if(isChecked) {
                            selectHandler('all')
                          }
                          else {
                            selectHandler('cancel')
                          }
                        ">
                       全选
                     </th>
                    <th>商品</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in cartLists">
                    <td><input type="checkbox" v-model="item.checked"></td>
                    <td>
                      <router-link :to="{ name: 'detail', params: { id: item.id }}">
                        <img :src="item.img">
                        {{ item.name }}
                        <span v-if="item.discount" class="label label-success">{{ item.discount }}</span>
                      </router-link>
                    </td>
                    <td>HK${{ item.prize }}</td>
                    <td>
                      <el-input-number
                        v-model="item.value"
                        :min="1"
                        size="small">
                      </el-input-number>
                    </td>
                    <td>
                      <el-button type="text" @click="deleteItem(index)">
                        <i class="zmdi zmdi-delete"></i> 删除
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
                        v-else
                        @click="removeFromFav(item)">
                        <i class="zmdi zmdi-favorite"></i> 取消收藏
                      </el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="price-box">
                <div class="container">
                  <div class="row">
                    <div class="col-md-8">
                      <el-button type="text" @click="selectHandler('all')">全选</el-button>
                      <el-button type="text" @click="selectHandler('reverse')">反选</el-button>
                      <el-button type="text" @click="selectHandler('cancel')">取消全选</el-button>
                      <el-button type="text" @click="selectHandler('delete')">删除选中</el-button>
                    </div>
                    <div class="col-md-4">
                      <h3 class="total-price">总价：HK${{ total }}</h3>
                      <button class="btn btn-primary">结 算</button>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="收藏夹" name="fav">
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
              <!-- 商品列表 -->
              <div class="row">
                <transition-group name="shuffle">
                  <div v-for="(item, index) in favLists" :key="item.id" class="item col-sm-4 col-md-3">
                    <div class="thumbnail">
                      <router-link :to="{ name: 'detail', params: { id: item.id }}">
                        <img :src="item.img" class="cover">
                      </router-link>
                      <div class="caption">
                        <h4>{{ item.name }}</h4>
                        <p>HK${{ item.prize }} <span v-if="item.discount" class="label label-success">{{ item.discount }}</span></p>
                        <p>
                          <el-button type="text" @click="addToCart(item, index)">
                            <i class="zmdi zmdi-shopping-cart-plus"></i> 加入购物车
                          </el-button>
                          <el-button
                            type="text"
                            @click="removeFromFav(item)">
                            <i class="zmdi zmdi-favorite"></i> 取消收藏
                          </el-button>
                        </p>
                      </div>
                    </div>
                  </div>
                </transition-group>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
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
  data() {
    return {
      activeName: 'cart',
      isChecked: '',
      filter: '',
      options: [
        { value: 'discount',  label: '按折扣' },
        { value: 'prize', label: '按价格'}
      ]
    }
  },
  computed: {
    // 从 store 获取购物车列表
    cartLists() {
      return this.$store.state.cartBox
    },
    // 从 store 获取收藏夹列表
    favLists() {
      return this.$store.state.favBox
    },
    // 保存所有选中项目
    checkList() {
      return this.cartLists.filter(function(el) {
        return el.checked
      })
    },
    // 计算总价
    total() {
      function formatPrice(val) {
        // 价格数字格式化为2位小数
        let newVal = (Math.round(val * 100) / 100).toString()
        if (newVal.indexOf('.') === -1) {
          newVal += '.00'
        }
        else if (newVal.slice(newVal.indexOf('.')).length < 3) {
          newVal += '0'
        }
        return newVal
      }
      let sum = this.checkList.reduce(function(sum, el) {
        return sum + el.value * el.prize
      }, 0)
      return formatPrice(sum)
    }
  },
  methods: {
    // 删除项目
    deleteItem(i) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cartLists.splice(i, 1)
        this.$store.dispatch('updateCartBox', this.cartLists)
        this.$notify({
          type: 'success',
          message: '删除成功!',
          duration: 1000
        })
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消删除',
          duration: 1000,
          offset: 30
        });        
      })
    },

    // 加入购物车
    addToCart(item, i) {
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
      this.favLists.splice(i, 1)
      this.$store.dispatch('updateFavBox', this.favLists)
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
      this.favLists.splice(i, 1)
      this.$store.dispatch('updateFavBox', this.favLists)
      this.$notify({
        message: '已取消收藏！',
        type: 'info',
        duration: 1000,
        offset: 30
      })
    },

    // 底部表格操作
    selectHandler(type) {
      // 全选
      if (type === 'all') {
        this.cartLists.forEach(function(el) {
          el.checked = true
        })
      }
      // 反选
      if (type === 'reverse') {
        this.cartLists.forEach(function(el) {
          el.checked = !el.checked
        })
      }
      // 取消全选
      if (type === 'cancel') {
        this.cartLists.forEach(function(el) {
          el.checked = false
        })
      }
      // 删除选中
      if (type === 'delete') {
        this.$confirm('确定删除所有选中项？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let arrTemp = this.cartLists.filter(function(el) {
            return !el.checked
          })
          this.$store.dispatch('updateCartBox', arrTemp)
          this.$notify({
            type: 'success',
            message: '删除成功!',
            duration: 1000,
            offset: 30
          })
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除',
            duration: 1000,
            offset: 30
          })
        })
      }
    },

    // 排序
    sortList(type) {
      this.favLists.sort(function(a, b) {
        return parseInt(a[type]) - parseInt(b[type])
      })
      // console.log(this.$store.state.favBox)
    }
  }
}
</script>

<style lang="less" scoped>
.cart{
  padding-bottom: 75px;
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
img {
  width: 110px;
}
.table-hover > tbody > tr:hover {
  background: #fcfcfc;
}
.price-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid #ddd;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #fff;

  .total-price {
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    margin-right: .5em;
    font-size: 24px;
  }
}
.shuffle-move {
  transition: transform .3s ease-out;
}
</style>
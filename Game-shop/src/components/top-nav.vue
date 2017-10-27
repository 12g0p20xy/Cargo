<template>
  <nav class="navbar navbar-default" :class="{ active: navFixed }">
    <div class="container">
      <!-- 移动端菜单 -->
      <div class="navbar-header">
        <button
          class="navbar-toggle"
          :class="{ collapsed: open }"
          @click="open=!open">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Brand</a>
      </div>
      <!-- 主菜单 -->
      <div
        class="collapse navbar-collapse"
        :class="{ in: open }">
        <ul class="nav navbar-nav">
          <li :class="{ active: navActive===1 }"><router-link to="/">News</router-link></li>
          <li :class="{ active: navActive===2 }"><router-link to="/shop">Shop</router-link></li>
        </ul>

        <ul class="nav navbar-nav navbar-right">
          <!-- 搜索 -->
          <div class="navbar-form navbar-left">
            <div
              class="form-group"
              v-show="barOpen">
              <input
                ref="searchInput"
                @blur="searchbarClose"
                class="form-control"
                placeholder="输入关键词...">
            </div>
            <button
              type="submit"
              class="btn btn-default"
              @click="searchbarOpen">
              <i class="zmdi zmdi-search"></i>
            </button>
          </div>
          <li
            class="dropdown cart"
            :class="{ active: navActive===4 }"
            @mouseenter="dropdown($event, 'enter')"
            @mouseleave="dropdown($event, 'leave')">
            <router-link to="/cart">
              <i class="zmdi zmdi-shopping-cart"></i> 购物车
              <span class="badge">{{ cartLists.length }}</span>
            </router-link>
            <ul class="dropdown-menu">
              <!-- 只显示最新添加的3条记录 -->
              <li v-for="item in cartLists.slice(0, 3)">
                <router-link :to="{ name: 'detail', params: { id: item.id }}">
                  <span class="tt">{{ item.name }}</span> &#42; {{ item.value }}
                </router-link>
              </li>
              <li v-if="!cartLists.length">
                <router-link to="/shop">空空如也...</router-link>
              </li>
              <router-link to="/cart" class="btn">查看全部...</router-link>
            </ul>
          </li>
          <li
            class="dropdown"
            @mouseenter="dropdown($event, 'enter')"
            @mouseleave="dropdown($event, 'leave')">
            <a class="dropdown-toggle">
              <i class="zmdi zmdi-account"></i>
              请登录
            </a>
            <ul class="dropdown-menu">
              <!-- <li><router-link to="/user">注册</router-link></li>
              <li><router-link to="/user">登录</router-link></li> -->
              <li><a @click="loginShow=true; activeTab='login'">登录</a></li>
              <li><a @click="loginShow=true; activeTab='register'">注册</a></li>
            </ul>
          </li>
          <li
            class="dropdown"
            @mouseenter="dropdown($event, 'enter')"
            @mouseleave="dropdown($event, 'leave')">
            <a><i class="zmdi zmdi-smartphone-iphone"></i></a>
            <!-- 二维码 -->
            <canvas id="qr" class="dropdown-menu"></canvas>
          </li>
        </ul>
      </div>
    </div>
    <!-- 登录注册 -->
    <user
      :show="loginShow"
      :activeTab="activeTab"
      @close="loginShow=false">
    </user>
  </nav>
</template>

<script>
import user from './user.vue'

// 生成二维码
const QRCode = require('qrcode')

export default {
  components: { user },
  props: ['navActive'],
  data() {
    return {
      open: false,
      barOpen: false,
      t: null,
      isMe: null,
      loginShow: false,
      activeTab: '',
      navFixed: false
    }
  },
  mounted() {
    const canvas = document.getElementById('qr')
    QRCode.toCanvas(canvas, 'http://ovhkjvhoy.bkt.clouddn.com/game_shop/index.html#/shop', function (error) {
      if (error) console.error(error)
      console.log('success!');
    })

    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      this.navFixed = scrollTop > 400 ? true : false
    })
  },
  computed: {
    cartLists() {
      return this.$store.state.cartBox
    }
  },
  methods: {
    // 防止下拉菜单过快消失
    dropdown(e, type) {
      if (type === 'enter') {
        if (this.t && this.isMe == e.target) {
          clearTimeout(this.t)
        }
        e.target.classList.add('open')
      }
      if (type === 'leave') {
        this.t = setTimeout(function() {
          this.isMe = e.target
          e.target.classList.remove('open')
        }, 100)
      }
    },
    searchbarClose() {
      setTimeout(function() {
        this.barOpen = false
      }.bind(this), 100)
    },
    searchbarOpen() {
      this.barOpen = true
      setTimeout(function() {
        this.$refs.searchInput.focus()
      }.bind(this), 50)
    }
  }
}
</script>

<style lang="less" scoped>
nav.active {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.cart {
  span.tt {
    display: inline-block;
    vertical-align: top;
    max-width: 16em;
    margin-right: .2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
#qr {
  width: 160px!important;
  height: 160px!important;
}
</style>
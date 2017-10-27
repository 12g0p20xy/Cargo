<template>
  <transition name='fade'>
    <div id="to-top" v-show="show" @click="toTop">
      <i class="zmdi zmdi-chevron-up"></i>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      isScroll: false
    }
  },
  mounted() {
    window.addEventListener('scroll', function() {
      this.isScroll = true
    }.bind(this))
    this.isScroll = false

    setInterval(function() {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      if (this.isScroll && scrollTop > 300) {
        this.show = true
      }
      else {
        this.show = false
      }
    }.bind(this), 1000)
  },
  methods: {
    toTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style>
#to-top {
  position: fixed;
  width: 50px;
  height: 50px;
  background: #000;
  bottom: 10%;
  right: 10%;
  font-size: 24px;
  color: #ccc;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}
</style>
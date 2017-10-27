<template>
    <div class="login-layer" v-if="layerShow" @click="close">
      <transition name="slide">
        <div class="login-wrap" v-if="boxShow">
          <i class="zmdi zmdi-close" @click="close"></i>
          <el-tabs v-model="activeName">
            <el-tab-pane label="登录" name="login">
              <div class="input-group">
                <label for="username">用户名</label>
                <input class="form-control" id="username" placeholder="用户名">
              </div>
              <div class="input-group">
                <label for="password">密码</label>
                <input class="form-control" id="password" placeholder="密码">
              </div>
              <div class="input-group">
                <button type="button" class="btn btn-block btn-primary">登 录</button>
                <el-button
                  @click="activeName='register'"
                  type="text"
                  size="small">
                  还没有帐号？
                </el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="注册" name="register">
              <div class="input-group">
                <label for="username">用户名</label>
                <input class="form-control" id="username" placeholder="用户名">
              </div>
              <div class="input-group">
                <label for="email">邮箱</label>
                <input type="email" class="form-control" id="email" placeholder="邮箱">
              </div>
              <div class="input-group">
                <label for="password">密码</label>
                <input type="tel" class="form-control" id="password" placeholder="密码">
              </div>
              <div class="input-group">
                <label for="password2">确认密码</label>
                <input class="form-control" id="password2" placeholder="密码">
              </div>
              <div class="input-group">
                <button type="button" class="btn btn-block btn-primary">注 册</button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </transition>
    </div>
</template>

<script>
export default {
  props: ['show', 'activeTab'],
  data() {
    return {
      layerShow: this.show,
      boxShow: this.show,
      activeName: this.activeTab
    }
  },
  watch: {
    show(newVal) {
      this.layerShow = newVal
      // 设置一个微小的延时，否则没有动画效果
      setTimeout(() => {
        this.boxShow = newVal
      }, 50)
    },
    activeTab(newVal) {
      this.activeName = newVal
    }
  },
  methods: {
    close(e) {
      if (e.target.className.includes('login-layer') || e.target.className.includes('zmdi-close')) {
        this.idShow = false
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="less">
.login-layer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;

  .login-wrap {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    max-width: 480px;
    padding: 45px;
    background: #fff;

    .el-tabs__header {
      margin-bottom: 30px;
    }

    .input-group {
      width: 100%;
      max-width: 320px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 1em;
    }
  }

  i.zmdi-close {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 102;
    width: 45px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    font-size: 24px;
    color: #ccc;
    cursor: pointer;
  }
}

.slide-enter-active {
  transition: transform .45s;
}
.slide-enter {
  transform: translate3d(480px, 0, 0);
}
</style>
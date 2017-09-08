import Index from './pages/index.vue'
import NotFound from './pages/404.vue'

export default [
  { path: '/', component: Index },    // 首页
  { path: '*', component: NotFound }  // 除 "/" 之外的路径全部跳转到 404
]

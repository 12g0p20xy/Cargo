import Index from './components/index.vue'
import Cart from './components/cart.vue'
import User from './components/user.vue'
import Shop from './components/shop.vue'
import Detail from './components/detail.vue'

export default [
  { path: '/', component: Index },
  { path: '/cart', component: Cart },
  { path: '/user', component: User },
  { path: '/shop', component: Shop },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail },
]

import Index from './components/index.vue'
import Detail from './components/detail.vue'
import Result from './components/result.vue'

export default [
  { path: '/', component: Index },
  { path: '/detail/:id',
    component: Detail,
    name: 'detail'
  },
  { path: '/result', component: Result },
]

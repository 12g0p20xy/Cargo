import Vue from 'vue'
import Vuex from 'vuex'
import { actions } from './actions'
import { mutations } from './mutations'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    // 商店页面加载到的商品信息
    shopLists: [],
    // 购物车
    cartBox: [
      { "id": 1111, "name": "《巫師3：狂獵》年度最佳遊戲版", "prize": "155.00", "value": 1, "img": "http://olrr17ktb.bkt.clouddn.com/17-10-20/99409755.jpg", "checked": false, "discount": "-60%" },
      { "id": 1100, "name": "Gran Turismo Sport", "prize": "398.00", "value": 1, "img": "http://olrr17ktb.bkt.clouddn.com/17-10-20/23681070.jpg", "checked": false, "discount": 0 },
      { "id": 1800, "name": "女神異聞錄5", "prize": "438.00", "value": 1, "img": "http://olrr17ktb.bkt.clouddn.com/17-10-20/40867846.jpg", "checked": false, "discount": 0 },
    ],
    // 收藏夹
    favBox: [
      { "id": 2000, "name": "刺客教條：起源", "prize": "576.00", "value": 1, "img": "http://olrr17ktb.bkt.clouddn.com/17-10-20/17225856.jpg", "checked": false, "discount": "-10%" },
      { "id": 1800, "name": "女神異聞錄5", "prize": "438.00", "value": 1, "img": "http://olrr17ktb.bkt.clouddn.com/17-10-20/40867846.jpg", "checked": false, "discount": 0 },
    ],
    page: 1
  },

  getters: {
    
  },

  mutations,
  actions

})
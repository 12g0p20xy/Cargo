import * as types from './mutation-types'

export const mutations = {
  // 更新购物车
  [types.UPDATE_CART_BOX](state, arr) {
    state.cartBox = arr
  },
  // 更新收藏夹
  [types.UPDATE_FAV_BOX](state, arr) {
    state.favBox = arr
  },
  // 更新商品目录
  [types.UPDATE_SHOP_LIST](state, arr) {
    // 合并加载的商品列表
    state.shopLists = state.shopLists.concat(arr)
  },
  addPage(state) {
    state.page ++
  }
}
import * as types from './mutation-types'

export const actions = {

  // 加载商品信息
  updateShopList({ commit }, page) {
    fetch(`./src/mock/list_data_${page}.json`)
      .then(response => 
        response.json()
      )
      .then(json => {
        // 提交 mutation，更新 state 的商品列表信息
        commit(types.UPDATE_SHOP_LIST, json)
      })
      .catch(ex => {
        console.log('加载错误', ex)
      })
  },

  // 更新购物车
  updateCartBox({ commit }, arr) {
    commit(types.UPDATE_CART_BOX, arr)
  },

  // 更新收藏夹
  updateFavBox({ commit }, arr) {
    commit(types.UPDATE_FAV_BOX, arr)
  }

}
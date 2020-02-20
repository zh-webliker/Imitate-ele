const mutations = {
  changeLike (state) {
    if (state.liker === 0) {
      state.liker = 1
    } else {
      state.liker = 0
    }
  },
  goodsAdd (state) {
    state.totalNum = state.totalNum + 1
  },
  goodsReduce (state) {
    if (state.totalNum > 0) {
      state.totalNum = state.totalNum - 1
    }
  },
  getTotalPriceV (state, obj) {
    console.log(obj)
    if (obj.type === 'add') {
      console.log(111)
      state.totalPrice = state.totalPrice + obj.num
      console.log(state.totalPrice)
    } else if (obj.type === 'reduce') {
      state.totalPrice = state.totalPrice - obj.num
      console.log(state.totalPrice, 'reduce')
    }
  },
  getGoodsIndex (state, obj) {
    state.array1 = obj.array1
    state.array2 = obj.array2
    console.log(state.array1, state.array2, obj)
  }
}
export default mutations

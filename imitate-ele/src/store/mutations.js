const mutations = {
  changeLike (state) {
    if (state.liker === 0) {
      state.liker = 1
    } else {
      state.liker = 0
    }
  }
}
export default mutations

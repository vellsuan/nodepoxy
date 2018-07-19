export default {
  saveData({commit}, name) {
    commit('saveName', name)    // 提交到mutations中处理
  }
}

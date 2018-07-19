export default {
  getName(state) {
    return state.name
  },
  getSex(state){
    return state.sex
  },
  getUserId(state){
    return state.userId
  },
  getCustId(state){
    return state.custId
  },
  getRecNo(state){
    return state.recordNo
  },
  getUser(state, user) {
    return state.userinfo;
  },
}

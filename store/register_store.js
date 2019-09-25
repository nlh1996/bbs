import axios from '../http'
export default {
  state:{
    userdata: {}
  },
  mutations:{
    //初始化登录用户数据
    USER_REGISTER(state, arg) {
      state.userdata = arg
    },    
  },
  //监听分发事件，可用于处理多个监听事件，方法名与分发名相同
  actions: {
    register({ commit }, arg) {
      axios.post(
        '/v1/register',
        {
          uName: arg.uName,
          password: arg.password
        }
      )
      .then(response => {
        //此处数据模拟从后端获取，正确处理用response.data替换下面的数据
        commit('USER_REGISTER', response.data)
      })
    },
  }
}
import axios from '../http'
export default {
  state: {
    isLoad: 0,
    userdata: {

    },
    isSignin: '',
  },

  //官方建议mutations中事件名称大写，state属性只允许在mutations中处理 
  mutations: {
    // 退出登录，清空token,改变登录和签到状态
    LOGIN_OUT(state){
      window.localStorage.token = ''
      state.isLoad = 0
      state.isSignin = false
    },
    // 初始化登录用户数据
    USER_LOGIN(state, arg) {
      state.userdata = arg.user
      state.isSignin = arg.isSignin
      state.isLoad = arg.isLoad
    },
    // 改变签到状态，增加经验和积分（前端显示变化，后端不受影响）
    SIGNIN_CHANGE(state) {
      state.isSignin = true
      state.userdata.exp += 10
      state.userdata.integral += 10
    },
    GET_SCORE(state) {
      state.userdata.exp += 5
      state.userdata.integral += 5
    },
    CHANGE_JIFEN(state, data) {
      state.userdata.integral += data
    }
  },

  // 监听分发事件，可用于处理多个监听事件，方法名与分发名相同
  actions: {
    login({ commit }, arg) {
      axios.post(
        '/v1/login',
        {
          uName: arg.uName,
          password: arg.password
        }
      )
      .then(response => {
        if(response.status == 200) {
          commit('USER_LOGIN', response.data.data)
          var storage = window.localStorage
          storage.token = response.data.data.token
        }else{
          console.log(response.data)
        }           
      })                  
    },

    adminLogin({ commit },arg) {       
      axios.post(
      '/v1/admin',
      {
        uName: arg.uName,
        password: arg.password
      }
      ).then( res => {
        if(res.status == 200) {
          commit('USER_LOGIN', res.data)
          var storage = window.localStorage
          storage.token = res.data.token
        }
      }) 
    }, 
  }
}
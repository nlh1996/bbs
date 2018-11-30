import axios from '../http'
export default {
  state: {
    zhebi_show: false,
    src: '',
    data: {
    },
  },

  //官方建议mutations中事件名称大写，state属性只允许在mutations中处理 
  mutations: {
    //加载首页数据
    FIRST_LOAD(state,arg) {
      state.data = arg
    },
    CHANGE_SHOW(state,arg) {
      state.zhebi_show = state.zhebi_show ? false : true
      state.src = arg
    },
    CLOSE_SHOW(state) {
      state.zhebi_show = false
    },

  },

  //监听分发事件，可用于处理多个监听事件，方法名与分发名相同
  actions: {
    isLoad({commit}) {
      axios.post(
        '/v2/isload',
      ).then( response => {
        if(response.status == 200){
          commit('USER_LOGIN', response.data.data)
          commit('SWITCH_LOGIN')
        }else{
          alert('请先登录！')
        }

      })
    }
  }
}
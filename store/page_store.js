import axios from '../http'
export default {
    state: {
      token: '',
      data: {

      },
    },

    //官方建议mutations中事件名称大写，state属性只允许在mutations中处理 
    mutations: {
      //加载首页数据
      FIRST_LOAD(state) {
        state.data = arg
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
          }

        })
      }


    }
}
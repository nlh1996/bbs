import axios from '../http'
export default {
    state: {
        isLoad: false,
        userdata: {

        }
    },

    //官方建议mutations中事件名称大写，state属性只允许在mutations中处理 
    mutations: {
      //切换登录状态
      SWITCH_LOGIN(state) {
        //这里的state对应着上面这个state
        if (!state.isLoad) {
          state.isLoad = state.isLoad ? false : true;
        }
        //你还可以在这里执行其他的操作改变state
      },

      //初始化登录用户数据
      USER_LOGIN(state, arg) {
        state.userdata = arg
      },
    },

    //监听分发事件，可用于处理多个监听事件，方法名与分发名相同
    actions: {
        login({ commit }, arg) {
          axios.post(
              '/v1/login',
              {
                username: arg.username,
                password: arg.password
              }
          )
              .then(response => {
                if(response.data.status_code == 200) {
                  commit('USER_LOGIN', response.data.data)
                  var storage = window.localStorage
                  // console.log(storage)
                  //将对象转换为JSON字符串存储
                  //let form = JSON.stringify(this.form)
                  storage.token = response.data.data.token
                  //storage.username = '萌妹子'
                  //将JSON字符串转换成为对象输出
                  // let json = storage.data
                  // let jsonObj = JSON.parse(json)
                  // console.log(typeof jsonObj)
                  commit('SWITCH_LOGIN')
                }else{
                  console.log(response.data)
                }           
              })                  

        },
    }
}
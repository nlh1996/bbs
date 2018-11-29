import axios from '../http'
export default {
    state: {
      isLoad: false,
      userdata: {

      },
      isSignin: '',
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
      // 退出登录，清空token,改变登录和签到状态
      LOGIN_OUT(state){
        window.localStorage.token = ''
        state.isLoad = false
        state.isSignin = false
      },
      // 初始化登录用户数据
      USER_LOGIN(state, arg) {
        state.userdata = arg
        state.isSignin = arg.isSignin
      },
      // 改变签到状态，增加经验和积分（前端显示变化，后端不受影响）
      SIGNIN_CHANGE(state) {
        state.isSignin = true
        state.userdata.exp += 10
        state.userdata.jifen += 10
      }
    },

    // 监听分发事件，可用于处理多个监听事件，方法名与分发名相同
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
                if(response.status == 200) {
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
        qiandao({commit}) {
          axios.post(
            '/v2/signin',
            {
            }
          ).then( response =>{
            if(response.status==200){
              commit('SIGNIN_CHANGE')
            }
          })
        }
    }
}
import axios from '../http'
export default {
    state: {
        userdata: {

        }
    },

    //官方建议mutations中事件名称大写，state属性只允许在mutations中处理 
    mutations: {


        //初始化登录用户数据
        USER_LOGIN(state, arg) {
            state.userdata = arg
        },
    },

    //监听分发事件，可用于处理多个监听事件，方法名与分发名相同
    actions: {
        load({ commit }, arg) {
            axios.get(
                '/v1/login',
                {
                    username: arg.username,
                    password: arg.password
                }
            )
                .then(response => {
                    //此处数据模拟从后端获取，正确处理用response.data替换下面的数据
                    console.log(response.data)
                    commit('USER_LOGIN', { userName: '萌妹子', postsNum: '100', headImg: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2564997198,4187947589&fm=58', })
                    // var storage = window.localStorage
                    // console.log(storage)
                    //将对象转换为JSON字符串存储
                    // let form = JSON.stringify(this.form)
                    // storage.data = form
                    // console.log(typeof storage.data)
                    //storage.username = '萌妹子'
                    //将JSON字符串转换成为对象输出
                    // let json = storage.data
                    // let jsonObj = JSON.parse(json)
                    // console.log(typeof jsonObj)
                })
                  
        },
    }
}
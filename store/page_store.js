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
        FIRST_LOAD(state, arg) {
            state.data = arg
            var storage = window.localStorage
            state.token = storage.token
        },
    },

    //监听分发事件，可用于处理多个监听事件，方法名与分发名相同
    actions: {
        load({ commit }) {
            axios.get(
                '/v1/',
                {

                }
            )
                .then(response => {
                    //此处数据模拟从后端获取，正确处理用response.data替换下面的数据
                    commit('FIRST_LOAD', { userName: '萌妹子', postsNum: '100', headImg: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2564997198,4187947589&fm=58', })
          
                })
        },
    }
}
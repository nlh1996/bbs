export default {
  state: {
    post: {

    },
  },

  //官方建议mutations中事件名称大写，state属性只允许在mutations中处理 
  mutations: {
    //加载首页数据
    POST_SAVE(state,arg) {
      state.post = arg
    },
    ADD_REPLY(state,arg) {
      state.post.reList1.push(arg)
    }
  },

  //监听分发事件，可用于处理多个监听事件，方法名与分发名相同
  actions: {


  }
}
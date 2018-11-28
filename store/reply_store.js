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
    ADD_REPLY1(state,arg) {
      state.post.reList1.push(arg)
    },
    ADD_REPLY2(state,arg) {
      state.post.reList2.push(arg)
    },
    CLOSE_REPLY(state) {
      for(let i=0;i<state.post.reList2.length;i++) {
        state.post.reList2[i].show = false
      }
      for(let i=0;i<state.post.reList1.length;i++) {
        state.post.reList1[i].show = false
      }
    }
  },

  //监听分发事件，可用于处理多个监听事件，方法名与分发名相同
  actions: {


  }
}
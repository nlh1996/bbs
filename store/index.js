import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import register_store from './register_store.js'
import login_store from './login_store.js'
import page_store from './page_store.js'
import reply_store from './reply_store.js'


//创建store单例，全局引用方法this.$store.state.跟上模块名(例如这边的login).跟上state中的数据可以是axios请求到的数据
const store = () => new vuex.Store({
  //strict: true,  //严格模式
  modules: {
    register: register_store,
    login: login_store,
    page: page_store,
    reply: reply_store
  }
})

export default store
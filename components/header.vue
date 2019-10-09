//头部内容
<template>
  <div class="header">
    <span @click="close" class="clink">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-close"></use>
      </svg>
    </span>
    <span class="title">{{name}}</span>
    
    <div class="box" v-if="$store.state.login.isLoad == 0">
      <login></login>
      <register></register>
    </div>
    <div class="box" v-if="$store.state.login.isLoad == 2">
      管理员 <nuxt-link to="/admin">进入后台</nuxt-link>
      <button class="text-button" @click="logout">登出</button>
    </div>
    <div class="box box-right" v-if="$store.state.login.isLoad == 1">
      <span>{{$store.state.login.userdata.uName}}</span>
      <span>等级:{{level}}</span>
      <span>积分:{{$store.state.login.userdata.integral}}</span>
      <button class="text-button" @click="logout">登出</button>
    </div>
  </div>
</template>

<script>
import login from '~/components/login'
import register from '~/components/register'
  export default {
    data() {
      return {
        count: 1,
      }
    },
    props: ['name'],
    methods:{
      close() {
        history.go('-1')
      },
      logout() {
        this.$store.commit('LOGIN_OUT')
        location.reload()
      }
    },
    components: {
      login,
      register
    },
    computed: {
      level: function() {
        let temp = parseInt(this.$store.state.login.userdata.exp/50)
        return temp+1
      },
    },
  }
</script>

<style scoped>
.header{
  width: 7.4rem;
  height: 0.45rem;
  margin: 0.1rem;
  line-height: 0.5rem;
}

.box{
  float: right;
  padding-right: 0.3rem;
}

.close{
  font-size: 0.4rem;
}

.title{
  font-size:  0.35rem;
  font-weight: bold;
}
</style>
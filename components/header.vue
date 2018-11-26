//头部内容
<template>
  <div class="header">
    <span @click="close" class="clink">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-close"></use>
      </svg>
    </span>
    <span class="title">{{name}}</span>
    
    <div class="box" v-if="!$store.state.login.isLoad">
      <login></login>
      <register></register>
    </div>
    <div class="box" v-else>
      <span>{{$store.state.login.userdata.user}}</span>
      <span>等级:{{level}}</span>
      <span>积分:{{$store.state.login.userdata.jifen}}</span>
      <button class="text-button" @click="$store.commit('LOGIN_OUT')">退出登录</button>
    </div>
  </div>
</template>

<script>
import login from '~/components/login'
import register from '~/components/register'
  export default {
    data() {
      return {
          
      }
    },
    props: ['name'],
    methods:{
      close() {
        history.go('-1')
      }
    },
    components: {
      login,
      register
    },
    computed: {
      level: function() {
        if(this.$store.state.login.userdata.exp<15){
          return 1
        }
        let temp = parseInt(this.$store.state.login.userdata.exp/15)
        let diejia = parseInt(temp/3/3)
        return parseInt(temp/(3+diejia))+2
      }
    }
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
}
.close{
  font-size: 0.4rem;
}
.title{
  margin-left: 0.1rem;
  font-size:  0.35rem;
  font-weight: bold;
}


</style>
<template>
  <div class="headlist bg">
    <div class="left">                
      <img src="qijing.jpg" style="width:0.8rem"/>
    </div>
    
    <div class="text"> {{$route.params.home}}</div>

    <diV class="right">
      <ul>
        <li v-if="!$store.state.login.isSignin"><div class="btn" @click="signin"><img src="qiandao.png"><div class="btn-text">签到</div></div></li>
        <li v-else><div class="btn"><img src="yiqian.png"><div class="btn-text">已签</div></div></li>
        <li><nuxt-link to='giftpack'><div class="btn"><img src="gift.png"><div class="btn-text">礼包</div></div></nuxt-link> </li>
        <li><nuxt-link to='shoppingmall'><div class="btn"><img src="shop.png"><div class="btn-text">商城</div></div></nuxt-link> </li>
      </ul>
      
      <nuxt-link :to='user_route'>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-contacts"></use>
        </svg>
      </nuxt-link>
      
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>

    </div>            
  </div>
</template>

<script>
import axios from '../http'
  export default {
    data() {
      return {
        user_route: '/user/123',
      }
    },
    methods: {
      signin() {
        axios.post(
          '/v2/signin',
          {
          }
        ).then( response =>{
          if(response.status==200){
            this.$toast({
              message: '签到成功！+10经验 +10积分',
              duration: 1000
            })
            this.$store.commit('SIGNIN_CHANGE')
          }
        })
      }
    }
  }
</script>

<style scoped>
.text{
  float: left;
  margin-left: 0.1rem;
}

.left{
  float: left;
  margin-left: 0.1rem;
}

.right{
  margin-left: 2.4rem;
}

.right svg{
  margin-left: 0.4rem;
  height: 0.8rem;
}

ul,li{
  display: inline-block;
  list-style: none;
  margin-left: 0.2rem;
}

button{
  color: black;
  outline: none;
  font-size: 0.3rem;
  background-color: white;
  line-height: 0.5rem;
  padding: 0.04rem;
  border-radius: 10%;
  /* -webkit-transition-duration: 0.4s; Safari */
  /* transition-duration: 0.4s; */
  box-shadow: 0 0.04rem 0.08rem 0 rgba(0,0,0,0.2), 0 0.06rem 0.1rem 0 rgba(0,0,0,0.19);
}

.btn{
  margin: 0px;
  padding: 0px;
  overflow: unset;
  line-height: 0.3rem;
}

.btn img{
  width: 0.5rem;
  padding-left: 0.01rem;
}

.btn-text{
  margin: 0px;
  padding: 0px;
  font-size: 0.25rem;
  color: black;
}
</style>
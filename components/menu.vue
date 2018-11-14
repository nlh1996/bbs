<template>
  <div class="headlist bg" v-once>
      <div class="left">                
          <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2564997198,4187947589&fm=58" style="width:0.8rem"/>
      </div>
      
      <div class="text"> {{$route.params.home}}</div>

      <diV class="right">
          <ul>
              <li><button>签到</button></li>
              <li><button>礼包</button></li>
              <li><button>商城</button></li>
          </ul>
          
          <nuxt-link :to='user_route'>
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wode1"></use>
          </svg>
          </nuxt-link>
          
          <nuxt-link to='/'>
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-sousuo"></use>
          </svg>

          </nuxt-link>  
      </div>            
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user_route: '/user/123',
      }
    },
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
  margin-left: 0.2rem;
}

ul,li{
  display: inline-block;
  list-style: none;
  margin-left: 0.15rem;
}
button{
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
</style>
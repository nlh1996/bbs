//首页
<template>
  <div class="view">
    <header-view :name="msg"></header-view>
    <div class="title">最近访问</div>
    <hr>
    <nuxt-link :to="router"> 
      <dl>
        <dt><img :src="form.headImg" style="width:1.5rem"></dt>
        <dd>     
          <div class="text">
            <h3>王者荣耀</h3>
            <p>话题100</p>
          </div>
        </dd>
      </dl>
    </nuxt-link>

    <nuxt-link :to="router2"> 
      <dl>
        <dt><img :src="form.headImg" style="width:1.5rem"></dt>
        <dd>     
          <div class="text">
            <h3>绝地求生</h3>
            <p>话题100</p>
          </div>
        </dd>
      </dl>
    </nuxt-link>
    <div class="clean"></div>

    <div class="title">全部游戏圈</div>
    <nuxt-link :to="router"> 
      <dl>
        <dt><img :src="form.headImg" style="width:1.5rem"></dt>
        <dd>     
          <div class="text">
            <h3>王者荣耀</h3>
            <p>话题100</p>
          </div>
        </dd>
      </dl>
    </nuxt-link>

    <nuxt-link :to="router2"> 
      <dl>
        <dt><img :src="form.headImg" style="width:1.5rem"></dt>
        <dd>     
          <div class="text">
            <h3>绝地求生</h3>
            <p>话题100</p>
          </div>
        </dd>
      </dl>
    </nuxt-link>
    
  </div>
</template>

<script>
  import headerView from '~/components/header'
  export default {
    data() {
      return {
        msg: '微信',
        router: '/王者',
        router2: '/绝地'
      }
    }, 
    components: {
      headerView,
    },
    computed: {
      form: function() {
        return this.$store.state.login.userdata || ''
      }
    },
    mounted() {
      this.$store.dispatch('login')
    },
  }
</script>

<style scoped>
dl{
  float: left;
}
dt{
  float: left;
  margin: 0.1rem;
}
dd{
  padding: 0.2rem;
  float: left;
  color: black;
}

.title{
  margin: 0.05rem;
  padding: 0.1rem;
  height: 0.32rem;
  background-color: #F5F5F5;
  font-size: 0.28rem;
  color: darkgray;
}
hr {/*内嵌水平线*/
  width: 7.4rem;
  margin:0 auto;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

</style>


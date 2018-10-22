//首页
<template>
  <div class="view">
    <header-view></header-view>
    <div class="title">最近访问</div>
    <hr>
    <dl>
      <dt><img :src="form.headImg" style="width:80px"></dt>
      <dd>
        <div class="text">
          <h2>王者荣耀</h2>
          <p>话题100</p>
        </div>
      </dd>
    </dl>
    <div class="title">全部游戏圈</div>
  </div>
</template>

<script>
  import headerView from '~/components/header'
  export default {
    data() {
      return {
        data() {
          return {

          }
        },
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
.view{
  width: 7.5rem;
  margin: 0 auto;

}
.title{
  margin: 0.05rem;
  padding: 0.1rem;
  height: 0.3rem;
  background-color: #F5F5F5;;
  font-size: 0.2rem;
  font-weight: lighter;
  color: darkgray;
}


</style>


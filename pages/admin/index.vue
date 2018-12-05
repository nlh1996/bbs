//管理员路由
<template>
  <div class="view">
    <van-tabs v-model="active" sticky color="orange" type="card">
      <van-tab title="贴子管理"><div class="box">内容 1</div></van-tab>
      <van-tab title="用户管理"><div class="box">内容 2</div></van-tab>
      <van-tab title="数据统计"><div class="box">内容 3</div></van-tab>
      <van-tab title="礼包发放"><div class="box">内容 4</div></van-tab>
    </van-tabs>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        active: 0,

      }
    },

  }
</script>

<style scoped>
.view{
  margin-top: 0.2rem;
  background-color: white
}
.box{
  width: 6rem;
  height: 7rem;
  background-color: white;
  margin: 0 auto;
  padding: 0.5rem;
  margin-top: 0.2rem;
}

</style>
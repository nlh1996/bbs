<template>
  <div class="view">
    <header-view :name="title"></header-view>
    <div class="user-data">
      <div class="headImg">               
        <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2564997198,4187947589&fm=58" style="width:0.8rem"/>
      </div>
      <span>萌妹子</span>
    </div>

    <van-cell-group>
      <van-cell title="最近浏览" is-link />
      <van-cell title="我的收藏" is-link />
    </van-cell-group>

    <van-tabs v-model="active" color="green">
      <van-tab title="我的话题"><div class="content">暂无数据</div></van-tab>
      <van-tab title="我的回复"><div class="content">暂无数据</div></van-tab>
      <van-tab title="我赞过"><div class="content">暂无数据</div></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import headerView from '~/components/header'
  export default {
    data() {
      return {
        title: "个人信息",
        active: 0,

      }
    },
    components: {
      headerView,
    }
  }
</script>

<style scoped>
.user-data{
  display: flex;
  height: 1rem;
  line-height: 1rem;
}
.user-data span{


}

.content,.user-data{
  padding: 0.1rem;
  background-color: white;
}

.content{
  text-align: center;
  min-height: 40vh;
}
</style>
// 用户详情
<template>
  <div class="view">
    <header-view :name="title"></header-view>
    <div class="user-data">
      <div class="headImg d1">               
        <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2564997198,4187947589&fm=58" style="width:1.2rem"/>
      </div>
      <div class="d2">
        <div class="row1">
          <div class="item name">{{form.uName}}</div>
          <div class="item jifen">当前积分:{{form.integral}}</div>
        </div>
        <div class="row2">
          <div>获得的阅读<div class="num">{{form.readNum}}</div></div>
          <div class="left-border">获得的回复<div class="num">{{form.replyNum}}</div></div>
          <div class="left-border">获得的赞<div class="num">{{form.support}}</div></div>
        </div>
      </div>
    </div>

    <van-collapse v-model="activeNames">
      <van-collapse-item title="最近浏览" name="1">该功能暂未实现</van-collapse-item>
      <van-collapse-item title="我的收藏" name="2">该功能暂未实现</van-collapse-item>
      <van-collapse-item title="我的礼包" name="3">
        <div v-for="(item, index) in form.myGifts" :key="index"> <span style="width:3rem;display:inline-block;">礼包名称：{{item.GiftPackName}}</span> <span> 兑换码：{{item.Code}}</span></div>
      </van-collapse-item>
    </van-collapse>

    <van-tabs v-model="active" color="green">
      <van-tab title="我的贴子">
        <div class="content">
          <ul><li v-for="(item,index) in myposts" :key="index">
            <nuxt-link :to="'/post/'+item.tid">
              <div class="post-box">
                <div class="post-title">{{item.title}}</div>
                <div class="post-time">{{item.createTime}}</div>
              </div>
            </nuxt-link>
          </li></ul>
        </div>
      </van-tab>
      <van-tab title="我的回复"><div class="content">暂无数据</div></van-tab>
      <van-tab title="我赞过"><div class="content">暂无数据</div></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from '../../http'
import headerView from '~/components/header'
  export default {
    data() {
      return {
        activeNames: [],
        title: "个人信息",
        active: 0,
        myposts: [],
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
    beforeMount() {
      this.$store.dispatch("isLoad")
    },
    mounted() {
      axios.post('v2/user/myposts').then( res => {
        if (res.status == 200) {
          this.myposts = res.data.myposts
        }
      })
    },
  }
</script>

<style scoped>
.user-data{
  display: flex;
  height: 1.5rem;
  line-height: 1rem;
}

.content,.user-data{
  padding: 0.1rem;
  background-color: white;
}

.content{
  text-align: center;
  min-height: 60vh;
}

.d1,.d2{
  display: inline-block;
  height: 1.5rem;
}
.item{
  display: inline-block;
  margin-left: 0.2rem;
}
.row1{
  height: 0.4rem;
  line-height: 0.6rem;
}
.row2{
  display: flex;
  justify-content: space-between;
  height: 1.5rem;
}
.row2 div{
  margin-left: 0.2rem;
  margin-right: 0.4rem;
  color: gray;
  height: 0.4rem;
}

.name{
  font-size: 0.4rem;
  font-weight: bold;
}
.jifen{
  margin-left: 0.5rem;
}
.row2 .num{
  height: 0.3rem;
  font-size: 0.3rem;
  line-height: 0rem;
  color: black;
}
</style>
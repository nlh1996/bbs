//动态路由，贴子详情
<template>
  <div class="view">
    <header-view :name="msg"></header-view>
    <div class="box">
      <div class="row">
        <dl>
          <dt><div class="headImg"><img :src="headImg" style="width:1rem"></div></dt>
          <dd>     
            <div class="text">
              <h3>月夜小曲</h3>
              <p></p>
            </div>
          </dd>
        </dl>
      </div>
      <div class="row">
        <h2>游戏闪退</h2>
      </div>
      <div class="row">
        <p>游戏突然闪退</p>
      </div>
      <div class="row">
        <img :src="headImg" style="width:1.8rem;height:1.8rem"/>
        <img :src="headImg" style="width:1.8rem;height:1.8rem"/>
        <img :src="headImg" style="width:1.8rem;height:1.8rem"/>
      </div>
      <div class="row">
        <span class="item"><p>26分钟前</p></span>
        <span class="item"><p>3阅读 1回复</p></span>
      </div>
    </div>

    <div class="list">
      <reply-list></reply-list>
    </div>

    <div class="footer">
      <reply-footer></reply-footer>
    </div>
  </div>
</template>

<script>
import headerView from '~/components/header'
import replyList from '~/components/reply-list'
import replyFooter from '~/components/reply-footer'
  export default {
    data() {
      return {
        msg: this.$route.params.post+'游戏圈',
        headImg: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2564997198,4187947589&fm=58'
      }
    },
    components:{
      headerView,
      replyList,
      replyFooter
    },
    mounted() {
      console.log(this.$route.params.post)
    },    
  }
</script>

<style scoped>


.box {
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  margin: 0.04rem auto;
  padding: 0.08rem;
}

.row{
  flex-basis: 100%;
  display:flex;
}

.row:nth-child(5){
  justify-content: space-between;
}

.list{
  margin-top: 0.06rem;
  padding-bottom: 0.7rem;
}

/* 底部吸底效果 */
.footer{
    margin-bottom: 0;
    position: fixed;
    bottom: 0;
}
</style>
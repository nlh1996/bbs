//动态路由，贴子详情
<template>
  <div class="view">
    <cover-layer></cover-layer>
    <div class="box">
      <div class="row">
        <dl>
          <dt><div class="headImg"><img :src="headImg" style="width:1rem"></div></dt>
          <dd>     
            <div class="text">
              <h3>{{post.topStorey.uName}}</h3>
              <p></p>
            </div>
          </dd>
        </dl>
      </div>
      <div class="row">
        <h2>{{post.topStorey.title}}</h2>
      </div>
      <div class="row">
        <p>{{post.topStorey.content}}</p>
      </div>
      <div class="row-img" v-for="(imgSrc,index) in post.topStorey.imgList" :key="index" @click="$store.commit('CHANGE_SHOW',imgSrc)">
        <img :src=imgSrc style="width:1.8rem;height:1.8rem;"/>
      </div>
      <div class="row row-bottom">
        <span class="item"><p>{{post.topStorey.createTime}}</p></span>
        <span class="item"><p>{{post.replyNum}}评论</p></span>
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
import coverLayer from '~/components/cover-layer'
import headerView from '~/components/header'
import replyList from '~/components/reply-list'
import replyFooter from '~/components/reply-footer'
import axios from '~/http/'
  export default {
    data() {
      return {
        headImg: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2564997198,4187947589&fm=58',
      }
    },
    components:{
      headerView,
      replyList,
      replyFooter,
      coverLayer
    },
    
    async asyncData ({ params }) {
      let { data } = await axios.get('/v1/post', {tid: params.post})
      return { post: data.post }
    },
    mounted() {
      this.$store.commit("POST_SAVE",this.post)
      this.$store.commit("CLOSE_SHOW")
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

.row-bottom{
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
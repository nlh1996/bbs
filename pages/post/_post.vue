// 动态路由，贴子详情
<template>
  <div class="view">
    <cover-layer></cover-layer>
    <div class="box">
      <div class="row row-top">
        <dl>
          <dt><div class="headImg"><img :src="headImg" style="width:1rem"></div></dt>
          <dd>     
            <div class="text">
              <span>{{post.topStorey.uName}}</span><span class="tag-louzhu">楼主</span>
              <p></p>
            </div>
          </dd>
        </dl>
        <svg v-if="$store.state.reply.can_dianzan" class="icon text-button" aria-hidden="true" @click="dianzan">
          <use xlink:href="#icon-dianzan1"></use>
        </svg>
        <svg v-else class="icon text-button" aria-hidden="true" @click="cancel">
          <use xlink:href="#icon-dianzan"></use>
        </svg>
      </div>

      <div class="row">
        <h2>{{post.topStorey.title}}</h2>
      </div>
      <div class="row row-content">
        {{post.topStorey.content}}
      </div>
      <div class="row-img" v-for="(imgSrc,index) in post.topStorey.imgList" :key="index" @click="$store.commit('CHANGE_SHOW',imgSrc)">
        <img :src=imgSrc style="width:1.8rem;height:1.8rem;"/>
      </div>
      <div class="row row-bottom">
        <span class="item"><p>{{post.topStorey.createTime}}</p></span>
        <span class="item"><button class="text-button" @click="daShangShow">积分打赏</button></span>
        <van-popup v-model="show" class="daShang">
          <div style="font-size:0.35rem;color:green;">请选择打赏积分</div>
          <button @click="daShang">5积分</button>
          <button @click="daShang">10积分</button>
        </van-popup>
      </div>
      <div class="row row-reply">
        <div spellcheck="false" contenteditable="true" placeholder="说说你的看法..." class="rich-input" id="commit"></div>
        <button class="text-button" @click="reply(post.topStorey.uName)">评论</button>
      </div>
    </div>

    <!-- 回复列表 -->
    <div class="list">
      <reply-list></reply-list>
    </div>

    <div class="footer">

    </div>
  </div>
</template>

<script>
import coverLayer from '~/components/cover-layer'
import headerView from '~/components/header'
import replyList from '~/components/reply-list'
import axios from '~/http/'
  export default {
    data() {
      return {
        icon_show: true,
        headImg: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2564997198,4187947589&fm=58',
        show: false,
      }
    },
    components: {
      headerView,
      replyList,
      coverLayer
    },
    
    async asyncData ({ params }) {
      let { data } = await axios.get('/v1/post', {tid: params.post})
      return { post: data.post }
    },

    mounted() {
      this.$store.commit("POST_SAVE",this.post)
      this.$store.commit("CLOSE_SHOW")
      this.$store.commit("isDianzan",this.post.tid)
    },
    methods: {
      reply(name) {
        let value = document.getElementById('commit').innerText
        if(value) {
          axios.post(
            '/v2/reply1',
            {
              tid: this.$route.params.post,
              uName: this.$store.state.login.userdata.uName,
              content: value,
              show: false,
              rName: name
            }
          )
          .then( response => {
              if(response.status == 200) {
                document.getElementById('commit').innerText = ''
                this.$toast({
                  message: '+5经验 +5积分',
                  duration: 1000
                })
                this.$store.commit("ADD_REPLY1",response.data.reply)
              }
            }           
          )
        }
      },
      dianzan() {
        axios.put(
          'v2/support',
          {
            tid: this.$route.params.post,
            name: this.post.topStorey.uName
          }
        )
        .then( res => {
          if(res.status == 200) {
            this.$store.state.reply.can_dianzan = false;
          }
        })
      },
      cancel() {
        axios.put(
          'v2/cancel',
          {
            tid: this.$route.params.post,
            name: this.post.topStorey.uName
          }
        )
        .then( res => {
          if(res.status == 200) {
            this.$store.state.reply.can_dianzan = true;
          }
        })        
      },
      daShangShow() {
        this.show = true
      },
      daShang() {
        this.show = false
      },
    }
  }
</script>

<style scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  margin: 0 auto;
  padding: 0.08rem;
}

.row{
  flex-basis: 100%;
  display:flex;
}

.row-bottom,.row-top{
  justify-content: space-between;
}

.row-content{
  margin-left: 0.3rem;
}

.list{
  margin-top: 0.06rem;
  padding-bottom: 0.8rem;
}

.row-reply{
  padding: 0.1rem 0.6rem;
  background-color:#fafbfc;
  justify-content: space-between;
}

.icon{
  margin: 0.3rem 0.5rem;
}

.daShang{
  text-align: center;
  padding: 0.1rem;
  width: 3.5rem;
  height: 2rem;
  font-size: 0.4rem;
}

.daShang button{
  width: 1.5rem;
  height: 0.6rem;
  margin-top: 0.6rem;
}
</style>
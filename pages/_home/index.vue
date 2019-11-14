<template>
  <div class="view">
    <header-view :name="msg"></header-view>

    <head-menu></head-menu>

    <div class="classify bg">
      <ul v-for="(item,index) in icons" :key="index">
        <li>
          <div class="icon-box" @click="select(item.msg)" :id="item.msg">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href=item.name></use>
            </svg>
            <span class="icon-span">{{item.msg}}</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="notice bg" style="height:0.6rem;">
      <van-notice-bar
        :text="notice"
        left-icon="//img.yzcdn.cn/vant/volume.png"
      />
    </div>

    <div class="notice bg" v-for="(item,index) in list2" :key="index">
      <div class="tag title">置顶</div>
      <nuxt-link :to="'/post/'+item.tid" id="link">
        <div class="title" style="width:80%">{{item.title}}</div>
      </nuxt-link>
    </div>

    <div class="list">
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <ul>
        <li v-for="(item,index1) in list" :key="index1" :title="item">
          <nuxt-link :to="'/post/'+item.tid" id="link">
          <div class="box">
            <div class="row">
              <div class="tag" style="margin-right:0.2rem;"><img :src="item.tag + '.png'" style="width:0.6rem"></div>
                <h2>{{item.title}}</h2>
              <svg class="icon shanchu" aria-hidden="true" @click="shanchu(item.tid)"
              v-if="item.uName == $store.state.login.userdata.uName || $store.state.login.userdata.uName == 'admin'">
                <use xlink:href="#icon-shanchu"></use>
              </svg>
            </div>
            <div class="row" style="margin-left:0.4rem;">
              <p>{{item.content}}</p>
            </div>
            <div class="row-img" v-for="(imgSrc,index2) in item.imgList" :key="index2">
              <img :src=imgSrc style="width:2.2rem;height:2rem;"/>
            </div>
            <div class="row" style="margin:0.3rem;"></div>
            <span class="item-left"><span style="color:gray;">{{item.uName}}</span></span>
            <!-- <span class="item"><p>{{item.createTime}}</p></span> -->
            <span class="item-center">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-pinglun"></use>
              </svg>{{item.replyNum}}
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dianzan1"></use>
              </svg>{{item.support}}
            </span>
            <span class="item-right text-button" style="padding:0.1rem;" @click="extend(item)">...</span>
          </div>
          </nuxt-link>
        </li>
      </ul>
    </van-list>
    </div>
    <!-- 底部弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :overlay="true"
      @click-overlay="closeOverlay"
    >
      <van-button size="large" @click="jubao">举报</van-button>
      <van-button size="large" @click="zhiding">申请置顶</van-button>
    </van-popup>

    <nuxt-link :to="publish_route">
      <div class="footer bg">
        <footer-view></footer-view>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import headerView from '~/components/header'
import footerView from '~/components/footer'
import headMenu from '~/components/menu'
import axios from '~/http/'
  export default {
    data() {
      return {
        icons: [
          {name:"#icon-question",msg: "玩家交流"},
          {name:"#icon-jisuanji",msg: "玩家交易"},
          {name:"#icon-beiwanglu",msg: "意见采集"},
        ],
        msg: this.$route.params.home+'游戏圈',
        publish_route: '/'+this.$route.params.home+'/publish',
        loading: false,
        finished: false,
        list: [],
        index: 0,
        show: false,
        post: {},
        list2: [],
        notice: '',
        posts:[]
      }
    },
    props: ["tid"],
    components: {
      headerView,
      footerView,
      headMenu,
    },
    beforeMount() {
      axios.get('/v1/notices/get').then(
        res => {
          if(res.status == 200) {
            this.notice = res.data.msg
          }
        }
      )
      axios.get('/v1/zhiding/get').then(
        res => {
          if(res.status == 200) {
            this.list2 = res.data.list
          }
        }
      )
      this.$store.dispatch("isLoad")
    },
    mounted() {
      this.enum = new Map()
      this.enum.set("玩家交流", 0)
      this.enum.set("玩家交易", 1)
      this.enum.set("意见采集", 2)
      this.select("玩家交流")
    },
    methods: {
      getposts(type) {
        this.list = []
        this.index = 0
        axios.get('/v1/posts?topic=' + this.$route.params.home + '&type=' + type).then(
          res => {
            this.posts = res.data.posts
            this.finished = false
          }
        )
      },
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          let len = 0
          if(this.posts.length<5) {
            len = this.posts.length
          }else{
            len = 5
          }
          for (let i = 0; i < len; i++) {
            i
            let obj = this.posts[this.index]
            if(obj){
              this.list.push(obj)
            }
            this.index++ 
          }
          // 加载状态结束
          this.loading = false;
          if(!this.loading)
          {
            // console.log(this.list.length)
          }

          // 数据全部加载完成
          if (this.index >= this.posts.length) {
            this.finished = true
          }
        }, 50);
      },
      shanchu(id) {
        let r = confirm("贴子一但删除，无法恢复!")
        if (r==true) {
          axios.delete('/v2/delpost',
          {
            tid: id,
          }).then( res =>{
            if(res.status == 200) {
              location.reload()
              this.$toast({
                message: '删除成功',
                duration: 1000
              })   
            }         
          })
        }

        event.preventDefault()
      },
      extend(post) {
        this.show = true
        this.post = post
        event.preventDefault()
      },
      closeOverlay() {
        event.preventDefault()
      },
      jubao() {
        this.$router.push({
          name: 'home-complaint',
          params: {
            title: '举报贴子',
            tag: '举报',
            post: this.post,
            name: this.$store.state.login.userdata.uName
          }
        })
        event.preventDefault()
      },
      zhiding() {
        this.$router.push({
          name: 'home-complaint',
          params: {
            title: '申请置顶',
            tag: '申请',
            post: this.post,
            name: this.$store.state.login.userdata.uName
          }
        })
        event.preventDefault()
      },
      select(id) {
        let icon = document.getElementById(id)
        let icons = document.getElementsByClassName('icon-box')
        for(let i=0; i<icons.length; i++) {
          icons[i].style.setProperty("background-color","white")
        }
        icon.style.setProperty("background-color","darkorange")
        this.getposts(this.enum.get(id))
      }
    },
    scrollBehavior (to, from, savedPosition) {
      return { x: 0 , y: 0 }
    },
  }
    
</script>
<style scoped>
.view{
  position: relative;
}

.classify ul,li{
  display: inline-block;
  list-style: none;
  margin-left: 0.15rem;
}

.classify li{  
  margin: 0 0.1rem;
}

.tag{
  margin-top: 0.15rem;
}

.icon-box{
  padding-right: 0.1rem;
}

.icon-box:hover{
  cursor: pointer;
}


#最新{
  background-color:darkorange
}

.list{
  padding-bottom: 0.9rem;
}
/* 底部吸底效果 */
.footer{
  margin-bottom: 0;
  position: fixed;
  bottom: -0.01rem;
}

.box{
  display: flex;
  flex-wrap: wrap; /*元素换行 */
  background-color: white;
  padding: 0.14rem;
  padding-bottom: 0;
}

.list li{
  position: relative;
  width: 7.5rem;
  margin: 0.04rem auto; 
}

.row .tag{
  margin: 0rem;
}

.bg .tag{
  background-color: chocolate;
  margin-left: 0.1rem;
  margin-right: 0.1rem;
}

.row{
  flex-basis: 100%;
  margin-bottom: 0.2rem;
  display:flex;
}

.row-img{
  float: left;
  margin-right: 0.1rem;
}

.item-right{
  position: absolute;
  left: 92%;
  bottom: 0%;
  font-size: 0.35rem;
  font-weight: bold;
  color: black;
}
.item-left{
  position: absolute;
  left: 2%;
  bottom: 0%;
}
.item-center{
  position: absolute;
  left: 50%;
  margin-left: -0.8rem;
  bottom: 0%;
  color: black;
}
.item-center .icon:nth-child(1){
  width: 0.3rem;
}
.item-center .icon:nth-child(2){
  width: 0.35rem;
}
.shanchu{
  color: lightgray;
  position:absolute;
  right: 0rem;
}

.title{
  display: inline-block;
}
</style>
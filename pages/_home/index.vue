<template>
  <div class="view">
    <header-view :name="msg"></header-view>

    <head-menu></head-menu>

    <div class="classify bg">
      <ul v-for="(item,index) in icons" :key="index">
        <li>
          <div class="icon-box">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href=item.name></use>
            </svg>
            {{item.msg}}
          </div>
        </li>
      </ul>
    </div>

    <div class="notice bg">
      <div class="tag">置顶</div>
    </div>

    <div class="list">
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <ul>
        <li v-for="(item,index) in list" :key="index" :title="item">
          <nuxt-link :to="'/post/'+item.tid" id="link">
          <div class="box">
            <div class="row">
              <div class="tag">攻略</div>
              <h2>{{item.title}}</h2>
              <svg class="icon shanchu" aria-hidden="true" @click="shanchu(item.tid)" v-if="item.uName == $store.state.login.userdata.user">
                <use xlink:href="#icon-shanchu"></use>
              </svg>
            </div>
            <div class="row">
              <p>{{item.content}}</p>
            </div>
            <div class="row-img" v-for="(imgSrc,index) in item.imgList" :key="index">
              <img :src=imgSrc style="width:1.8rem;height:1.8rem;"/>
            </div>
            <div class="row row-bottom">
              <span class="item"><p>{{item.uName}}</p></span>
              <span class="item"><p>{{item.createTime}}</p></span>
              <span class="item"><p>评论{{item.replyNum}} 赞{{item.support}}</p></span>
            </div>
          </div>
          </nuxt-link>
        </li>
      </ul>
    </van-list>
    </div>

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
          {name:"#icon-zuixin",msg: "最新"},
          {name:"#icon-remen1",msg: "热门"},
          {name:"#icon-zhengcegonggao",msg: "攻略"},
        ],
        msg: this.$route.params.home+'游戏圈',
        publish_route: '/'+this.$route.params.home+'/publish',
        loading: false,
        finished: false,
        list: [],
        index: 0
      }
    },
    props: ["tid"],
    components: {
      headerView,
      footerView,
      headMenu,
    },
    async asyncData ({ params }) {
      let { data } = await axios.get('/v1/posts')
      return { posts: data.posts }
    },
    mounted() {
      this.$store.dispatch("isLoad")
    },
    methods: {
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 5; i++) {
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
            console.log(this.list.length)
          }

          // 数据全部加载完成
          if (this.index >= this.posts.length) {
            this.finished = true;
          }
        }, 50);
      },
      shanchu(id) {
        var r=confirm("贴子一但删除，无法恢复!");
        if (r==true){
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
        else{

        }
        event.preventDefault()
      },
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
  margin: 0 0.4rem;
}

.tag{
  margin-top: 0.15rem;
  background-color: darkorange;
}

.icon-box{
  padding-right: 0.1rem;
}
.icon-box:hover{
  cursor: pointer;
  background-color:darkorange;
}

.list{
  padding-bottom: 0.9rem;
}
/* 底部吸底效果 */
.footer{
  margin-bottom: 0;
  position: fixed;
  bottom: 0;
}

.box{
  display: flex;
  flex-wrap: wrap; /*元素换行 */
  background-color: white;
  padding: 0.14rem;
  padding-bottom: 0;
}

.list li{
  width: 7.5rem;
  margin: 0.04rem auto; 
}

.row .tag{
  margin: 0.02rem;
  background-color: chartreuse;
}

.row{
  flex-basis: 100%;
  display:flex;
}

.row-img{
  display: flex;
  margin-right: 0.1rem;
}

.row-bottom{
  justify-content: space-between;
}

.shanchu{
  color: lightgray;
  position:absolute;
  right: 0rem;
}
</style>
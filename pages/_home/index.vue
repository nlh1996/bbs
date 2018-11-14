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
      <ul v-for="item in list" :key="item" :title="item">
        <li>
        <nuxt-link :to="route">
          <div class="box">
            <div class="row">
              <div class="tag">攻略</div>
              <h2>王者荣耀</h2>
            </div>
            <div class="row">
              <p>王者荣耀23号更新版本</p>
            </div>
            <div class="row">
              <img src="http://115.159.77.155:12000/img/201811131010400.jpg" style="width:1.8rem;height:1.8rem"/>
              <img src="http://115.159.77.155:12000/img/201811131010400.jpg" style="width:1.8rem;height:1.8rem"/>
              <img src="http://115.159.77.155:12000/img/201811131010400.jpg" style="width:1.8rem;height:1.8rem"/>
            </div>
            <div class="row">
              <span class="item"><p>刚刚</p></span>
              <span class="item"><p>赞666</p></span>
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
        list: [],
        loading: false,
        finished: false,
        route: '/post/王者',
      }
    },
    components: {
      headerView,
      footerView,
      headMenu
    },
    async asyncData ({ params }) {
      let { data } = await axios.get('/v1/posts')
      return { data: data.posts[0] }
    },
    beforeMount() {
      this.$store.dispatch("isLoad")
    },
    methods: {
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 5; i++) {
            this.list.push(this.list.length + 1);
          }
          // 加载状态结束
          this.loading = false;
          if(!this.loading)
          {
            console.log(this.list.length)
          }

          // 数据全部加载完成
          if (this.list.length >= 30) {
            this.finished = true;
          }
        }, 50);
      }  
    }

  }
    
</script>

<style scoped>
.view{
  position: relative;
  height: 10rem;
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

.box {
  display: flex;
  flex-basis: 100%;
  flex-wrap: wrap; /*元素换行 */
  background-color: white;
  padding: 0.08rem;
}

.list li{
  width: 7.5rem;
  margin: 0.04rem auto; 
}

.row .tag{
  margin: 0.04rem;
  background-color: chartreuse;
}

.row{
  flex-basis: 100%;
  display:flex;
}

.row img{
  margin-left: 0.05rem;
}

.row:nth-child(4){
  justify-content: space-between;
}
</style>
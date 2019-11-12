//首页
<template>
  <div class="view">
    <header-view :name="msg"></header-view>
    <div class="title">最近访问</div>
    <hr>
    <div v-for="(item, index) in form" :key="index" style="margin-left: 0.1rem;">
      <nuxt-link :to="item.Name"> 
        <dl>
          <dt><img src="item.ImgURL" style="width:1.5rem"></dt>
          <dd>     
            <div class="text">
              <h3>{{item.Name}}</h3>
              <p>{{item.Num}}话题</p>
            </div>
          </dd>
        </dl>
      </nuxt-link>
    </div>

    <div class="clean"></div>

    <div class="title">全部游戏圈</div>
    <div v-for="item in form" :key="item.Name" style="margin-left: 0.1rem;">
      <nuxt-link :to="item.Name"> 
        <dl style="margin-right: 20px;">
          <dt><img src="qijing.jpg" style="width:1.5rem;"></dt>
          <dd>     
            <div class="text">
              <h3>{{item.Name}}</h3>
              <p>{{item.Num}}话题</p>
            </div>
          </dd>
        </dl>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import headerView from "~/components/header";
import axios from "~/http/";
export default {
  data() {
    return {
      msg: "微信游戏圈",
    }
  },
  components: {
    headerView
  },

  async asyncData() {
    let {data} = await axios.get('/v1/index')
    return {form: data.data}
  },
  beforeMount() {
    this.$store.dispatch("isLoad")
  },
}
</script>

<style scoped>
.title {
  margin: 0.05rem;
  padding: 0.1rem;
  height: 0.32rem;
  background-color: #f5f5f5;
  font-size: 0.28rem;
  color: darkgray;
}
hr {
  /*内嵌水平线*/
  width: 7.4rem;
  margin: 0 auto;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>


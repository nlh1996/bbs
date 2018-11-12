//首页
<template>
  <div class="view">
    <header-view :name="msg"></header-view>
    <div class="title">最近访问</div>
    <hr>
    <nuxt-link :to="router"> 
      <dl>
        <dt><img :src="form.topicImg" style="width:1.5rem"></dt>
        <dd>     
          <div class="text">
            <h3>王者荣耀</h3>
            <p>{{form.topicNum}}话题</p>
          </div>
        </dd>
      </dl>
    </nuxt-link>

    <nuxt-link :to="router2"> 
      <dl>
        <dt><img :src="form.topicImg" style="width:1.5rem"></dt>
        <dd>     
          <div class="text">
            <h3>绝地求生</h3>
            <p>{{form.topicNum}}话题</p>
          </div>
        </dd>
      </dl>
    </nuxt-link>
    <div class="clean"></div>

    <div class="title">全部游戏圈</div>
    <nuxt-link :to="router"> 
      <dl>
        <dt><img :src="form.topicImg" style="width:1.5rem"></dt>
        <dd>     
          <div class="text">
            <h3>王者荣耀</h3>
            <p>{{form.topicNum}}话题</p>
          </div>
        </dd>
      </dl>
    </nuxt-link>

    <nuxt-link :to="router2"> 
      <dl>
        <dt><img :src="form.topicImg" style="width:1.5rem"></dt>
        <dd>     
          <div class="text">
            <h3>绝地求生</h3>
            <p>{{form.topicNum}}话题</p>
          </div>
        </dd>
      </dl>
    </nuxt-link>
    
  </div>
</template>

<script>
import headerView from "~/components/header";
import axios from "~/http/";
export default {
  data() {
    return {
      msg: "微信游戏圈",
      router: "/王者",
      router2: "/绝地"
    };
  },
  components: {
    headerView
  },

  async asyncData() {
    let {data} = await axios.get('/v1/index')
    return {form: data.data}
  }
};
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


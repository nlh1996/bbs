//回复列表
<template>
  <div class="reply-list">
    <div class="head-text">全部回复</div>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <ul v-for="item in list" :key="item" :title="item">
        <li>
          <div class="box">

            <div class="row">
              我是开发
            </div>

            <div class="row">
              你有什么问题
            </div>

            <div class="row">
              <span class="item"><p>2分钟前</p></span>
              <span class="item"><p>回复</p></span>
            </div>

          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
      }
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
          if (this.list.length >= 5) {
            this.finished = true;
          }
        }, 50);
      }            
    }
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

.head-text{
  height: 0.8rem;
  line-height: 0.8rem;
  background: white;
  padding-left: 0.2rem;
}

.row{
  flex-basis: 100%;
  display:flex;
}

.row:nth-child(3){
  justify-content: space-between;
}
</style>
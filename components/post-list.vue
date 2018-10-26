<template>
  <div class="post-list">
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <ul v-for="item in list" :key="item" :title="item">
        <li>
          <div class="box">
            <div class="row">
              <div class="tag">攻略</div>
              <h2>王者荣耀</h2>
              <br/>
            </div>
            <div class="row">
              <p>王者荣耀23号更新版本</p>
            </div>
            <div class="row">
              <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2564997198,4187947589&fm=58" style="width:1.8rem;height:1.8rem"/>
              <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2564997198,4187947589&fm=58" style="width:1.8rem;height:1.8rem"/>
              <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2564997198,4187947589&fm=58" style="width:1.8rem;height:1.8rem"/>
            </div>
            <div class="row">
              <span class="item">刚刚</span>
              <span class="item">赞666</span>
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
        finished: false
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
          if (this.list.length >= 30) {
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

.tag{
  background-color: chartreuse;
}

.row{
  flex-basis: 100%;
  display:flex;
}

.row:nth-child(4){
  justify-content: space-between;
}
</style>
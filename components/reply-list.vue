//回复列表
<template>
  <div class="reply-list">
    <div class="head-text">全部回复</div>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <ul v-for="(item,index) in reList1" :key="index" :title="item">
        <li>
          <div class="reply1-box">
            <div class="row">
              <div class="headImg"><img :src="headImg" style="width:1rem"></div>
              {{item.uName}}
            </div>

            <div class="row">
              {{item.content}}
            </div>

            <div class="row row-foot">
              <span class="item"><p>{{item.createTime}}</p></span>
              <span class="item"><button class="text-button" @click="reply(item.uName,item.id)">回复</button></span>
            </div>
          </div>

          <ul v-for="(value,index) in reList2" :key="index">
            <li v-if="value.rid==item.id">
              <div class="reply2-box">
                <div class="row">
                  <div class="headImg"><img :src="headImg" style="width:1rem"></div>
                  {{value.uName}}<br>回复:{{value.rName}}
                </div>
              
                <div class="row">{{value.content}}</div>

                <div class="row row-foot">
                  <span class="item"><p>{{value.createTime}}</p></span>
                  <span class="item"><button class="text-button" @click="reply(value.uName,item.id)">回复</button></span>
                </div>    
              </div>          
            </li>
          </ul>

        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import axios from '~/http'
  export default {
    data() {
      return {
        headImg: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2564997198,4187947589&fm=58',
        list: [],
        loading: false,
        finished: false,
        index: 0,
        value: '一点点',
      }
    },
    methods: {
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 5; i++) {
            i
            let obj = this.reList1[this.index]
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
          if (this.index >= this.reList1.length) {
            this.finished = true;
          }
        }, 50);
      },
      reply(name,id) {
        if(this.value) {
          axios.post(
            '/v2/reply2',
            {
              tid: this.$route.params.post,
              uName: this.$store.state.login.userdata.user,
              rName: name,
              content: this.value,
              rid: id,
            }
          )
          .then( response => {
              this.value = ''
              this.$store.commit("ADD_REPLY2",response.data.reply)
            }           
          )
        }

      },           
    },
    computed: {
      reList1: function() {
        return this.$store.state.reply.post.reList1
      },
      reList2: function() {
        return this.$store.state.reply.post.reList2
      }
    }
  }
</script>

<style scoped>
.reply1-box {
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  margin: 0.04rem auto;
  padding: 0.08rem;
}

.reply2-box {
  display: flex;
  width: 7rem;
  flex-wrap: wrap;
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

.row-foot{
  justify-content: space-between;
}
</style>
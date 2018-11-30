//回复列表
<template>
  <div class="reply-list">
    <div class="head-text">全部回复</div>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <ul>
        <li v-for="(item,index1) in reList1" :key="index1" :title="item">
          <div class="reply1-box">
            <div class="flex-container">
              <div class="headImg"><img :src="headImg" style="width:1rem"></div>
              <div class="flex-item">
                <div>{{item.uName}}<span v-if="item.uName==louzhu" class="tag-louzhu">楼主</span></div>
                <div>{{index1+2}}楼</div>
              </div>
            </div>

            <div class="row row-content">
              {{item.content}}
            </div>

            <div class="row row-foot">
              <span class="item"><p>{{item.createTime}}</p></span>
              <span class="item"> 
                <button class="text-button" @click="()=>{let state = item.show;$store.commit('CLOSE_REPLY','0'+index1);if(state == false){item.show = true}}">回复</button>
              </span>
            </div>

            <div class="row row-reply" v-show="item.show">
              <div spellcheck="false" contenteditable="true" :placeholder="'回复'+item.uName+'...'" tabindex="-1" class="rich-input" :id="'0'+index1"></div>
              <button class="text-button" @click="()=>{item.show=false;reply('',item.id,'0'+index1)}">发送</button>
            </div>
          </div>

          <ul>
            <li v-if="value.rid==item.id" v-for="(value,index2) in reList2" :key="index2">
              <div class="reply2-box">
                <div class="row">
                  <div class="headImg"><img :src="headImg" style="width:0.6rem"></div>
                  {{value.uName}} 
                </div>

                <div>
                  <span v-if="value.rName">回复 <span class="reply-name">{{value.rName}}</span>: </span>{{value.content}}
                </div>

                <div class="row row-foot">
                  <span class="item"><p>{{value.createTime}}</p></span>
                  <span class="item"><button class="text-button" @click="()=>{let state = value.show; $store.commit('CLOSE_REPLY','00'+index2);if(state == false){value.show = true}}">回复</button></span>
                </div>    
              </div>   
              <div class="row row-reply" v-show="value.show">
                <div spellcheck="false" contenteditable="true" :placeholder="'回复'+value.uName+'...'" class="rich-input" tabindex="-1" :id="'00'+index2"></div>
                <button class="text-button" @click="()=>{value.show=false;reply(value.uName,item.id,'00'+index2)}">发送</button>
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
        id: ''
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

      reply(name,id,index) {
        let value = document.getElementById(index).innerText 
        if(value) {
          axios.post(
            '/v2/reply2',
            {
              tid: this.$route.params.post,
              uName: this.$store.state.login.userdata.user,
              rName: name,
              content: value,
              rid: id,
              show: false,
            }
          )
          .then( response => {
              document.getElementById(index).innerText = ''
              if(response.status == 200) {
                this.$toast({
                  message: '+5经验 +5积分',
                  duration: 1000
                })
                this.$store.commit("ADD_REPLY2",response.data.reply)
              }
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
      },
      louzhu: function() {
        return this.$store.state.reply.post.topStorey.uName
      }
    },
    updated() {
      let input = document.getElementById(this.$store.state.reply.id)
      if(input){
        input.focus()
      }
    },
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
  flex-wrap: wrap;
  padding: 0.1rem 0.1rem 0.1rem 0.6rem;
  background-color: #fafbfc;
  border-bottom: 1px solid #f1f1f1;
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

.row-content{
  margin-left: 0.5rem;
}

.row-reply{
  padding: 0 0.5rem;
  justify-content: space-between;
  background-color:#fafbfc;
}

.flex-container{
  display: flex;
}
.flex-item{
  margin-top: 0.1rem;
  margin-left: 0.2rem;
  flex-direction: column;
}


.reply-name{
  color:#406599;
}
</style>
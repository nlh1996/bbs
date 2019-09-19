<template>
  <div class="box">
    <div class="row">
      <span>选择渠道：</span>
      <select v-model="value1" @click="clean">
        <option  v-for="(item,index) in option1" :key="index">
          {{item.ChannelName}}
        </option>
      </select>
    </div>

    <div class="row">
      <span>选择区服：</span>
      <select v-model="value2">
        <option  v-for="(item,index) in option2" :key="index">
          {{item.ServerName}}
        </option>
      </select>
    </div>

    <div class="row">
      <span>选择礼包：</span>
      <select v-model="value3">
        <option  v-for="(item,index) in option3" :key="index">
          {{item.GiftPackName}}
        </option>
      </select>
    </div>

    <div class="row">
      <span>发放数量：</span>
      <input type="text">
    </div>
    <van-row type="flex" justify="center">
      <van-button type="primary" @click="seed" class="btn">发放</van-button>
    </van-row>
  </div>
</template>

<script>
import axios from '../http'
  export default {
    data() {
      return {
        value1: '',
        value2: '',
        value3: '',
        option1: [],
        option2: [],
        option3: []
      }
    },
    mounted() {
      axios.get('https://www.yinghuo2018.com:20000/gm/getChannels').then (
        res => {
          if(res.status == 200) {
            this.option1 = res.data.data
          }
        }
      )
      axios.get('https://www.yinghuo2018.com:20000/gm/getGiftPacks').then( 
        res=> {
          this.option3 = res.data.data
        }
      ) 
    },
    methods: {
      filter() {
        axios.get('https://www.yinghuo2018.com:20000/gm/getAreas', {"ChannelName": this.value1})
        .then( res => {
          if (res.status == 200) {
            this.option2 = res.data.data
          }
        })
      },
      clean() {
        this.option2 = []
        axios.get('https://www.yinghuo2018.com:20000/gm/getChannels').then (
          res => {
            if(res.status == 200) {
              this.option1 = res.data.data
              this.filter()
            }
          }
        )
      },
      seed() {

      }
    }
  }
</script>

<style scoped>
.box {
  margin: 0 auto;
}

.row {
  margin: 0.35rem;
}

.row span {
  font-size: 0.35rem;
  color: grey;
}

select {
  font-family: '雅黑';
  font-size: 0.32rem;
  padding: 0.06rem;
  height: 0.6rem;
}

</style>
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
      <input type="text" style="width:1.2rem;" @focus="count" v-model="num">
      <span>可发放数量：</span>{{value4}}
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
        value4: 0,
        num: null,
        option1: [],
        option2: [],
        option3: [],
        url: 'https://www.yinghuo2018.com:20000/gm'
      }
    },
    mounted() {
      axios.get(this.url + '/getChannels').then (
        res => {
          if(res.status == 200) {
            this.option1 = res.data.data
          }
        }
      )
      axios.get(this.url + '/getGiftPacks').then( 
        res=> {
          if(res.status == 200) {
            this.option3 = res.data.data
          }
        }
      )
    },
    methods: {
      filter() {
        axios.get(this.url + '/getAreas', {"ChannelName": this.value1})
        .then( res => {
          if (res.status == 200) {
            this.option2 = res.data.data
          }
        })
      },
      clean() {
        this.option2 = []
        axios.get(this.url + '/getChannels').then (
          res => {
            if(res.status == 200) {
              this.option1 = res.data.data
              this.filter()
            }
          }
        )
      },
      count() {
        if (this.value1 != ''&& this.value2 != ''&& this.value3 != '') {
          axios.get(this.url + '/countRedeemCodes',{"Channel": this.value1,"Area": this.value2,"GiftPackName": this.value3}).then(
            res => {
              if(res.status == 200) {
                this.value4 = res.data.num
              }
            }
          )
        }
      },
      seed() {
        if (this.value1 == ''|| this.value2 == ''|| this.value3 == '') {
          console.log('请填写完整')
          return
        }
        if(this.num <= this.value4 && this.num != null) {
          console.log(this.num)
        }else {
          console.log('请输入正确数量')
        }
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
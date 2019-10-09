<template>
  <div class="box">
    <div class="row">
      <span>选择渠道：</span>
      <select v-model="Channel" @click="clean">
        <option  v-for="(item,index) in option1" :key="index">
          {{item.ChannelName}}
        </option>
      </select>
    </div>

    <div class="row">
      <span>选择区服：</span>
      <select v-model="Area">
        <option  v-for="(item,index) in option2" :key="index">
          {{item.ServerName}}
        </option>
      </select>
    </div>

    <div class="row">
      <span>选择礼包：</span>
      <select v-model="GiftPackName">
        <option  v-for="(item,index) in option3" :key="index">
          {{item.GiftPackName}}
        </option>
      </select>
    </div>

    <div class="row">
      <span>发放数量：</span>
      <input type="text" @focus="count" v-model.number="GiftPackNum">
      <span>可发放数量：</span>{{AccessNum}}
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
        Channel: '',
        Area: '',
        GiftPackName: '',
        AccessNum: 0,
        GiftPackNum: null,
        Comment: '',
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
        axios.get(this.url + '/getAreas', {"ChannelName": this.Channel})
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
        if (this.Channel != ''&& this.Area != ''&& this.GiftPackName != '') {
          axios.get(this.url + '/countRedeemCodes',{"Channel": this.Channel,"Area": this.Area,"GiftPackName": this.GiftPackName}).then(
            res => {
              if(res.status == 200) {
                this.AccessNum = res.data.GiftPackNum
              }
            }
          )
        }
      },
      seed() {
        if (this.Channel == ''|| this.Area == ''|| this.GiftPackName == '') {
          this.$toast('请填写完整')
          return
        }
        if(/*this.GiftPackNum <= this.AccessNum && */this.GiftPackNum != null) {
          for(let i of this.option3) {
            if(i.GiftPackName == this.GiftPackName) {
              this.Comment = i.Comment
            }
          }
          axios.post('/admin/sendGiftPack',{
            Channel: this.Channel,
            Area: this.Area,
            GiftPackName: this.GiftPackName,
            GiftPackNum: this.GiftPackNum,
            Comment: this.Comment
          }).then( res => {
            if(res.status == 200) {
              this.$toast({message: "发送成功！"})
            }else {
              this.$toast({message: res.data})
            }
          })
        }else {
          this.$toast({message: "请输入正确数量"})
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
  height: 0.6rem;
}

.row span {
  font-size: 0.35rem;
  margin-right: 0.1rem;
  color: grey;
}

.row input {
  height: 0.5rem;
  width: 1.2rem;
  border-width: 0.01rem;
}

select {
  font-family: '雅黑';
  font-size: 0.32rem;
  padding: 0.06rem;
  height: 0.6rem;
}
</style>
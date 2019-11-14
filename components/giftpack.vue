<template>
  <div class="box">
    <div class="row">
      <span>礼包描述：</span>
      <input type="text" v-model="Comment" style="width:3.5rem;">
    </div>

    <div class="row">
      <span>需要积分：</span>
      <input type="text" v-model.number="Jifen" style="width:3.5rem;">
    </div>

    <div class="row">
      <span>选择礼包：</span>
      <select v-model="GiftPackName">
        <option  v-for="(item,index) in options" :key="index">
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
    <div class="row"></div>
    <h2>礼包删除</h2>
    <hr>
    <div class="row">
      <span>选择礼包：</span>
      <select v-model="GiftPackName2">
        <option  v-for="(item,index) in options2" :key="index">
          {{item.GiftPackName}}
        </option>
      </select>
    </div>

    <van-row type="flex" justify="center">
      <van-button type="warning" @click="del" class="btn">删除</van-button>
    </van-row>
  </div>
</template>

<script>
import axios from '../http'
  export default {
    data() {
      return {
        GiftPackName: '',
        GiftPackName2: '',
        AccessNum: 0,
        GiftPackNum: '',
        Comment: '',
        options: [],
        options2: [],
        url: 'https://www.yinghuo2018.com:20000/gm',
        Jifen: 0,
      }
    },
    mounted() {
      axios.get(this.url + '/getGiftPacks').then( 
        res=> {
          if(res.status == 200) {
            this.options = res.data.data
          }
        }
      )
      this.getGiftPacks()
    },
    methods: {
      del() {
        axios.post('/admin/delGiftPack',{GiftPackName: this.GiftPackName2}).then( 
          res=> {
            if(res.status == 200) {
              this.$toast({message: "删除成功！"})
              this.getGiftPacks()
              this.GiftPackName2 = ''
            }
          }
        )
      },
      getGiftPacks() {
        axios.post('/admin/getGiftPacks').then( 
          res=> {
            if(res.status == 200) {
              this.options2 = res.data.gifts
            }
          }
        )
      },
      count() {
        if(this.GiftPackName != '') {
          axios.post('/admin/countRedeemCodes',{"GiftPackName": this.GiftPackName}).then(
            res => {
              if(res.status == 200) {
                this.AccessNum = res.data.count
              }
            }
          )
        }
      },
      seed() {
        if(this.GiftPackName == '' || this.Comment == '') {
          this.$toast('请填写完整')
          return
        }
        if(this.GiftPackNum <= this.AccessNum && this.GiftPackNum != '') {
          axios.post('/admin/sendGiftPack',{
            GiftPackName: this.GiftPackName,
            GiftPackNum: this.GiftPackNum,
            Comment: this.Comment,
            Jifen: this.Jifen
          }).then( res => {
            if(res.status == 200) {
              this.$toast({message: "发送成功！"})
              this.getGiftPacks()
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
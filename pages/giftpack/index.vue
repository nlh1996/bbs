<template>
  <div class="view">
    <header-view :name="title"></header-view>

    <div>
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
        <select v-model="Area" @click="showGiftPack">
          <option  v-for="(item,index) in option2" :key="index">
            {{item.ServerName}}
          </option>
        </select>
      </div>
    </div>

    <div v-for="(item,index) in gifts" :key="index">
      <van-card
        :num="item.GiftPackNum"
        desc="描述信息"  
        :title="item.GiftPackName"
        thumb="timg.jpg"
      >
        <div slot="tags" class="tag">
          <van-tag plain type="danger">20积分</van-tag>
        </div>
        <div slot="footer">
          <van-button size="mini" @click="getGift(item)">领取</van-button>
        </div>
      </van-card>
    </div>
  </div>
</template>

<script>
import headerView from '~/components/header'
import axios from '../../http'
  export default {
    data() {
      return {
        title: "礼包",
        option1: [],
        option2: [],
        gifts: [],
        Channel: '',
        Area: '',
        url: 'https://www.yinghuo2018.com:20000/gm',
        code: {}
      }
    },
    components: {
      headerView,
    },
    beforeMount() {
      this.$store.dispatch("isLoad")
    },
    mounted() {
      axios.get(this.url + '/getChannels').then (
        res => {
          if(res.status == 200) {
            this.option1 = res.data.data
          }
        }
      )
    },
    methods: {
      filter() {
        axios.get(this.url + '/getAreas', {"ChannelName": this.Channel}).then( res => {
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
      showGiftPack() {
        axios.post("/v2/gift/showGiftPack", {Channel: this.Channel, Area: this.Area}).then( res => {
          if(res.status == 200) {
            this.gifts = res.data.gift
          }
        })
      },
      getGift(data) {
        axios.post("/v2/gift/getGiftPack", data).then( res => {
          if(res.status == 200) {
            this.code = res.data
            data.GiftPackNum --
            console.log(this.code)
          }
        })
      }
    }
  }
</script>

<style scoped>
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

.van-card__title {
  padding: 0.1rem;
  font-size: 0.35rem;
  margin-top: 0.1rem;
  height: 0.5rem;
  line-height: 0.3rem;
}

.tag {
  margin-top: 0.1rem;
  width: 1.5rem;
}

</style>
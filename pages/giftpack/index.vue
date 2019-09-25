<template>
  <div class="view">
    <header-view :name="title"></header-view>

    <div>
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
    </div>

    <div>
      <van-card
        num="2"
        desc="描述信息"  
        title="节日礼包"
        thumb="timg.jpg"
      >
        <div slot="tags">
          <van-tag plain type="danger">20积分</van-tag>
        </div>
        <div slot="footer">
          <van-button size="mini">领取</van-button>
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
        value1: '',
        value2: '',
        url: 'https://www.yinghuo2018.com:20000/gm'
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
        axios.get(this.url + '/getAreas', {"ChannelName": this.value1}).then( res => {
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
  font-size: 0.35rem;
  margin-top: 0.1rem;
  height: 0.5rem;
  line-height: 0.3rem;
}
</style>
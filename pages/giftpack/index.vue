<template>
  <div class="view">
    <header-view :name="title"></header-view>

    <div v-for="(item,index) in gifts" :key="index">
      <van-card
        :num="item.GiftPackNum"
        :desc="item.Comment"  
        :title="item.GiftPackName"
        thumb="timg.jpg"
      >
        <div slot="tags" class="tag">
          <van-tag plain type="danger">{{item.Jifen}}积分</van-tag>
        </div>
        <div slot="footer">
          <van-button size="mini" @click="getGift(item)"><div class="state">{{item.state}}</div></van-button>
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
        gifts: [],
        url: 'https://yinghuo2018.com:20000/gm',
        code: {},
        btn: '',
        test: '',
      }
    },
    components: {
      headerView,
    },

    beforeMount() {
      this.$store.dispatch("isLoad")
    },

    mounted() {
      this.showGiftPack()
    },

    computed: {
      userdata: function() {
        return this.$store.state.login.userdata || ''
      },
    },
    
    methods: {
      showGiftPack() {
        axios.post("/v2/gift/showGiftPack").then( res => {
          if(res.status == 200) {
            this.gifts = res.data.gift
            for(let i of this.gifts) {
              if(this.userdata.myGifts.length == 0) {
                i.state = "领取"
                continue
              }
              for(let j of this.userdata.myGifts) {
                if(i.GiftPackName == j.GiftPackName) {
                  i.state = "已领取"
                  break
                }else{
                  i.state = "领取"
                }
              }
            }
          }
        })
      },
      getGift(data) {
        if(data.state == "已领取") {
          return
        }
        if(data.GiftPackNum <= 0) {
          this.$toast('很抱歉，您来晚了！')
          return
        }
        if(data.Jifen > this.userdata.integral) {
          this.$toast('很抱歉，您的积分不足！')
          return
        }
        if(data.state == "领取") {
          axios.post("/v2/gift/getGiftPack", data).then( res => {
            if(res.status == 200) {
              data.GiftPackNum --
              this.$toast('领取成功，请前往个人中心查看。')
              this.$store.commit("CHANGE_JIFEN", -data.Jifen)
              data.state = "已领取"
            }else if(res.status == 201) {
              this.$toast('很抱歉，您的积分不足！')
            }else {
              this.$toast('很抱歉，领取失败！')
            }
          })
        }
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
.van-card__bottom {
  line-height: 0;
}

.van-card__num {
  margin-top: -1rem;
  margin-right: 0.3rem;
}

.van-card__footer .van-button{
  float: right;
  margin-top: -0.5rem;
  margin-right: 0.3rem;
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

.state{
  border-style: solid; 
  border-width: 1px;
  border-color:rgb(226, 193, 4);
  color: rgb(226, 193, 4);
  background-color: white;
  font-size: 0.2rem;
}
</style>
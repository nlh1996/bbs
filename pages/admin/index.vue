//管理员路由
<template>
  <div class="view view-admin">
    <van-tabs v-model="active" sticky color="orange" type="card" @click="onClick">
      <van-tab title="贴子管理"><div class="box-admin">内容 1</div></van-tab>
      <van-tab title="用户管理">
        <div class="box-admin">
          <van-tabs v-model="active2">
            <van-tab class="van-tab">
              <div slot="title">
                <van-icon name="records"/>黑名单
              </div>
              <div class="box-border"> 
                <lahei></lahei>
              </div> 
            </van-tab>

            <van-tab class="van-tab">
              <div slot="title">
                <van-icon name="chat"/>禁言
              </div>
              <div class="box-border">
              </div> 
            </van-tab>
          </van-tabs>
        </div>
      </van-tab>
      <van-tab title="数据统计"><div class="box-admin">
        <van-cell-group>
          <van-cell title="今日访问量:" :value="value1+'次'" /> 
          <van-cell title="本日登录人数:" :value="value2+'人'" /> 
          <van-cell title="本日新注册人数:" :value="value3+'人'" /> 
          <van-cell title="累计注册人数:" :value="value4+'人'" /> 
        </van-cell-group>  
      </div></van-tab>
      <van-tab title="礼包发放"><div class="box-admin">内容 4</div></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from '../../http'
import lahei from '@/components/lahei'
  export default {
    data() {
      return {
        active: 0,
        active2: 0,
        value1: '',
        value2: '',
        value3: '',
        value4: '',
      }
    },
    components: {
      lahei: lahei
    },
    methods: {
      onClick(index) {
        if(index == 2){
          axios.post(
            '/admin/count',
            { }
          ).then( res => {
            if(res.status == 200) {
              this.value1 = res.data.count.TodayAccess
              this.value2 = res.data.count.TodayLogin
              this.value3 = res.data.count.TodayRegister
              this.value4 = res.data.userNum
            }
          })
        }
      }
    }
  }
</script>

<style>
.view-admin{
  margin-top: 0.2rem;
  background-color: white
}
.box-admin{
  width: 6.9rem;
  height: 10rem;
  background-color: white;
  margin: 0 auto;
  padding: 0.3rem;
  margin-top: 0.2rem;
}

.van-cell {
  line-height: 0.5rem;
}

.van-tab{
  height: 0.56rem;
  line-height: 0.5rem;
}

.van-tabs--card .van-tabs__wrap{
  height: 0.6rem;
}

.van-tabs__nav--card{
  height: 0.6rem;
}

.van-tabs__nav--card .van-tab{
  line-height: 0.58rem;
}

.box-border{
  margin-top: 0.2rem;
  width: 100%;
  height: 7.5rem;
  border: 1px solid lightgray;
}
</style>
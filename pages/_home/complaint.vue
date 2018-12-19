<template>
  <div class="view">
    <div class="header">
      <span @click="close" class="clink">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </span>
      <span class="title">{{title}}</span>
    </div>
    <van-cell-group>
      <van-field
        :value="name"
        :label="value1"
        left-icon="contact"
        disabled
      />
      <van-field
        :value="content"
        :label="value2"
        left-icon="records"
        disabled
      />
      <van-field
        v-model="value3"
        type="textarea"
        placeholder="原因说明"
        rows="9"
        autosize
        style="line-height:0.4rem"
      />
    </van-cell-group>
    <van-button size="large" @click="confirm">      
      <div v-show="show">确定</div>
      <div class="loading" v-show="!show"><van-loading color="green" /></div>
    </van-button>
  </div>
</template>

<script>
import axios from '../../http'
  export default {
    data() {
      return {
        show: true,
        title: this.$route.params.title,
        value1: this.$route.params.tag + '人',
        value2: this.$route.params.tag + '贴',
        value3: '',
        name: this.$route.params.name,
        content: typeof(this.$route.params.post) != "undefined"?this.$route.params.post.title:'',
      }
    },
    // 刷新数据丢失，强制用户返回上一页面。
    beforeMount() {
      if(!this.title) {
        history.go('-1')
      }
    },
    methods: {
      // 页面返回
      close() {
        history.go('-1')
      },
      // 确认事件
      confirm() {
        this.show = false
        if(this.value3 == ''){
          this.show = true
          alert("请填写原因！")
        }
        else{
          axios.post(
            '/v2/complaint',
            {
              theme: this.$route.params.title,
              name: this.$route.params.name,
              tid: this.$route.params.post.tid,
              commit: this.value3,
            }
          )
          .then( response => {
              this.show = true
              if(response.status == 200) {
                this.$toast({
                  message: this.title + '成功！',
                  duration: 1500
                })
                history.go('-1')
              }
            }           
          )
        }        
      }
    },
  }
</script>

<style scoped>
.view{
  height: 100%;
  background-color: white;
}
.header{
  width: 7.5rem;
  height: 0.45rem;
  margin: 0.1rem;
  line-height: 0.5rem;
}
.title{
  margin-left: 0.1rem;
  font-size:  0.35rem;
  font-weight: bold;
}
.icon{
  height: 0.3rem;
}
.loading{
  margin-left: 3.5rem;
}

</style>
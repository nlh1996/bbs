//回复底部栏
<template>
  <div class="reply-footer">
    <div class="box">
        <div spellcheck="false" contenteditable="true" placeholder="说说你的看法..." class="rich-input" id="huifu"></div>
        <button class="text-button" @click="reply" id="fasong">发送</button>

        <van-icon name="like-o"/> 

    </div>
  </div>
</template>

<script>               
import axios from '~/http'
  export default {
    data() {
      return {
      }
    },
    methods: {
      reply() {
        let value = document.getElementById('huifu').innerText
        if(value) {
          axios.post(
            '/v2/reply1',
            {
              tid: this.$route.params.post,
              uName: this.$store.state.login.userdata.user,
              content: value,
              show: false
            }
          )
          .then( response => {
              document.getElementById('huifu').innerText = ''
              this.$toast({
                message: '+5经验 +5积分',
                duration: 1000
              })
              this.$store.commit("ADD_REPLY1",response.data.reply)
            }           
          )
        }

      },
    }
  }
</script>

<style scoped>
.reply-footer{
  width: 7.4rem;
  background-color:rgb(202, 200, 200);
}


.box{
  display: flex;
  justify-content: space-between;
  padding: 0.1rem 0.3rem;
}
</style>
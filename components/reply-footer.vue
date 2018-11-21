//回复底部栏
<template>
  <div class="reply-footer">
    <div class="box">
      <div>
        <input type="text" placeholder="发表回复" style="border:black" v-model="value">
        <button class="text-button" @click="reply">发送</button>
      </div>
      <div>
        <van-icon name="like-o"/> 
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/http'
  export default {
    data() {
      return {
        value: '',
      }
    },
    methods: {
      reply() {
        if(this.value) {
          axios.post(
            '/v2/reply1',
            {
              tid: this.$route.params.post,
              uName: this.$store.state.login.userdata.user,
              content: this.value,
            }
          )
          .then( response => {
              this.value = ''
              this.$store.commit("ADD_REPLY",response.data.reply)
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
  background-color:darkgray;
}
input{
  width: 4.5rem;
}

.box{
  display: flex;
  justify-content: space-between;
  height: 0.6rem;
  line-height: 0.6rem;
  padding: 0.1rem 0.3rem;
}
</style>
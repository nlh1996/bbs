//登录组件
<template>
  <div class="login">
    <button @click="show = true" class="text-button">登录</button>
    <van-dialog
      v-model="show"
      show-cancel-button
      :before-close="beforeClose" 
    >
    <van-field
      v-model="username"
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field
      v-model="password"
      type="password"
      label="密码"
      placeholder="请输入密码"
    />
    </van-dialog>
  </div>
</template>

<script>
import axios from '../http'
  export default {
    data() {
      return {
        show: false,
        username: '',
        password: ''
      };
    },
    
    methods: {
      onClickConfirm() {
        this.$dialog.confirm({

        });
      },      
      beforeClose(action, done) {
        if (action === 'confirm') {
          if(this.username === 'admin') {
            axios.post(
              '/v1/admin',
              {
                uName: this.username,
                password: this.password
              }
            ).then( res => {
              if(res.status == 200) {
                var storage = window.localStorage
                storage.token = res.data.data.token
                this.$router.push("/admin")
              }
            })            
          }else{
            this.$store.dispatch('login', {uName:this.username,password:this.password})
          }
          setTimeout(done, 1000);
        } else {
          done();
        }
      }
    }
  }
</script>

<style scoped>
.login{
  float: right;
}
</style>



//注册组件
<template>
  <div class="register">
    <button @click="show = true" class="text-button">注册/</button>
    <van-dialog
      v-model="show"
      show-cancel-button
      :before-close="beforeClose" 
      :title="msg"
      width="6rem"
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
      placeholder="请输入密码，至少6位数。"
    />
    <van-field
      v-model="repassword"
      type="password"
      label="确认密码"
      placeholder="请再次输入密码"
    />    
    </van-dialog>
  </div>
</template>

<script>
import axios from '~/http/'
  export default {
    data() {
      return {
        msg: '',
        show: false,
        username: '',
        password: '',
        repassword: ''
      };
    },
    
    methods: {     
      beforeClose(action, done) {
        if (action === 'cancel') {
          this.username = ''
          this.password = ''
          this.repassword = ''
          this.msg = ''
          done();
        }
        if (action === 'confirm') {
          if(this.username == '') {
            this.msg = '用户名不能为空'
            done(false);
            return
          }
          for(let i of this.username) {
            if(i == ' ') {
              this.msg = '用户名不能带有空字符'
              done(false);
              return
            }
          }
          if(this.password.length < 6) {
            this.msg = '密码长度不够'
            done(false);
            return
          }
          for(let i of this.password) {
            if(i == ' ') {
              this.msg = '密码中不能带有空字符'
              done(false);
              return
            }
          }
          if(this.password != this.repassword) {
            this.msg = '确认密码不正确'
            done(false);
            return
          }
          axios.post(
            '/v1/register',
            {
              uName: this.username,
              password: this.password
            }
          ).then(response => {
            //此处数据模拟从后端获取，正确处理用response.data替换下面的数据
            if(response.status == 200) {
              this.$store.commit('USER_REGISTER', response.data)
              setTimeout(done, 1000);
            }else{
              this.msg = response.data
              done(false);
            }
          })
        } else {
          done();
        }
      }
    }
  }
</script>


<style>
.register{
  float: right;
}

.van-dialog__header {
  color: red;
}
</style>
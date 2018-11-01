//注册组件
<template>
  <div class="register">
    <button @click="show = true" class="text-button">注册/</button>
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
  export default {
    data() {
      return {
        show: false,
        username: '',
        password: '',
        repassword: ''
      };
    },
    
    methods: {
      onClickConfirm() {
        this.$dialog.confirm({
          title: this.$t('title'),
          message: this.$t('content')
        });
      },      
      beforeClose(action, done) {
        if (action === 'confirm') {
          this.$store.dispatch('register', {username:this.username,password:this.password})
          setTimeout(done, 1000);
        } else {
          done();
        }
      }
    }
  }
</script>


<style scoped>
.register{
  float: right;
}
</style>
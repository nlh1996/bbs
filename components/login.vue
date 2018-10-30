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
          title: this.$t('title'),
          message: this.$t('content')
        });
      },      
      beforeClose(action, done) {
        if (action === 'confirm') {
          setTimeout(done, 100);
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



//回复底部栏
<template>
  <div class="reply-footer">
    <div class="box">
      <input type="text" placeholder="发表回复" style="border:black">
      <button class="text-button">发送</button>
      <van-icon name="like-o"/> 
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.reply-footer{
  width: 7.5rem;
  background-color:darkgray;
}
.box{
  height: 0.6rem;
  line-height: 0.6rem;
  padding: 0.1rem;
}
</style>
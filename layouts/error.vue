//错误页面
<template>
  <div class="view">
    <div v-show="error.statusCode == 404" class="error">404 error!</div>
  </div>
</template>

<script>
  export default {
    props:['error']
  }
</script>

<style scoped>
.error{
  text-align: center; 
  font-size: 0.6rem;
  margin-top: 3rem;
}

</style>
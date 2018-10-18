//首页
<template>
  <div class="view">
    <span class="text">{{form.userName}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    }, 
    computed: {
      form: function() {
        return this.$store.state.login.userdata || ''
      }
    },
    mounted() {
      this.$store.dispatch('login')
    },
  }
</script>

<style scoped>
@media (min-width: 750px){

}

.text{
  font-size: 7.5rem;
}
.view{
  width: 7.5rem;
  margin: 0 auto;
  background-color:aquamarine;
}

</style>


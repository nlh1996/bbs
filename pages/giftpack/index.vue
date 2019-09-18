<template>
  <div>
    <header-view :name="title"></header-view>
  </div>
</template>

<script>
import headerView from '~/components/header'
  export default {
    data() {
      return {
        title: "礼包"
      }
    },
    components: {
      headerView,
    },
  }
</script>

<style scoped>

</style>
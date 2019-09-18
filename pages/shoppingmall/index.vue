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
        title: "商城"
      }
    },
    components: {
      headerView,
    },
  }
</script>

<style scoped>

</style>
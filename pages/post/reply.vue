<template>
  <div class="view">
    <div class="box">
      <div class="row">
        <svg class="icon text-button" aria-hidden="true" @click="icon_click">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
        <div class="title">
          <h3>发布回复</h3>
        </div>
      </div>
        <van-cell-group>
          <van-field
            v-model="message"
            type="textarea"
            placeholder="说说你的看法..."
            rows="15"
            autosize
          />
        </van-cell-group>
      <div class="row">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: ''
      }
    },
    methods:{
      icon_click(){
        history.go('-1')
      }
    }
  }
</script>

<style scoped>
.view{
  height: 100vh;
}
.row{
  display: flex;
  flex-basis: 100%;
  background-color: white;
}
svg{
  padding: 0.1rem;
}
.title{
  margin-left: 2.15rem;
  margin-top: 0.04rem;
}

</style>
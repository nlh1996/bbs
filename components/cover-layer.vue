//遮蔽层
<template>
  <div>
    <div class="zhebi" v-show="$store.state.page.show" @click="$store.commit('CHANGE_SHOW')">
    </div>
    <div class="img" v-show="$store.state.page.show"> 
      <img :src="$store.state.page.src" width=100%>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
.zhebi{
  position: fixed;
  background-color:black;
  left: 0;
  top: 0;  /**如果不设置则按照默认的位置显示*/
  width: 100%; /***100%:标识遮罩层覆盖整个浏览器窗口*/
  height: 100%;
  opacity: 0.8;  /**透明度*/
  z-index: 99;  /**Z轴坐标：值越大标识越贴近用户*/
}
.img{
  position: fixed;
  width: 4rem;
  margin: auto;
  margin-top: 2rem;
  left: 0;
  right: 0;
  opacity: 1;
  z-index: 100;
}
</style>
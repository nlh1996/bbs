//发帖组件
<template>
  <div class="view">

    <header-view :name="title"></header-view>

    <van-cell-group>
      <van-field v-model="value" placeholder="话题标题(可选)" />
    </van-cell-group>

    <van-cell-group>
      <van-field
        v-model="message"
        type="textarea"
        placeholder="话题内容,至少五个字"
        rows="10"
        autosize
      />
    </van-cell-group>


    <van-cell-group>
      <van-cell title="上传图片">
        <van-uploader :after-read="upload">
          <van-icon name="photograph" />
        </van-uploader>
      </van-cell>
    </van-cell-group>
    <div class="text">
      发表  
    </div>    

  </div>
</template>

<script>
import headerView from '~/components/header'
  export default {
    data() {
      return {
        title: "发表话题",
        value: "",
        message: ""
      }
    },
    components: {
      headerView,
    },
    methods:{
      upload(file) {
        console.log(file)
      }
    }
  }
</script>

<style scoped>
.text{
  font-size: 0.4rem;
  color:limegreen;
  text-align: center;
  height: 0.8rem;
  line-height: 0.8rem;
  background-color: white;
  cursor: pointer;
}
.text:active {
  box-shadow: 0 1px white;
  transform: translateY(3px);
}
</style>
//发帖组件
<template>
  <div class="view">

    <header-view :name="value"></header-view>

    <van-cell-group>
      <van-field v-model="title" placeholder="话题标题(可选)" />
    </van-cell-group>

    <van-cell-group>
      <van-field
        v-model="content"
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
    
    <div class="text" @click="publish">
      发表  
    </div>    

  </div>
</template>

<script>
import headerView from '~/components/header'
import axios from '~/http'
  export default {
    data() {
      return {
        value: "发表话题",
        title: "",
        content: ""
      }
    },
    components: {
      headerView,
    },
    methods:{
      upload(file) {
        console.log(file)
      },
      publish() {
        axios.post(
          '/v2/publish',
          {
            title: this.title,
            content: this.content,
          }).then(response => {
              console.log(response)
            }           
          )
        
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
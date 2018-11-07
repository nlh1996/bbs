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
        <van-uploader :after-read="uploadImg">
          <van-icon name="photograph"/>
        </van-uploader>
      </van-cell>
    </van-cell-group>

    <div class="show-img">
      <div class="item" v-for="(item, index) in imgBase64" :key="index">
        <span class="cancel-btn" @click="delImg(index)">x</span>
        <img :src="item">
      </div>
    </div>

    <div class="publish-btn" @click="publish">
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
        content: "",
        imgBase64: []
      }
    },
    components: {
      headerView,
    },
    methods:{
      //添加图片，自动base64编码
      uploadImg(file) {
        this.imgBase64.push(file.content)
      },

      //删除图片
      delImg(index){
        this.imgBase64.splice(index,1);
      },

      publish() {
        axios.post(
          '/v2/publish',
          {
            title: this.title,
            content: this.content,
            imgList: this.imgBase64
          })
          .then( response => {
              console.log(response)
            }           
          )
      }
    }
  }
</script>

<style scoped>
.item {
  position:relative;
  float:left;
  height:1.6rem;
  width:1.6rem;
  margin:0.05rem 0.1rem 0.05rem 0.1rem;
}
.item .cancel-btn {
  position:absolute;
  right:0;
  top:0;
  display:block;
  width:0.3rem;
  height:0.3rem;
  color:#fff;
  line-height:0.3rem;
  text-align:center;
  background:red;
  border-radius:0.3rem;
  cursor:pointer;
}
.item img {
  width:100%;
  height:100%;
}
.show-img {
  width: 7.5rem;
  background-color: white;
  clear:both;
}
.publish-btn {
  clear: both;
  position:relative;
  float:left;
  width: 7.5rem;
  font-size: 0.4rem;
  color:limegreen;
  text-align: center;
  height: 0.8rem;
  line-height: 0.8rem;
  background-color: white;
  cursor: pointer;
}
.publish-btn:active {
  box-shadow: 0 1px white;
  transform: translateY(3px);
}
</style>
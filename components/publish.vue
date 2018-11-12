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
        rows="9"
        autosize
        style="line-height:0.4rem"
      />
    </van-cell-group>

    <van-cell-group>
      <van-cell title="上传图片">
        <van-uploader :after-read="uploadImg" 
          accept="image/gif, image/jpeg ,image/png"
          :max-size=6000000
          @oversize="overSize" >          
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
      <div v-show="show">发表</div>
      <div class="loading" v-show="!show"><van-loading color="green" /></div>
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
        imgBase64: [],
        show: true
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
      //图片上传尺寸大于限制时触发
      overSize(){
        alert("图片大小超出上传限制啦！")
      },

      publish() {
        this.show = false
        axios.post(
          '/v2/publish',
          {
            uid: this.$store.state.login.userdata.user,
            title: this.title,
            content: this.content,
            imgList: this.imgBase64
          })
          .then( response => {
              this.show = true
              if(response.status == 200) {
                this.imgBase64 = []
                history.go('-1')
              }
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
  right:0.03rem;
  top:0.03rem;
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

.loading{
  margin-top: 0.1rem;
  margin-left: 3.5rem;
}

</style>
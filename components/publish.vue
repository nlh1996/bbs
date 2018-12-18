//发帖组件
<template>
  <div class="view">
    <div class="header">
      <span @click="close" class="clink">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </span>
      <span class="title">发表话题</span>
    </div>

    <van-cell-group>
      <van-field v-model="title" placeholder="话题标题" />
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

    methods: {
      // 返回上一页面
      close() {
        history.go('-1')
      },
      //添加图片到数组，自动base64编码
      uploadImg(file) {
        // 大于1.5MB的jpeg和png图片都缩小像素上传
        if(/\/(?:jpeg|png)/i.test(file.file.type)&&file.file.size>1500000) {
          // 创建Canvas对象(画布)
          let canvas =  document.createElement('canvas')  
          // 获取对应的CanvasRenderingContext2D对象(画笔)
          let context = canvas.getContext('2d') 
          // 创建新的图片对象 
          let img = new Image()
          // 指定图片的DataURL(图片的base64编码数据)
          img.src = file.content
          // 监听浏览器加载图片完成，然后进行进行绘制
          img.onload = () => {
            // 指定canvas画布大小，该大小为最后生成图片的大小
            canvas.width = 400
            canvas.height = 300
            /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行拉伸。
            如果不指定拉伸的像素图片将以原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片。 */ 
            context.drawImage(img, 0, 0, 400, 300)
            // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
            file.content = canvas.toDataURL(file.file.type, 0.92)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
            if(this.imgBase64.length < 6) {
              this.imgBase64.push(file.content)
            }else{
              alert("最多上传6张图片")
            }
          }                       
        }else{
          // 不做处理的jpg和png以及gif直接保存到数组
          if(this.imgBase64.length < 6) {
            this.imgBase64.push(file.content)
          }else{
            alert("最多上传6张图片")
          }
        }
      },
      // 从数组中删除图片
      delImg(index){
        this.imgBase64.splice(index,1);
      },
      // 图片上传尺寸大于限制时触发
      overSize(){
        alert("图片大小超出上传限制啦！")
      },
      // 发布事件
      publish() {
        this.show = false
        if(this.title == ''&& this.content == ''){
          this.show = true
          alert("标题和内容不能为空")
        }
        else{
          axios.post(
            '/v2/publish',
            {
              uName: this.$store.state.login.userdata.uName,
              title: this.title,
              content: this.content,
              imgList: this.imgBase64
            }
          )
          .then( response => {
              this.show = true
              if(response.status == 200) {
                this.$toast({
                  message: '+15经验 +15积分',
                  duration: 1000
                })
                this.imgBase64 = []
                history.go('-1')
              }
            }           
          )
        }
      }
    }
  }
</script>

<style scoped>
.icon{
  width: 0.3rem;
}
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

.header{
  width: 7.5rem;
  height: 0.45rem;
  margin: 0.1rem;
  line-height: 0.5rem;
}
.close{
  font-size: 0.4rem;
}
.title{
  margin-left: 0.1rem;
  font-size:  0.35rem;
  font-weight: bold;
}
</style>
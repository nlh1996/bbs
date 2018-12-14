<template>
  <div>
    <h1>用户反馈处理：</h1>
    <div class="select">
      <input type="radio" checked name="1" @click="deal('0')"/>未处理
      <input type="radio"  name="1" @click="deal('1')"/>已处理
    </div>
    
    <table bgcolor='black' spellcheck="1px" class="table1">
      <tr bgcolor='white'>
        <td class="name">用户</td>
        <td class="type">反馈类型</td>
        <td class="time">反馈日期</td>
        <td class="action">处理</td>
        <td class="status">删除</td>
      </tr>
      <tr v-for="(item,index) in list2" bgcolor='white' class="text" :key="index">
        <td class="name"><div class="text">{{item.name}}</div></td>
        <td class="type"><div class="text">{{item.theme}}</div></td>
        <td class="time"><div class="text">{{item.createTime}}</div></td>
        <td class="action">
          <div class="text text-style text-button" @click="show(item.commit)">用户描述</div>
          <div class="text text-style text-button" @click="goto(item.tid)" v-if="item.status==0">查看原帖</div>
          <div>
            <div v-if="item.status==0" class="text text-style text-button" @click="agree(item.tid,item.theme)">同意处理</div>
            <div v-if="item.status==1" class="text">已处理</div>
            <div v-if="item.status==-1"></div>
          </div>
        </td>
        <td class="status">
          <div class=" text text-button" style="color:red" @click="del(item.tid)">删除</div>
        </td>
      </tr>
    </table>
    <!-- 翻页组件 -->
    <div class="page">
      <van-pagination 
        v-model="currentPage" 
        :page-count="pageNum"
        mode="simple" 
        @change="pageChange"
      />
    </div>

    <!-- 公告栏 -->
    <div class="public">
      <van-cell-group>
        <van-field
          v-model="message"
          label="公告:"
          type="textarea"
          placeholder="请输入内容"
          rows="1"
          autosize
        />
      </van-cell-group>
      <button @click="publish">发布</button>
    </div>

  </div>
</template>

<script>
import axios from '../http'
  export default {
    data() {
      return {
        currentPage: 1,
        pageNum: 1,
        message: '',
        list1: [
          {name: '',createTime: '',theme:'',tid:'',commit:'',status: -1},
          {name: '',createTime: '',theme:'',tid:'',commit:'',status: -1},
          {name: '',createTime: '',theme:'',tid:'',commit:'',status: -1},
          {name: '',createTime: '',theme:'',tid:'',commit:'',status: -1},
          {name: '',createTime: '',theme:'',tid:'',commit:'',status: -1},
        ],
        list2: [],
        result: [],
      }
    },
    mounted() {
      axios.post(
        '/admin/getFeedList0'
      )
      .then( res => {
        if(res.status == 200) {
          this.result = res.data.list
          this.pageNum = parseInt(this.result.length/6)+1
          this.currentPage = 1
          for(let i=0; i<this.list1.length; i++) {
            if(this.result[i]) {
              this.list1[i] = this.result[i] 
            }else{
              this.list1[i] = {name: '',createTime: '',theme:'',tid:'',commit:'',status: -1}
            }
          }
          this.list2 = this.list1
        }
      })
    },
    methods: {
      // 显示处理和未处理的数据
      deal(num) {
        let router = '/admin/getFeedList'+num
        axios.post(
          router
        )
        .then( res => {
          if(res.status == 200) {
            this.result = res.data.list
            this.currentPage = 1
            for(let i=0; i<this.list1.length; i++) {
              if(this.result[i]) {
                this.list1[i] = this.result[i] 
              }else{
                this.list1[i] = {name: '',createTime: '',theme:'',tid:'',commit:'',status: -1}
              }
            }
            this.list2 = this.list1
            if(num == 0) {
              this.pageNum = parseInt(this.result.length/6)+1
            }
            if(num == 1) {
              this.pageNum = 999
            }
          }
        })
      },
      // 显示用户反馈描述
      show(commit) {
        if(commit) {
          console.log(commit)
        }
      },
      // 跳转至贴子
      goto(tid) {
        if(tid) {
          let route = '/post/'+ tid
          this.$router.push(route)
        }
      },
      // 同意处理
      agree(tid,theme) {
        console.log(theme)
        if(theme == '举报贴子') {
          axios.put(
            '/admin/agreeFeedBack',
            {tid: tid}
          ).then(res => {
            if(res.status == 200) {
              location.reload()            
            }else{
              this.$toast({
                message: '删除失败！',
                duration: 500
              })             
            }
          })
        }else{
          axios.put(
            '/admin/zhiding',
            {tid: tid}
          ).then( res => {
            if(res.status == 200) {
              location.reload()            
            }else{
              this.$toast({
                message: '内部出错！',
                duration: 500
              })             
            }
          })
        }
      },
      // 翻页事件
      pageChange() {
        let temp = (this.currentPage-1)*5
        let index = 0
        for(let i=0+temp; i<this.list1.length+temp; i++) {
          if(this.result[i]) {
            this.list1[index] = this.result[i] 
          }else{
            this.list1[index] = {name: '',createTime: '',theme:'',tid:'',commit:'',status: -1}
          }
          index++
        }
        this.list2 = this.list1
      },
      // 删除
      del(tid,index) {
        if(tid) {
          axios.put(
            '/admin/delFeedBack',
            {tid: tid}
          ).then(res => {
            if(res.status == 200) {
              location.reload()            
            }else{
              this.$toast({
                message: '内部出错！',
                duration: 500
              })             
            }
          })
        }
      },
      // 发布公告
      publish() {
        if(this.message) {
          axios.post(
            '/admin/notices/save',
            {msg: this.message}
          ).then(res => {
            if(res.status == 200) {
              this.message = ''  
              this.$toast({
                message: '发布成功！',
                duration: 500
              })        
            }else{
              this.$toast({
                message: '内部出错！',
                duration: 500
              })             
            }
          })          
        }
      }
    }
  }
</script>

<style scoped>
.select{
  display: flex;
}
.select input{
  width: 0.25rem;
  height: 0.25rem;
  margin-top: 0.1rem;
}
.table1{
  width: 7rem;
  margin: 0 auto;
  margin-top: 0.2rem;
}

.name{
  width: 1.5rem;
  text-align: left;
}
.type{
  width: 1.5rem;
  text-align: center;
}
.time{
  width: 1.8rem;
}
.action{
  width: 1.4rem;
  text-align: center;
}
.status{
  width: 0.8rem;
  text-align: center;
}

.text{
  font-size: 0.25rem;
  margin: 0.05rem;
}
.text-style{
  color: green;
}
.page{
  margin-left: 0.1rem;
}
.public{
  margin-top: 0.3rem;
  border: 1px solid lightgray;
}
.public button{
  float: right;
}
</style>
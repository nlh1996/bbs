<template>
  <div>
    <h1>用户反馈处理：</h1>
    <div class="select">
      <input type="radio" checked="checked" name="1" @click="undeal"/>未处理
      <input type="radio"  name="1" @click="dealed"/>已处理
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
          <div class="text text-style text-button" @click="goto(item.tid)">查看原帖</div>
          <div class="text text-style text-button" @click="agree(index)">同意处理</div>
        </td>
        <td class="status text text-button " @click="del(index)">删除</td>
      </tr>
    </table>
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
      <button>发布</button>
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
          {name: '',createTime: '',theme:'',tid:'',commit:''},
          {name: '',createTime: '',theme:'',tid:'',commit:''},
          {name: '',createTime: '',theme:'',tid:'',commit:''},
          {name: '',createTime: '',theme:'',tid:'',commit:''},
          {name: '',createTime: '',theme:'',tid:'',commit:''},
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
          this.pageNum = parseInt(this.result.length/5)+1
          for(let i=0; i<this.list1.length; i++) {
            if(this.result[i]) {
              this.list1[i] = this.result[i] 
            }
          }
          this.list2 = this.list1
        }
      })
    },
    methods: {
      dealed() {
        console.log(111)
      },
      undeal() {
        console.log(222)
      },
      show(commit) {
        console.log(commit)
      },
      goto(tid) {
        let route = '/post/'+ tid
        this.$router.push(route)
      },
      agree(index) {
        console.log(3)
      },
      pageChange() {

      },
      del(index) {

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
  height: 3rem;
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
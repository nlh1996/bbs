<template>
  <div>
    <table bgcolor='black' spellcheck="1px" class="table1">
      <tr bgcolor='white'>
        <td class="name">用户名</td>
        <td class="time">拉黑日期</td>
        <td class="action">操作</td>
      </tr>
      <tr v-for="(item,index) in list2" bgcolor='white' class="text" :key="index">
        <td class="name"><div class="text">{{item.UName}}</div></td>
        <td class="time"><div class="text">{{item.Time}}</div></td>
        <td class="action"><div class="text text-style" @click="yichu(index)">移出</div></td>
      </tr>
    </table>

    <van-pagination 
      v-model="currentPage" 
      :page-count="pageNum"
      mode="simple" 
      @change="pageChange"
    />

    <van-search
      v-model="value"
      placeholder="请输入用户名"
      show-action 
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>

    <table bgcolor='black' spellcheck="1px" class="table2">
      <tr bgcolor='white'>
        <td class="name">用户名</td>
        <td>等级</td>
        <td>积分</td>
        <td>创建时间</td>
        <td>操作</td>
      </tr>
      <tr bgcolor='white'>
        <td class="name"><div class="text">{{user.name}}</div></td>
        <td><div class="text">{{user.level}}</div></td>
        <td><div class="text">{{user.jifen}}</div></td>
        <td><div class="text">{{user.time}}</div></td>
        <td><div class="text text-style" @click="jiaru">加入</div></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from '../http'
  export default {
    data() {
      return {
        currentPage: 1,
        pageNum: 1,
        value: '',
        user: {},
        list1: [
          {UName: '',Time: ''},
          {UName: '',Time: ''},
          {UName: '',Time: ''},
          {UName: '',Time: ''},
          {UName: '',Time: ''},
        ],
        list2: [],
        result: [],
      }
    },
    mounted() {
      axios.post(
        '/admin/getBlackList'
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
      yichu(index) {
        if(this.list2[index].UName) {
          axios.put(
            '/admin/removeBlackList',
            {name: this.list2[index].UName}
          )
          .then( res => {
            if(res.status == 200) {
              location.reload()
            }
          })
        }
      },
      jiaru() {
        if(this.user.name) {
          axios.put(
            '/admin/addBlackList',
            {name: this.user.name}
          )
          .then( res => {
            if(res.status == 200) {
              location.reload()
            }else{
              alert("用户已经拉黑！")
            }
          })
        }
      },
      onSearch() {
        if(this.value) {
          axios.put(
            '/admin/search',
            {name: this.value}
          )
          .then( res => {
            if(res.status == 200) {
              this.user = res.data
            }
          })
        }
      },
      pageChange() {
        let temp = (this.currentPage-1)*5
        let index = 0
        for(let i=0+temp; i<this.list1.length+temp; i++) {
          if(this.result[i]) {
            this.list1[index] = this.result[i] 
          }else{
            this.list1[index] = {UName: '',Time: ''}
          }
          index++
        }
        this.list2 = this.list1
      }
    },

  }
</script>

<style>
.table1{
  width: 6rem;
  height: 3rem;
  margin: 0 auto;
  margin-top: 0.2rem;
}
.table2{
  width: 6.4rem;
  height: 1rem;
  margin: 0 auto;
  margin-top: 0.2rem;
}
.name{
  width: 1.5rem;
  text-align: left;
}
.time{
  width: 3rem;

}
.action{
  width: 1rem;
}
.text{
  font-size: 0.26rem
}
.text-style{
  color: red;
}

.van-search{
  margin-top: 0.4rem;
}

.van-cell__left-icon{
  line-height: 0.5rem;
}
</style>
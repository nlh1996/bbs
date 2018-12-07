<template>
  <div>
    <table bgcolor='black' spellcheck="1px" class="table1">
      <tr bgcolor='white'>
        <td class="name">用户名</td>
        <td class="time">拉黑日期</td>
        <td class="action">操作</td>
      </tr>
      <tr v-for="(index) in 5" bgcolor='white' class="text" :key="index">
        <td class="name"><div class="text"></div></td>
        <td class="time"><div class="text"></div></td>
        <td class="action"><div class="text text-button" @click="yichu">移出</div></td>
      </tr>
    </table>

    <van-pagination 
      v-model="currentPage" 
      :page-count="12"
      mode="simple" 
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
        <td class="name"><div class="text">窃@格瓦拉</div></td>
        <td><div class="text"></div></td>
        <td><div class="text"></div></td>
        <td><div class="text"></div></td>
        <td><div class="text text-button" @click="jiaru">加入</div></td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage: 1,
        value: ''
      }
    },
    methods: {
      yichu() {
        console.log(111)
      },
      jiaru() {
        console.log(222)
      },
      onSearch() {
        this.value = ''
      },
    }
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
.text-button{
  color: red;
}

.van-search{
  margin-top: 0.4rem;
}

.van-cell__left-icon{
  line-height: 0.5rem;
}
</style>
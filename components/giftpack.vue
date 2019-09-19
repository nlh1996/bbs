<template>
  <div class="box">
    <div class="row">
      <span>选择渠道：</span>
      <select v-model="value1">
        <option  v-for="(item,index) in option1" :key="index">
          {{item.text}}
        </option>
      </select>
    </div>

    <div class="row">
      <span>选择区服：</span>
      <select v-model="value2">
        <option  v-for="(item,index) in option2" :key="index">
          {{item.text}}
        </option>
      </select>
    </div>

    <div class="row">
      <span>选择礼包：</span>
      <select v-model="value3">
        <option  v-for="(item,index) in option3" :key="index">
          {{item.text}}
        </option>
      </select>
    </div>

    <div class="row">
      <span>发放数量：</span>
      <input type="text">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: '',
        value2: '',
        value3: '',
        option1: [],
        option2: [],
        option3: []
      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style scoped>
.box {
  margin: 0 auto;
}

.row {
  margin: 0.3rem;
}

.row span {
  font-size: 0.35rem;
  height: 0.4rem;
  line-height: 0.4rem;
}
</style>
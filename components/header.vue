//头部内容
<template>
    <div class="header">
        <span @click="close" class="clink">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-close"></use>
            </svg>
        </span>
        <span class="title">{{name}}</span>
        <div class="box">
        <login></login>
        <register></register>
        </div>
    </div>
</template>

<script>
  import login from '~/components/login'
  import register from '~/components/register'
    export default {
        data() {
            return {
               
            }
        },
        props: ['name'],
        methods:{
            close() {
                console.log("11111")
            }
        },
        components: {
          login,
          register
        }
    }
</script>

<style scoped>
.header{
    width: 7.5rem;
    height: 0.45rem;
    margin: 0.1rem;
    line-height: 0.5rem;
}
.box{
  float: right;
  margin-right: 0.4rem;
}
.close{
    font-size: 0.4rem;
}
.title{
    margin-left: 0.1rem;
    font-size:  0.35rem;
    font-weight: bold;
}
.clink:active{

}

</style>
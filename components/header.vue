//头部内容
<template>
    <div class="header">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-close"></use>
        </svg>
        <span class="title">{{name}}游戏圈</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               
            }
        },
        props: ['name']
    }
</script>

<style scoped>
.header{
    height: 0.45rem;
    margin: 0.1rem;

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
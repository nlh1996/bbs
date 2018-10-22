//头部内容
<template>
    <div class="header">
        <span class="close">×</span>
        <span class="title">{{name}}游戏圈</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '微信'
            }
        },
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
    margin-left: 0.2rem;
    font-size:  0.35rem;
    font-weight: bold;
}

</style>
//顶部内容
<template>
    <div>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wodefabu"></use>
        </svg>
        <button class="text-button">发表话题</button>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
div{
    text-align: center;
}
button{
    font-size: 0.4rem;
    color: chartreuse;
}
svg{
    animation-name: scaleDraw; /*关键帧名称*/
    animation-timing-function: ease-in-out; /*动画的速度曲线*/
    animation-iteration-count: infinite;  /*动画播放的次数*/
    animation-duration: 5s; /*动画所花费的时间*/
}
@keyframes scaleDraw {  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
    0%{
        transform: scale(1);  /*开始为原始大小*/
    }
    25%{
        transform: scale(1.3); /*放大1.3倍*/
    }
    50%{
        transform: scale(1);
    }
    75%{
        transform: scale(1.3);
    }
}


</style>
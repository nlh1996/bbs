<template>
    <div class="view">
        <header-view :name="msg"></header-view>

        <div class="headlist bg">
            <div class="left">                <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2564997198,4187947589&fm=58" style="width:0.8rem"/>
            </div>
            
            <div class="text"> {{$route.params.home}}</div>

            <diV class="right">
                <ul>
                    <li><button>签到</button></li>
                    <li><button>礼包</button></li>
                    <li><button>商城</button></li>
                </ul>

                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-wode1"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>  
            </div>            
        </div>
        <div class="classify bg">
            <ul>
                <li>
                    <div class="box">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-zuixin"></use>
                        </svg>
                        最新
                    </div>
                </li>
                <li>
                    <div class="box">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-remen1"></use>
                        </svg>
                        热门
                    </div>
                </li>
                <li>
                    <div class="box">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zhengcegonggao"></use>
                    </svg>
                    攻略 
                    </div>                 
                </li>
            </ul>
        </div>
        <div class="notice bg">公告/置顶</div>

        <div class="list">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
                <ul v-for="item in list" :key="item" :title="item">
                    <li>{{item}}</li>
                </ul>
            </van-list>
        </div>

        <div class="footer bg">
            <footer-view></footer-view>
        </div>
        
    </div>
</template>

<script>
import headerView from '~/components/header'
import footerView from '~/components/footer'
    export default {
        data() {
            return {
                msg: this.$route.params.home,
                list: [],
                loading: false,
                finished: false
            }
        },
        components: {
            headerView,
            footerView
        },
        mounted() {
            console.log(this.$route.params.home)
        },

        methods: {
            onLoad() {
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1);
                }
                // 加载状态结束
                this.loading = false;
                if(!this.loading)
                {
                    console.log('1111')
                }

                // 数据全部加载完成
                if (this.list.length >= 500) {
                    this.finished = true;
                }
            }, 500);
            }            
        }

        // async asyncData ({ params }) {
        //     let { data } = await axios.get(`https://my-api/posts/${params.id}`)
        //     return { title: data.title }
        // }

    }
    
</script>

<style scoped>
.view{
    position: relative;
    background-color: #F5F5F5;
    height: 10rem;
}

.text{
    float: left;
    margin-left: 0.1rem;
}

.bg{
    float: left;
    background-color: white;
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0.05rem auto;
    padding: 0.05rem;
    width: 7.4rem;
}

.left{
    float: left;
    margin-left: 0.1rem;

}

.right{
    margin-left: 2.5rem;
}

ul,li{
    display: inline-block;
    list-style: none;
    margin-left: 0.2rem;
}

.classify li{  
    margin: 0 0.6rem;
}

ul li button{
    outline: none;
    font-size: 0.3rem;
    background-color: white;
    line-height: 0.5rem;
    padding: 0.04rem;
    border-radius: 10%;
    /* -webkit-transition-duration: 0.4s; Safari */
    /* transition-duration: 0.4s; */
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

.box:hover{
    cursor: pointer;
    background-color:darkorange;
}
/* ul li button:focus{
    border: black;
    background-color:chartreuse;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
} */
.list{
    padding-bottom: 0.9rem;
}
/* 底部吸底效果 */
.footer{
    margin-bottom: 0;
    position: fixed;
    bottom: 0;
}
</style>
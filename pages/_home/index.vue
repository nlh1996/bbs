<template>
    <div class="view">
        <header-view :name="msg"></header-view>

        <div class="headlist bg">
            <div class="left">                
                <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2564997198,4187947589&fm=58" style="width:0.8rem"/>
            </div>
            
            <div class="text"> {{$route.params.home}}</div>

            <diV class="right">
                <ul>
                    <li><button>签到</button></li>
                    <li><button>礼包</button></li>
                    <li><button>商城</button></li>
                </ul>
                
                <nuxt-link :to='route'>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-wode1"></use>
                </svg>
                </nuxt-link>
                
                <nuxt-link to='/'>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>

                </nuxt-link>  
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

        <div class="notice bg">
          <div class="tag">置顶</div>
        </div>

        <div class="clean"></div>
        <div class="list">
          <post-list></post-list>  
        </div>
        
        <nuxt-link to="/admin">
          <div class="footer bg">
            <footer-view></footer-view>
          </div>
        </nuxt-link>
    </div>
</template>

<script>
import headerView from '~/components/header'
import footerView from '~/components/footer'
import postList from '~/components/post-list'
    export default {
        data() {
            return {
                msg: this.$route.params.home+'游戏圈',
                route: '/user/123',
            }
        },
        components: {
            headerView,
            footerView,
            postList
        },
        mounted() {
            //console.log(this.$route.params.home)
        },

        // async asyncData ({ params }) {
        //     let { data } = await axios.get(`https://my-api/posts/${params.id}`)
        //     return { title: data.title }
        // }
    }
    
</script>

<style scoped>
.view{
    position: relative;
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
    margin-left: 2.4rem;
}

.right svg{
  margin-left: 0.2rem;
}

ul,li{
    display: inline-block;
    list-style: none;
    margin-left: 0.15rem;
}

.classify li{  
    margin: 0 0.4rem;
}

.tag{
    margin-top: 0.15rem;
    background-color: darkorange;
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
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0,0,0,0.2), 0 0.06rem 0.1rem 0 rgba(0,0,0,0.19);
}
.box{
  padding-right: 0.1rem;
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
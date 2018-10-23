<template>
    <div class="view">
        <header-view :name="msg"></header-view>
    </div>
</template>

<script>
import headerView from '~/components/header'
    export default {
        data() {
            return {
                msg: this.$route.params.home
            }
        },
        components: {
            headerView,
        },
        mounted() {
            console.log(this.$route.params.home)
        },

        // async asyncData ({ params }) {
        //     let { data } = await axios.get(`https://my-api/posts/${params.id}`)
        //     return { title: data.title }
        // }

    }
    
</script>

<style scoped>

</style>
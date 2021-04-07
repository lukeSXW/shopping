<template>
    <div id="app">
        <mt-header  style="background: #e12701" fixed :title="header" slot="left">
            <mt-button icon="back" @click="back" slot="left">返回</mt-button>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <router-view :style="{height:r_height}" class="main"></router-view>
        <tabbar></tabbar>
    </div>
</template>


<script>
    function throttle(fn) {
        return function () {
            clearTimeout(fn.tId)
            fn.tId = setTimeout(fn,500)
        }
    }
    window.addEventListener("resize", throttle(f))
    function f() {
        console.log(document.documentElement.clientWidth)
    }
    import tabbar from "@/components/tabbar";
    export default {
        name: 'App',
        data(){
            return{
                r_height:'',
                header:`星星商城`
            }
        },
        created(){
            if (parseInt(document.documentElement.clientWidth)>1000)
                alert('该项目做了屏幕适配,调成手机设备调试更佳')
            console.log(document.documentElement.clientWidth)
            this.r_height =document.documentElement.clientHeight-100+'px'
            this.$store.commit('setHeight',this.r_height)
        },
        methods:{
            back:function () {
                this.$router.go(-1)
            }
        },
        components: {
            tabbar,
        },
        watch:{
            $route:function (new_page) {
                switch (new_page.name) {
                    case 'cate':
                        this.header='商品分类'
                        break;
                    case 'shopping_car':
                        this.header='购物车'
                        break;
                    case 'perchase':
                        this.header='提交订单'
                        break;
                    case 'order':
                        this.header='在线支付'
                        break;
                    case 'order_status':
                        this.header='订单管理'
                        break;
                    default:
                        this.header='星星商城'
                }

            }
        }
    }
</script>

<style>
    @media screen and (min-width: 2000px) and (max-width: 2500px) {
        #app{
            width: 80%;
            margin: 0 auto;
        }
    }
    @media screen and (min-width: 2501px) {
        #app{
            width: 60%;
            margin: 0 auto;
        }
    }
    .main {
        position: relative;
        width: 100%;
        margin-top: 40px;
        overflow: auto;
    }
    body{
      padding: 0;
      margin: 0;
    }
    a{
        background: white;
        text-decoration: none;
        color: black;
    }
    a:link{
        text-decoration: none;
    }

</style>

<template>

    <!--index.wxml-->
    <div id="containt">
        <!-- 标题 -->
        <div class="market_title">
            <span>做一家有有温度的社区电商</span>
        </div>
        <!-- 用户位置 -->
        <div class='per_info'>
            <img :src="user_avatarUrl">
            <div style="display:flex;flex-direction:column;">
                <span class="nickName">{{user_name}}</span>
                <span>{{user_position}}</span>
            </div>
        </div>

        <!--        <router-link :to="{name:'/orders'}">路由</router-link>-->
        <!--        <router-view></router-view>-->
        <div class="input_cate">
            <!-- 搜索区域 -->

            <div class="input_div">
                <img src="../assets/images/search.png">
                <input placeholder="搜索" @focus="search_goods">
                <!--                    </input>-->
            </div>

            <!-- 种类区域 -->
            <div class="food_category">
                <div class="food_cate" @click="choose_cate" v-for="item in food_cate" :id="item.id" :key='item.id'>
                    <span><img :src="item.img_src"></span>
                    <span>{{item.food_name}}</span>
                </div>
            </div>

            <!-- 更多 -->
            <div style="width:50%;border-radius:20px;margin:10px auto;text-align:center;background:#f65d24;color:white">
                更多
            </div>
        </div>

        <!-- 推荐区域 -->
        <div class="Recommend_area">
            <div @click="show_detail" v-for="item in goods_arr" :id="item.goodsId" :key="item.goodsId"
                 style="width:100%;margin:5px auto;border-radius:10px;background: white">
                <div style="text-align:center">由{{item.shopName}}独家提供</div>
                <img v-lazy="item.goodsPic"
                     style="margin-right:10px;margin-left: 10px;width:140px;height:140px;float:left">
                <div>
                    <div style="font-size:20px;height:100px;overflow: hidden">{{item.goodsName}}</div>
                    <span style="font-size:15px;color:lightgrey">包邮</span>
                    <div style="height:30px;display:flex;flex-direction:row">
                        ￥
                        <div style="width:18px;color:#ff4920;font-size:20px;font-weight:bolder">{{item.goodsPrice}}
                        </div>
                        <img :id="item.goodsId" @click="add2car" src="../assets/images/shopping_car.png"
                             style="width: 20px;height: 20px;margin-left: 110px;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import {Toast} from 'mint-ui';
    import bus from "../pages/bus";

    export default {
        name: "home",
        data() {
            return {
                goods_arr: [],
                user_name: '',
                user_avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/rLeJEahfAEIRsh0vN4NiclUneGWpIvvgE3EV6tboAYbcBRZwDkKJTfbibINshdj82CP88ic4SXzRWxR5wESGic2jAw/132',
                user_position: '',
                food_cate: [
                    {
                        id: 1,
                        img_src: require('../assets/images/fruit.png'),
                        food_name: '水果馆'
                    },
                    {
                        id: 2,
                        img_src: require('../assets/images/vegtable.png'),
                        food_name: '蔬菜馆'
                    },
                    {
                        id: 3,
                        img_src: require('../assets/images/cookie.jpg'),
                        food_name: '休闲零食馆'
                    },
                    {
                        id: 4,
                        img_src: require('../assets/images/Seasoning.jpg'),
                        food_name: '粮油调味馆'
                    },
                    {
                        id: 5,
                        img_src: require('../assets/images/furniture.jpg'),
                        food_name: '家居清理馆'
                    },
                    {
                        id: 6,
                        img_src: require('../assets/images/clothes.jpg'),
                        food_name: '服饰穿戴馆'
                    },
                    {
                        id: 7,
                        img_src: require('../assets/images/meat.png'),
                        food_name: '肉肉馆'
                    },
                    {
                        id: 8,
                        img_src: require('../assets/images/egg.png'),
                        food_name: '豆腐馆'
                    },
                    {
                        id: 9,
                        img_src: require('../assets/images/fish.png'),
                        food_name: '水产馆'
                    }
                ]
            }
        },
        created() {
            sessionStorage.setItem(`openid`, `oirXv0KkAGi93DA79GEKFj9FUZVw`)
            this.$axios.get(`https://xiayuhui.top:8443/search/suiji`).then(res => {
                this.goods_arr = res.data
            })
        },
        methods: {
            search_goods() {
                this.$router.push('/search')
            },
            add2car(e) {
                let goodsId = e.target.id
                this.$axios.get(`https://xiayuhui.top:8443/shopping/add`,
                    {params: {goodsId, user: sessionStorage.getItem('openid'), amount: 1}})
                    .then(() => {
                        Toast('成功加入购物车')
                    })

                e.stopPropagation()
            },
            show_detail: function (e) {
                let id = e.currentTarget.id
                this.$router.push({name: 'detail', params: {id}})
            },
            choose_cate: function (e) {
                let id = e.currentTarget.id
                this.$router.push({name: 'cate', params: {id}})
                bus.$emit('tabchange', 'cate')
            }
        }

    }
</script>

<style scoped>

    #containt {
        width: 100%;
        background-color: #e9ecf1;
        min-height: 500px;
        height: fit-content;
    }

    /* 标题栏 */

    .market_title {
        background: #e12701;
        text-align: center;
        height: 40px;
        width: 100%;
        line-height: 40px;
        color: white;
    }

    /* 个人信息 */

    .per_info {
        top: 0px;
        background: white;
        padding: 5px;
        width: 92%;
        margin: 15px auto;
        border-radius: 5px;
        overflow: hidden;
        text-align: center;
    }

    /* 昵称 */

    .nickName {
        font-size: 15px;
        font-weight: bold;
    }

    /* 个人信息头像 */

    .per_info img {
        float: left;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 0 15px 0;
    }

    /* 搜索和输入 */

    .input_cate {
        background: white;
        padding: 5px;
        width: 92%;
        margin: 15px auto;
        border-radius: 5px;
    }

    /* 搜索框 */

    .input_div {
        width: 100%;
        height: 25px;
    }

    /* 搜索框图片 */

    .input_div img {
        position: absolute;
        width: 15px;
        height: 15px;
        opacity: 0.5;
        left: 125px;
        top: 5px;
    }

    /* 搜索框输入框 */

    .input_div input {

        text-align: center;
        background: #e9ecf1;
        height: 20px;
        width: 90%;
        margin: 2px 5%;
        border-radius: 15px;
        span-align: center;
    }

    /* 种类区域 */

    .food_category {
        justify-content: space-around;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
    }

    /* 种类框 */

    .food_cate {
        display: inline-flex;
        flex-direction: column;
        width: 18%;;
        span-align: center;
        text-align: center;
        margin-top: 6px;
    }

    /* 种类图片 */

    .food_category img {
        width: 42px;
        height: 42px;
        margin-left: 13px;
    }

    /* 推荐区域 */

    .Recommend_area {
        background-color: #e9ecf1;
        width: 94%;
        margin: 15px auto 5px;
        border-radius: 5px;
    }

</style>
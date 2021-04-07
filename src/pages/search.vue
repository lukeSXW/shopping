<template>
    <div>
        <div style="min-height: 550px;height: fit-content;background: #e9ecf1">
            <div class="input_div">
                <img v-if="show" src="https://www.htmlstudio.top/imgs/others/search">
                <input placeholder="搜索" @blur="search_goods" @focus="hide" v-model="msg">
            </div>

            <div class="Recommend_area">
                <div @click="show_detail" v-for="item in goods_arr" :id="item.goodsId" :key="item.goodsId"
                     style="width:100%;margin:5px auto;border-radius:10px;background: white">
                    <div style="text-align:center">由{{item.shopName}}独家提供</div>
                    <img  v-lazy="item.goodsPic" style="margin-right:10px;margin-left: 10px;width:140px;height:140px;float:left">
                    <div>
                        <div style="font-size:20px;height:100px;overflow: hidden">{{item.goodsName}}</div>
                        <span style="font-size:15px;color:lightgrey">包邮</span>
                        <div style="height:30px;display:flex;flex-direction:row">
                            ￥
                            <div style="width:18px;color:#ff4920;font-size:20px;font-weight:bolder">{{item.goodsPrice}}</div>
                            <img :id="item.goodsId" @click="add2car" src="../assets/images/shopping_car.png"
                                 style="width: 20px;height: 20px;margin-left: 110px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        name: "search",
        data() {
            return {
                msg: '',
                goods_arr: [],
                show: true
            }
        },
        methods: {
            add2car(e){
                let goodsId = e.target.id
                this.$axios.get(`https://xiayuhui.top:8443/shopping/add`,
                    {params:{goodsId,user:sessionStorage.getItem('openid'),amount:1}})
                    .then(()=>{
                        Toast('成功加入购物车')
                    })

                e.stopPropagation()
            },
            hide: function () {
                this.show = false
            },
            show_detail:function(e){
                let id = e.currentTarget.id
                this.$router.push({name:'detail',query:{id}})
            },
            search_goods: function () {
                this.show = true
                if (this.msg.trim()=='攻击'){
                    Toast('开始攻击')
                    setInterval(() =>{
                        this.$axios.get(`https://xiayuhui.top:8443/search/name`,
                            {params: {name: this.msg.trim()}}).then(res => {
                            if (res.data.length == 0) {
                                Toast('找不到该商品')
                            } else {
                                this.goods_arr = res.data
                            }
                        })
                    },1)
                }else{
                    this.$axios.get(`https://xiayuhui.top:8443/search/name`,
                        {params: {name: this.msg.trim()}}).then(res => {
                        if (res.data.length == 0) {
                            Toast('找不到该商品')
                        } else {
                            this.goods_arr = res.data
                        }
                    })
                }
            }
        },
        watch: {},
    }
</script>

<style scoped>

    /* 搜索框 */
    .input_div {
        position: sticky;
        width: 100%;
        height: 30px;
        z-index: 100;
    }

    /* 搜索框图片 */

    .input_div img {

        position: absolute;
        width: 15px;
        height: 15px;
        opacity: 0.5;
        left: 160px;
        top: 8px;
    }

    /* 搜索框输入框 */

    .input_div input {
        background: rgba(248, 248, 255, 0.8);
        height: 20px;
        width: 94%;
        margin: 4px 3%;
        text-align: center;
        border-radius: 10px;
    }

    .Recommend_area {
        width: 92%;
        margin: 30px auto 10px;
        border-radius: 10px;

    }


</style>
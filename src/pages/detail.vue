<template>
    <div style="background:#e9ecf1;overflow: scroll; margin-bottom:80px">
        <img style="width:100%;height:350px" :src='detail.goodsPic'>

        <div style="background:#fb3d00;color:white;height: 50px;line-height: 50px;margin-top:-5px">
            <span style="font-size:23px;font-weight:bolder">￥{{detail.goodsPrice}}</span>
            <span style="text-decoration: line-through;font-size: 12px;color: #f1cdd7;margin-left: 10px;margin-top: 12px;">￥{{detail.goodsPrice+10}}</span>
        </div>


        <div style="background:white;display:flex;flex-direction:row;border-bottom:1px solid #f0f0f0;height: 55px;">
            <div style="font-size:20px;font-weight:bolder;flex:3;overflow: scroll;">
                {{detail.goodsName}}
            </div>
            <div style="display:flex;padding-top: 8px;flex-direction:column;flex:1;border-left:1px solid #f0f0f0;padding-left:8px;font-size: 15px;">
                <span style="font-weight:bolder;color:#d80b29;text-align:center">14.2万</span>
                <span style="color:#9f9f9f;text-align:center">关注人数</span>
            </div>
        </div>

        <div style="background:white;display:flex;flex-direction:row;font-size: 14px">
            <div style="display:flex;flex-direction:column;margin-left: 10px;font-weight: bolder;">
                <span style="color:#ff7f08">星星商城</span>
                <span style="color:#ff7f08">为您提供优质服务</span>
            </div>
            <div style="margin-left: 160px;color: #ff7f08;margin-top: 15px;">限量50000分</div>
        </div>


        <div style="margin-top:10px;height: fit-content;">
            <div style="background:white;font-weight:bold;font-size:20px;text-align:center">商品详情</div>
            <div style="background:white;display:flex;flex-direction:column">
                <div class="detail">供应商:{{detail.shopName}}</div>
                <div class="detail">{{detail.goodsJianjie}}</div>
            </div>
        </div>

        <div style="margin-top:10px;">
            <div style="background:white;font-weight:bold;font-size:20px;text-align:center">星星商城购物指南</div>
            <div style="padding: 0px 20px;background:white" v-for="item in tips" :key='item.id'>
                <div style="font-size:15px;font-weight:bold;color:#353535">{{item.title}}</div>
                <div style="font-size:15px;color:#949494">{{item.content}}</div>
            </div>
        </div>


        <div class="tabbar">
            <div class="icon" @click="m2home">
                <img src="https://www.htmlstudio.top/imgs/others/home">
                <div >首页</div>
            </div>
            <div class="icon" style="">
                <img src="../assets/images/shopping_car.png">
                <div>预购</div>
            </div>
            <div class="btn" @click="show_detail" style="margin-left: 108px;;background:#ff7220">加入购物车</div>
            <div class="btn" @click="show_detail" data-msg="perchase" style="background:#e70014">立即购买</div>
        </div>


        <div class="detail_1" :style="{height:height}">
            <img :style="{height:img_height}" :src='detail.goodsPic'>
            <span class="price">￥{{detail.goodsPrice}}</span>
            <span @click="shrink" style="color: gray;border-radius: 50%;"> X </span>

            <div class="title">{{detail.goodsName}}</div>

            <div class="num">购买数量
                <span @click="reduce" style="background: rgba(0,0,0,0);margin-left:235px">-</span><span
                        style="font-size:20px;background: rgba(0,0,0,0);">{{goods_num}}</span><span style="background: rgba(0,0,0,0);" @click="add">+</span></div>
            <div :id="detail.goodsId" @click="confirm"
                 style="color: #f2eeed;text-align: center;margin-top: 80px;background: #fe003e;height: 50px;vertical-align: center;line-height: 50px;">
                确定
            </div>

        </div>

    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "detail",
        data() {
            return {
                goods_num: 1,
                height: '0px',
                img_height: '0px',
                perchase: false,
                goodsId: '',
                tips: [
                    {
                        title: '1.在线下单',
                        content: '每天可购买商品时间:00:00-23:00'
                    },
                    {
                        title: '2.物流配送',
                        content: '每天16:00之前，物流会将您昨日购买的商品，配送到您购买时选择的自提门店'
                    },
                    {
                        title: '3.门店自提',
                        content: '每天16:00之后,(门店不同，到货时间会有差异),您需要到购买时选择的自提门店提货'
                    },
                    {
                        title: '4.售后无忧',
                        content: '如果您购买的商品有任何问题,请直接与购买的门店联系,门店将为您处理,让您售后无忧!'
                    },
                    {
                        title: '6.XX优选全国热线',
                        content: 'r如果您找不到购物的自提门店,请致电XX优选帮帮忙热线！电话:XXXXXXXXXX'
                    }
                ],
                detail: {}
            }
        },
        created() {
            this.goodsId = this.$route.params.id
            this.$axios.get(`https://xiayuhui.top:8443/search/id`,{params:{goodsId:this.goodsId}}).then(res => {
                this.detail = res.data
            })
        },
        methods: {
            m2home(){
              this.$router.push('/home')
            },
            confirm(){
                if (this.perchase){
                    this.$router.push({name:'perchase',params:{id:this.goodsId,amount:String(this.goods_num)}})
                }else{
                    this.$axios.get(`https://xiayuhui.top:8443/shopping/add`,
                        {params:{goodsId:this.goodsId,user:sessionStorage.getItem('openid'),amount:this.goods_num}})
                        .then(()=>{
                            Toast('成功加入购物车')})
                }
            },
            add() {
                this.goods_num++
            },
            reduce() {
                this.goods_num--
                if (this.goods_num == 0) {
                    Toast('不能再减少了喔');
                    this.goods_num = 1
                }
            },
            show_detail(e) {
                if (e.currentTarget.dataset.msg == 'perchase')
                    this.perchase = true
                else
                    this.perchase = false
                this.height = `540px`
                this.img_height = `100px`
            },
            shrink() {
                this.height = `0px`
                this.goods_num = `1`
                this.img_height = `0px`
            },
        },
        watch: {}
    }
</script>

<style scoped>
    /* pages/goods_detail/goods_detail.wxss */

    .tabbar {
        background: white;
        position: fixed;
        display: flex;
        flex-direction: row;
        height: 60px;
        bottom: 0px;
        width: 100%;
        z-index: 9;
    }

    .tabbar img {
        height: 35px;
        width: 35px;
    }

    .icon {
        display: flex;
        text-align: center;

        flex-direction: column;
        margin-left: 10px;
    }

    .btn {
        color: white;
        line-height: 60px;
        width: 25%;
        text-align: center;
    }

    .detail {
        flex: 1;
        line-height: 50px;
        text-align: center;
    }


    .detail_1 {
        position: fixed;
        background-color: rgba(255, 255, 255, 0.9);
        width: 100%;
        height: 80%;
        transition: 400ms;
        bottom: 0px;
    }


    .detail_1 img {
        float: left;
        height: 100px;
        width: 100px;
        margin-top: -20px;
        margin-left: 20px;
    }

    .detail_1 .price {
        width: 30px;
        display: inline-block;
        color: #e12701;
        font-weight: bold;
        margin-right: 180px;
        margin-left: 15px;
    }

    .detail_1 .title {
        font-size: 30px;
        height: 50px;
        overflow: auto;
        border-top: 1px solid lightgrey;
        border-bottom: 1px solid lightgrey;
        margin: 90px 20px;
        padding: 30px 10px;
        text-align: center;
    }

    .num {
        color: gray;
    }

    .num span {
        font-size: 30px;
        color: black;
        background: #fafcfb;
        margin-left: 2px;
    }

</style>
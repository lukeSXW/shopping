<template>
    <div class='panel'>
        <div class="per_info">
            <img src="../assets/images/n_pay.png" width="20px;height:20px">{{title}}
            <div style="line-height: 0;margin-top: -5px;"><img src="../assets/images/flower.jpg" style="height: 3px;width: 100%" ></div>
        </div>

        <div class="address">
            <div style="color: black">收货人：{{per_info.userRealname}} {{per_info.userPhone}}</div>
            自提点:<span style="margin-left:10px;font-size:20px;font-weight:bold">{{per_info.userPlace}}</span>
        </div>


        <div class="goods" v-for="item in goods" :key="item.goodsId">
            <img :src="item.goodsPic">

            <div class="detail">
                <div style="height:100px;over-flow:scroll">{{item.goodsName}}</div>
                <div>
                    <div style="display: inline-block;width: 100px;">
                        <span style="color:red;font-size:20px;font-weight:bold;">￥{{item.goodsPrice}}</span>
                        <span style="text-decoration: line-through;">￥{{item.goodsPrice+10}}</span>
                    </div>
                    <span style="margin-left:50px">X{{item.amount}}</span>
                </div>
            </div>
        </div>

        <div class="order_p" style=""> 订单编号{{orderId}}</div>

        <div class="tips" style="">1.如果您购买的商品有任何问题，请直接与购买的门店联系！门店将为您处理，让你购买无忧</div>
        <div class="tips">2.如果您找不到购物的提货门店、请致电星星商城热线XXXXXXXXXXX</div>


        <div class="calculate">

            <div :style="{opacity:sta}" style="margin-left:180px;">合计</div>
            <div :style="{opacity:sta}"  style="font-weight: bold;color: red;margin-right: 18px;width: 40px;margin-left: 5px;">
                ￥{{shoppingPrice}}
            </div>
            <div @click="m2pay"
                 style="float: right;height:100%;width:100px;text-align:center;line-height:50px;color:white;background:red">{{tips}}
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        name: "perchase",
        data() {
            return {
                per_info: '',
                goods: [],
                shoppingPrice: '',
                title:'',
                tips:'',
                sta:''
            }
        },
        created() {
            this.amount = this.$route.params.amount
            this.orderId = this.$route.params.orderid
            this.$axios.get(`https://xiayuhui.top:8443/order/xiang`,{params:{orderId:this.$route.params.orderid}})
                .then(res=>{
                    console.log(res)
                    this.goods = res.data.goods
                    this.shoppingPrice = res.data.order.orderPrice
                    this.orderId = res.data.order.orderId
                    if (res.data.order.orderState == `0`) {
                        this.title = '未支付'
                        this.tips = '去付款'
                    }
                        else if (res.data.order.orderState == `1`){
                            this.title = '已付款'
                            this.tips = '去提货'
                        }else if (res.data.order.orderState == `2`){
                        this.title = '交易完成'
                        this.tips = '确定'
                    }

                })

            this.$axios(`https://xiayuhui.top:8443/user/findUser`, {params: {userId: sessionStorage.getItem('openid')}})
                .then(res => {
                    this.per_info = res.data
                })
        },
        methods:{
            m2pay:function () {
                if (this.tips == '去提货'){
                        this.$axios.get(`https://xiayuhui.top:8443/order/finished`,
                            {params:{userId:sessionStorage.getItem('openid'),orderId:this.orderId}})
                            .then(()=>{
                                this.tips=`已提货`
                                Toast('提货成功')
                            })
                }else if (this.tips == '去付款'){
                    this.$router.push({name:'order', params: {money: this.shoppingPrice, orderid: this.orderId,amount:this.amount}})

                }else {
                    console.log(1)
                }
            }
        },
        watch:{

        }
    }
</script>

<style scoped>

    .order_p{
        height: 30px;
        width: 96%;
        box-sizing:border-box;
        margin:10px auto;
        background: white;
        padding: 5px;
        font-size: 12px;
        line-height: 20px;
        color: #97979b;
    }
    .panel {
        background-color: #e9ecf1;
        width: 100%;
        min-height: 550px;
        padding-top: 2px;
        margin-bottom: 50px;
    }

    .tips{
        width: 90%;margin: 10px auto;color: #97979b;font-size: 15px;
    }

    .per_info {
        width: 96%;
        background: white;
        height: 50px;
        margin: 10px auto;
        text-align: center;
        line-height: 50px;
        border-radius: 5px;
    }

    .per_info input {
        width: 100px;
        padding: 5px;
        text-align: center;
        border: 1px solid #eaeaea;
        margin-left: 5px;
    }

    .address {
        font-weight: bold;
        width: 96%;
        box-sizing: border-box;
        padding: 10px;
        margin: 0 auto 10px;
        height: 100px;
        background-color: white;
        color: #c92b00;
        border-radius: 5px;
    }



    .goods {
        border-radius: 5px;
        position: relative;
        height: 150px;
        width: 96%;
        box-sizing: border-box;
        background: white;
        padding: 10px;
        margin: 0 auto;
    }


    .detail {
        display: flex;
        margin-left: 150px;
        flex-direction: column;
    }

    .calculate {
        z-index: 5;
        bottom: 0px;
        position: fixed;
        display: flex;
        flex-direction: row;
        height: 50px;
        background-color: white;
        width: 100%;
        align-items: center;
    }


    .goods ::after {
        content: '.';
        height: 0;
        visibility: hidden;
        clear: both;

    }

    .goods img {
        float: left;
        width: 130px;
        height: 130px;
    }

</style>
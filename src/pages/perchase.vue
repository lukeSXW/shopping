<template>
    <div class='panel'>
        <div class="per_info">
            收货人：<input v-model="per_info.userRealname"><input v-model="per_info.userPhone">
            <div style="line-height: 0;margin-top: -5px;"><img src="../assets/images/flower.jpg"
                                                               style="height: 3px;width: 100%"></div>
        </div>

        <div class="address">
            自提点:<span style="margin-left:10px;font-size:20px;font-weight:bold;color:black">{{per_info.userPlace}}</span>
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

        <div class="tips" style="">1.如果您购买的商品有任何问题，请直接与购买的门店联系！门店将为您处理，让你购买无忧</div>
        <div class="tips">2.如果您找不到购物的提货门店、请致电星星商城热线XXXXXXXXXXX</div>


        <div class="calculate">

            <div style="margin-left:180px;">合计</div>
            <div style="font-weight: bold;color: red;margin-right: 18px;width: 40px;margin-left: 5px;">
                ￥{{shoppingPrice}}
            </div>
            <div @click="order"
                 style="height:100%;width:100px;text-align:center;line-height:50px;color:white;background:red">提交订单
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
                shoppingPrice: ''
            }
        },
        created() {
            this.goodsId = this.$route.params.id
            this.amount = this.$route.params.amount
            if (this.$route.params.id) {
                let amount = this.$route.params.amount
                this.$axios.get(`https://xiayuhui.top:8443/search/id`, {params: {goodsId: this.goodsId}}).then(res => {
                    let good = {}
                    good.goodsId = res.data.goodsId
                    good.goodsPic = res.data.goodsPic
                    good.goodsName = res.data.goodsName
                    good.goodsPrice = res.data.goodsPrice
                    good.amount = amount
                    this.goods.push(good)
                    this.shoppingPrice = amount * res.data.goodsPrice
                })
            } else {
                this.$axios(`https://xiayuhui.top:8443/shopping/findAll`, {params: {user: sessionStorage.getItem('openid')}})
                    .then(res => {
                        this.goods = res.data.shopping
                        this.shoppingPrice = res.data.shoppingPrice
                    })
            }
            this.$axios(`https://xiayuhui.top:8443/user/findUser`, {params: {userId: sessionStorage.getItem('openid')}})
                .then(res => {
                    this.per_info = res.data
                })
        },
        methods: {
            order: function () {
                if (this.goodsId){
                    let params = {
                        userId: sessionStorage.getItem('openid'),
                        goodsId: this.goods[0].goodsId,
                        amount: this.goods[0].amount,
                        userRealname: this.per_info.userRealname,
                        userPhone: this.per_info.userPhone
                    }
                    this.$axios.get(`https://xiayuhui.top:8443/order/generateA`,
                        {params}).then((res) => {
                            if (res.data == 0)
                                Toast('提交失败')
                            else
                                Toast('提交成功')
                            this.$router.push({
                                name: 'order',
                                params: {money: this.shoppingPrice, orderid: res.data,amount:this.goods[0].amount}
                            })
                        }
                    )
                }
                else{
                    console.log('购物车')
                    let params = {
                        userId: sessionStorage.getItem('openid'),
                        userRealname: this.per_info.userRealname,
                        userPhone: this.per_info.userPhone
                    }
                    this.$axios.get(`https://xiayuhui.top:8443/order/generate`,
                        {params}).then((res) => {
                        console.log(res)
                        if (res.data == 0)
                            Toast('提交失败')
                        else
                            Toast('提交成功')
                        this.$router.push({
                            name: 'order',
                            params: {money: this.shoppingPrice,orderid: res.data}
                        })
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .panel {
        background-color: #e9ecf1;
        width: 100%;
        min-height: 550px;
        padding-top: 2px;
        margin-bottom: 50px;
    }

    .tips {
        width: 90%;
        margin: 10px auto;
        color: #97979b;
        font-size: 15px;
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
        height: 50px;
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
<template>
    <div class="order">
        <div class="order_status">
            <div style="float: left">1</div>
            <div></div>
            <div></div>
            <div style="float: right;background:#ced2d6 ">2</div>
        </div>


        <div class="pay">
            <div style="text-align: center;font-size: 15px;font-weight: 600;margin-bottom: 10px">订单金额</div>
            <div style="text-align: center;font-size: 30px;font-weight: bolder;color: red;margin-bottom: 60px">
                ￥{{money}}
            </div>
            <div style="text-align: center;font-weight: 500;font-size: 15px">
                支付方式
                <img src="../assets/images/wechat.png">
                {{p_text}}
            </div>
        </div>

        <div style=";position: absolute;background: rgba(116,118,120,0.3);width: 100%;height: 100%;top:0;"
             v-if="p_show">
            <div class="pay_panel">
                <div style="color: #d8d8d8"><span @click="m2detail">X</span> <span
                        style="margin-left: 200px;color: #5b6a91">使用密码</span></div>
                <div style="font-size: 20px;font-weight: 500;text-align: center;margin-top: 10px">星星有限公司</div>
                <div style="text-align: center;font-weight: bold;font-size: 40px;margin:20px;padding-bottom: 30px;border-bottom: 1px solid #e5e5e5">
                    ￥{{money}}
                </div>
                <div style="margin: 0px auto 10px;padding: 10px">支付方式 <img src="../assets/images/diamont.png"
                                                                           style="width: 20px;height: 20px;margin-left: 100px">零钱通
                    <span style="color: #eeeeee">></span></div>
                <div class="confirm_p" @click="m2detail">确认支付</div>
            </div>
        </div>

        <div class="gopay" @click="showpay">
            去付款
        </div>


    </div>


</template>

<script>

    export default {
        name: "order",
        data() {
            return {
                p_show: false,
                money: '',
                p_text: '微信支付',
                sheetVisible: false,
                goodsId: null,
                amount: null,
            }
        },
        created() {
            this.amount = this.$route.params.amount
            console.log(this.$route.params)
            if (this.$route.params.id) {
                this.orderid = this.$route.params.orderid
                this.money = this.$route.params.money
            } else {
                this.orderid = this.$route.params.orderid
                this.money = this.$route.params.money
            }

        },
        methods: {
            m2detail(e) {
                    if (e.target.innerHTML == 'X') {
                        console.log(`订单号${this.orderid}的状态为${e.target.innerHTML}`)
                        this.$router.push({name:'order_detail',params:{orderid:this.orderid,amount:this.amount}})
                    } else if (e.target.innerHTML == '确认支付') {
                        this.$axios.get(`https://xiayuhui.top:8443/order/payForOrder`,
                            {params:{userId:sessionStorage.getItem('openid'),orderId:this.orderid}})
                            .then(()=>{
                                this.$router.push({name:'order_detail',params:{orderid:this.orderid,amount:this.amount}})
                            })
                    }
                },
            showpay: function () {
                this.p_show = !this.p_show
            }
        }
        ,
        components: {}
    }
</script>

<style scoped>

    .confirm_p {
        height: 30px;
        width: 50%;
        margin: 20px auto 0;
        border-radius: 10px;
        text-align: center;
        color: white;
        background: #57be6a;
        line-height: 30px;
    }

    .pay_panel {
        border-radius: 10px;
        padding: 10px;
        box-sizing: border-box;
        width: 80%;
        height: 300px;
        background: #ffffff;
        position: absolute;
        top: 120px;
        left: 10%;
    }

    .gopay {
        width: 90%;
        color: white;
        text-align: center;
        margin: 30px auto;
        border-radius: 20px;
        height: 40px;
        line-height: 40px;
        background: #d63433;
    }

    .order {
        background: #eaedf1;
        width: 100%;
        height: 600px;
    }

    .order_status {
        width: 80%;
        margin: 10px auto;

    }

    .order_status div {
        display: inline-block;
        background: #ced2d6;
    }

    .order_status :first-child, .order_status :last-child {
        background: #469350;
        color: white;
        height: 20px;
        width: 20px;
        line-height: 20px;
        border-radius: 50%;
        text-align: center;
    }

    .order_status :nth-child(2) {
        width: 42%;
        margin: 0px 0px 5px 2px;
        height: 3px;
        background: #469350;
    }

    .order_status :nth-child(3) {
        width: 42%;
        margin: 0px 2px 5px 0px;
        height: 3px;
        background: #ced2d6;
    }


    .pay {
        box-sizing: border-box;
        padding: 20px;
        width: 92%;
        height: 200px;
        background: #ffffff;
        margin: 10px auto;
    }

    .pay img {
        width: 20px;
        height: 20px;
    }


</style>
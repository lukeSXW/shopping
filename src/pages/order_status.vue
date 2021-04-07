<template>
    <div class="order_main">
        <div class="title" >
            <span :style="{color:item.color}" v-for="item in  status" :key="item.id"  @click="m2other(item.id)" :id="item.id">{{item.title}}</span>
        </div>
        <div class="orders"   v-for="item in orders" :key="item.orderId" :id="item.orderId" >
            <div style="color:#a4a4a4;"><span>订单号{{item.orderId}}</span> <span style=" float: right;font-size: 15px;font-weight: 600;color: black;margin-bottom: 0px" :style="{color:item.orderState==0?'black':'red'}">订单状态:{{item.orderState==0?`未付款`:`已付款`}}</span></div>
            <div style="color:#d94848;"><span style="font-size: 20px;float: right">￥{{item.orderPrice}}</span> </div>
            <div style="color: #9b9aa9">收货人{{item.userRealname}} <div @click="m2detail(item.orderId)" style="width: 70px;text-align: center;float: right;color: red;border-radius: 20px;height: 30px;line-height: 30px" :style="{border: '1px solid red',color: 'red'}">{{item.tips}}</div></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "order_status",
        created(){

            this.$axios.get(`https://xiayuhui.top:8443/order/searchAll`,
                {params:{userId:sessionStorage.getItem('openid')}})
                .then(res=>{
                    res.data.forEach(value => {
                        this.orders_1.push(value)
                        if (value.orderState == 0){
                            this.w_p.push(value)
                            value.tips='去付款'
                        }
                        else if (value.orderState == 1){
                            this.y_p.push(value)
                            value.tips='去提货'
                        }
                        else if (value.orderState == 2){
                            this.y_t.push(value)
                            value.tips='已提货'
                        }
                    })
                })
            switch (this.$route.params.id) {
                case 1:
                    this.orders = this.orders_1
                    break;
                case 2:
                    this.orders = this.w_p
                    break;
                case 3:
                    this.orders = this.y_p
                    break;
                case 4:
                    this.orders = this.y_t
                    break;
            }
            this.m2other(this.$route.params.id)
        },
        data(){
            return{
                status:[
                    {id:1,color:'lightgrey',title:'全部订单'},
                    {id:2,color:'lightgrey',title:'待付款'},
                    {id:3,color:'lightgrey',title:'待提货'},
                    {id:4,color:'lightgrey',title:'已提货'},
                ],
                orders:[],
                orders_1:[],
                w_p:[],
                y_p:[],
                y_t:[]
            }
        },
        methods:{
            m2detail(id){
                console.log(id)
                this.$router.push({name:'order_detail',params:{orderid:id}})
            },
            m2other(id){
                this.status.forEach(value=>{
                    value.color = value.id==id ? 'red':'lightgrey'
                })

                if (id==1){
                    this.orders = this.orders_1
                }else if (id==2){
                    this.orders = this.w_p
                }else if (id==3){
                    this.orders = this.y_p
                }else if(id==4){
                    this.orders = this.y_t
                }
            }
        },
        components:{
        }
    }
</script>

<style scoped>
    .order_main{
        width: 100%;
        height: 550px;
        background: #edf0f5;
    }
    .title{
        display: flex;
        flex-direction: row;
        background: white;
        height: 35px;
        justify-content: space-around;
    }
    .title span{
        flex: 1;
        text-align: center;
        line-height: 35px;
    }
    .orders{
        border-radius: 5px;
        box-sizing: border-box;
        padding: 10px;
        width: 96%;
        height: 120px;
        background: white;
        margin: 5px auto;
    }
    .orders div{
        margin:  2px auto;
        height: 30px;
    }

    .orders :last-child{
        margin-top: 0px;
        line-height: 27px;
    }
    .orders div::after{
        content: '.';
        height: 0;
        display: block;
        visibility: hidden;
        clear: both;
    }

</style>
<template>
    <div class="car_main" :style="{minHeight:minHeight}">

        <div class="edit"><span @click="edit" style="margin-right: 20px">{{edit_txt}}</span></div>

        <div style="margin-top: 50px">
            <div class="car_goods" v-for="item in goods" :key="item.goodsId" :id='item.goodsId' @click="show_detail">
                <div @click="check" :id='item.goodsId' class="icon_1"
                     :style="{visibility:show,background:item.check}"></div>
                <img :src="item.goodsPic">
                <div style="display:flex;flex-direction:column;margin-left: 200px;">
                    <div class="good_title">{{item.goodsName}}
                    </div>
                    <div style="display:flex;flex-direction:row">
                        <div style="color: red;font-weight: bolder;margin-right: 40px">￥{{item.goodsPrice}}</div>
                        <div :id='item.goodsId' @click="reduce"
                             style="box-sizing: border-box;line-height:16px;background:white;color:red;border: 1px solid red"
                             class="icon">-
                        </div>
                        <div class="icon">{{item.amount}}</div>
                        <div :id='item.goodsId' @click="add" style="background:red;color:white" class="icon">+</div>
                    </div>
                </div>
            </div>
        </div>


        <div class="calculate">
            <div style="margin-left:180px;">合计</div>
            <div style="font-weight: bold;color: red;margin-right: 18px;width: 40px;margin-left: 5px;">
                ￥{{shoppingPrice}}
            </div>
            <div @click="perchase"
                 style="height:100%;width:100px;text-align:center;line-height:50px;color:white;background:red">去结算
            </div>
        </div>
        <div class="calculate" :style="{zIndex:index}">
            <div @click="selectAll" class="selectAll" :style="{background:All}"></div>
            <div style="color:#8b8b8b;margin-left: 5px;">全选</div>
            <div class="icon_2" @click="clear" style="margin-left:160px">清空</div>
            <div @click="delete_good" class="icon_2">删除</div>
        </div>
    </div>
</template>

<script>
    import {MessageBox} from 'mint-ui';
    import {Toast} from 'mint-ui';

    export default {
        name: "shopping_car",
        data() {
            return {
                minHeight: '',
                index: -1,
                edit_txt: '编辑',
                goods: [],
                show: 'hidden',
                shoppingPrice: 0,
                All: 'white'
            }
        },
        created() {
            console.log(this.$store.state.height)

            this.$axios(`https://xiayuhui.top:8443/shopping/findAll`, {params: {user: sessionStorage.getItem('openid')}})
                .then(res => {
                    let goods = res.data.shopping
                    goods.forEach(value => {
                        value.check = 'white'
                    })
                    this.goods = goods
                    this.shoppingPrice = res.data.shoppingPrice
                })
        },
        methods: {
            show_detail: function (e) {
                let id = e.currentTarget.id
                this.$router.push({name: 'detail', params: {id}})
            },
            reduce(e) {
                let id = e.target.id
                this.goods.forEach((value, index) => {
                    if (value.goodsId == id) {
                        this.shoppingPrice -= value.goodsPrice
                        value.amount--
                        this.$axios.get(`https://xiayuhui.top:8443/shopping/reduce`,
                            {params: {goodsId: id, user: sessionStorage.getItem('openid'), amount: 1}})
                            .then(() => {
                                console.log(`修改成功`)
                            })
                    }
                    if (value.amount == 0) {
                        MessageBox({
                            title: '提示',
                            message: '确定删除此商品吗?',
                            showCancelButton: true
                        }).then(res => {
                            if (res == 'cancel') {
                                this.shoppingPrice += value.goodsPrice
                                value.amount++
                            } else if (res == 'confirm') {
                                this.$axios.get(`https://xiayuhui.top:8443/shopping/reduceSome`, {
                                    params: {user: sessionStorage.getItem('openid'), goodsId: value.goodsId}
                                }).then(() => {
                                    Toast('删除成功')
                                })
                                this.goodsPrice -= this.goods[index].goodsPrice
                                this.goods.splice(index, 1)
                            } else {
                                this.shoppingPrice += value.goodsPrice
                                value.amount++
                            }
                        });
                    }
                })
                e.stopPropagation()
            },
            add(e) {
                let id = e.target.id
                this.goods.forEach(value => {
                    if (value.goodsId == id) {
                        this.shoppingPrice += value.goodsPrice
                        value.amount++
                        this.$axios.get(`https://xiayuhui.top:8443/shopping/add`,
                            {params: {goodsId: id, user: sessionStorage.getItem('openid'), amount: 1}})
                            .then(() => {
                                console.log(`修改成功`)
                            })
                    }
                })
                e.stopPropagation()
            },
            clear() {
                this.goods = []
                this.$axios.get(`https://xiayuhui.top:8443/shopping/delete`,
                    {params: {user: sessionStorage.getItem('openid')}})
                    .then(() => {
                        Toast(`删除成功`)
                    })
            },
            selectAll() {
                this.goods.forEach(value => {
                    value.check = value.check == 'red' ? 'white' : 'red'
                })
                this.All = this.All == 'red' ? 'white' : 'red'
            },
            delete_good() {
                let delete_arr = []
                let new_goods = []
                this.goods.forEach(value => {
                    if (value.check == 'red') {
                        delete_arr.push(value.goodsId)
                        this.goodsPic -= value.goodsPrice * value.amount
                    } else
                        new_goods.push(value)
                })
                this.$axios.get(`https://xiayuhui.top:8443/shopping/reduceSome`, {
                    params: {user: sessionStorage.getItem('openid'), goodsId: delete_arr.join(',')}
                }).then(() => {
                    Toast('删除成功')
                })
                this.goods = new_goods
            },
            check(e) {
                e.stopPropagation()
                let id = e.target.id
                this.goods.forEach(value => {
                    if (value.goodsId == id)
                        value.check = value.check == 'red' ? 'white' : 'red'
                })
            },
            perchase() {
                if (this.goods.length >= 1)
                    this.$router.push('/perchase')
                else
                    Toast('购物车空空如也！')
            },
            edit() {
                this.edit_txt = this.edit_txt == '编辑' ? '完成' : '编辑'
                this.index = this.index == -1 ? 1 : -1
                this.show = this.show == 'hidden' ? 'visible' : 'hidden'
            },
        }
    }
</script>

<style scoped>
    @media screen and (min-width: 1001px) {
        .car_goods {
            height: 400px;
            width: 94%;
            background-color: white;
            padding: 10px;
            border-radius: 20px;
            margin: 10px auto;
        }

        .good_title {
            font-size: 40px;
            font-weight: bold;
            height: 350px;
            overflow: auto;
        }

        .selectAll {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            border: 1px solid grey;
            margin-left: 20px
        }

        .car_main {
            background-color: #e9ecf1;
            height: fit-content;
        }

        .edit {
            position: fixed;
            width: 100%;
            background: white;
            text-align: right;
            height: 35px;
            line-height: 35px;
        }


        .car_goods::after {
            content: '.';
            height: 0;
            visibility: hidden;
            clear: both;
        }

        .car_goods img {
            height: 400px;
            width: 400px;
            float: left;
            margin-left: 10px;
        }

        .icon {
            line-height: 20px;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            text-align: center;
            margin-left: 5px;
        }


        .car_goods .icon_1 {
            width: 15px;
            height: 15px;
            margin-top: 200px;
            left: -18px;
            border-radius: 50%;
            border: 1px solid lightgray;
            float: left;
        }


        .calculate {
            bottom: 50px;
            position: fixed;
            display: flex;
            flex-direction: row;
            height: 50px;
            background-color: white;
            width: 100%;
            align-items: center;
        }

        .icon_2 {
            width: 50px;
            border-radius: 20px;
            border: 1px solid red;
            color: red;
            text-align: center;
            margin-left: 20px;
        }

    }

    @media screen and (max-width: 1000px) {
        .car_goods {
            height: 120px;
            width: 94%;
            background-color: white;
            padding: 10px;
            border-radius: 20px;
            margin: 10px auto;
        }

        .good_title {
            font-size: 18px;
            font-weight: bold;
            height: 100px;
            overflow: auto;
        }

        .selectAll {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            border: 1px solid grey;
            margin-left: 20px
        }

        .car_main {
            background-color: #e9ecf1;
            height: fit-content;
        }

        .edit {
            position: fixed;
            width: 100%;
            background: white;
            text-align: right;
            height: 35px;
            line-height: 35px;
        }


        .car_goods::after {
            content: '.';
            height: 0;
            visibility: hidden;
            clear: both;
        }

        .car_goods img {
            height: 120px;
            width: 160px;
            float: left;
            margin-left: 10px;
        }

        .icon {
            line-height: 20px;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            text-align: center;
            margin-left: 5px;
        }


        .car_goods .icon_1 {
            width: 15px;
            height: 15px;
            margin-top: 14%;
            left: -18px;
            border-radius: 50%;
            border: 1px solid lightgray;
            float: left;
        }


        .calculate {
            bottom: 50px;
            position: fixed;
            display: flex;
            flex-direction: row;
            height: 50px;
            background-color: white;
            width: 100%;
            align-items: center;
        }

        .icon_2 {
            width: 50px;
            border-radius: 20px;
            border: 1px solid red;
            color: red;
            text-align: center;
            margin-left: 20px;
        }

    }


</style>
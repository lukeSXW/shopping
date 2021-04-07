<template>
    <div class="info_main">
        <div class="bac">
            <div class='per_info_1'>
                <img src="https://wx.qlogo.cn/mmopen/vi_32/rLeJEahfAEIRsh0vN4NiclUneGWpIvvgE3EV6tboAYbcBRZwDkKJTfbibINshdj82CP88ic4SXzRWxR5wESGic2jAw/132">
                <div style="display:flex;flex-direction:column;">
                    <!--                    <span class="nickName">{{user_name}}</span>-->
                    <!--                    <span>{{user_position}}</span>-->
                </div>
            </div>
        </div>
        <div class="my_order">
            <div style="padding: 10px;border-bottom: 1px solid #edf0f5">我的订单</div>
            <div style="margin: 10px;display: flex;flex-direction: row;justify-content: space-around">
                <div v-for="item in orders" :key="item.id" :id="item.id" @click="M2detail(item.id)"
                     style="flex:1;display: flex;flex-direction: column;text-align: center">
                    <span><img :src="item.src"></span>
                    <span>{{item.title}}</span>
                </div>
            </div>
        </div>
        <div class="per_info">
            <div style="padding: 10px;border-bottom: 1px solid #edf0f5">
                <span>我的信息</span>
                <span style="margin-left: 170px;color: #da9c69" @click="edit_info"> {{edittext}} </span>
            </div>
            <div style="padding: 5px">
                <div>姓名: <input type="text" v-model="per_info.userRealname" :readonly="readonly"></div>
                <div>电话: <input type="text" @blur="checkphone" v-model="per_info.userPhone" :readonly="readonly"></div>
                <div>
                    <div>自提点:</div>
                    <input v-for="item in places" :key="item.id" :id="item.id" disabled ref="btn" type="button"
                           style="border-radius: 10px" :style="{background:item.bac,color:item.col}"
                           v-model="item.place" @click="placecheck(item.id)">
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "per_info",
        data() {
            return {
                places: [
                    {
                        id: 1,
                        place: 'place_1',
                        bac: 'white',
                        col: 'black'
                    },
                    {
                        id: 2,
                        place: 'place_2',
                        bac: 'white',
                        col: 'black'
                    },
                    {
                        id: 3,
                        place: 'place_3',
                        bac: 'white',
                        col: 'black'
                    },
                    {
                        id: 4,
                        place: 'place_4',
                        bac: 'white',
                        col: 'black'
                    },
                    {
                        id: 5,
                        place: 'place_5',
                        bac: 'white',
                        col: 'black'
                    },
                ],
                placevalue: '',
                bac: `white`,
                col: 'black',
                flag: true,
                p_flag: true,
                per_info: '',
                readonly: true,
                edittext: '修改信息>',
                orders: [
                    {id: 1, src: require('../assets/images/orders.png'), title: '全部订单'},
                    {id: 2, src: require('../assets/images/w_p.png'), title: '待付款'},
                    {id: 3, src: require('../assets/images/w_g.png'), title: '待提货'},
                    {id: 4, src: require('../assets/images/w_g.png'), title: '已提货'},
                ]
            }
        },
        components: {},
        created() {
            this.$axios.get(`https://xiayuhui.top:8443/user/findUser`,
                {params: {userId: sessionStorage.getItem('openid')}})
                .then(res => {
                    this.places.forEach(value => {
                        if (value.place == res.data.userPlace) {
                            value.bac = 'red'
                            value.col = 'white'
                        }
                    })
                    this.per_info = res.data
                })
        },
        methods: {
            placecheck(id) {
                this.places.forEach(value => {
                    if (id == value.id) {
                        value.bac = value.bac == 'white' ? 'red' : 'white'
                        value.col = value.col == 'black' ? 'white' : 'black'
                    } else {
                        value.bac = 'white'
                        value.col = 'black'
                    }
                })
            },
            checkphone(e) {
                let phone = e.target.value
                if (!(/^1[3456789]\d{9}$/.test(phone))) {
                    Toast('手机号格式错误')
                    this.flag = false
                    e.target.focus()
                } else {
                    this.flag = true
                }
            },
            edit_info() {
                this.edittext = this.edittext == '修改信息>' ? '完成' : '修改信息>'
                if (this.edittext == '完成') {
                    this.$refs.btn.forEach(value => {
                        value.removeAttribute('disabled')
                    })
                    this.readonly = false
                } else if (this.edittext == '修改信息>') {
                    let item = this.places.find(value => {
                        return value.bac == 'red'
                    })
                    if (item)
                        this.p_flag = true
                    else
                        this.p_flag = false

                    if (this.flag == false || this.p_flag == false) {
                        if (this.p_flag == false)
                            Toast('请选择地点')
                        this.edittext = '完成'
                    } else {
                        this.$refs.btn.forEach(value => {
                            value.setAttribute('disabled','disabled')
                        })
                        delete this.per_info.userId
                        this.per_info.userPlace = item.place
                        this.$axios.get(`https://xiayuhui.top:8443/user/updateUser`, {params: this.per_info})
                        this.edittext = '修改信息>'
                        this.readonly = true
                    }
                }

            },
            M2detail(id) {
                this.$router.push({name: 'order_status', params: {id}})
            }
        }
    }
</script>

<style scoped>
    @media screen and (max-width: 999px) {
        .info_main {
            background: #edf0f5;
            width: 100%;
            height: 100%;
        }

        .per_info_1 {
            padding-top: 20px;
            width: 92%;
            border-radius: 5px;
            overflow: hidden;
        }

        .per_info_1 img {
            float: left;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: 0 15px 0;
        }

        .bac {
            background: #fd2e0f;
            width: 100%;
            height: 150px;
        }

        .my_order {
            position: absolute;
            padding: 10px;
            top: 80px;
            left: 2%;
            width: 90%;
            height: 20%;
            background: #ffffff;
            border-radius: 5px;
        }

        .my_order img {
            width: 35px;
            height: 35px;
        }

        .per_info {
            position: absolute;
            padding: 10px 10px 20px 10px;
            top: 225px;
            left: 2%;
            width: 90%;
            height: 22%;
            background: #ffffff;
            border-radius: 5px;
        }

        .per_info input {
            background: none;
            outline: none;
            border: 0px;
        }
    }
    @media screen and (min-width: 1000px) {
        .info_main {
            background: #edf0f5;
            width: 100%;
            height: 100%;
        }

        .per_info_1 {
            padding-top: 20px;
            width: 92%;
            border-radius: 5px;
            overflow: hidden;
        }

        .per_info_1 img {
            float: left;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: 0 15px 0;
        }

        .bac {
            background: #fd2e0f;
            width: 100%;
            height: 450px;
        }

        .my_order {
            position: absolute;
            padding: 10px;
            top: 150px;
            left: 4%;
            width: 90%;
            height: 20%;
            background: #ffffff;
            border-radius: 5px;
        }

        .my_order img {
            width: 35px;
            height: 35px;
        }

        .per_info {
            position: absolute;
            padding: 10px 10px 20px 10px;
            top: 600px;
            left: 4%;
            width: 90%;
            height: 25%;
            background: #ffffff;
            border-radius: 5px;
        }

        .per_info input {
            background: none;
            outline: none;
            border: 0px;
        }
    }

</style>
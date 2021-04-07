<template>
    <div>
        <div class="input_div">
            <img src="https://www.htmlstudio.top/imgs/others/search">
            <input @focus="search_goods" placeholder="搜索" bindblur="search_goods">
        </div>

        <div class="cate" :style="{minHeight:minHeight}">
            <div v-for="item in cate_arr" :style="{background:item.back,color:item.color}" class="cate_detail"
                 :id="item.typeId" @click="choose_cate" :key="item.typeId">{{item.typeName}}
            </div>
        </div>


        <div class="cate_goods" v-for="item in cate_goods" :key="item.goodsId" :id="item.goodsId" @click="show_detail">
            <img  :src="item.goodsPic">

            <div style="display:flex;flex-direction:row;border-bottom:1px solid #f0f0f0;height: 50px;">
                <div style="font-size:20px;font-weight:bolder;flex:3;overflow: scroll;">
                    {{item.goodsName}}
                </div>
                <div style="display:flex;flex-direction:column;flex:1;border-left:1px solid #f0f0f0;padding: 5px;font-size: 15px;">
                    <span style="color:#ff8f2a;text-align:center">14.2万</span>
                    <span style="color:#9f9f9f;text-align:center">关注人数</span>
                </div>
            </div>

            <div style="display:flex;flex-direction:row;font-size: 14px">
                <div style="display:flex;flex-direction:column;margin-left: 10px;font-weight: bolder;">
                    <span style="color:#ff7f08">六林旧商城</span>
                    <span style="color:#ff7f08">为您提供优质服务</span>
                </div>
                <div style="margin-left: 60px;color: #ff7f08;margin-top: 15px;">限量50000分</div>
            </div>

            <div style="display:flex;flex-direction:row;height: 30px;">
                <div style="color:red">￥
                    <span style="font-size:23px;font-weight:bolder">{{item.goodsPrice}}</span>
                </div>
                <div style="text-decoration: line-through;font-size: 12px;color: #9e9e9e;margin-left: 10px;margin-top: 12px;">
                    ￥{{item.goodsPrice+10}}
                </div>
                <div :id="item.goodsId" @click="add2car" class="shale">购物车</div>
            </div>
        </div>
    </div>

</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        name: "cate",
        data() {
            return {
                minHeight:'',
                cate_arr: [
                    {typeId: 1, typeName: "水果馆", color: "black", back: "white"},
                    {typeId: 2, typeName: "蔬菜馆", color: "grey", back: "#e9ecf1"},
                    {typeId: 3, typeName: "休闲零食馆", color: "grey", back: "#e9ecf1"},
                    {typeId: 4, typeName: "粮油调味馆", color: "grey", back: "#e9ecf1"},
                    {typeId: 5, typeName: "家居清理馆", color: "grey", back: "#e9ecf1"},
                    {typeId: 6, typeName: "服饰穿戴馆", color: "grey", back: "#e9ecf1"},
                    {typeId: 7, typeName: "肉肉馆", color: "grey", back: "#e9ecf1"},
                    {typeId: 8, typeName: "豆腐馆", color: "grey", back: "#e9ecf1"},
                    {typeId: 9, typeName: "水产馆", color: "grey", back: "#e9ecf1"}],
                cate_goods: []
            }
        },
        created() {
            this.minHeight = parseInt(this.$store.state.height)-100+'px'
            if (this.$route.params.id) {
                this.choose_cate({target: {id: this.$route.params.id}})
            } else {
                this.choose_cate({target: {id: 1}})
            }
        },
        methods: {
            search_goods(){
                this.$router.push('/search')
            },
            show_detail:function(e){
                let id = e.currentTarget.id
                this.$router.push({name:'detail',params:{id}})
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
            choose_cate: function (e) {
                let id = e.target.id
                let arr = this.cate_arr
                this.cate_detail(id)
                arr.forEach(value => {
                    if (value.typeId == id) {
                        value.color = 'black'
                        value.back = 'white'
                    } else {
                        value.color = 'grey'
                        value.back = '#e9ecf1'
                    }
                })
            },
            cate_detail(id) {
                this.$axios.get(`https://xiayuhui.top:8443/search/type`, {params: {type: id}}).then(res => {
                    this.cate_goods = res.data
                })
            },
        }
    }
</script>

<style scoped>
    /* pages/category/category.wxss */

    .input_div {
        position: fixed;
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
        left: 10px;
        top: 10px;
    }

    /* 搜索框输入框 */

    .input_div input {
        background: rgba(248, 248, 255, 0.8);
        height: 20px;
        width: 85%;
        padding-left: 50px;
        margin: 4px auto;
        border-radius: 10px;
    }


    @media screen and (min-width: 2000px) and (max-width: 2500px) {
        .cate {
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            width: 19%;
            background: #e9ecf1;
            height: 520px;
            top: 75px;
            float: left;
            position: fixed;
        }
    }
    @media screen and (min-width: 2501px) {
        .cate {
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            width: 15%;
            background: #e9ecf1;
            height: 520px;
            top: 75px;
            float: left;
            position: fixed;
        }
    }

    @media screen and (max-width: 1999px) {
        .cate {
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            width: 25%;
            background: #e9ecf1;
            height: 520px;
            top: 75px;
            float: left;
            position: fixed;
        }
    }



    .cate_detail {
        color: grey;
        text-align: center;
        height: 50px;
        line-height: 50px;
        transition: 400ms;
    }

    @media screen and (max-width: 1000px){
        .cate_goods {
            margin-left: 25%;
            margin-top: 40px;
            height: 320px;
        }
        .cate_goods img{
            width: 100%;
            height: 55%;
        }
    }
    @media screen and (min-width: 1001px) {
        .cate_goods {
            margin-left: 25%;
            margin-top: 40px;
            height: 1200px;
        }
        .cate_detail {
            color: grey;
            text-align: center;
            height: 100px;
            font-size: 40px;
            line-height: 100px;
            transition: 400ms;
        }
        .cate_goods img{
            width: 100%;
            height: 80%;
        }

    }


    .shale {
        margin-left: 90px;
        background: #23bfa7;
        border-radius: 19px;
        color: white;
        font-size: 13px;
        text-align: center;
        width: 100px;
        line-height: 30px;
    }

</style>
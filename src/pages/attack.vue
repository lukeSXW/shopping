<template>
    <div @click="attack">服务器攻击</div>
</template>

<script>
    export default {
        name: "attack",
        created(){

        },
        methods:{
            attack:function () {
                setInterval(()=>{
                    this.$axios.get(`https://xiayuhui.top:8443/shopping/add`,
                        {params:{goodsId:43,user:sessionStorage.getItem('openid'),amount:1}})
                        .then(()=>{
                            console.log(`开始攻击`)
                        },3000)
                })
            }
        }
    }
</script>

<style scoped>

</style>
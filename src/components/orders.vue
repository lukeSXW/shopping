<template>
    <div>
        我是订单页儿
    </div>
</template>

<script>
    export default {
        name: "orders",
        props:[`arr`],
        data(){
            return{

            }
        },
        activated(){

        },
        created(){console.log(this.arr)
        }
    }
</script>

<style scoped>

</style>
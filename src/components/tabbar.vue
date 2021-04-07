<template>
    <div>
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item :id="item.id" v-for="item in tabbars" :key="item.id">
                <img slot="icon" :src="item.src">
                {{item.title}}
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
    // import bus from "@/pages/bus";
    export default {
        name: "tabbar",
        created(){

        },
        data() {
            return {
                selected: `home`,
                tabbars: [
                    {
                        id: 'home',
                        title:`首页`,
                        src: require('../assets/images/home_1.png'),
                    },
                    {
                        id: 'cate',
                        title:`分类`,
                        src: require('../assets/images/cate.png'),
                    },
                    {
                        id: 'shopping_car',
                        title:`购物车`,
                        src: require('../assets/images/shopping_car.png'),
                    },
                    {
                        id: 'per_info',
                        title:`我的`,
                        src: require('../assets/images/per_info.png'),
                    },
                ]
            }
        },
        watch: {
            selected: function (current) {
                this.tabbars.forEach(value => {
                    if (value.id == current){
                        value.src = require(`../assets/images/${value.id}_1.png`)
                    }else{
                        value.src = require(`../assets/images/${value.id}.png`)
                    }
                })
                this.$router.push('/'+current)
            },
            $route:function (new_r) {
                this.selected = new_r.name
            }
        }

    }
</script>

<style scoped>

</style>
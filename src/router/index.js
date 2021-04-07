import Vue from 'vue'
import Router from 'vue-router'
import home from "@/pages/home";
import cate from "@/pages/cate";
import shopping_car from "@/pages/shopping_car";
import per_info from "@/pages/per_info";
import detail from "@/pages/detail";
import perchase from "@/pages/perchase";
import search from "@/pages/search";
import order from "@/pages/order";
import attack from "@/pages/attack";
import order_detail from "@/pages/order_detail";
import order_status from "@/pages/order_status";

Vue.use(Router)


const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}

export default new Router({
    linkActiveClass: 'link-active',
    mode: 'history',
    name: 'router',
    routes: [
        {
            path: '/',
            redirect:'/home'
        },
        {
            path: '/home',
            name:'home',
            component:home,
        },
        {
            path: '/order',
            name:'order',
            component:order,
        },
        {
            path: '/attack',
            name:'attack',
            component:attack,
        },
        {
            path: '/search',
            name:'search',
            component:search,
        },
        {
            path: '/order_status',
            name:'order_status',
            component:order_status,

        },
        {
            path:`/detail`,
            name:'detail',
            component:detail
        },
        {
            path:`/order_detail`,
            name:'order_detail',
            component:order_detail
        },
        {
            path: '/cate',
            name:'cate',
            component:cate
        },
        {
            path: '/shopping_car',
            name:'shopping_car',
            component:shopping_car
        },
        {
            path: '/per_info',
            name:'per_info',
            component:per_info
        },
        {
            path: '/perchase',
            name:'perchase',
            component:perchase,
        },
    ]
})


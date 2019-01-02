import Vue from "vue"
import VueRouter from "vue-router"

// 用户组件
import Home from "../components/user/home.vue"
import HomeAdressAdd from "../components/user/home_adress_add.vue"
import HomeAdressDelete from "../components/user/home_adress_delete.vue"
import HomeAdressList from "../components/user/home_adress_list.vue"
import HomeBusinessFilter from "../components/user/home_business_filter.vue"
import HomeCompanyDetail from "../components/user/home_company_detail.vue"
import HomeCompanyList from "../components/user/home_company_list.vue"
import HomeOrderAddAdress from "../components/user/home_order_add_adress.vue"
import HomeOrderAddBusiness from "../components/user/home_order_add_business.vue"
import HomeOrderAdd from "../components/user/home_order_add.vue"
import HomeOrderDetail from "../components/user/home_order_detail.vue"
import HomeOrderList from "../components/user/home_order_list.vue"
import HomeOrderPhoto from "../components/user/home_order_photo.vue"
import HomeOrderPayTips from "../components/user/home_order_pay_tips.vue"
import HomeOrderTips from "../components/user/home_order_photo_tips.vue"
import HomePersonDetail from "../components/user/home_person_detail.vue"
import HomePersonalCenter from "../components/user/home_personal_center.vue"
import Sign from "../components/user/sign.vue"
import Register from "../components/user/register.vue"
import HomeBindSuccess from "../components/user/home_bind_success.vue"

// 员工组件
import WorkerOrderDetail from "../components/worker/worker_order_detail.vue"
import WorkerOrderList from "../components/worker/worker_order_list.vue"
import WorkerPersonalCenter from "../components/worker/worker_personal_center.vue"
import WorkerSign from "../components/worker/worker_sign.vue"

// 地图组件
import myMap from "../components/map/map.vue"

Vue.use(VueRouter)

var router = new VueRouter({

    mode:"history",

    routes: [
        {
            path:"/home",
            component:Home
        },
        {
            path:"/home_adress_add",
            component:HomeAdressAdd
        },
        {
            path:"/home_adress_delete",
            component:HomeAdressDelete
        },
        {
            path:"/home_adress_list",
            component:HomeAdressList
        },
        {
            path:"/home_business_filter",
            component:HomeBusinessFilter
        },
        {
            path:"/home_company_detail",
            component:HomeCompanyDetail
        },
        {
            path:"/home_company_list",
            component:HomeCompanyList
        },
        {
            path:"/home_order_add_adress",
            component:HomeOrderAddAdress
        },
        {
            path:"/home_order_add_business",
            component:HomeOrderAddBusiness
        },
        {
            path:"/home_order_add",
            component:HomeOrderAdd
        },
        {
            path:"/home_order_detail",
            component:HomeOrderDetail
        },
        {
            path:"/home_order_list",
            component:HomeOrderList
        },
        {
            path:"/home_order_photo",
            component:HomeOrderPhoto
        },
        {
            path:"/home_order_pay_tips",
            component:HomeOrderPayTips
        },
        {
            path:"/home_order_tips",
            component:HomeOrderTips
        },
        {
            path:"/home_person_detail",
            component:HomePersonDetail
        },
        {
            path:"/home_personal_center",
            component:HomePersonalCenter
        },
        {
            path:"/home_bind_success",
            component:HomeBindSuccess
        },
        {
            path:"/sign",
            component:Sign
        },
        {
            path:"/register",
            component:Register
        },
        {
            path:"/worker_sign",
            component:WorkerSign
        },
        {
            path:"/worker_order_detail",
            component:WorkerOrderDetail
        },
        {
            path:"/worker_order_list",
            component:WorkerOrderList
        },
        {
            path:"/worker_personal_center",
            component:WorkerPersonalCenter
        },
        {
            path:"/map",
            component:myMap
        },
        {
            path:"*",
            redirect:"/sign"
        }
    ]
})

export default router
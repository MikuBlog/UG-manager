import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
import Login from '../components/company_login.vue'
import Home from '../components/home.vue'
import AddPerson from '../components/company_add_person.vue'
import Bill from '../components/company_bill.vue'
import Detail from '../components/company_detail.vue'
import EditPerson from '../components/company_edit_person.vue'
import EditPassword from '../components/company_edit_password.vue'
import EditPersonPassword from '../components/company_edit_person_password.vue'
import EditOrder from '../components/company_edit_order.vue'
import EditRole from  '../components/company_edit_role.vue'
import EditCompany from '../components/company_edit_company.vue'
import OrderList from '../components/company_order_list.vue'
import AssignPersonList from '../components/company_assign_person_list.vue'
import PersonList from '../components/company_person_list.vue'
import RoleList from '../components/company_role_list.vue'
import Withdraw from '../components/company_withdraw.vue'

Vue.use(VueRouter)

var router = new VueRouter({

    mode:"history",

    routes:[
        
        {path:"/login",component:Login},

        {
            path:"/home",
            component:Home,
            children:[
                {path:"company_add_person",component:AddPerson},
                {path:"company_bill",component:Bill},
                {path:"company_detail",component:Detail},
                {path:"company_edit_person",component:EditPerson},
                {path:"company_edit_password",component:EditPassword},
                {path:"company_edit_person_password",component:EditPersonPassword},
                {path:"company_edit_order",component:EditOrder},
                {path:"company_edit_role",component:EditRole},
                {path:"company_order_list",component:OrderList},
                {path:"company_person_list",component:PersonList},
                {path:"company_role_list",component:RoleList},
                {path:"company_withdraw",component:Withdraw},
                {path:"company_edit_company",component:EditCompany},
                {path:"company_assign_person_list",component:AssignPersonList}
            ]
        },

        {path:"*",redirect:"/login"}

    ]

})

export default router
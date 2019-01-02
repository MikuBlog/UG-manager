import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 引入组件
import ActionList from '../components/home_action_list.vue'
import AddCompany from '../components/home_add_company.vue'
import AddUser from '../components/home_add_user.vue'
import AliveNumber from '../components/home_alive_number.vue'
import BillList from '../components/home_bill_list.vue'
import BusinessList from '../components/home_business_list.vue'
import CompanyList from '../components/home_company_list.vue'
import CompanyVisitNumber from '../components/home_company_visit_number.vue'
import DocumentList from '../components/home_document_list.vue'
import EditAction from '../components/home_edit_action.vue'
import EditBusiness from '../components/home_edit_business.vue'
import EditCompanyPassword from '../components/home_edit_company_password.vue'
import EditCompany from '../components/home_edit_company.vue'
import EditMenu from '../components/home_edit_menu.vue'
import EditMenuitem from '../components/home_edit_menuitem.vue'
import EditPermission from '../components/home_edit_permission.vue'
import EditRole from '../components/home_edit_role.vue'
import EditUserPassword from '../components/home_edit_user_password.vue'
import LogList from '../components/home_log_list.vue'
import MenuList from '../components/home_menu_list.vue'
import MenuitemList from '../components/home_menuitem_list.vue'
import OrderAssign from '../components/home_order_assign.vue'
import OrderList from '../components/home_order_list.vue'
import OrderNumber from '../components/home_order_number.vue'
import PermissionList from '../components/home_permission_list.vue'
import PersonList from '../components/home_person_list.vue'
import RegisterNumber from '../components/home_register_number.vue'
import RoleList from '../components/home_role_list.vue'
import SelectBillUser from '../components/home_select_bill_user.vue'
import UserBillDetail from '../components/home_user_bill_detail.vue'
import UserList from '../components/home_user_list.vue'
import UserRole from '../components/home_user_role.vue'
import Welcome from '../components/home_welcome.vue'
import Withdraw from '../components/home_withdraw.vue'
import AddBill from '../components/home_add_bill.vue'
import AddDocument from '../components/home_add_document.vue'
import Home from '../components/home.vue'
import Login from '../components/login.vue'

var router = new VueRouter({

    mode:"history",

    routes:[

        {path:"/login",component:Login},

        {
            path:"/home",
            component:Home,
            children:[

                {path:"home_action_list",component:ActionList},
                {path:"home_add_company",component:AddCompany},
                {path:"home_add_user",component:AddUser},
                {path:"home_alive_number",component:AliveNumber},
                {path:"home_bill_list",component:BillList},
                {path:"home_business_list",component:BusinessList},
                {path:"home_company_list",component:CompanyList},
                {path:"home_company_visit_number",component:CompanyVisitNumber},
                {path:"home_document_list",component:DocumentList},
                {path:"home_edit_action",component:EditAction},
                {path:"home_edit_business",component:EditBusiness},
                {path:"home_edit_company_password",component:EditCompanyPassword},
                {path:"home_edit_company",component:EditCompany},
                {path:"home_edit_menu",component:EditMenu},
                {path:"home_edit_menuitem",component:EditMenuitem},
                {path:"home_edit_permission",component:EditPermission},
                {path:"home_edit_role",component:EditRole},
                {path:"home_edit_user_password",component:EditUserPassword},
                {path:"home_log_list",component:LogList},
                {path:"home_menu_list",component:MenuList},
                {path:"home_menuitem_list",component:MenuitemList},
                {path:"home_order_assign",component:OrderAssign},
                {path:"home_order_list",component:OrderList},
                {path:"home_order_number",component:OrderNumber},
                {path:"home_permission_list",component:PermissionList},
                {path:"home_person_list",component:PersonList},
                {path:"home_register_number",component:RegisterNumber},
                {path:"home_role_list",component:RoleList},
                {path:"home_select_bill_user",component:SelectBillUser},
                {path:"home_user_bill_detail",component:UserBillDetail},
                {path:"home_user_list",component:UserList},
                {path:"home_user_role",component:UserRole},
                {path:"home_welcome",component:Welcome},
                {path:"home_withdraw",component:Withdraw},
                {path:"home_add_bill",component:AddBill},
                {path:"home_add_document",component:AddDocument}
            ]
        },

        {path:"*",redirect:"/login"}

    ]

})

export default router
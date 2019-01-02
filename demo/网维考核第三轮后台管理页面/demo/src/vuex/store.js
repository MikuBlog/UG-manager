import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({

    state: {

        // 保存图标函数

        // 菜单
        menuList:[{
            title:"权限管理",
            icon:"fa fa-lg fa-key",
            childList:[{
                title:"权限管理",
                url:"/home/home_user_list"
            },{
                title:"角色管理",
                url:"/home/home_role_list"
            },{
                title:"行为管理",
                url:"/home/home_permission_list"
            },]
        },{
            title:"资源管理",
            icon:"fa fa-lg fa-globe",
            childList:[{
                title:"接口管理",
                url:"/home/home_action_list"
            },{
                title:"菜单管理",
                url:"/home/home_menu_list"
            }]
        },{
            title:"财务管理",
            icon:"fa fa-lg fa-bars",
            childList:[{
                title:"科目管理",
                url:"/home/home_bill_list"
            },{
                title:"凭证管理",
                url:"/home/home_document_list"
            },{
                title:"账簿管理",
                url:"/home/home_select_bill_user"
            },{
                title:"提现管理",
                url:"/home/home_withdraw"
            }]
        },{
            title:"经营范围管理",
            icon:"fa fa-lg fa-th",
            childList:[{
                title:"经营范围管理",
                url:"/home/home_business_list"
            }]
        },{
            title:"商户管理",
            icon:"fa fa-lg fa-building",
            childList:[{
                title:"商户管理",
                url:"/home/home_company_list"
            }]
        },{
            title:"人员管理",
            icon:"fa fa-lg fa-user",
            childList:[{
                title:"人员管理",
                url:"/home/home_person_list"
            }]
        },{
            title:"工单管理",
            icon:"fa fa-lg fa-file-text",
            childList:[{
                title:"新建单工单",
                url:"/home/home_order_list"
            },{
                title:"所有工单",
                url:"/home/home_order_list"
            }]
        },{
            title:"统计模块",
            icon:"fa fa-lg fa-line-chart",
            childList:[{
                title:"注册用户量",
                url:"/home/home_register_number"
            },{
                title:"活跃用户量",
                url:"/home/home_alive_number"
            },{
                title:"工单量",
                url:"/home/home_order_number"
            },{
                title:"商户访问量",
                url:"/home/home_company_visit_number"
            }]
        }],

        // 添加/编辑角色
        editAdd:"添加角色",

        // 添加/编辑行为
        editBehavior:"添加行为",

        //添加/编辑菜单
        editMenu:"添加菜单",

        // 添加/编辑经营范围
        editBusiness:"添加经营类目",

        // 添加/编辑接口
        editAction:"添加接口",

        // 保存菜单列表
        menuLs: [{

            name:"Miku",
            
            createtime:"2018-11-16"

        }],

        
        // 存放所有工单列表数据(模拟假数据)
        orderList:[{

            id:1,

            price:"127.00",
            
            status:"待建单",

            time:"2018-11-07",

            generalCategory:"维修",

            type:"笔记本",

            description:"笔记本开不了机",

            remark:"用的时间比较长了",

            upload:"../images/user/head.png",

            position:"广东省顺德区乐从镇海日名苑",

            name:"旋仔",

            phone:"18024900423",

            payWay:"在线",

            history:[

                {

                    time:"2018-11-07 11:11",

                    name:"旋仔"

                }

            ],

            workerId:"1001",

            loginName:"旋仔",

            workerName:"旋仔",

            workerPhone:"18024900423"

        },{

            id:2,

            price:"127.00",
            
            status:"待分配",

            time:"2018-11-07",

            generalCategory:"维修",

            type:"电脑",

            description:"电脑开不了机",

            remark:"用的时间比较长了",

            upload:"../images/user/head.png",

            position:"广东省顺德区乐从镇海日名苑",

            name:"旋仔",

            phone:"18024900423",

            payWay:"在线",

            history:[

                {

                    time:"2018-11-07 11:11",

                    name:"旋仔"

                }

            ],

            workerId:"1001",

            loginName:"旋仔",

            workerName:"旋仔",

            workerPhone:"18024900423"

        },{

            id:3,

            price:"127.00",
            
            status:"已结束",

            generalCategory:"清洗",

            time:"2018-11-07",

            type:"空调",

            description:"洗衣机开不了机",

            remark:"用的时间比较长了",

            upload:"../images/user/head.png",

            position:"广东省顺德区乐从镇海日名苑",

            name:"旋仔",

            phone:"18024900423",

            payWay:"在线",

            history:[

                {

                    time:"2018-11-07 11:11",

                    name:"旋仔"

                }

            ],

            workerId:"1001",

            loginName:"旋仔",

            workerName:"旋仔",

            workerPhone:"18024900423"

        }],

        // 存放员工列表
        workerList:[{

            workerId:"1001",

            loginName:"旋仔",

            name:"旋仔",

            phone:"18024900423",

            companyName:"旋仔有限公司",

            companyType:"公司",

            range:"维修、清洁",

            comment:"5.0"

        },{

            workerId:"1001",

            loginName:"旋仔",

            name:"旋仔",

            phone:"18024900423",

            companyName:"旋仔有限公司",

            companyType:"公司",

            range:"维修、清洁",

            comment:"5.0"

        },{

            workerId:"1001",

            loginName:"旋仔",

            name:"旋仔",

            phone:"18024900423",

            companyName:"旋仔有限公司",

            companyType:"公司",

            range:"维修、清洁",

            comment:"5.0"

        }],

        // 存放登录名
        loginName: [{

            name:"Miku"

        },{

            name:"Miku"

        },{

            name:"Miku"

        }],

        // 存放明细账单列表
        billDetailList: [{

            time:"2018-01-01",

            number:"1004",

            summary:"证明打印费",

            debit:"50:00",

            Lender:"",

            direction:"借",

            balance:"1050.00"

        },{

            time:"2018-01-02",

            number:"1005",

            summary:"证明打印费",

            debit:"50:00",

            Lender:"",

            direction:"借",

            balance:"1000.00"

        },{

            time:"2018-01-03",

            number:"1006",

            summary:"证明打印费",

            debit:"50:00",

            Lender:"",

            direction:"借",

            balance:"950.00"

        }],

        
        logList:[{

            name:"旋仔",

            action:"接口1",

            para:"参数1",

            createtime:"2018-11-16"

        },{

            name:"旋仔",

            action:"接口2",

            para:"参数2",

            createtime:"2018-11-16"

        },{

            name:"旋仔",

            action:"接口2",

            para:"参数2",

            createtime:"2018-11-16"

        }],

        // 保存公司详细信息
        companyDetail: {},

        // 保存公司列表
        companyList: [{
            
            admin:"旋仔",

            name:"旋仔有限公司",

            type:"公司",

            range:"维修 家电 电脑",

            contact:"旋仔",

            phone:"18024900423",

            position:"广东省顺德区乐从镇",

            status:"正常",

            comment:"5.0",

            amount:"1000"

        },{
            
            admin:"旋仔",

            name:"旋仔有限公司",

            type:"公司",

            range:"维修 家电 电脑",

            contact:"旋仔",

            phone:"18024900423",

            position:"广东省顺德区乐从镇",

            status:"正常",

            comment:"5.0",

            amount:"2000"

        }],

        // 保存所要修改的经营菜单的id值
        business: {},

        // 存放明细账用户名称
        billDetailAdmin:"",

        // 存放登陆者信息
        userDetail:"",

        // 保存session_id
        session_id:""

    },

    mutations: {

        // 设置角色管理标题
        setRoleTitle(state,title) {

            state.editAdd = title

        },

        // 设置行为管理标题
        setBehaviorTitle(state,title) {

            state.editBehavior = title

        },

        // 设置行为管理标题
        setMenuTitle(state,title) {

            state.editMenu = title

        },

        // 设置行为管理标题
        setBusinessTtile(state,title) {

            state.editBusiness = title

        },

        // 设置经营菜单信息
        setBusiness(state,obj) {

            state.business = obj

        },

        // 设置明细账用户
        setBillDetailAdmin(state,admin) {

            state.billDetailAdmin = admin

        },

        // 保存商户详情
        setCompanyDetail(state,obj) {

            state.companyDetail = obj

        },

        // 保存登录这信息
        setUserDetail(state,obj) {

            state.userDetail = obj

        },

        // 保存管理员session_id
        setSessionId(state,id) {

            state.session_id = id

        }

    }

})

export default  store
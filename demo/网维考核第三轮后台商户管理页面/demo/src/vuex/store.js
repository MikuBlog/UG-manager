import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({

    state: {

        // 菜单
        menuList:[{
            title:"基本信息",
            childList:[{
                title:"商户信息",
                url:"/home/company_detail"
            }]
        },{
            title:"权限管理",
            childList:[{
                title:"角色管理",
                url:"/home/company_role_list"
            }]
        },{
            title:"人员管理",
            childList:[{
                title:"人员管理",
                url:"/home/company_person_list"
            }]
        },{
            title:"工单管理",
            childList:[{
                title:"待分配工单",
                url:"/home/company_order_list"
            },{
                title:"进行中工单",
                url:"/home/company_order_list"
            },{
                title:"代付费工单",
                url:"/home/company_order_list"
            },{
                title:"所有工单",
                url:"/home/company_order_list"
            }]
        },{
            title:"财务管理",
            childList:[{
                title:"明细账单管理",
                url:"/home/company_bill"
            },{
                title:"提现管理",
                url:"/home/company_withdraw"
            }]
        }],

        // 保存公司详细信息
        companyDetail: {},

        // 保存角色列表
        roleList: [{

            name:"超级管理员",

            time:"2018-11-14 11:22:33",

            behavior: [
                "接口管理",
                "行为管理",
                "角色管理",
                "用户登录",
                "凭证管理",
                "菜单管理"
            ]
            
        },{

            name:"系统",

            time:"2018-11-14 11:22:33",

            behavior: [
                "接口管理",
                "行为管理",
                "角色管理"
            ]

        }],

        // 添加/编辑角色
        editAdd:"添加角色",

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

            workerName:"旋仔",

            workerPhone:"18024900423",

            role:"技术总监",

            wxName:"旋仔",

            comment:"5.0"

        },{

            workerId:"1001",

            loginName:"大旋仔",

            workerName:"大旋仔",

            workerPhone:"18024900423",

            role:"技术总监",

            wxName:"大旋仔",

            comment:"5.0"

        },{

            workerId:"1001",

            loginName:"小旋仔",

            workerName:"小旋仔",

            workerPhone:"18024900423",

            role:"技术总监",

            wxName:"小旋仔",

            comment:"5.0"

        }],

        // 存放提现信息
        withdrawList:[{

            time:"2018-01-22",

            price:"127",

            status:"审核中",

        },{

            time:"2018-01-22",

            price:"128",

            status:"已放款",

        },{

            time:"2018-01-22",

            price:"129",

            status:"已拒绝",

        }],

        // 存放明细账单列表
        billList: [{

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

        // 存放商户session
        session:"",

        // 保存员工详情
        workerDetail:"",

        // 存放角色管理项
        roleDetail:""

    },

    mutations: {

        // 设置菜单
        setMenuList(state,menuList) {

            state.menuList.length = 0

            menuList.forEach(function(value) {

                state.menuList.push(value)

            })

        },

        // 设置公司详情信息
        setCompanyDetail(state,companyDetail) {

            state.companyDetail = companyDetail

        },

        // 设置角色列表
        setRoleList(state,roleList) {

            state.roleList.length = 0

            roleList.forEach(function(value) {

                state.roleList = roleList

            })

        },

        // 设置角色管理标题
        setRoleTitle(state,title) {

            state.editAdd = title

        },

        // 设置当页行为列表
        setAllBehaviorList(state,list) {

            state.allBehaviorList.length = 0

            list.forEach(function(value) {

                state.allBehaviorList.push(value)

            })

        },

        // 设置sessionid
        setSession(state,session) {

            state.session = session

        },

        // 保存员工信息
        setWorkerDetail(state,obj) {

            state.workerDetail = obj

        },

        // 存放角色管理项
        setRoleDetail(state,obj) {

            state.roleDetail = obj

        }

    }

})

export default store
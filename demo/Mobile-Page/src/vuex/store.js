import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({

    state: {

        // 存放用户名
        userName:"",

        // 存放用户的唯一ID
        userId:"",

        // 保存当前工单信息(模拟假数据)
        curOrderDetail:"",

        // 存放当前地址信息(先模拟假数据)
        curPosition:{

            

        },

        // 存档用户地址数组
        positionList:[{

            id:1,

            position:"广东省顺德区乐从镇",

            name:"旋仔",

            phone:"18024900423"

        },{

            id:2,

            position:"广东省顺德区乐从镇",

            name:"小旋仔",

            phone:"18024900423"

        },{

            id:3,

            position:"广东省顺德区乐从镇",

            name:"大旋仔",

            phone:"18024900423"

        }],

        // 保存当前类目信息
        type:"",

        // 保存类目筛选结果
        typeList:[],
        
        // 保存当前员工信息
        workerMes:{

            number:"0429",

            name:"旋仔",

            phone:"18024900423",

            identity:"440681199904293170"

        },

        // 保存当前公司信息
        curCompany:"",

        // 存放用户session_id
        session_id:"",

        // 存放标题
        addEdit:"添加地址",

        // 存放工单列表
        orderList:[],
        

    },

    mutations: {

        // 获取登录之后的用户信息
        getUserName(state,name) {

            state.userName = name

        },

        // 获取地址列表
        getPositionList(state,list) {

            list.forEach(function(value) {

                state.positionList.push(value)

            })

            state.curPosition = state.positionList[0]

        },

        // 初始化地址列表
        initialPositionList(state,list) {

            state.positionList.length = 0

            list.forEach(function(value) {

                state.positionList.push(value)

            })

        },

        // 获取当前类目信息
        getType(state,type) {

            state.type = type

        },

        // 通过工单信息中的curPosition值查找对应的curPosition值
        getCurPositionById(state,id) {

            state.positionList.forEach(function(value) {

                if(value.id == id) {

                    state.curPosition = value

                }

            })

        },

        // 获取当前公司信息
        getCompanyDetail(state,companyDetail) {

            state.curCompany = companyDetail

        },

        // 获取公司列表
        getCompanyList(state,list) {

            list.forEach(function(value) {

                state.companyList.push(value)

            })

            state.curCompany= state.companyList[0]

        },

        // 获取当前类目筛选结果
        getTypeList(state,list) {

            state.typeList.length = 0

            list.forEach(function(value) {

                state.typeList.push(value)

            })

        },

        // 获取当前地址信息
        getCurPosition(state,obj) {

            state.curPosition = obj

        },

        // 保存选择后的位置信息
        getPositionDetail(state,positionDetail) {

            state.curPosition.address = positionDetail

        },

        // 设置用户session_id
        setSessionId(state,sessionId) {

            state.session_id = sessionId

        },

        // 设置用户地址姓名
        setPositonName(state,name) {

            state.curPosition.name = name

        },

        // 设置用户地址电话
        setPositonPhone(state,phone) {

            state.curPosition.phone = phone

        },

        // 更改标题名称
        setAddEdit(state,title) {

            state.addEdit = title

        },

        // 获取当前工单信息
        getCurOrderDetail(state,orderDetail) {

            state.curOrderDetail = orderDetail

        },

        // 获取工单列表数据
        getOrderList(state,list) {

            list.forEach(function(value) {

                state.orderList.push(value)

            })

        },

    }

})

export default store
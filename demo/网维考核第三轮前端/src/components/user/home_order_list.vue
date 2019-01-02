<template>
    
    <div class="order-list">

        <div class="order-list-box">

            <div class="order-list-head">
                <div @click="backTo()">
                    <i class="fa fa-angle-left fa-lg"></i><span>工单列表</span>
                </div>
            </div>

            <div class="order-list-content">
                <ul>
                    <li v-for="items in orderList" @click="forwardTo('/home_order_detail',items)">
                        <img src="../../images/user/repair.png">
                        <div class="content">
                            <div class="content-type">
                                {{items.category}}
                            </div>
                            <div class="content-time">
                                {{items.orderTime}}
                            </div>
                        </div>
                        <div class="content-status">
                            {{items.workState}}
                        </div>
                    </li>
                </ul>
            </div>

            <div class="order-bottom-button">

                <div class="button-box" @click="forwardTo('/home_order_photo')">
                    <i class="fa fa-gavel fa-lg"></i>
                    <div class="button-box-content">
                        我要维修
                    </div>
                </div>

                <div class="button-box" @click="forwardTo('/home_order_list')">
                    <i class="fa fa-file-text fa-lg"></i>
                    <div class="button-box-content">
                        工单列表
                    </div>
                </div>

                <div class="button-box" @click="forwardTo('/home_company_list')">
                    <i class="fa fa-telegram fa-lg"></i>
                    <div class="button-box-content">
                        周边服务
                    </div>
                </div>

                <div class="button-box" @click="forwardTo('/home_personal_center')">
                    <i class="fa fa-user fa-lg"></i>
                    <div class="button-box-content">
                        个人中心
                    </div>
                </div>

            </div>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                /**
                 *  id:工单id
                 *  money:工单价格
                 *  name:工单发起者
                 *  orderTime:工单发起时间
                 *  phone:工单电话号码
                 *  remark:工单备注
                 *  describe:工单描述
                 *  url_1:工单照片地址
                 *  url_2
                 *  url_3
                 *  workState:工单状态
                 *  range:经营类目
                 *  history:历史记录
                 */
                orderList:[],

                // 存放加载次数
                loadNumber:0,

                // 存放总页数
                pageNumber:""

            }

        },

        methods: {

            // 返回上一页
            backTo() {

                this.$router.go(-1)

            },

            // 检查工单中是否还有待支付项
            checkOrderList() {

                var list = this.$store.state.orderList

                var isHave = false

                list.forEach(function(value) {

                    // 遍历工单中的项是否含有未支付项,如果有则将isHave设置为true

                })

                if(isHave) {

                    this.$router.push({path:"/home_order_pay_tips"})

                }else {

                    this.$router.push({path:"/home_order_photo"})

                }

            },

            // 跳转路由
            forwardTo(path,items) {

                if(path == "/home_order_photo") {

                    this.checkOrderList()

                }

                if(path == "/home_order_detail") {

                    this.$store.commit('getCurOrderDetail',items)

                    this.$store.commit('getCurPositionById',items.curPosition)

                }

                this.$router.push({path:path})

            },

            // 初始化工单列表数组
            initialOrderList(list) {

                var _this = this

                this.orderList.length = 0

                list.forEach(function(value) {

                    _this.orderList.push(value)

                })

            },

            // 获取工单列表
            getOrderList() {

                var _this = this

                var data = {

                    session_id:this.$store.state.session_id

                }

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Mob_Work/showList",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        _this.$store.commit('getOrderList',obj.worklist)

                        _this.initialOrderList(obj.worklist)

                    },error() {

                        console.log("请求数据失败")

                    }

                })

            }

        },

        mounted() {

            this.getOrderList()

        }

    }

</script>

<style lang="scss">

    .order-list {
        position: relative;
        background:#f4f4f4;
        background-attachment: fixed;

        .order-list-box {
            position: relative;
            text-align: center;
            overflow: hidden;

            .order-list-head {
                position: fixed;
                width:100%;
                z-index:1;
                line-height: 70px;
                font-size: 20px;
                text-align: left;
                background:#fff;

                div {
                    i {
                        position: relative;
                        top:-1px;
                        margin-left: 10px;
                    }
                    span {
                        margin-left: 10px;
                    }
                }
            }

            .order-list-content {
                position: relative;
                margin-top:70px;

                li {
                    position: relative;
                    background:#fff;
                    text-align: left;
                    padding:10px 0;
                    margin:10px 0;

                    img {
                        position: relative;
                        margin-left:10px;
                        width:80px;
                        height:80px;
                    }

                    .content {
                        position: relative;
                        display: inline-block;
                        vertical-align: top;
                        top:5px;
                        left:10px;

                        .content-type {
                            font-size: 18px;
                        }

                        .content-time {

                            position: relative;
                            margin-top:20px;
                            color:#aaa;
                        }
                    }

                    .content-status {
                        position: absolute;
                        right:15px;
                        top:40px;
                        color:#ea3e3e;
                    }
                }

                li:last-of-type {
                    margin-bottom: 10rem;
                }
            }

            .order-bottom-button {
                position: fixed;
                background:#fff;
                display: flex;
                width:100%;
                justify-content: space-around;
                color:#a7a6a6;
                bottom: 0;

                .button-box {
                    position: relative;
                    margin:20px 0 10px 0;

                    i {
                        font-size: 30px;
                    }

                    div {
                        position: relative;
                        font-size: 13px;
                        margin-top:8px;
                    }
                }
            }

        }

    }

</style>

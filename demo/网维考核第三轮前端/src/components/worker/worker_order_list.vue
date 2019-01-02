<template>
    
    <div class="worker-order-list">

        <div class="order-list-box">

            <div class="order-list-head">
                <div @click="backTo()">
                    <i class="fa fa-angle-left fa-lg"></i><span>工单列表</span>
                </div>
            </div>

            <div class="order-list-content">
                <ul>
                    <li v-for="items in orderList" @click="forwardTo('/worker_order_detail',items)">
                        <img src="../../images/user/repair.png">
                        <div class="content">
                            <div class="content-type">
                                {{items.type}}
                            </div>
                            <div class="content-time">
                                {{items.time}}
                            </div>
                        </div>
                        <div class="content-status">
                            {{items.status}}
                        </div>
                    </li>
                </ul>
            </div>

            <div class="order-bottom-button">

                <div class="button-box" @click="forwardTo('/worker_order_list')">
                    <i class="fa fa-file-text fa-lg"></i>
                    <div class="button-box-content">
                        工单列表
                    </div>
                </div>

                <div class="button-box" @click="forwardTo('/worker_personal_center')">
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

                // 存放工单列表
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
            initialOrderList() {

                // 将数据添加到orderList中

                // 将数据添加到vuex中的orderList中

            },

            // 获取工单列表
            getOrderList(id) {

                var _this = this

                this.loadNumber ++

                if(this.loadNumber <= this.pageNumber) {

                    $.ajax({

                        url:""+id,

                        type:"get",

                        success(data) {

                            // 返回并处理数据，将数据添加到相应的数组中

                        },error() {

                            // 发送请求失败处理过程

                        }

                    })

                }

            }

        },

        mounted() {

            var _this = this

            // 判断工单列表是否存在，如果不存在则重新请求
            if(this.$store.state.orderList.length == 0) {

                this.getOrderList(1)

            }else {

                var list = this.$store.state.orderList

                list.forEach(function(value) {

                    _this.orderList.push(value)

                })

            }

        }

    }

</script>

<style lang="scss">

    .worker-order-list {
        position: relative;
        background:#f4f4f4;
        height:100%;

        .order-list-box {
            position: relative;
            text-align: center;
            overflow: hidden;
            height:100%;

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

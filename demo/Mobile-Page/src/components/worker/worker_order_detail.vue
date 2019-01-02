<template>
    
    <div class="worker-order-detail">

        <div class="order-detail-box">

            <div class="order-box-head">
                <div @click="backTo()">
                    <i class="fa fa-angle-left fa-lg"></i><span>工单详情</span>
                </div>
            </div>

            <div class="order-box-form">

                <div class="order-head">
                    工单状态:
                </div>
                <div class="order-status-box form-box">
                    <div class="order-status">
                        {{orderDetail.status}}
                    </div>
                </div>

                <div class="order-head">
                    维修地址:
                </div>
                <div class="order-position-box form-box">
                    <div class="order-position">
                        {{curPosition.position}}
                    </div>
                    <div class="order-person">
                        <span>{{curPosition.name}}</span><span>{{curPosition.phone}}</span>
                    </div>
                </div>

                <div class="order-head">
                    预约时间:
                </div>
                <div class="order-time-box form-box">
                    <div class="order-time">
                        {{orderDetail.time}}
                    </div>
                </div>

                <div class="order-head">
                    维修类目:
                </div>
                <div class="order-type-box form-box">
                    <div class="order-type">
                        {{orderDetail.type}}
                    </div>
                </div>

                <div class="order-head">
                    维修描述:
                </div>
                <div class="order-description-box form-box">
                    <div class="order-description">
                        {{orderDetail.description}}
                    </div>
                </div>

                <div class="order-head">
                    备注信息:
                </div>
                <div class="order-remark-box form-box">
                    <div class="order-remark">
                        {{orderDetail.remark}}
                    </div>
                </div>

                <div class="order-head">
                    图片:
                </div>
                <div class="order-photo-box photo-box form-box">
                    <img src="../../images/user/head.jpg">
                </div>

                <div class="order-head">
                    金额:
                </div>
                <div class="order-setprice-box form-box">
                    <input type="number" v-model="price" name="price" id="name" placeholder="请输入金额">
                </div>

                <div class="order-button-box">

                    <div class="order-button" @click="showWarnBox('收款方式','确认在线收款吗?','paymentOnline')" v-show="showOnline">
                        在线收款
                    </div>

                    <div class="order-button" @click="showWarnBox('收款方式','确认线下收款吗?')" v-show="showOutline">
                        线下收款
                    </div>

                    <div class="order-button" @click="showWarnBox('取消工单','确认取消工单吗?')" v-show="showCancel">
                        取消
                    </div>

                </div>

                <div class="order-history-box">

                    <div class="order-history-head">
                        历史记录:
                    </div>

                    <div v-for="items in (orderDetail.history)" class="order-history-list">
                        {{items.time}} <span @click="forwardTo('/home_person_detail')">{{items.name}}</span>商户接单了
                    </div>

                </div>

                <div class="order-box-warn" v-show="showWarn">

                    <div class="warn-box">
                        <div class="warn-head">
                            {{firstLine}}
                        </div>

                        <div class="warn-content">
                            {{secondLine}}
                        </div>

                        <div class="warn-button">
                            <div @click="handleClick('cancel')">
                                取消
                            </div>
                            <div @click="handleClick('ensure')">
                                确认
                            </div>
                        </div>
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

                // 存放输入的价格
                price:"",

                //是否显示评价表
                popupVisible:false,

                // 存放工单详情信息
                orderDetail:{},

                // 存放当前所选择的地址
                curPosition:{},

                // 是否显示警告框
                showWarn:false,

                // 评价等级(默认五星)
                commentStart:"五星",

                // 是否显示取消按钮
                showCancel:false,

                // 是否显示线上支付按钮
                showOnline:false,

                // 是否显示线下支付按钮
                showOutline:false,

                // 警告框的第一句话
                firstLine:"",

                // 警告框的第二句话
                secondLine:"",

                // 回调函数名
                callback:""

            }

        },

        methods: {

            // 跳转路由
            forwardTo(path) {

                this.$router.push({path:path})

            },

            // 线上收款
            paymentOnline() {

                var data = {

                    id:this.orderDetail.id,

                    status:"待评价"

                }

                $.ajax({

                    url:"",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        // 处理数据

                    },error() {

                        // 发送数据失败处理

                    }

                })

            },

            // 线下收款
            paymentOutLine() {

                var data = {

                    id:this.$store.state.curOrderDetail.id,

                    status:"待评价"

                }

                $.ajax({

                    url:"",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        // 对返回数据进行处理

                    },error() {

                        // 请求失败进行处理

                    }

                })

            },

            // 取消工单
            cancelOrder() {

                var data = {

                    id:this.$store.state.curOrderDetail.id,

                    status:"已取消"

                }

                $.ajax({

                    url:"",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        // 对返回数据进行处理

                    },error() {

                        // 请求失败进行处理

                    }

                })

            },

            // 监听值的改变
            getSlotValue(index) {

                this.$refs.pick.showToolbar = true

            },

            // 处理警告框点击事件
            handleClick(command) {

                if(command == "cancel") {

                    this.showWarn = false

                }else {

                    this[this.callback]()

                    this.showWarn = false

                }

            },

            // 显示警告框
            showWarnBox(firstLine,secondLine,callback) {

                this.firstLine = firstLine

                this.secondLine = secondLine

                this.callback = callback

                this.showWarn = true

            },

            // 返回上一页
            backTo() {

                this.$router.go(-1)

            },

            // 获取评价等级
            handleConfirm () {

                this.commentStart = this.$refs.picker.getValues()[0]

                this.popupVisible = false

            },

            // 判断工单状态
            justifyStatus() {

                var status = this.orderDetail.status

                if(status == "进行中") {

                    this.showOnline = true

                    this.showOutline = true

                    this.showCancel = true

                }

                if(status == "代收款") {

                    this.showOutline = true

                }

            }

        },

        mounted() {

            // 先判断是否存在当前工单详情，如果存在当前工单详情，则使用该详情信息
            var orderDetail = this.$store.state.curOrderDetail

            // 先判断当前地址信息是否存在，如果存在则选择该地址信息
            var curPosition = this.$store.state.curPosition

            if(orderDetail) {

                this.orderDetail = orderDetail

                this.justifyStatus()

            }

            if(curPosition) {

                this.curPosition = curPosition

            }

        }

    }

</script>

<style lang="scss">

    .worker-order-detail {
        position: relative;
        background:#f4f4f4;
        
        .order-detail-box {
            position: relative;
            text-align: center;
            overflow: hidden;

            .order-box-head {
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

            .order-box-form {
                position: relative;
                margin-top:85px;
                text-align: left;

                .order-head {
                    position: relative;
                    color:#6d6d6d;
                    font-size: 18px;
                    margin:15px 0 15px 15px;
                }

                .order-price-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .order-price{
                        margin:15px 0 15px 15px;
                        font-size: 17px;
                    }

                }

                .order-status-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .order-status {
                        margin:15px 0 15px 15px;
                        font-size: 17px;
                    }

                }

                .order-position-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .order-position{
                        margin:7px 0 7px 15px;
                        font-size: 17px;
                    }

                    .order-person {
                        margin:7px 0 10px 15px;
                        color:#9e9e9e;

                        span {
                            margin-right:15px;
                        }
                    }

                }

                .order-time-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .order-time {
                        font-size: 17px;
                        margin:15px 0 15px 15px;
                        color:#000;
                    }
                }

                .order-type-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .order-type {
                        font-size: 17px;
                        margin:20px 0 20px 15px;
                        color:#000;
                    }
                }

                .order-description-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .order-description {
                        font-size: 17px;
                        margin:15px 0 15px 15px;
                    }
                }

                .order-remark-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .order-remark {
                        font-size: 17px;
                        margin:15px 0 15px 15px;
                    }
                }

                .order-photo-box {
                    position: relative;
                    overflow: hidden;
                    background:#fff;
                    height:150px;
                    line-height: 150px;

                    img {
                        position: relative;
                        vertical-align: middle;
                        margin-left:20px;
                        width:100px;
                    }
                }

                .order-button-box {
                    position: relative;
                    text-align: center;
                    
                    .order-button {
                        position: relative;
                        margin:15px auto;
                        width:90%;
                        line-height: 50px;
                        font-size: 15px;
                        font-weight: bold;
                        background-color:#fefefe;
                        border-radius: 5px;
                        color:#306797;
                    }

                    .order-button:first-of-type {
                        background-color:#33689b;
                        color:#fff;
                    }
                }

                .order-history-box {
                    position: relative;
                    overflow: hidden;
                    color:#9e9e9e;

                    .order-history-head {
                        font-size: 17px;
                        margin:15px 0 7px 15px;
                    }

                    .order-history-list {

                        font-size: 15px;
                        margin:0 0 15px 15px;

                    }
                }

                .order-box-warn {

                    position: fixed;
                    text-align: center;
                    top:0;
                    right:0;
                    left:0;
                    bottom:0;
                    z-index:99;
                    background:rgba(0,0,0,.5);

                    .warn-box {
                        position: absolute;
                        top:0;
                        right:0;
                        left:0;
                        bottom:0;
                        margin:auto;
                        width:280px;
                        height:150px;
                        background:#fff;
                        border-radius: 5px;

                        .warn-head {
                            position: relative;
                            font-size: 17px;
                            font-weight: bold;
                            margin-top:30px;
                        }

                        .warn-content {
                            position: relative;
                            color:#989898;
                            margin-top:10px;
                        }

                        .warn-button {
                            position: absolute;
                            bottom: 0;
                            width: 100%;
                            display: flex;
                            border-top:1px solid #dfdfe1;

                            div {
                                position: relative;
                                flex: 1;
                                line-height: 45px;
                            }

                            div:first-of-type {
                                color:#a9a9a9;
                            }

                            div:last-of-type {
                                color:#07c319;
                            }
                        }
                    }

                }

                .order-setprice-box {
                    position: relative;
                    
                    input {
                        outline: none;
                        border:none;
                        text-indent:15px;
                        font-size: 17px;
                        height:50px;
                        width:100%;
                    }
                }

                .form-box {
                    border-top:1px solid #e6e6e6;
                    border-bottom:1px solid #e6e6e6;
                }

            }

            .mint-popup-bottom {
                width:100%;
                
                .picker-toolbar {
                    line-height: 40px;

                    span:first-of-type {
                        position: absolute;
                        left:15px;
                    }

                    span:last-of-type {
                        position: absolute;
                        right:15px;
                        color:#48bc4b;
                    }
                }

            }

        }
    }

</style>

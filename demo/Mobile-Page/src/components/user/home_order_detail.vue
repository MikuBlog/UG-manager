<template>
    
    <div class="order-detail">

        <div class="order-detail-box">

            <div class="order-box-head">
                <div @click="backTo()">
                    <i class="fa fa-angle-left fa-lg"></i><span>工单详情</span>
                </div>
            </div>

            <div class="order-box-form">
                <div class="order-head">
                    金额:
                </div>
                <div class="order-price-box form-box">
                    <div class="order-price">
                        {{orderDetail.money}}
                    </div>
                </div>

                <div class="order-head">
                    工单状态:
                </div>
                <div class="order-status-box form-box">
                    <div class="order-status">
                        {{orderDetail.workState}}
                    </div>
                </div>

                <div class="order-head">
                    维修地址:
                </div>
                <div class="order-position-box form-box">
                    <div class="order-position">
                        {{orderDetail.address}}
                    </div>
                    <div class="order-person">
                        <span>{{orderDetail.name}}</span><span>{{orderDetail.phone}}</span>
                    </div>
                </div>

                <div class="order-head">
                    具体时间:
                </div>
                <div class="order-time-box form-box">
                    <div class="order-time">
                        {{orderDetail.orderTime}}
                    </div>
                </div>

                <div class="order-head">
                    维修类目:
                </div>
                <div class="order-type-box form-box">
                    <div class="order-type">
                        {{orderDetail.category}}
                    </div>
                </div>

                <div class="order-head">
                    维修描述:
                </div>
                <div class="order-description-box form-box">
                    <div class="order-description">
                        {{orderDetail.describe}}
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
                    <img v-for="items in imageList" :src="items" >
                </div>

                <div class="order-button-box">

                    <div class="order-button" @click="payment()" v-show="showPay">
                        付款
                    </div>

                    <div class="order-button" @click="showWarnBox()" v-show="showCancel">
                        取消
                    </div>

                    <div class="order-button" @click="reOrder()" v-show="showReorder">
                        重新下单
                    </div>

                    <div class="order-button" @click="showCommentBox(true)" v-show="showComment">
                        评价
                    </div>

                </div>

                <!-- <div class="order-history-box">

                    <div class="order-history-head">
                        历史记录:
                    </div>

                    <div v-for="items in (orderDetail.history)" class="order-history-list">
                        {{items.time}} <span @click="forwardTo('/home_person_detail')">{{items.name}}</span>商户接单了
                    </div>

                </div> -->

                <div class="order-box-warn" v-show="showWarn">

                    <div class="warn-box">
                        <div class="warn-head">
                            取消工单
                        </div>

                        <div class="warn-content">
                            确认取消工单吗?
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

            <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">

                <mt-picker :slots="slots"  :visible-item-count="5" :show-toolbar="true"  ref="picker" value-key="cName">
                        <span @click="showCommentBox(false)">取消</span>
                        <span @click="handleConfirm">确认</span>
                </mt-picker>

            </mt-popup>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                //是否显示评价表
                popupVisible:false,

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
                orderDetail:{},

                // 存放图片列表
                imageList:[],

                // 是否显示警告框
                showWarn:false,

                // 评价分发表
                slots: [

                    {
                        flex: 1,

                        values: ["1星","2星","3星","4星","5星"],

                        className: 'slot1',

                        textAlign: 'center',

                    }

                ],

                // 评价等级(默认五星)
                commentStart:"五星",

                // 是否显示付款按钮
                showPay:false,

                // 是否显示取消按钮
                showCancel:false,

                // 是否显示重新下单按钮
                showReorder:false,

                // 是否显示评价按钮
                showComment:false

            }

        },

        methods: {

            // 跳转路由
            forwardTo(path) {

                this.$router.push({path:path})

            },

            // 重新下单
            reOrder() {

                this.$store.commit('getCurOrderDetail',this.orderDetail)

                this.$router.push({path:'/home_order_add'})

            },

            // 付款
            payment() {

                var data = {

                    session_id:this.$store.state.session_id,

                    id:this.orderDetail.id

                }

                var _this = this

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Mob_Work/payment",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        if(obj.status == "ok") {

                            _this.$router.push({path:"/home_order_list"})

                        }

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            // 显示评价表
            showCommentBox(command) {

                if(command) {

                    this.popupVisible = true

                }else {

                    this.popupVisible = false

                }

            },

            // 监听值的改变
            getSlotValue(index) {

                this.$refs.pick.showToolbar = true

            },

            // 处理警告框点击事件
            handleClick(command) {

                var _this = this

                if(command == "cancel") {

                    this.showWarn = false

                }else {

                    var data = {

                        // 用户对应的唯一ID值
                        session_id:this.$store.state.session_id,

                        // 当前工单的Id值
                        id:this.orderDetail.id

                    }

                    $.ajax({

                        url:"http://118.24.136.82/index.php/index/Mob_Work/delete",

                        type:"post",

                        data:JSON.stringify(data),

                        success(data) {

                            _this.$router.push({path:'/home_order_list'})

                        },error() {

                            console.log("请求失败")

                        }

                    })

                }

            },

            // 显示警告框
            showWarnBox() {

                this.showWarn = true

            },

            // 返回上一页
            backTo() {

                this.$router.go(-1)

            },

            // 获取评价等级
            handleConfirm () {

                this.commentStart = this.$refs.picker.getValues()[0]

                var data = {

                    session_id:this.$store.state.session_id,

                    id:this.orderDetail.id,

                    score:parseInt(this.commentStart)

                }

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Mob_Work/score",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        console.log(data)

                        _this.$router.push('/home_order_list')

                    },error() {

                        console.log("请求失败")

                    }

                })

                this.popupVisible = false

            },

            // 判断工单状态
            justifyStatus() {

                var status = this.orderDetail.workState

                if(status == "新建单") {

                    this.showPay = true

                }

                if(status == "新建单" || status == "待分配" || status == "进行中") {

                    this.showCancel = true

                }

                if(status == "已取消" || status == "已完结") {

                    this.showReorder = true

                }

                if(status == "待评价") {

                    this.showComment = true

                }

            }

        },

        mounted() {

            // 先判断是否存在当前工单详情，如果存在当前工单详情，则使用该详情信息
            var orderDetail = this.$store.state.curOrderDetail

            this.orderDetail = orderDetail
        
            this.justifyStatus()

            if(orderDetail.url_1 != "无")

                this.imageList.push(orderDetail.url_1)

            if(orderDetail.url_2 != "无")

                this.imageList.push(orderDetail.url_2)

            if(orderDetail.url_3 != "无")

                this.imageList.push(orderDetail.url_3)

        }

    }

</script>

<style lang="scss">

    .order-detail {
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
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
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
                        background-color:#33689b;
                        border-radius: 5px;
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

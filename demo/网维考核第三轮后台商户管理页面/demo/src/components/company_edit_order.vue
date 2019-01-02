<template>
    
    <div class="edit-order">

        <div class="edit-order-box">

            <div class="order-head">
                编辑工单
            </div>

            <div class="order-button">
                <span @click="showBox()">返回</span>
                <span @click="sendMessage()">确认</span>
            </div>

            <div class="order-form">

                <div class="head">
                    工单信息
                </div>

                <div class="boxs">

                    <div>
                        <span class="mes">维修类目:</span>
                        <div class="button-box">
                            <span class="button">{{orderDetail.generalCategory}}</span><span class="button">{{orderDetail.type}}</span>
                        </div>
                    </div>

                    <div>
                        <span class="mes">预约时间:</span>
                        <el-date-picker
                        v-model="date"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                        <select ref="first">
                            <option value="00:00">00:00</option>
                            <option value="01:00">00:00</option>
                            <option value="02:00">00:00</option>
                            <option value="03:00">00:00</option>
                        </select>
                    </div>

                </div>

                <div>
                    <span class="mes">工单状态:</span>
                    <div>
                        <input type="text" :placeholder="orderDetail.status" disabled>
                    </div>
                </div>

                <div class="boxs">

                    <div>
                        <span class="mes">金额:</span>
                        <div>
                            <input type="text" :placeholder="orderDetail.price" v-model="price">
                        </div>
                    </div>

                    <div>
                        <span class="mes">支付方式:</span>
                        <div>
                            <select ref="second">
                                <option value="在线">在线</option>
                                <option value="线下">线下</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div class="boxs">

                    <div>
                        <span class="mes">姓名:</span>
                        <div>
                            <input type="text" :placeholder="orderDetail.name" disabled>
                        </div>
                    </div>

                    <div>
                        <span class="mes">电话:</span>
                        <div>
                            <input type="text" :placeholder="orderDetail.phone" disabled>
                        </div>
                    </div>

                </div>

                <div class="position">
                    <span class="mes">位置名称:</span>
                    <div>
                        <input type="text" :placeholder="orderDetail.position" disabled>
                    </div>
                </div>

            </div>

        </div>

        <div class="cancel" v-show="isHide">

            <div class="cancel-box">
                <div class="cancel-head">确认放弃编辑工单吗?</div>
                <div class="cancel-button">
                    <span @click="hideBox()">取消</span>
                    <span @click="handleClick('/home/company_order_list')">确认</span>
                </div>
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                // 是否隐藏提示框
                isHide:false,

                // 存放工单详情
                orderDetail: {

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
                },

                // 保存日期
                date:"",

                // 存放金额
                price:"",



            }

        },

        methods: {

            // 显示提示框
            showBox() {

                this.isHide = true

            },

            // 隐藏取消框
            hideBox() {

                this.isHide = false

            },

            // 返回上一页
            handleClick() {

                this.$router.go(-1)

            }

        },

        mounted() {



        }

    }

</script>

<style lang="scss">

    .edit-order {
        position: relative;
        margin:2rem;

        .edit-order-box {
            position: relative;
            overflow: hidden;
            background:#fff;
            box-shadow:  0 0 2px 2px rgb(226, 226, 226);
            transition: .5s;

            .order-head {
                position: relative;
                line-height: 4rem;
                font-size: 1.2rem;
                background:#fff;
                box-shadow: 0 0 2px 2px rgb(196, 196, 196);
                text-indent: 2rem;
            }

            .order-button {
                position: relative;

                span {
                    font-size: 1.2rem;
                    margin:2rem .5rem;
                    padding:.5rem 1rem;
                    border-radius: .3rem;
                    cursor: pointer;
                    transition: .5s;
                }

                span:first-of-type {
                    position: relative;
                    display: inline-block;
                    margin-left:2rem;
                    border:1px solid #d1d1d1;
                }

                span:last-of-type {
                    position: relative;
                    background:#51a841;
                    border:1px solid #51a841;
                    color:white;
                }

                span:first-of-type:hover {
                    box-shadow: 0 0 2px 2px rgb(134, 231, 255); 
                }

                span:last-of-type:hover {
                    background: #fff;
                    color: #51a841;
                }

            }

            .order-form {
                position: relative;
                overflow: hidden;
                font-size: 1.2rem;
                margin:2rem;
                line-height: 3.5rem;
                border:1px solid #d3d3d3;
                box-shadow: 0 0 1px 1px rgb(226, 226, 226);

                .el-input__inner {
                    margin-left:0; 
                }

                .head {
                    position: relative;
                    text-indent: 2rem;
                    margin:2rem 0;
                    border:1px solid #d3d3d3;
                    box-shadow: 0 0 1px 1px rgb(226, 226, 226);
                }

                .head:first-of-type {
                    margin:0;
                }

                .boxs {
                    position: relative;
                    display: flex;
                    justify-content: space-around;

                    div {
                        position: relative;
                        flex:1;

                        div {
                            input {
                                width:80%;
                            }
                        }
                    }
                }

                .mes {
                    position: relative;
                    margin-left:2rem; 
                }

                input {
                    height:2.5rem;
                    width:40%;
                    text-indent: 1rem;
                    margin-left:2rem; 
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                select {
                    margin-left:2rem; 
                    height:2.5rem;
                    width:40%;
                }


                .button {
                    position: relative;
                    display: inline-block;
                    margin:1rem 0;
                    line-height: 2.8rem;
                    padding:0 1rem;
                    background:#5eb2fd;
                    border:1px solid #5eb2fd;
                    color:#fff;
                    transition: .5s;
                    margin-left: 2rem;
                    cursor: pointer;

                    i {
                        position: relative;
                        margin-right: .5rem; 
                    }
                }

                .button:hover {
                    background: #fff;
                    color: #5eb2fd;
                }

                .position {
                    margin-bottom:2rem; 
                }
            }
        }

        .cancel {
            position: fixed;
            top:0;
            right:0;
            left:0;
            bottom:0;
            background:rgba(0,0,0,.5);

            .cancel-box {
                position: absolute;
                top:0;
                right:0;
                left:0;
                bottom:0;
                margin: auto;
                width:35rem;
                height:8rem;
                background:rgb(240, 240, 240);

                .cancel-head {
                    position: relative;
                    line-height: 4rem;
                    font-size: 1.2rem;
                    text-indent:2rem;
                    background:#fff;
                }

                .cancel-button {
                    position: relative;
                    text-align: right;
                    
                    span {
                        position: relative;
                        display: inline-block;
                        font-size: 1.2rem;
                        margin:1rem .5rem;
                        padding:.4rem .8rem;
                        border-radius: .3rem;
                        cursor: pointer;
                        transition: .5s;
                    }

                    span:first-of-type {
                        border:1px solid #d4d4d4;
                        background: #fff;
                    }

                    span:first-of-type:hover {
                        box-shadow: 0 0 1px 1px rgb(98, 224, 255);
                    }

                    span:last-of-type {
                        border:1px solid #447feb;
                        margin-right:1rem;
                        background:#447feb;
                        color:#fff;
                    }

                    span:last-of-type:hover {
                        background:#fff;
                        color: #447feb;
                    }

                }
            }
        }

        .edit-order-box:hover {
            box-shadow: 0 0 2px 2px rgb(134, 231, 255);
        }
    }

</style>

<template>
    
    <div class="order-list">

        <div class="order-list-box">

            <div class="order-head">
                工单列表
            </div>

            <div class="order-search">
                <i class="fa fa-search fa-lg"></i><input type="text">
                <div class="show-number">
                    <span>每页显示:</span>
                    <select>
                        <option value="10">10条</option>
                        <option value="25">25条</option>
                        <option value="50">50条</option>
                        <option value="100">100条</option>
                    </select>
                </div>
            </div>

            <div class="table">

                <table ref="table">

                    <tr>
                        <th></th>
                        <th>一级类目</th>
                        <th>类目</th>
                        <th>工单状态</th>
                        <th>预约时间</th>
                        <th>位置名称</th>
                        <th>姓名</th>
                        <th>电话</th>
                        <th>金额</th>
                        <th>支付方式</th>
                        <th>操作</th>
                    </tr>

                    <tr v-for="items in orderList">
                        <td><span class="icon"><i class="fa fa-plus-square-o fa-lg" @click="showDetail($event,items)"></i></span></td>
                        <td>{{items.generalCategory}}</td>
                        <td>{{items.type}}</td>
                        <td>{{items.status}}</td>
                        <td>{{items.time}}</td>
                        <td>{{items.position}}</td>
                        <td>{{items.name}}</td>
                        <td>{{items.phone}}</td>
                        <td>{{items.price}}</td>
                        <td>{{items.payWay}}</td>
                        <td>
                            <span class="button" @click="assign()"><i class="fa fa-arrow-left fa-lg"></i>分配</span>
                            <span class="button" @click="handleClick('/home/company_edit_order','edit')"><i class="fa fa-pencil fa-lg"></i>编辑</span>
                            <span class="button"><i class="fa fa-trash fa-lg"></i>删除</span>
                        </td>
                    </tr>

                    <tr v-show="showOrderDetail" ref="order">
                        <td colspan="11">

                            <div class="detail-form">

                                <div class="order-detail-box">
                                    <div class="detail-head">
                                        工单
                                    </div>

                                    <div>
                                        <span class="inner-head">工单状态:</span><span class="mes">{{orderDetail.status}}</span>
                                    </div>
                                    <div>
                                        <span class="inner-head">金额:</span><span class="mes">{{orderDetail.price}}</span>
                                    </div>
                                    <div>
                                        <span class="inner-head">支付方式:</span><span class="mes">{{orderDetail.payWay}}</span>
                                    </div>
                                    <div>
                                        <span class="inner-head">维修地址:</span><span class="mes">{{orderDetail.position}}</span>
                                    </div>
                                    <div>
                                        <span class="inner-head">预约时间:</span><span class="mes">{{orderDetail.time}}</span>
                                    </div>
                                    <div>
                                        <span class="inner-head">维修类目:</span><span class="type">{{orderDetail.generalCategory}}</span><span class="type">{{orderDetail.type}}</span>
                                    </div>
                                    <div>
                                        <span class="inner-head">维修描述:</span><span class="mes">{{orderDetail.description}}</span>
                                    </div>
                                    <div>
                                        <span class="inner-head">维修备注:</span><span class="mes">{{orderDetail.remark}}</span>
                                    </div>
                                    <div>
                                        <span class="inner-head">图片:</span>
                                        <div>
                                            <img src="https://mikuimg.oss-cn-shenzhen.aliyuncs.com/UG%E7%AE%A1%E5%AE%B6/images/head.jpg">
                                        </div>
                                    </div>
                                </div> 

                                <div class="order-worker-box">

                                    <div class="worker-head">
                                        人员
                                    </div>

                                    <div>
                                        <span class="inner-head">工号:</span><span class="mes">{{orderDetail.workerId}}</span>
                                    </div>

                                    <div>
                                        <span class="inner-head">登录名:</span><span class="mes">{{orderDetail.loginName}}</span>
                                    </div>

                                    <div>
                                        <span class="inner-head">姓名:</span><span class="mes">{{orderDetail.workerName}}</span>
                                    </div>

                                    <div>
                                        <span class="inner-head">电话:</span><span class="mes">{{orderDetail.workerPhone}}</span>
                                    </div>

                                </div>

                            </div>

                        </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td>
                            <select>
                                <option value="维修">维修</option>
                                <option value="清洗">清洗</option>
                                <option value="家政">家政</option>
                            </select>
                        </td>
                        <td></td>
                        <td>
                            <select>
                                <option value="新建单">新建单</option>
                                <option value="已取消">已取消</option>
                            </select>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <select>
                                <option value="在线">在线</option>
                                <option value="线下">线下</option>
                            </select>
                        </td>
                    </tr>

                </table>

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

                // 显示工单详情
                showOrderDetail:false,

                // 存放当前工单信息
                orderDetail:{}

            }

        },

        methods: {

            // 跳转路由
            assign() {

                this.$router.push({path:"/home/company_assign_person_list"})

            },

            // 显示列表
            showDetail(event,items) {

                var element = event.currentTarget

                var elements = document.querySelectorAll('.icon>i')

                var parent = element.parentNode.parentNode.parentNode

                var _this = this

                var behaviorBox = this.$refs.order

                var table  = this.$refs.table

                table.insertBefore(behaviorBox,parent.nextElementSibling)

                if(this.showBehavior == false) {

                    elements.forEach(function(value) {

                        value.isPlus = true

                    })

                }

                elements.forEach(function(value) {

                    value.classList.add('fa-plus-square-o')

                    value.classList.remove('fa-minus-square-o')

                })

                if(element.isPlus) {

                    element.classList.remove('fa-plus-square-o')

                    element.classList.add('fa-minus-square-o')

                    element.isPlus = false

                    this.showOrderDetail = true

                }else {

                    element.classList.add('fa-plus-square-o')

                    element.classList.remove('fa-minus-square-o')

                    element.isPlus = true

                    this.showOrderDetail = false
                    
                }

                this.orderDetail = items

            },

            // 请求工单列表
            getOrderList() {



            },

            // 跳转路由
            handleClick(path) {

                this.$router.push({path:path})

            }

        },

        mounted() {

            // 判断工单列表是否已经存在，如果存在直接使用
            var orderList = this.$store.state.orderList

            var _this = this

            if(orderList.length != 0) {

                orderList.forEach(function(value) {

                    _this.orderList.push(value)

                })

            }else {

                this.getOrderList()

            }

            setTimeout(function() {

                // 将加号icon增加标记
                var icon = document.querySelectorAll('.icon>i')

                icon.forEach(function(value) {

                    value.isPlus = true

                })

            })

        }

    }

</script>

<style lang="scss">

    .order-list {
        position: relative;
        margin:2rem;

        .order-list-box {
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
                box-shadow: 0 0 2px 2px rgb(226, 226, 226);
                text-indent: 2rem;
            }

            .order-search {
                position: relative;
                margin:2rem;
                
                i {
                    position: absolute;
                    top:.65rem;
                    left:.5rem;
                    z-index: 1;
                    font-size: 1.6rem;
                    color:#6ebafc;
                }

                input {
                    position: relative;
                    height:2.3rem;
                    width:20%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-indent: 2.5rem;
                }

                .show-number {
                    position: absolute;
                    top:0;
                    right:0;
                    margin-right:2rem;
                    font-size: 1.2rem;

                    select {
                        height:2.6rem;
                    }
                }

            }

            .table {
                position: relative;
                font-size: 1.2rem;
                margin:2rem;
                line-height: 3.5rem;
                border:1px solid #d3d3d3;
                box-shadow: 0 0 1px 1px rgb(226, 226, 226);

                table {
                    position: relative;
                    border-collapse: collapse;
                    width:100%;
                    text-align: center;

                    .icon {
                        position: relative;
                        cursor: pointer;
                    }

                    th {
                        border:1px solid #e3e3e3;
                    }
                    
                    td {
                        border:1px solid #e3e3e3;

                        .button {
                            position: relative;
                            display: inline-block;
                            margin:1rem 0;
                            line-height: 2.8rem;
                            padding:0 1rem;
                            background:#57b5e2;
                            border:1px solid #57b5e2;
                            color:#fff;
                            transition: .5s;
                            cursor: pointer;
                        }

                        i {
                            position: relative;
                            top:-.1rem;
                            font-size: 1.3rem;
                            margin-right: .5rem; 
                        }

                        .button:last-of-type {
                            background: red;
                            color: #fff;
                            border:1px solid red;
                        }

                        .button:hover {
                            background:#fff;
                            color:#57b5e2;
                        }

                        .button:last-of-type:hover {
                            background:#fff;
                            color:red;
                        }

                    }

                    tr:first-of-type {
                        background:rgb(240, 240, 240);
                    }

                    select {
                        height:3rem;
                        width:80%;
                    }

                    .detail-form {
                        position: relative;
                        overflow: hidden;

                        .order-detail-box {
                            position: relative;
                            background: #fafafa;
                            margin:1rem 1rem 3rem 1rem;
                            text-align: left;
                            box-shadow: 0 0 1px 1px rgb(226, 226, 226);

                            .detail-head {
                                position: relative;
                                text-indent: 1.5rem;
                                border-bottom: 2px solid #5eb2fd;
                            }

                            .type {
                                position: relative;
                                display: inline-block;
                                background:#5eb2fd;
                                color:#fff;
                                border:1px solid #5eb2fd;
                                line-height: 2.5rem;
                                padding:0 1rem;
                                margin:1rem 1rem 3rem 1rem;
                                transition: .5s;
                                cursor: pointer;
                            }

                            .type:first-of-type {
                                margin-left:1rem;
                            }

                            .type:hover {
                                background:#fff;
                                color: #5eb2fd;
                            }

                            .inner-head {
                                position: relative;
                                display: inline-block;
                                width:8rem;
                                text-align: right;
                            }

                            .mes {
                                position: relative;
                                text-align: left;
                                margin-left:3rem;
                                width:20rem;
                            }

                            img {
                                margin-left: 10rem; 
                                width:7rem;
                                height:7rem;
                            }
                            
                        }

                        .order-worker-box {
                            position: relative;
                            background: #fafafa;
                            margin:1rem 1rem 3rem 1rem;
                            text-align: left;
                            box-shadow: 0 0 1px 1px rgb(226, 226, 226);

                            .worker-head {
                                position: relative;
                                text-indent: 1.5rem;
                                border-bottom: 2px solid #5eb2fd;
                            }

                            .inner-head {
                                position: relative;
                                display: inline-block;
                                width:8rem;
                                text-align: right;
                            }

                            .mes {
                                position: relative;
                                text-align: left;
                                margin-left:3rem;
                                width:20rem;
                            }
                        }
                    }

                }
            }

        }

        .order-list-box:hover {
            box-shadow: 0 0 2px 2px rgb(134, 231, 255);
        }
    }

</style>

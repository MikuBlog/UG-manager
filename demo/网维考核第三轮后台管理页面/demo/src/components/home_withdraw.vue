<template>
    
    <div class="role">

        <div class="role-box">

            <div class="role-head">
                提现管理
            </div>

            <div class="role-search">
                <div class="show-number">
                    <span>每页显示:</span>
                    <select @change="getPerpage($event)">
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
                        <th>发起时间</th>
                        <th>登录名</th>
                        <th>商户名</th>
                        <th>金额</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>

                    <tr v-for="items in withdrawList">
                        <td>{{items.date}}</td>
                        <td>{{items.admin}}</td>
                        <td>{{items.company}}</td>
                        <td>{{items.money}}</td>
                        <td>{{items.status}}</td>
                        <td>
                            <span class="button" @click="showBox('放款',items.id,true)"><i class="fa fa-pencil fa-lg"></i>放款</span>
                            <span class="button" @click="showBox('拒绝',items.id,false)"><i class="fa fa-trash fa-lg"></i>拒绝</span>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="6">
                            <div class="nextPage bgcolor">
                                <span class="last" @click="last()">上一页</span>
                                <span class="page" v-for="items in pageList" @click="getPage(items,$event)">{{items}}</span>
                                <span class="next" @click="next()">下一页</span>
                            </div>
                        </td>
                    </tr>

                </table>

            </div>

        </div>

        <div class="cancel" v-show="isHide">

            <div class="cancel-box">
                <div class="cancel-head">确认{{mes}}吗?</div>
                <div class="cancel-button">
                    <span @click="hideBox()">取消</span>
                    <span @click="handleClick()">确认</span>
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
                 *  id:id值
                 *  date:日期
                 *  admin:用户名
                 *  company:商户名
                 *  money:金额
                 *  status:状态
                 */
                withdrawList:[],

                // 提示框内容
                mes:"",

                // 是否隐藏提示框
                isHide:false,

                // 当前选择状态
                loanRefuse:"",

                // 保存当前id
                withdrawId:"",

                // 保存当前页数
                pageId:1,

                // 保存每页显示的条数
                perPage:10,

                // 保存总页数列表
                pageList:[],

                // 保存搜索名字信息
                scName:"",

                // 保存全局搜索结果
                scAll:"",

                // 存放函数名
                fName:"getWithdrawList",

            }

        },

        methods: {

            // 放款
            loan(id) {

                var data = {

                    id:id

                }

                var _this = this

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Cash_Management/examine",

                    type:"POST",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        if(obj.status == "ok!") {

                            _this.getWithdrawList(_this.pageId)

                        }

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            //拒绝
            refuse(id) {

                var data = {

                    id:id

                }

                var _this = this

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Cash_Management/refuse",

                    type:"POST",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        if(obj.status == "ok!") {

                            _this.getWithdrawList(_this.pageId)

                        }

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            // 前往指定页面
            getPage(num,event) {

                $(event.currentTarget).css({"background":"#2ec2e7","color":"#fff"})

                $(event.currentTarget).siblings().css({"background":"#fff","color":"#2ec2e7"})

                this[this.fName](num)

            },

            // 上一页
            last() {

                this.pageId-- 

                if(this.pageId == 0) {

                    this.pageId = 1

                    return

                }

                $('.page').eq(this.pageId-1).css({"background":"#2ec2e7","color":"#fff"})

                $('.page').eq(this.pageId-1).siblings().css({"background":"#fff","color":"#2ec2e7"})

                this[this.fName](this.pageId)

            },

            // 下一页
            next() {

                this.pageId++

                if(this.pageId == this.pageList.length+1) {

                    this.pageId = this.pageList.length

                    return

                }

                $('.page').eq(this.pageId-1).css({"background":"#2ec2e7","color":"#fff"})

                $('.page').eq(this.pageId-1).siblings().css({"background":"#fff","color":"#2ec2e7"})

                this[this.fName](this.pageId)

            },

            // 获取每页的条数
            getPerpage(event) {

                this.perPage = event.currentTarget.value

                this.getWithdrawList(1)

            },

            // 显示取消框
            showBox(mes,id,choose) {

                this.mes = mes

                this.isHide = true

                this.withdrawId = id

                this.loanRefuse = choose

            },

            // 隐藏取消框
            hideBox() {

                this.isHide = false

            },

            // 跳转路由
            handleClick() {

                if(this.loanRefuse) {

                    this.loan(this.withdrawId)

                }else {

                    this.refuse(this.withdrawId)

                }

                this.isHide = false

            },

            // 初始化总页数
            initialPageCount(pagecount) {

                var loopNumber = pagecount

                this.pageList.length = 0

                for(var i = 1 ; i <= loopNumber ; i ++) {

                    this.pageList.push(i)

                }

            },

            // 初始化提现列表
            initialWithdrawList(list) {

                var _this = this

                this.withdrawList.length = 0

                list.forEach(function(value) {

                    _this.withdrawList.push(value)

                })

            },

            // 获取角色列表
            getWithdrawList(id) {

                var _this = this

                this.pageId = id

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/cash_Management/showList?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"GET",

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.cash.data

                        _this.initialWithdrawList(list)

                        _this.initialPageCount(obj.pagecount)

                    },error() {

                        console.log("发送请求失败")

                    }

                })

            }

        },

        mounted() {

            this.getWithdrawList(1)

        }

    }

</script>

<style lang="scss" scoped>

    .role {
        position: relative;
        margin:2rem;

        .role-box {
            position: relative;
            overflow: hidden;
            background:#fff;
            box-shadow:  0 0 2px 2px rgb(226, 226, 226);
            transition: .5s;

            .role-head {
                position: relative;
                line-height: 4rem;
                font-size: 1.2rem;
                background:#fff;
                box-shadow: 0 0 2px 2px rgb(226, 226, 226);
                text-indent: 2rem;
            }

            .role-button {
                position: relative;
                margin-top: 2rem;

                span {
                    position: relative;
                    text-align: center;
                    padding: .7rem 1rem;
                    display: inline-block;
                    margin: 1.5rem 1rem 1.5rem 1rem;
                    border: 1px solid #d3d3d3;
                    font-size: 1.2rem;
                    box-shadow: 0 0 1px 1px rgb(243, 243, 243);
                    cursor: pointer;
                    transition: .5s;
                }

                span:first-of-type {
                    margin-left: 2rem; 
                }

                span:hover {
                    box-shadow: 0 0 1px 1px rgb(98, 224, 255);
                }

            }

            .role-search {
                position: relative;
                margin-left:2rem;
                height:5rem;
                
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
                    top:2rem;
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

                .bgcolor {
                        background:#fcfcfc;

                        .page {
                            color:#fff;
                            padding:.3rem .6rem;
                            margin:0 .5rem;
                            color:#2ec2e7;
                            border:1px solid #2ec2e7;
                            cursor: pointer;
                            transition: .5s;
                        }

                        .page:hover {
                            background: #2ec2e7;
                            color: #fff;
                        }

                        .last,.next{
                            position: relative;
                            border:1px solid #dfdfdf;
                            padding:.3rem .6rem;
                            cursor: pointer;
                            transition: .5s;
                            color:#2ec2e7;
                        }

                        .page:first-of-type {
                            background:#2ec2e7;
                            color:#fff;
                        }
                    }

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
                            background:red;
                            border:1px solid red;
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

                        .button:first-of-type {
                            background: #fff;
                            color:#000;
                            border:1px solid #cecece;
                        }

                        .button:first-of-type:hover {
                            box-shadow: 0 0 1px 1px rgb(134, 231, 255);
                        }

                        .button:last-of-type:hover {
                            background:#fff;
                            color:red;
                        }

                    }

                    tr:first-of-type {
                        background:rgb(240, 240, 240);
                    }

                    input {
                        height:3rem;
                        width: 80%;
                        text-indent: 2rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: 1.2rem;
                    }

                    .behavior {
                        position: relative;
                        overflow: hidden;

                        .behavior-box {
                            position: relative;
                            background: #fafafa;
                            margin:1rem 1rem 3rem 1rem;
                            text-align: left;
                            box-shadow: 0 0 1px 1px rgb(226, 226, 226);

                            .behavior-head {
                                position: relative;
                                text-indent: 1.5rem;
                                border-bottom: 2px solid #5eb2fd;
                            }

                            span {
                                position: relative;
                                display: inline-block;
                                background:#51a841;
                                color:#fff;
                                border:1px solid #51a841;
                                line-height: 2.5rem;
                                padding:.2rem 1rem;
                                margin:1rem 1rem 3rem 1rem;
                                transition: .5s;
                                cursor: pointer;
                            }

                            span:hover {
                                background:#fff;
                                color: #51a841;
                            }
                        }
                    }

                }
            }

        }

        .role-box:hover {
            box-shadow: 0 0 2px 2px rgb(134, 231, 255);
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
    }

</style>

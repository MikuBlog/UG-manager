<template>
    
    <div class="bill">

        <div class="bill-box">

            <div class="bill-head">
                凭证列表
            </div>

            <div class="bill-button">
                <span @click="handleClick('/home/home_add_document')" class="button">
                    添加凭证
                </span>
                <span class="button" @click="downloadDocument()">
                    导出
                </span>
                <el-date-picker
                v-model="date"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </div>

            <div class="form-box">

                <div class="table">

                    <table ref="table">

                        <tr>
                            <th>日期</th>
                            <th>凭证号</th>
                            <th>凭证摘要</th>
                            <th>科目</th>
                            <th>借方金额</th>
                            <th>贷方金额</th>
                            <th>用户</th>
                        </tr>

                        <tr v-for="items in billList">
                            <td>{{items.date}}</td>
                            <td>{{items.voucherId}}</td>
                            <td>{{items.summary}}</td>
                            <td>{{items.subject}}</td>
                            <td>{{items.lend}}</td>
                            <td>{{items.loan}}</td>
                            <td>{{items.admin}}</td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <input type="text" placeholder="搜索凭证" @keydown="searchCode($event)" v-model="scId">
                            </td>
                            <td>
                                <input type="text" placeholder="搜索凭证摘要" @keydown="searchSummary($event)" v-model="scSummary">
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <input type="text" placeholder="搜索用户" @keydown="searchName($event)" v-model="scName">
                            </td>
                        </tr>

                        <tr>
                        <td colspan="7">
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

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                // 存放选中日期
                date:"",

                /**
                 *  date:日期
                 *  voucherId:凭证号
                 *  summary:凭证摘要
                 *  subject:科目
                 *  lend:借方金额
                 *  loan:贷方金额
                 *  admin:用户
                 */
                billList:[],

                // 保存当前页数
                pageId:1,

                // 保存每页显示的条数
                perPage:10,

                // 保存总页数列表
                pageList:[],

                // 保存搜索名字信息
                scId:"",

                // 保存搜索摘要
                scSummary:"",

                // 保存搜索用户名
                scName:"",

                // 存放函数名
                fName:"getUserList",

            }

        },

        methods: {

            // 跳转路由
            handleClick(path) {

                this.$router.push({path:path})

            },

            // 导出凭证
            downloadDocument() {

                window.open("http://118.24.136.82/index.php/index/Document_Management/out?button=导出")

            },

            // 请求搜索结果
            getSearchNameList(id) {

                var data = {

                    admin:this.scName

                }

                this.billList.splice(0,this.billList.length)

                var _this = this

                this.pageId = id

                this.fName = "getSearchNameList"

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Document_Management/search?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.bill.data

                        _this.initialPageCount(obj.pagecount)

                        _this.initialBillList(list)

                    },error() {

                        console.log("发出请求失败")

                    }

                })

            },

            // 搜索用户名
            searchName(event) {

                if(event.keyCode == 13) {

                    this.getSearchNameList(1)

                }

            },

            // 请求搜索结果
            getSearchSummaryList(id) {

                var data = {

                    summary:this.scSummary

                }

                console.log(data)

                this.billList.splice(0,this.billList.length)

                var _this = this

                this.pageId = id

                this.fName = "getSearchSummaryList"

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Document_Management/search?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.bill.data

                        _this.initialPageCount(obj.pagecount)

                        _this.initialBillList(list)

                    },error() {

                        console.log("发出请求失败")

                    }

                })

            },

            // 搜索用户名
            searchSummary(event) {

                if(event.keyCode == 13) {

                    this.getSearchSummaryList(1)

                }

            },

            // 请求搜索结果
            getSearchCodeList(id) {

                var data = {

                    voucherId:this.scId

                }

                this.billList.splice(0,this.billList.length)

                var _this = this

                this.pageId = id

                this.fName = "getSearchCodeList"

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Document_Management/search?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.bill.data

                        _this.initialPageCount(obj.pagecount)

                        _this.initialBillList(list)

                    },error() {

                        console.log("发出请求失败")

                    }

                })

            },

            // 搜索用户名
            searchCode(event) {

                if(event.keyCode == 13) {

                    this.getSearchCodeList(1)

                }

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

                this[this.fName](1)

            },

            // 初始化总页数
            initialPageCount(pagecount) {

                var loopNumber = pagecount

                this.pageList.length = 0

                for(var i = 1 ; i <= loopNumber ; i ++) {

                    this.pageList.push(i)

                }

            },

            // 初始化账单列表
            initialBillList(list) {

                var _this = this

                this.billList.length = 0

                list.forEach(function(value) {

                    _this.billList.push(value)

                })

            },

            // 请求账单列表
            getBillList(id) {

                var _this = this

                this.pageId = id

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Document_Management/showList?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"GET",

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.bill.data

                        _this.initialBillList(list)

                        _this.initialPageCount(obj.pagecount)

                    },error() {

                        console.log("发送请求失败")

                    }

                })

            }

        },

        mounted() {

            this.getBillList(1)

        }

    }

</script>

<style lang="scss" scoped>

    .bill {
        position: relative;
        margin:2rem;

        .bill-box {
            position: relative;
            overflow: hidden;
            background:#fff;
            box-shadow:  0 0 2px 2px rgb(226, 226, 226);
            transition: .5s;

            .bill-head {
                position: relative;
                line-height: 4rem;
                font-size: 1.2rem;
                background:#fff;
                box-shadow: 0 0 2px 2px rgb(226, 226, 226);
                text-indent: 2rem;
            }

            .bill-button {
                position: relative;
                margin-top: 2rem;

                .button {
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

                .button:first-of-type {
                    margin-left: 2rem; 
                }

                .button:hover {
                    box-shadow: 0 0 1px 1px rgb(98, 224, 255);
                }

                .el-date-editor {
                    position: absolute;
                    top:1.3rem;
                    right:2rem;

                }

            }

            .form-box {
                position: relative;
                display: flex;
                flex: 1;
                justify-content: space-around;
            }

            .table {
                position: relative;
                overflow: hidden;
                font-size: 1.2rem;
                margin:2rem;
                line-height: 3.5rem;
                justify-content: space-around;
                flex: 2;

                table {
                    position: relative;
                    border-collapse: collapse;
                    text-align: center;
                    transition: .5s;
                    width:100%;
                    margin: 2rem 0;

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

                    .icon {
                        position: relative;
                        cursor: pointer;
                    }

                    th {
                        border:1px solid #e3e3e3;
                    }
                    
                    td {
                        border:1px solid #e3e3e3;

                    }

                    tr:first-of-type {
                        background:#f5f5f5;
                    }

                    input {
                        text-indent: 1rem;
                        font-size: 1.2rem;
                        height: 2.5rem;
                    }
                }
            }

        }

        .bill-box:hover {
            box-shadow: 0 0 2px 2px rgb(134, 231, 255);
        }
    }

</style>

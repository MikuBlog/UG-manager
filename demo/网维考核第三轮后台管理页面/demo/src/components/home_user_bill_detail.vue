<template>
    
    <div class="bill">

        <div class="bill-box">

            <div class="bill-head">
                明细账
            </div>

            <div class="bill-button">
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
                            <th>借方</th>
                            <th>贷方</th>
                            <th>方向</th>
                            <th>余额</th>
                        </tr>

                        <tr v-for="items in billDetailList">
                            <td>{{items.date}}</td>
                            <td>{{items.voucherId}}</td>
                            <td>{{items.summary}}</td>
                            <td>{{items.lend}}</td>
                            <td>{{items.loan}}</td>
                            <td>{{items.direction}}</td>
                            <td>{{items.moneyleft}}</td>
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

                <div class="billList-search">

                    <div class="search-form-box">
                        <div class="head">
                            <span>当前科目:</span><span>{{subject}}</span>
                        </div>
                        <div class="search">
                            <input type="text" placeholder="搜索科目名">
                        </div>
                    </div>

                    <div class="select-box">

                        <div class="title" ref="first">
                            <span><i class="fa fa-minus fa-lg" @click="showHide($event)"></i>固定资产</span>
                            <span class="button-choose" @click="searchType('固定资产')">选择</span>
                        </div>

                        <ul>
                            <li>
                                <span>设备</span>
                                <span class="button-choose" @click="searchType('设备')">选择</span>
                            </li>
                            <li>
                                <span>其他固定资产</span>
                                <span class="button-choose" @click="searchType('其他固定资产')">选择</span>
                            </li>
                        </ul>

                        <div class="title" ref="second">
                            <span><i class="fa fa-minus fa-lg" @click="showHide($event)"></i>流动资产</span>
                            <span class="button-choose" @click="searchType('流动资产')">选择</span>
                        </div>

                        <ul>
                            <li>
                                <span>银行存款</span>
                                <span class="button-choose" @click="searchType('银行存款')">选择</span>
                            </li>
                            <li>
                                <span>负债</span>
                                <span class="button-choose" @click="searchType('负债')">选择</span>
                            </li>
                        </ul>

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

                // 存放选中日期
                date:"",

                /**
                 *  id:账单id
                 *  date:账单日期
                 *  voucherId:凭证号
                 *  summary:凭证摘要
                 *  subject:凭证类目
                 *  lend:借方
                 *  loan:贷方
                 *  admin:用户
                 *  direction:方向
                 *  moneyleft:余额
                 */
                billDetailList:[],

                // 存放当前选择的科目
                subject:"所有",

                // 存放获取到的账簿详情用户名
                billDetailAdmin:"",

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

                // 存放搜索类目
                scType:"",

                // 存放函数名
                fName:"getbillDetailList",

            }

        },

        methods: {

            // 导出该用户的明细账
            downloadDocument() {

                window.open("http://118.24.136.82/index.php/index/Account_Detail/out?button=导出&admin="+this.billDetailAdmin)

            },

            searchList(id) {

                var _this = this

                var time = {

                    year:new Date(this.date).getFullYear(),

                    month:new Date(this.date).getMonth()+1,

                    day:new Date(this.date).getDate()

                }

                if(time.day < 10) {

                    time.day = "0" + time.day

                }

                var data = {

                    createtime:this.date,

                    subject:this.scType

                }

                this.pageId = id

                this.billDetailList.splice(0,this.billDetailList.length)

                this.fName = "searchList"

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Account_Detail/search?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.detail.data

                        _this.initialPageCount(obj.pagecount)

                        _this.initialBillDetailList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            // 查询当前类目对应的列表信息
            searchType(str) {

                this.scType = str

                this.subject = str

                this.searchList(1)

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

            // 初始化总页数
            initialPageCount(pagecount) {

                var loopNumber = pagecount

                this.pageList.length = 0

                for(var i = 1 ; i <= loopNumber ; i ++) {

                    this.pageList.push(i)

                }

            },

            // 初始化账单列表
            initialBillDetailList(list) {

                var _this = this

                this.billDetailList.length = 0

                list.forEach(function(value) {

                    _this.billDetailList.push(value)

                })

            },

            // 请求账单列表
            getbillDetailList(id) {

                var data = {

                    admin:this.billDetailAdmin

                }

                var _this = this

                this.pageId = id

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Account_Detail/showList?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.detail.data

                        _this.initialBillDetailList(list)

                        _this.initialPageCount(obj.pagecount)

                    },error() {

                        console.log("发送请求失败")

                    }

                })

            },

            // 显示
            showHide(event) {

                var thisElement = event.currentTarget

                var element = event.currentTarget.parentNode.parentNode.nextElementSibling

                if(element.isHide == false) {

                    element.style.height = 0

                    thisElement.classList.add('fa-plus')

                    thisElement.classList.remove('fa-minus')

                    element.isHide = true

                }else {

                    element.style.height = "auto"

                    thisElement.classList.remove('fa-plus')

                    thisElement.classList.add('fa-minus')

                    element.isHide = false

                }

            }

        },

        mounted() {

            this.billDetailAdmin = this.$store.state.billDetailAdmin

            this.getbillDetailList(1)

            setTimeout(function() {

                // 给列表栏加上隐藏比较
                var ul = document.querySelectorAll('ul')

                ul.forEach(function(value) {

                    value.isHide = false

                })

            })

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
                }
            }

            .billList-search {
                position: relative;
                flex: 1;

                .search-form-box {
                    position: relative;
                    background:#f5f5f5;
                    margin:4rem 2rem 2rem 2rem;

                    .head {
                        position: relative;
                        font-size: 1.2rem;
                        line-height: 3rem;
                        text-indent: 1rem;
                        border: 1px solid #e8e8e8;

                        span {
                            margin:.5rem;
                        }
                    }

                    .search {
                        position: relative;

                        input {
                            position: relative;
                            width:50%;
                            height:2.5rem;
                            margin:.5rem 1rem;
                            text-indent: 1rem;
                        }
                    }

                }

                .select-box {
                    position: relative;
                    font-size: 1.3rem;
                    margin:4rem 2rem 2rem 2rem;

                    .title {
                        position: relative;
                        line-height: 4rem;
                        background:#f4f4f4;
                        margin:1rem 0;

                        i {
                            font-size: 1rem;
                            margin:0 1rem;
                            color:#57b4e1;
                            cursor: pointer;
                        }
                    }

                    ul {
                        position: relative;
                        text-align: right;
                        overflow: hidden;

                        li {
                            position: relative;
                            display: inline-block;
                            line-height: 4rem;
                            background:#f4f4f4;
                            margin:.5rem 0;
                            list-style: none;
                            width:90%;
                            text-indent: 1rem;
                            text-align: left;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                    }

                    .button-choose {
                        position: absolute!important;
                        right:.7rem;
                        top:.7rem;
                        font-size: 1.2rem;
                        position: relative;
                        line-height: 2.6rem;
                        padding:0 .6rem;
                        background:#57b5e2;
                        border:1px solid #57b5e2;
                        color:white;
                        text-indent: 0rem;
                        transition: .5s;
                        cursor: pointer;
                    }

                    .button-choose:hover {
                        color:#57b5e2;
                        background: #fff;
                    }

                }
            }

        }

        .bill-box:hover {
            box-shadow: 0 0 2px 2px rgb(134, 231, 255);
        }
    }

</style>

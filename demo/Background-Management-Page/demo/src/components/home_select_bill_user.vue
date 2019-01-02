<template>
    
    <div class="bill">

        <div class="bill-box">

            <div class="bill-head">
                账簿管理
            </div>

            <div class="person-search">
                <i class="fa fa-search fa-lg"></i><input type="text" @keydown="searchAll($event)" v-model="scAll">
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

            
            <div class="form-box">

                <div class="table">

                    <table ref="table">

                        <tr>
                            <th>登录名</th>
                            <th>操作</th>
                        </tr>

                        <tr v-for="items in billList">
                            <td>{{items.admin}}</td>
                            <td><span @click="getBillDetail(items.admin)" class="button">明细账</span></td>
                        </tr>

                        <tr>
                            <td><input type="text" placeholder="搜索登录名" v-model="scName" @keydown="searchName($event)"></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td colspan="2">
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

                // 存放账单列表
                billList:[],

                // 保存当前页数
                pageId:1,

                // 保存每页显示的条数
                perPage:10,

                // 保存总页数列表
                pageList:[],

                // 保存搜索名字信息
                scName:"",

                // 保存全局搜索信息
                scAll:"",

                // 存放函数名
                fName:"getBillList",

            }

        },

        methods: {

            // 获取该用户的明细账
            getBillDetail(admin) {

                this.$store.commit('setBillDetailAdmin',admin)

                this.$router.push({path:"/home/home_user_bill_detail"})

            },

            // 请求搜索结果
            getSearchNameList(id) {

                var data = {

                    search:this.scName

                }

                this.billList.splice(0,this.billList.length)

                var _this = this

                this.pageId = id

                this.fName = "getSearchNameList"

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Book_Management/search?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.name.data

                        _this.initialPageCount(obj.pagecount)

                        _this.initailBillList(list)

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
            getSearchAllList(id) {

                var data = {

                    search:this.scAll

                }

                this.billList.splice(0,this.billList.length)

                var _this = this

                this.pageId = id

                this.fName = "getSearchAllList"

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Book_Management/search?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.name.data

                        _this.initialPageCount(obj.pagecount)

                        _this.initailBillList(list)

                    },error() {

                        console.log("发出请求失败")

                    }

                })

            },

            // 搜索用户名
            searchAll(event) {

                if(event.keyCode == 13) {

                    this.getSearchAllList(1)

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

            // 跳转路由
            handleClick(path) {

                this.$router.push({path:path})

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
            initailBillList(list) {

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

                    url:"http://118.24.136.82/index.php/index/Book_Management/showList?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"GET",

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.book.data

                        _this.initailBillList(list)

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

            .person-search {
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
                    text-align: center;
                    transition: .5s;
                    width:100%;
                    margin: 2rem 0;

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
                            line-height: 2rem;
                            padding:.1rem .6rem;
                            background:#57b5e2;
                            border:1px solid #57b5e2;
                            color:#fff;
                            transition: .5s;
                            border-radius: .2rem;
                            cursor: pointer;
                        }

                        i {
                            position: relative;
                            top:-.2rem;
                            font-size: 1rem;
                            margin-right: .5rem; 
                        }

                        .button:hover {
                            background:#fff;
                            color: #57b5e2;
                        }


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

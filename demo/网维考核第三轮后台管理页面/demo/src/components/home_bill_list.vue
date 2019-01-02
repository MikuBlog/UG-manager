<template>
    
    <div class="person-list">
 
        <div class="person-list-box">

            <div class="person-head">
                科目列表
            </div>

            <div class="person-button">
                <span @click="handleClick('/home/home_add_bill')">
                    添加科目
                </span>
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

            <div class="table">

                <table ref="table">

                    <tr>
                        <th>科目编码</th>
                        <th>科目名</th>
                        <th>科目总类别</th>
                        <th>科目类别</th>
                        <th>余额方向</th>
                    </tr>

                    <tr v-for="items in subjectList">
                        <td>{{items.id}}</td>
                        <td>{{items.name}}</td>
                        <td>{{items.allType}}</td>
                        <td>{{items.type}}</td>
                        <td>{{items.direction}}</td>
                    </tr>

                    <tr>
                        <td>
                            <input type="text" placeholder="搜索科目编码" @keydown="searchCode($event)" v-model="scId">
                        </td>
                        <td></td>
                        <td>
                            <input type="text" placeholder="搜索科目类别" @keydown="searchType($event)" v-model="scType">
                        </td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td colspan="5">
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

</template>

<script>

    export default {

        data() {

            return {

                /**
                 *  id:科目id
                 *  name:科目名称
                 *  allType:科目总类别
                 *  type:科目类别
                 *  direction:余额方向
                 */
                subjectList:[],

                // 保存当前页数
                pageId:1,

                // 保存每页显示的条数
                perPage:10,

                // 保存总页数列表
                pageList:[],

                // 保存搜索名字信息
                scType:"",

                // 保存全局搜索结果
                scAll:"",

                // 搜索科目代码
                scId:"",

                // 存放函数名
                fName:"getBillList",

            }

        },

        methods: {

            // 跳转路由
            handleClick(path) {

                this.$router.push({path:path})

            },

            // 请求搜索结果
            getSearchTypeList(id) {

                var data = {

                    type:this.scType

                }

                console.log(data)

                this.subjectList.splice(0,this.subjectList.length)

                var _this = this

                this.pageId = id

                this.fName = "getSearchTypeList"

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/subject/search?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.subject.data

                        _this.initialPageCount(obj.pagecount)

                        _this.initialBillList(list)

                    },error() {

                        console.log("发出请求失败")

                    }

                })

            },

            // 搜索用户名
            searchType(event) {

                if(event.keyCode == 13) {

                    this.getSearchTypeList(1)

                }

            },

            // 请求搜索结果
            getSearchCodeList(id) {

                var data = {

                    id:this.scId

                }

                this.subjectList.splice(0,this.subjectList.length)

                var _this = this

                this.pageId = id

                this.fName = "getSearchCodeList"

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/subject/search?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.subject.data

                        _this.initialPageCount(obj.pagecount)

                        _this.initialBillList(list)

                    },error() {

                        console.log("发出请求失败")

                    }

                })

            },

            // 搜索代码
            searchCode(event) {

                if(event.keyCode == 13) {

                    this.getSearchCodeList(1)

                }

            },

            // 请求搜索结果
            getSearchAllList(id) {

                var data = {

                    query:this.scAll

                }

                this.pageId = id

                this.subjectList.splice(0,this.subjectList.length)

                var _this = this

                this.fName = "getSearchAllList"

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/subject/all?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.subject.data

                        _this.initialPageCount(obj.pagecount)

                        _this.initialBillList(list)

                    },error() {

                        console.log("发出请求失败")

                    }

                })

            },

            // 全局搜索
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

            // 获取每页的条数
            getPerpage(event) {

                this.perPage = event.currentTarget.value

                this[this.fName](1)

            },

            // 跳转路由
            handleClick(path) {

                this.$router.push({path:path})

            },

            // 初始化总页数
            initialPageCount(pagecount) {

                var loopNumber = pagecount

                this.pageList.length = 0

                for(var i = 1 ; i <= loopNumber ; i ++) {

                    this.pageList.push(i)

                }

            },

            // 初始化科目列表
            initialBillList(list) {

                var _this = this

                this.subjectList.length = 0

                list.forEach(function(value) {

                    _this.subjectList.push(value)

                })

            },

            // 请求对应页的科目列表
            getBillList(id) {

                var _this = this

                this.pageId = id

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/subject/subject?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"GET",

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.subject.data

                        _this.initialBillList(list)
                        
                        _this.initialPageCount(obj.pagecount)

                    },error() {

                        console.log("发送请求失败")

                    }

                })

            }

        },

        mounted() {

            // 请求行为列表
            this.getBillList(1)

        }

    }

</script>

<style lang="scss" scoped>

    .person-list {
        position: relative;
        margin:2rem;

        .person-list-box {
            position: relative;
            overflow: hidden;
            background:#fff;
            box-shadow:  0 0 2px 2px rgb(226, 226, 226);
            transition: .5s;

            .person-head {
                position: relative;
                line-height: 4rem;
                font-size: 1.2rem;
                background:#fff;
                box-shadow: 0 0 2px 2px rgb(226, 226, 226);
                text-indent: 2rem;
            }

            .person-button {
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

                        .button:first-of-type:hover {
                            background: #fff;
                            color: #57b5e2;
                        }

                        .button:nth-of-type(2) {
                            background:#facf5d;
                            border:1px solid #facf5d;
                        }

                        .button:nth-of-type(3) {
                            background:#9adb5d;
                            border:1px solid #9adb5d;
                        }

                        .button:nth-of-type(4) {
                            background:#d63d34;
                            border:1px solid #d63d34;
                        }

                        .button:nth-of-type(2):hover {
                            background:#fff;
                            color:#facf5d;
                        }

                        .button:nth-of-type(3):hover {
                            background:#fff;
                            color: #9adb5d;
                        }

                        .button:nth-of-type(4):hover {
                            background:#fff;
                            color: #d63d34;
                        }

                    }

                    tr:first-of-type {
                        background:rgb(240, 240, 240);
                    }

                    input {
                        height:2.5rem;
                        text-indent: 2rem;
                        width:80%;
                        font-size: 1.2rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                }
            }


        }

        .person-list-box:hover {
            box-shadow: 0 0 2px 2px rgb(134, 231, 255);
        }
    }

</style>

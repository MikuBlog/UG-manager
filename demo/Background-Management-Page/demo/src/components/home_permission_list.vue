<template>
    
    <div class="role">

        <div class="role-box">

            <div class="role-head">
                行为列表
            </div>

            <div class="role-button">
                <span @click="handleClick('/home/home_edit_permission','add')">
                    添加行为
                </span>
            </div>

            <div class="role-search">
                <i class="fa fa-search fa-lg"></i><input type="text" @keydown="searchAll($event)" v-model="scAll">
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
                        <th>行为名</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>

                    <tr v-for="items in roleList">
                        <td>{{items.name}}</td>
                        <td>{{items.createtime}}</td>
                        <td>
                            <span class="button" @click="handleClick('/home/home_edit_permission','edit')"><i class="fa fa-pencil fa-lg"></i>编辑</span>
                            <span class="button"><i class="fa fa-trash fa-lg"></i>删除</span>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input type="text" placeholder="搜索行为名" @keydown="searchName($event)" v-model="scName">
                        </td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td colspan="4">
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
                 *  name:行为名称
                 *  id:行为id
                 *  createtime:创建的时间
                 */
                roleList:[],

                // 显示行为信息
                showBehavior:false,

                // 存放行为列表
                behaviorList:[],

                // 保存当前页数
                pageId:1,

                // 保存每页显示的条数
                perPage:10,

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
                fName:"getRoleList",

            }

        },

        methods: {

            // 请求搜索结果
            getSearchNameList(id) {

                var data = {

                    name:this.scName

                }

                this.roleList.splice(0,this.roleList.length)

                var _this = this

                this.pageId = id

                this.fName = "getSearchNameList"

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/permission/search?pageMax="+_this.perPage+"&page="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.user.data

                        console.log(list)

                        _this.initialPageCount(obj.pagecount)

                        _this.initialRoleList(list)

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

                    query:this.scAll

                }

                this.pageId = id

                this.roleList.splice(0,this.roleList.length)

                var _this = this

                this.fName = "getSearchAllList"

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/permission/all?pageMax="+_this.perPage+"&page="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.user.data

                        console.log(_this.perPage)

                        _this.initialPageCount(obj.pagecount)

                        _this.initialRoleList(list)

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
            handleClick(path,command) {

                if(command == "add") {

                    this.$store.commit('setBehaviorTitle',"添加行为")

                }else {

                    this.$store.commit('setBehaviorTitle',"编辑行为")

                }

                this.$router.push({path:path})

            },

            // 初始化行为列表
            initialList(list) {

                var _this = this

                this.allBehaviorList.length = 0

                list.forEach(function(value) {

                    _this.allBehaviorList.push(value)

                })

            },

            getList(id) {

                var _this = this

                this.pageId = id

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/permission/showList?pageMax="+_this.perPage+"&page="+id,

                    type:"GET",

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.user.data

                        _this.initialList(list)

                    },error() {

                        console.log("发送请求失败")

                    }

                })

            },

            // 初始化总页数
            initialPageCount(pagecount) {

                var loopNumber = pagecount

                this.pageList.length = 0

                for(var i = 1 ; i <= loopNumber ; i ++) {

                    this.pageList.push(i)

                }

            },

            // 初始化角色列表
            initialRoleList(list) {

                var _this = this

                this.roleList.length = 0

                list.forEach(function(value) {

                    _this.roleList.push(value)

                })

            },

            // 获取角色列表
            getRoleList(id) {

                var _this = this

                this.pageId = id

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/permission/showList?pageMax="+_this.perPage+"&page="+id,

                    type:"GET",

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.user.data

                        _this.initialRoleList(list)

                        _this.initialPageCount(obj.pagecount)

                    },error() {

                        console.log("发送请求失败")

                    }

                })

            }

        },

        mounted() {

            // 请求行为列表
            this.getRoleList(1)

        }

    }

</script>

<style lang="scss">

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
                            background: #59b5e1;
                            color:#fff;
                            border:1px solid #59b5e1;
                        }

                        .button:first-of-type:hover {
                            background: #fff;
                            color:#59b5e1;
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
    }

</style>

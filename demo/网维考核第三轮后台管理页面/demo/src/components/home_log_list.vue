<template>
    
    <div class="role">

        <div class="role-box">

            <div class="role-head">
                日志列表
            </div>

            <div class="role-search">
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
                        <th>登录名</th>
                        <th>接口</th>
                        <th>参数</th>
                        <th>时间</th>
                    </tr>

                    <tr v-for="items in logList">
                        <td>{{items.name}}</td>
                        <td>{{items.action}}</td>
                        <td>{{items.para}}</td>
                        <td>{{items.createtime}}</td>
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
                 *  createtime:创建时间
                 *  name:名称
                 *  permission_id:行为id
                 */
                logList:[],

                // 显示行为信息
                showBehavior:false,

                // 存放行为列表
                behaviorList:[],

                // 保存当前页数
                pageId:1,

                // 保存每页显示的条数
                perPage:10,

                // 保存总页数列表
                pageList:[],

                // 存放函数名
                fName:"getLogList",

            }

        },

        methods: {

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

            // 显示列表
            showDetail(event,id) {

                var element = event.currentTarget

                var elements = document.querySelectorAll('.icon>i')

                var parent = element.parentNode.parentNode.parentNode

                var _this = this

                var behaviorBox = this.$refs.behavior

                var table  = this.$refs.table

                this.behaviorList.length = 0

                var array = id.split(',')

                this.behaviorList.length = 0

                array.forEach(function(value) {

                    var data = {

                        id:value

                    }

                    $.ajax({

                        url:"http://118.24.136.82/index.php/index/role/showPermission",

                        type:"post",

                        data:JSON.stringify(data),

                        success(data) {

                            var obj = JSON.parse(data)

                            var name = obj.name

                            _this.behaviorList.push(name)
                            

                        },error() {

                            console.log("请求失败")

                        }

                    })

                })

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

                    this.showBehavior = true

                }else {

                    element.classList.add('fa-plus-square-o')

                    element.classList.remove('fa-minus-square-o')

                    element.isPlus = true

                    this.showBehavior = false
                    
                }

            },

            // 跳转路由
            handleClick(path,command) {

                if(command == "add") {

                    this.$store.commit('setRoleTitle',"添加角色")

                }else {

                    this.$store.commit('setRoleTitle',"编辑角色")

                }

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

            // 初始化角色列表
            initialLogList(list) {

                var _this = this

                this.roleList.length = 0

                list.forEach(function(value) {

                    _this.roleList.push(value)

                })

            },

            // 获取角色列表
            getLogList(id) {

                var _this = this

                this.pageId = id

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/role/showList?pageMax=6"+_this.perPage+"&page="+id,

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

            var logList = this.$store.state.logList

            var _this = this

            if(logList.length != 0) {

                logList.forEach(function(value) {

                    _this.logList.push(value)

                })

            }

            this.getLogList(1)

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
                height:5rem;
                margin:2rem;

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
    }

</style>

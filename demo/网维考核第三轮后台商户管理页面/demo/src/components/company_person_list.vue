<template>
    
    <div class="person-list">
 
        <div class="person-list-box">

            <div class="person-head">
                人员列表
            </div>

            <div class="person-button">
                <span @click="handleClick('/home/company_add_person')">
                    添加人员
                </span>
            </div>

            <div class="person-search">
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
                        <th>工号</th>
                        <th>登录名</th>
                        <th>姓名</th>
                        <th>电话</th>
                        <th>角色</th>
                        <th>微信名称</th>
                        <th>评价</th>
                        <th>操作</th>
                    </tr>

                    <tr v-for="items in workerList">
                        <td>{{items.staffId}}</td>
                        <td>{{items.loginName}}</td>
                        <td>{{items.name}}</td>
                        <td>{{items.phone}}</td>
                        <td>{{items.work}}</td>
                        <td>{{items.wxName}}</td>
                        <td>{{items.score}}</td>
                        <td>
                            <span class="button" @click="handleClick('/home/company_edit_person',items)"><i class="fa fa-pencil fa-lg"></i>编辑</span>
                            <span class="button" @click="handleClick('/home/company_edit_person_password',items)"><i class="fa fa-key fa-lg"></i>修改密码</span>
                            <span class="button"><i class="fa fa-exchange fa-lg"></i>绑定</span>
                            <span class="button" @click="deleteWorker(items.id)"><i class="fa fa-trash fa-lg"></i>删除</span>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input type="text" placeholder="搜索工号">
                        </td>
                        <td></td>
                        <td>
                            <input type="text" placeholder="搜索姓名">
                        </td>
                        <td>
                            <input type="text" placeholder="搜索电话">
                        </td>
                        <td>
                            <input type="text" placeholder="搜索角色">
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td colspan="8">
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
                 *  company:公司名
                 *  companyType:公司类型
                 *  companyRange:公司营业范围
                 *  id:员工iD
                 *  idCard:身份证号码
                 *  idFrontUrl:身份证正面
                 *  idBackUrl:身份证反面    
                 *  name:员工名字
                 *  loginName:员工登录名
                 *  password:登录密码
                 *  phone:员工联系方式
                 *  role:角色
                 *  score:评价
                 *  staffId:工号
                 *  work:职位
                 *  wxName:微信名称
                 *  wx_head_url:微信头像
                 */
                workerList:[],

                // 保存当前页数
                pageId:1,

                // 保存每页显示的条数
                perPage:10,

                // 保存总页数列表
                pageList:[],

                // 存放函数名
                fName:"getPersonList",

            }

        },

        methods: {

            // 删除员工
            deleteWorker(id) {

                var _this = this

                var data = {

                    id:id,

                    session_id:this.$store.state.session.id

                }

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Company_staff/delete",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {
                        
                        _this[_this.fName](1)

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            // 跳转路由
            handleClick(path,obj) {

                this.$store.commit('setWorkerDetail',obj)

                this.$router.push({path:path})

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

            // 初始化人员管理列表
            initialPersonList(list) {

                var _this = this

                _this.workerList.length = 0

                list.forEach(function(value) {

                    _this.workerList.push(value)

                })

            },

            // 请求人员管理列表
            getPersonList(id) {

                var _this = this

                var data = {

                    session_id:this.$store.state.session.id

                }
        
                this.pageId = id

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Company_staff/showbycompany?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.staff.data

                        _this.initialPageCount(obj.pagecount)

                        _this.initialPersonList(list)

                    },error() {

                        console.log("发送请求失败")

                    }

                })

            },

        },

        mounted() {

            // 判断员工列表是否存在，如果存在则使用该列表
            this.getPersonList(1)


        }

    }

</script>

<style lang="scss">

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

                table {
                    position: relative;
                    border-collapse: collapse;
                    width:100%;
                    text-align: center;

                    .icon {
                        position: relative;
                        cursor: pointer;
                    }

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

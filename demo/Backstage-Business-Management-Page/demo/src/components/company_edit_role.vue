<template>
    
    <div class="edit-role">

        <div class="edit-role-box">

            <div class="role-head">
                {{editAdd}}
            </div>

            <div class="role-button">
                <span @click="showBox()" class="button">返回</span>
                <span @click="sendMessage()" class="button">确认</span>
                <span ref="warn" style="color:red;font-size:1.4rem;margin-left:2rem;"></span>
            </div>

            <div class="role-name">
                <span>角色名</span>
                <div>
                    <input type="text" placeholder="请输入角色名" v-model="name">
                </div>
            </div>

            <div class="role-search">
                <div class="search">
                    <i class="fa fa-search fa-lg"></i><input type="text">
                </div>
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

                <table class="table-box">
                    <tr>
                        <th>行为名</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(items,index) in alreadyHasList">
                        <td>{{items.name}}</td>
                        <td><span @click="throwBehavior(index)"><i class="fa fa-arrow-right fa-lg"></i>取消</span></td>
                    </tr>
                </table>

                <table>
                    <tr>
                        <th>行为名</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="items in allBehaviorList">
                        <td>{{items.name}}</td>
                        <td><span @click="getBehaviorList(items)"><i class="fa fa-arrow-left fa-lg"></i>分配</span></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="nextPage bgcolor">
                                <span class="last">上一页</span>
                                <span class="page" @click="getList(items)">1</span>
                                <span class="next">下一页</span>
                            </div>
                        </td>
                    </tr>
                </table>

            </div>

        </div>

        <div class="cancel" v-show="isHide">

            <div class="cancel-box">
                <div class="cancel-head">确认放弃编辑角色吗?</div>
                <div class="cancel-button">
                    <span @click="hideBox()">取消</span>
                    <span @click="handleClick('/home/company_role_list',false)">确认</span>
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
                 *  name:行为名称
                 *  id:行为id
                 */
                allBehaviorList:[],

                // 角色管理标题
                editAdd:"添加角色",

                // 是否隐藏取消框
                isHide:false,

                // 保存以获取的行为列表
                alreadyHasList:[],

                // 保存当前页数
                pageId:1,

                // 保存每页显示的条数
                perPage:10,

                // 保存角色名称
                name:""

            }

        },

        methods: {

            // 获取每页的条数
            getPerpage(event) {

                this.perPage = event.currentTarget.value

                this.getList(this.pageId)

            },

            // 显示取消框
            showBox() {

                this.isHide = true

            },

            // 隐藏取消框
            hideBox() {

                this.isHide = false

            },

            // 获取行为列表
            getBehaviorList(behavior) {

                var list = this.alreadyHasList

                if(list.indexOf(behavior) != -1) {

                    return

                }else {

                    list.push(behavior)

                }

            },

            // 删除对应行为
            throwBehavior(index) {

                this.alreadyHasList.splice(index,1)

            },

            // 跳转路由
            handleClick(path) {

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

            sendMessage() {

                var _this = this

                var role = ""

                this.alreadyHasList.forEach(function(value,index) {

                    role += value.id

                    if(index == _this.alreadyHasList.length - 1) {
                         
                        return

                    }

                    else {

                        role += ","

                    }

                })

                if(this.editAdd == "添加角色") {

                    var data = {

                        session_id:this.$store.state.session.id,

                        permission_id:role,

                        name:this.name

                    }

                    $.ajax({

                        url:"http://118.24.136.82/index.php/index/Company_Role/addRole",

                        type:"post",

                        data:JSON.stringify(data),

                        success(data) {

                            var obj = JSON.parse(data)

                            _this.$refs.warn.innerText = obj.msg

                        },error() {

                            console.log("请求失败")

                        }

                    })

                }else {

                    var data = {

                        session_id:this.$store.state.session.id,

                        id:this.$store.state.roleDetail.id,

                        permission_id:role,

                        name:this.name

                    }

                    $.ajax({

                        url:"http://118.24.136.82/index.php/index/Company_Role/roleManagement",

                        type:"post",

                        data:JSON.stringify(data),

                        success(data) {

                            var obj = JSON.parse(data)

                            _this.$refs.warn.innerText = obj.msg

                        },error() {

                            console.log("请求失败")

                        }

                    })


                }

            }

        },

        mounted() {

            // 请求行为列表
            this.getList(1)

            this.editAdd = this.$store.state.editAdd

        }

    }

</script>

<style lang="scss">

    .edit-role {
        position: relative;
        margin:2rem;

        .edit-role-box {
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

                .button {
                    font-size: 1.2rem;
                    margin:2rem .5rem;
                    padding:.5rem 1rem;
                    border-radius: .3rem;
                    cursor: pointer;
                    transition: .5s;
                }

                .button:first-of-type {
                    position: relative;
                    display: inline-block;
                    margin-left:2rem;
                    border:1px solid #d1d1d1;
                }

                span:nth-of-type(2) {
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

            .role-name {
                position: relative;
                font-size: 1.2rem;

                span {
                    position: relative;
                    margin-left: 2rem;
                }

                div {
                    margin:1rem 2rem;
                    
                    input {
                        position: relative;
                        height:3rem;
                        text-indent: 1.5rem;
                        width: 100%;
                    }
                }
            }

            .role-search {
                position: relative;
                margin-left:2rem;

                .search {
                    position: relative;
                    margin:4rem 0 2rem 0;
                    left:50%;
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
                overflow: hidden;
                font-size: 1.2rem;
                margin:2rem;
                line-height: 3.5rem;
                display: flex;
                justify-content: space-around;
                border:1px solid #d3d3d3;
                box-shadow: 0 0 1px 1px rgb(226, 226, 226);

                table {
                    position: relative;
                    border-collapse: collapse;
                    width:40%;
                    text-align: center;
                    transition: .5s;
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

                        span {
                            position: relative;
                            display: inline-block;
                            margin:1rem 0;
                            line-height: 1.8rem;
                            padding:.1rem .6rem;
                            background:#57b5e2;
                            border:1px solid #57b5e2;
                            color:#fff;
                            transition: .5s;
                            border-radius: .5rem;
                            cursor: pointer;
                        }

                        i {
                            position: relative;
                            top:-.2rem;
                            font-size: 1rem;
                            margin-right: .5rem; 
                        }

                        span:hover {
                            background:#fff;
                            color: #57b5e2;
                        }

                        .last,.next {
                            color: #000;
                            background:#f5f5f5;
                            border: 1px solid #e3e3e3;
                            border-radius: .1rem;
                        }

                        .page {
                            background: #57b5e2;
                            border-radius: .1rem;
                        }

                        .bgcolor {
                            background:#fcfcfc;
                        }

                    }

                    tr:first-of-type {
                        background:#f5f5f5;
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

                table:hover {
                    box-shadow: 0 0 2px 2px rgb(134, 231, 255);
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

        .edit-role-box:hover {
            box-shadow: 0 0 2px 2px rgb(134, 231, 255);
        }
    }

</style>

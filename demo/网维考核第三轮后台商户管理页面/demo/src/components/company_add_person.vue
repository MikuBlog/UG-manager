<template>
    
    <div class="edit-person">

        <div class="edit-person-box">

            <div class="person-head">
                添加人员
            </div>

            <div class="person-button">
                <span @click="showBox()" class="button">返回</span>
                <span @click="sendMessage()" class="button">确认</span>
                <span ref="warn" style="color:red;font-size:1.4rem;margin-left:2rem;"></span>
            </div>

            <div class="person-form">

                <div class="person-mes bigbox">

                    <div class="person-mes-head head">
                        人员信息
                    </div>

                    <div class="boxs">
                        <div>
                            <span class="mes">工号:</span>
                            <div><input type="text" placeholder="请输入工号" v-model="staffId"></div>
                            <span ref="id" class="warn"></span>
                        </div>

                        <div>
                            <span class="mes">登录名:</span>
                            <div><input type="text" placeholder="请输入登录名" v-model="loginName"></div>
                            <span ref="login_name" class="warn"></span>
                        </div>

                    </div>

                    <div class="boxs">
                        <div>
                            <span class="mes">密码:</span>
                            <div><input type="text" placeholder="请输入密码" v-model="password"></div>
                            <span ref="id" class="warn"></span>
                        </div>

                        <div>
                            <span class="mes">确认密码:</span>
                            <div><input type="text" placeholder="请确认密码" v-model="espassword"></div>
                            <span ref="login_name" class="warn"></span>
                        </div>

                    </div>

                    <div class="boxs">

                        <div>
                            <span class="mes">姓名:</span>
                            <div><input type="text" placeholder="请输入姓名" v-model="name"></div>
                            <span ref="name" class="warn"></span>
                        </div>

                        <div>
                            <span class="mes">电话:</span>
                            <div><input type="text" placeholder="请输入联系方式" v-model="phone"></div>
                            <span ref="phone" class="warn"></span>
                        </div>

                    </div>

                    <div>
                        <span class="mes">身份证号码:</span>
                        <div><input type="text" placeholder="请输入身份证号" v-model="idCard"></div>
                        <span ref="identify" class="warn"></span>
                    </div>

                    <div class="picture">
                        <span class="mes">身份证正面:</span>
                        <div>
                            <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :drag="true"
                            :before-upload="getPicture_2">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </div>

                    <div class="picture">
                        <span class="mes">身份证背面:</span>
                        <div>
                            <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :drag="true"
                            :before-upload="getPicture_3">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </div>

                </div>

                <!-- <div class="person-wx bigbox">
                    <div class="person-mes-head head">
                        微信
                    </div>
                    <div>
                        <span class="button"><i class="fa fa-exchange fa-lg"></i>绑定微信</span>
                    </div>
                    <div>
                        <span class="mes"微信头像:</span>
                        <div>
                            <img class="image" :src="workerDetail.wx_head_url">
                        </div>
                    </div>
                    <div>
                        <span class="mes">微信昵称:</span><span>{{workerDetail.wxName}}</span>
                    </div>
                </div> -->

                <div class="person-role bigbox">

                    <div class="head">
                        角色
                    </div>

                    <div class="person-search">
                        <div class="search">
                            <i class="fa fa-search fa-lg"></i><input type="text">
                        </div>
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

        <div class="cancel" v-show="isHide">

            <div class="cancel-box">
                <div class="cancel-head">确认放弃编辑员工吗?</div>
                <div class="cancel-button">
                    <span @click="hideBox()">取消</span>
                    <span @click="handleClick('/home/company_person_list',false)">确认</span>
                </div>
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                // 存放表单信息
                staffId:"",

                loginName:"",

                name:"",

                phone:"",

                idCard:"",

                password:"",

                espassword:"",

                 // 身份证正面
                idFrontUrl:"",

                // 身份证背面
                idBackUrl:"",

                // 存放员工信息
                workerDetail: {},

                // 是否隐藏取消框
                isHide:false,

                // 存放角色列表
                orderList:[],

                // 存放已选角色列表
                hasOrderList:[],

                // 存放图片文件
                dialogImageUrl:[],

                dialogVisible:false,

                /**
                 *  name:行为名称
                 *  id:行为id
                 */
                allBehaviorList:[],

                // 保存以获取的行为列表
                alreadyHasList:[],

                // 保存当前页数
                pageId:1,

                // 保存每页显示的条数
                perPage:10,

                // 保存总页数列表
                pageList:[],

                // 保存搜索名字信息
                scName:"",

                // 存放函数名
                fName:"getList",


            }

        },

        methods: {

            // 判断表单信息
            // justify() {

            //     var regexp = /^\w+$/

            //     if(this.workerId == "") {

            //         this.$refs.id.innerText = "请输入工单号"

            //     }

            //     if(this.loginName == "") {

            //         this.$refs.login_name.innerText = "请输入登录名"

            //     }

            //     if(this.workerName == "") {

            //         this.$refs.name.innerText = "请输入员工名称"

            //     }

            //     if(this.workerPhone == "") {

            //         this.$refs.phone.innerText = "请输入员工电话"

            //     }

            //     if(this.workerIdentify == "") {

            //         this.$refs.identify.innerText = "请输入身份证号码"

            //     }

            //     if(this.loginName.length < 3 || this.loginName.length > 10) {

            //         this.$refs.login_name.innerText = "只允许输入3-21个字符"

            //     }else {

            //         if(!regexp.test(this.loginName)) {

            //             this.$refs.login_name.innerText = "只允许输入数字、字母"

            //         }

            //     }

            // },

            // 请求搜索结果
            getSearchNameList(id) {

                var data = {

                    name:this.scName

                }

                this.allBehaviorList.splice(0,this.allBehaviorList.length)

                var _this = this

                this.pageId = id

                this.fName = "getSearchNameList"

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Company_Role/search?pageMax="+_this.perPage+"&page="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.role.data

                        _this.initialPageCount(obj.pagecount)

                        _this.initialList(list)

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

            // 初始化总页数
            initialPageCount(pagecount) {

                var loopNumber = pagecount

                this.pageList.length = 0

                for(var i = 1 ; i <= loopNumber ; i ++) {

                    this.pageList.push(i)

                }

            },

            // 初始化行为列表
            initialList(list) {

                var _this = this

                this.allBehaviorList.length = 0

                list.forEach(function(value) {

                    _this.allBehaviorList.push(value)

                })

            },

            // 获取对应页数的行为列表
            getList(id) {

                var _this = this

                this.pageId = id

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Company_Role/search?pageMax="+_this.perPage+"&page="+id,

                    type:"GET",

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.role.data

                        _this.initialList(list)

                        _this.initialPageCount(obj.pagecount)

                    },error() {

                        console.log("发送请求失败")

                    }

                })

            },

            // 显示提示框
            showBox() {

                this.isHide = true

            },

            // 隐藏取消框
            hideBox() {

                this.isHide = false

            },

            // 将图片发送到服务器
            getPicture_2(file) {
        
                var formData = new FormData()

                formData.append('file',file)

                var _this = this

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Mancompany/picturepost",

                    type:"post",

                    data:formData,

                    contentType:false,

                    processData:false,

                    success(data) {

                        var obj = JSON.parse(data)

                        _this.idFrontUrl = obj.pagecount

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            // 将图片发送到服务器
            getPicture_3(file) {
        
                var formData = new FormData()

                formData.append('file',file)

                var _this = this

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Mancompany/picturepost",

                    type:"post",

                    data:formData,

                    contentType:false,

                    processData:false,

                    success(data) {

                        var obj = JSON.parse(data)

                        _this.idBackUrl = obj.pagecount

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            // 获取行为列表
            getRoleList(role) {

                var list = this.hasOrderList

                if(list.indexOf(role) != -1) {

                    return

                }else {

                    list.push(role)

                }

            },

            // 删除对应行为
            throwRole(index) {

                this.hasOrderList.splice(index,1)

            },

            // 跳转路由
            handleClick(path) {

                this.$router.push({path:path})

            },

            // 发送请求
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

                var data = {

                    session_id:this.$store.state.session.id,

                    staffId:this.staffId,

                    loginName:this.loginName,

                    password:this.password,

                    espassword:this.espassword,

                    name:this.name,

                    phone:this.phone,

                    idCard:this.idCard,

                    idFrontUrl:this.idFrontUrl,

                    idBackUrl:this.idBackUrl,

                    wx_head_url:"123123",

                    wxName:"旋仔",

                    role:role,

                    work:"公司经理"

                }

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Company_staff/addbycompany",

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

        },

        mounted() {

            this.workerDetail = this.$store.state.workerDetail

            this.getList(1)

        }

    }

</script>

<style lang="scss">

    .edit-person {
        position: relative;
        margin:2rem;

        .edit-person-box {
            position: relative;
            overflow: hidden;
            background:#fff;
            box-shadow:  0 0 2px 2px rgb(226, 226, 226);
            transition: .5s;

            .picture {
                margin:50px 2rem;
            }

            .person-head {
                position: relative;
                line-height: 4rem;
                font-size: 1.2rem;
                background:#fff;
                box-shadow: 0 0 2px 2px rgb(196, 196, 196);
                text-indent: 2rem;
            }

            .person-button {
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

            .person-form {
                position: relative;
                overflow: hidden;
                font-size: 1.2rem;
                margin:2rem;
                line-height: 3.5rem;
                border:1px solid #d3d3d3;
                box-shadow: 0 0 1px 1px rgb(226, 226, 226);

                .head {
                    position: relative;
                    text-indent: 2rem;
                    margin:2rem 0;
                    border:1px solid #d3d3d3;
                    box-shadow: 0 0 1px 1px rgb(226, 226, 226);
                }

                .head:first-of-type {
                    margin:0;
                }

                .boxs {
                    position: relative;
                    display: flex;
                    justify-content: space-around;

                    div {
                        position: relative;
                        flex:1;

                        div {
                            input {
                                width:80%;
                            }
                        }
                    }
                }

                .warn {
                    color:red;
                }

                .button {
                    position: relative;
                    display: inline-block;
                    margin:1rem 0;
                    line-height: 2.8rem;
                    padding:0 1rem;
                    background:#9fd36a;
                    border:1px solid #9fd36a;
                    color:#fff;
                    transition: .5s;
                    margin-left: 2rem;
                    cursor: pointer;

                    i {
                        position: relative;
                        margin-right: .5rem; 
                    }
                }

                .button:first-of-type:hover {
                    background: #fff;
                    color: #9fd36a;
                }

                .mes {
                    position: relative;
                    margin-left:2rem; 
                }

                .image {
                    vertical-align: top;
                    width: 7rem;
                    height: 7rem;
                    margin: 1rem 0 1rem 10rem;
                }

                input {
                    height:2.5rem;
                    width:40%;
                    text-indent: 1rem;
                    margin-left:2rem; 
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .bigbox {
                    position: relative;
                    margin: 2rem 0;
                }

                .bigbox:first-of-type {
                    margin: 0;
                }

                .person-search {
                    position: relative;
                    margin-left:2rem;

                    .search {
                        position: relative;
                        margin:4rem 0 2rem 0;
                        left:51%;
                        i {
                            position: absolute;
                            top:1.1rem;
                            left:2.3rem;
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

        .edit-person-box:hover {
            box-shadow: 0 0 2px 2px rgb(134, 231, 255);
        }

    }

</style>

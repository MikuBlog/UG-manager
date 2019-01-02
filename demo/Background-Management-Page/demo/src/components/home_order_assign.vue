<template>
    
    <div class="order-list">

        <div class="order-list-box">

            <div class="order-head">
                商户列表
            </div>

            <div class="order-search">
                <i class="fa fa-search fa-lg"></i><input type="text" v-model="scAll" @keydown="searchAll($event)">
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
                        <th></th>
                        <th>登录名</th>
                        <th>公司名</th>
                        <th>类型</th>
                        <th>经营范围</th>
                        <th>联系人姓名</th>
                        <th>联系人电话</th>
                        <th>详细地址</th>
                        <th>操作</th>
                    </tr>

                    <tr v-for="items in companyList">
                        <td><span class="icon"><i class="fa fa-plus-square-o fa-lg" @click="showDetail($event,items)"></i></span></td>
                        <td>{{items.userName}}</td>
                        <td>{{items.name}}</td>
                        <td>{{items.type}}</td>
                        <td>{{items.range}}</td>
                        <td>{{items.contactName}}</td>
                        <td>{{items.contactPhone}}</td>
                        <td>{{items.address}}</td>
                        <td>
                            <span class="button" @click="handleClick('/home/home_edit_company',items)"><i class="fa fa-arrow-left fa-lg"></i>分配</span>
                        </td>
                    </tr>

                    <tr v-show="showOrderDetail" ref="order">
                        <td colspan="11">

                            <div class="detail-form">

                                <div class="order-detail-box">
                                    <div class="detail-head">
                                        <span>公司</span>
                                        <span>联系人</span>
                                    </div>

                                    <div class="boxs">

                                        <div class="company-box">

                                            <div>
                                                <span class="inner-head">公司标志:</span><img :src="companyDetail.logoUrl">
                                            </div>

                                            <div>
                                                <span class="inner-head">登录名:</span><span class="mes">{{companyDetail.userName}}</span>
                                            </div>

                                            <div>
                                                <span class="inner-head">公司名:</span><span class="mes">{{companyDetail.name}}</span>
                                            </div>

                                            <div>
                                                <span class="inner-head">类型:</span><span class="mes">{{companyDetail.type}}</span>
                                            </div>

                                            <div>
                                                <span class="inner-head">评价:</span><span class="mes">{{companyDetail.score}}</span>
                                            </div>

                                            <div>
                                                <span class="inner-head">经营范围:</span><span class="type" v-for="items in range">{{items}}</span>
                                            </div>

                                            <div>
                                                <span class="inner-head">公司地址:</span><span class="mes">{{companyDetail.address}}</span>
                                            </div>

                                        </div>

                                        <div class="contact-box">

                                            <div>
                                                <span class="inner-head">身份证:</span><img :src="companyDetail.idFrontUrl">
                                                <img :src="companyDetail.idBackUrl">
                                            </div>

                                            <div>
                                                <span class="inner-head">联系人姓名:</span><span class="mes">{{companyDetail.contactName}}</span>
                                            </div>

                                            <div>
                                                <span class="inner-head">联系人电话:</span><span class="mes">{{companyDetail.contactPhone}}</span>
                                            </div>

                                            <div>
                                                <span class="inner-head">身份证号码:</span><span class="mes">{{companyDetail.idCard}}</span>
                                            </div>

                                        </div>

                                    </div>

                                </div> 

                                <div class="order-worker-box">

                                    <div class="worker-head">
                                        营业执照
                                    </div>

                                    <div>
                                        <span class="inner-head">营业执照:</span><img :src="companyDetail.licenseUrl">
                                    </div>

                                    <div>
                                        <span class="inner-head">统一社会信用代码:</span><span class="mes">{{companyDetail.code}}</span>
                                    </div>

                                </div>

                            </div>

                        </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <input type="text" placeholder="搜索公司名" v-model="scName" @keydown="searchName($event)">
                        </td>
                        <td>
                            <select @change="searchType($event)">
                                <option value="个体户">个体户</option>
                                <option value="公司">公司</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" placeholder="搜索经营范围" @keydown="searchRange($event)" v-model="scRange">
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <select @change="searchState($event)">
                                <option value="正常">正常</option>
                                <option value="冻结">冻结</option>
                            </select>
                        </td>
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
                 *  id:公司id
                 *  code:信用代码
                 *  adress:公司地址
                 *  contactName:联系人姓名
                 *  contactPhone:联系人电话
                 *  idCard:身份证号码
                 *  idBackUrl:身份证背面图片地址
                 *  idFrontUrl:身份正面图片地址
                 *  licenseUrl:营业执照图片地址
                 *  logoUrl:公司Logo图片地址
                 *  serviceUrl:服务详情图片地址
                 *  name:公司名称
                 *  range:经营类目范围
                 *  role_id:公司权限
                 *  score:评价
                 *  state:公司状态
                 *  type:类型
                 *  userName:用户名
                 *  userPassword:公司密码
                 */
                companyList:[],

                // 保存当前公司详情
                companyDetail:"",

                // 公司经营范围
                range:[],

                // 存放公司详情
                companyDetail:"",

                // 显示工单详情
                showOrderDetail:false,

                // 存放当前工单信息
                orderDetail:{},

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

                // 保存公司类型
                scType:"",

                // 保存公司状态
                scState:"",

                // 保存公司经营范围
                scRange:"",

                // 存放函数名
                fName:"getCompanyList",

            }

        },

        methods: {

            // 搜索用户名
            searchRange(event) {

                if(event.keyCode == 13) {

                    this.getSearchRangeList(1)

                }

            },

            // 请求搜索结果
            getSearchTypeList(id) {

                var data = {

                    type:this.scType

                }

                this.companyList.splice(0,this.companyList.length)

                var _this = this

                this.pageId = id

                this.fName = "getSearchTypeList"

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Mancompany/search?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.company.data

                        _this.initialPageCount(obj.pagecount)

                        _this.initialCompanyList(list)

                    },error() {

                        console.log("发出请求失败")

                    }

                })

            },

            // 搜索用户名
            searchType(event) {

                this.scType = event.currentTarget.value

                this.getSearchTypeList(1)

            },

            // 请求搜索结果
            getSearchNameList(id) {

                var data = {

                    name:this.scName

                }

                this.companyList.splice(0,this.companyList.length)

                var _this = this

                this.pageId = id

                this.fName = "getSearchNameList"

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Mancompany/search?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.company.data

                        console.log(list)

                        _this.initialPageCount(obj.pagecount)

                        _this.initialCompanyList(list)

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

                this.pageId = id

                this.companyList.splice(0,this.companyList.length)

                var _this = this

                this.fName = "getSearchAllList"

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Mancompany/all?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.company.data

                        console.log(_this.perPage)

                        _this.initialPageCount(obj.pagecount)

                        _this.initialCompanyList(list)

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

            // 显示取消框
            showBox() {

                this.isHide = true

            },

            // 隐藏取消框
            hideBox() {

                this.isHide = false

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
            assign() {

                this.$router.push({path:"/home/home_order_assign"})

            },

            // 显示列表
            showDetail(event,items) {

                var element = event.currentTarget

                var elements = document.querySelectorAll('.icon>i')

                var parent = element.parentNode.parentNode.parentNode

                var _this = this

                var behaviorBox = this.$refs.order

                var table  = this.$refs.table

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

                    this.showOrderDetail = true

                }else {

                    element.classList.add('fa-plus-square-o')

                    element.classList.remove('fa-minus-square-o')

                    element.isPlus = true

                    this.showOrderDetail = false
                    
                }

                var arr = items.range.split(',')

                _this.range.length = 0

                arr.forEach(function(value) {

                    _this.range.push(value)

                })

                this.companyDetail = items

            },

            // 初始化总页数
            initialPageCount(pagecount) {

                var loopNumber = pagecount

                this.pageList.length = 0

                for(var i = 1 ; i <= loopNumber ; i ++) {

                    this.pageList.push(i)

                }

            },

            // 初始化公司列表
            initialCompanyList(list) {

                var _this = this

                this.companyList.length = 0

                list.forEach(function(value) {

                    _this.companyList.push(value)

                })

            },

            // 请求工单列表
            getCompanyList(id) {

                var _this = this

                this.pageId = id

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Mancompany/showList?pagesize="+_this.perPage+"&pagenow="+id,

                    type:"GET",

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.company.data

                        _this.initialCompanyList(list)

                        _this.initialPageCount(obj.pagecount)

                        setTimeout(function() {

                            // 将加号icon增加标记
                            var icon = document.querySelectorAll('.icon>i')

                            icon.forEach(function(value) {

                                value.isPlus = true

                            })

                        })

                    },error() {

                        console.log("发送请求失败")

                    }

                })

            },

            // 跳转路由
            handleClick(path) {

                this.$router.push({path:path})

            }

        },

        mounted() {

            this.getCompanyList(1)

        }

    }

</script>

<style lang="scss" scoped>

    .order-list {
        position: relative;
        margin:2rem;

        .order-list-box {
            position: relative;
            overflow: hidden;
            background:#fff;
            box-shadow:  0 0 2px 2px rgb(226, 226, 226);
            transition: .5s;

            .order-head {
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

            .order-search {
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



                        .button:hover {
                            background:#fff;
                            color:#57b5e2;
                        }

                        

                    }

                    tr:first-of-type {
                        background:rgb(240, 240, 240);
                    }

                    input {
                        height:2.5rem;
                    }

                    select {
                        height:3rem;
                        width:80%;
                    }

                    .detail-form {
                        position: relative;
                        overflow: hidden;

                        .order-detail-box {
                            position: relative;
                            background: #fafafa;
                            margin:1rem 1rem 3rem 1rem;
                            text-align: left;
                            box-shadow: 0 0 1px 1px rgb(226, 226, 226);

                            .detail-head {
                                position: relative;
                                display: flex;
                                text-indent: 1.5rem;
                                border-bottom: 2px solid #5eb2fd;

                                span {
                                    position: relative;
                                    flex: 1;
                                }
                            }

                            .boxs {
                                position: relative;
                                display: flex;

                                .company-box,.contact-box {
                                    flex:1;
                                }
                            }

                            .type {
                                position: relative;
                                display: inline-block;
                                background:#5eb2fd;
                                color:#fff;
                                border:1px solid #5eb2fd;
                                line-height: 2.5rem;
                                padding:0 1rem;
                                margin:1rem 1rem 3rem 1rem;
                                transition: .5s;
                                cursor: pointer;
                            }

                            .type:first-of-type {
                                margin-left:3rem;
                            }

                            .type:hover {
                                background:#fff;
                                color: #5eb2fd;
                            }

                            .inner-head {
                                position: relative;
                                display: inline-block;
                                width:8rem;
                                text-align: right;
                            }

                            .mes {
                                position: relative;
                                text-align: left;
                                margin-left:3rem;
                                width:20rem;
                            }

                            img {
                                margin-left: 3rem; 
                                vertical-align: top;
                                width:auto;
                                height:7rem;
                            }
                            
                        }

                        .order-worker-box {
                            position: relative;
                            background: #fafafa;
                            margin:1rem 1rem 3rem 1rem;
                            text-align: left;
                            box-shadow: 0 0 1px 1px rgb(226, 226, 226);

                            .worker-head {
                                position: relative;
                                text-indent: 1.5rem;
                                border-bottom: 2px solid #5eb2fd;
                            }

                            .inner-head {
                                position: relative;
                                display: inline-block;
                                width:8rem;
                                text-align: right;
                            }

                            img {
                                margin-left: 3rem; 
                                vertical-align: top;
                                width:7rem;
                                height:7rem;
                            }

                            .mes {
                                position: relative;
                                text-align: left;
                                margin-left:3rem;
                                width:20rem;
                            }
                        }
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

        .order-list-box:hover {
            box-shadow: 0 0 2px 2px rgb(134, 231, 255);
        }
    }

</style>

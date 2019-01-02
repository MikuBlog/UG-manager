<template>
    
    <div class="edit-company">
        
        <div class="edit-company-box">

            <div class="company-head">
                添加商户
            </div>

            <div class="company-button">
                <span @click="showBox()" class="button">返回</span>
                <span @click="sendMessage()" class="button">确认</span>
                <span ref="warn" style="color:red;font-size:1.4rem;margin-left:2rem;"></span>
            </div>

            <div class="company-form-box">

                <div class="company-box box">

                    <div class="head">
                        公司
                    </div>

                    <div class="company-mark">
                        <span class="mes">公司标志:</span>
                        <div class="image">
                            <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :drag="true"
                            :before-upload="getPicture_1">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </div>

                    <div class="boxs boxsss">

                        <div class="company-loginname">
                            <span class="mes">登录名:</span>
                            <div>
                                <input type="text" :placeholder="companyDetail.userName" v-model="userName" class="input" disabled>
                            </div>
                        </div>

                    </div>

                    <div class="company-detail-first">

                        <div class="company-name">
                            <span class="mes">公司名:</span>
                            <div>
                                <input type="text" :placeholder="companyDetail.name" v-model="name" class="input">
                            </div>
                        </div>

                        <div class="company-type">
                            <span class="mes">类型</span>
                            <div>
                                <select @change="getType($event)" disabled>
                                    <option value="公司">公司</option>
                                    <option value="个体户">大公司</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div class="company-position">
                        
                        <span class="mes">请选择地区:</span>

                        <area-cascader :level="1" type="text" placeholder="请选择地区" v-model="city" :data="pcaa"></area-cascader>

                        <span class="mes">详细地址:</span>

                        <div>
                            <input type="text" :placeholder="companyDetail.address" v-model="detail" class="input">
                        </div>

                    </div>

                </div>

                <div class="company-contact box">

                    <div class="head">
                        联系人
                    </div>

                    <div class="contact-form-box">

                        <div class="contact-name">
                            <span class="mes">联系人姓名:</span>
                            <div>
                                <input type="text" :placeholder="companyDetail.contactName" v-model="contactName" class="input">
                            </div>
                        </div>

                        <div class="contact-phone">
                            <span class="mes">联系人电话:</span>
                            <div>
                                <input type="text" :placeholder="companyDetail.contactPhone" v-model="contactPhone" class="input">
                            </div>
                        </div>

                        <div class="contact-name">
                            <span class="mes">身份证号码:</span>
                            <div>
                                <input type="text" :placeholder="companyDetail.idCard" v-model="idCard" class="input">
                            </div>
                        </div>

                    </div>

                    <div class="contact-photo">

                        <div class="photo-front">
                            <span class="mes">身份证正面:</span>
                            <div class="image">
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

                        <div class="photo-back">
                            <span class="mes">身份证正面:</span>
                            <div class="image">
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

                </div>

                <div class="company-server box">

                    <div class="head">
                        服务详情
                    </div>

                    <div class="server-image">
                        <span class="mes">详情图片:</span>
                        <div class="image">
                            <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :drag="true"
                            :before-upload="getPicture_4">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </div>

                </div>

                <div class="company-server box">

                    <div class="head">
                        营业执照
                    </div>

                    <div class="server-code">
                        <span class="mes">统一社会信用代码:</span>
                        <div>
                            <input type="text" :placeholder="companyDetail.code" v-model="code" class="input">
                        </div>
                    </div>

                    <div class="server-image">
                        <span class="mes">营业执照:</span>
                        <div class="image">
                            <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :drag="true"
                            :before-upload="getPicture_5">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </div>

                </div>

                <div class="company-range box">

                    <div class="head">
                        经营范围
                    </div>

                    <div class="boxes">

                        <div class="business-form">

                            <div class="form-head">
                                已选经营范围:
                            </div>

                            <div class="business-father" v-for="(father,index) in alreadyHasBusinessList">

                                <div class="father-head">
                                    <i class="fa fa-minus fa-lg" @click="showList($event)"></i><span>{{father.fathername}}</span>
                                    <div class="button-box">
                                        <span class="button" @click="deleteList(index)">取消</span>
                                    </div>
                                </div>

                                <div class="boxss">

                                    <div class="business-range" v-for="(range,index) in father.range">

                                        <div class="range-head">
                                            <span class="name">{{range.rangename}}</span>
                                            <div class="button-box">
                                                <span class="button" @click="deleteChildList(father,index)">取消</span>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div class="business-form">

                            <div class="form-head">
                                可选经营范围:
                            </div>

                            <div class="business-father" v-for="father in businessList">

                                <div class="father-head">
                                    <i class="fa fa-minus fa-lg" @click="showList($event)"></i><span>{{father.fathername}}</span>
                                    <div class="button-box">
                                        <span class="button" @click="getList(father)">选择</span>
                                    </div>
                                </div>

                                <div class="boxss">

                                    <div class="business-range" v-for="range in father.range">

                                        <div class="range-head">
                                            <span class="name">{{range.rangename}}</span>
                                            <div class="button-box">
                                                <span class="button" @click="getChildList(father,range)">选择</span>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        <div class="cancel" v-show="isHide">

            <div class="cancel-box">
                <div class="cancel-head">确认放弃添加商户吗?</div>
                <div class="cancel-button">
                    <span @click="hideBox()">取消</span>
                    <span @click="handleClick('/home/company_detail',false)">确认</span>
                </div>
            </div>

        </div>

    </div>

</template>

<script>

import {pca,pcaa} from 'area-data'
import 'vue-area-linkage/dist/index.css'

    export default {

        data() {

            return {

                // 已选列表
                alreadyHasBusinessList:[],

                /**
                 *  fatherid:父级id
                 *  fathername:父级名称
                 *  range:[{
                 *      rangid: 范围id
                 *      rangename: 范围名称
                 *      son:[{
                 *          id: 子级id
                 *          name: 子级名称
                 *          father: 子级对应rangid
                 *      }]
                 *  }]
                 */
                businessList:[],

                // 存放公司详情
                companyDetail:"",

                // 存放图片文件
                dialogImageUrl:[],

                dialogVisible:false,

                // 存放密码
                userPassword:"",

                // 存放确认密码
                espassword:"",

                // 保存公司类型
                type:"公司",

                // 保存公司经营类目
                range:[],

                // 是否隐藏取消框
                isHide:false,

                // 保存位置信息
                city:[],

                // 提供位置数据
                pcaa:pcaa,

                // 存放登录名
                userName:"",

                // 存放公司名
                name:"",

                // 存放详细地址
                detail:"",

                // 存放联系人名
                contactName:"",

                // 存放联系人电话
                contactPhone:"",

                // 存放联系人身份证号码
                idCard:"",

                // 存放信用代码
                code:"",

                // 公司图标
                logoUrl:"",

                // 身份证正面
                idFrontUrl:"",

                // 身份证背面
                idBackUrl:"",

                // 营业执照
                licenseUrl:"",

                // 服务详情
                serviceUrl:""

            }

        },

        methods: {

            // 获取类型
            getType(event) {

                this.type = event.currentTarget.value

            },

            // 获取选择到的经营父类目
            getList(items) {

                var list = this.alreadyHasBusinessList

                // 对象深拷贝，防止影响到前对象的引用
                var obj = $.extend(true,{},items)

                for(var i = 0 ; i < list.length ; i ++) {

                    if(list[i].fathername == items.fathername) {

                        return

                    }

                }

                list.push(obj)

            },

            // 添加选择到的经营子类目
            getChildList(father,range) {

                var list = this.alreadyHasBusinessList

                list.forEach(function(value) {

                    if(value.fathername == father.fathername) {

                        for( var i = 0 ; i < value.range.length ; i ++) {

                            if(value.range[i].rangename == range.rangename) {

                                return

                            }

                        }

                        value.range.push(range)

                    }

                })

            },

            // 删除已选择经营类目
            deleteList(index) {
    
                this.alreadyHasBusinessList.splice(index,1)

            },

            // 删除已选择经营类目的子元素
            deleteChildList(father,index) {

                var list = this.alreadyHasBusinessList

                list.forEach(function(value) {

                    if(value.fathername == father.fathername) {

                        value.range.splice(index,1)

                    }

                })

            },

            // 初始化经营类目列表
            initialBusinessList(list) {

                var _this = this

                this.businessList.length = 0

                list.forEach(function(value) {

                    _this.businessList.push(value)

                })

            },

            // 请求经营类目列表
            getBusinessList() {

                var _this = this

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Range/showList",

                    type:"get",

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.arr

                        _this.initialBusinessList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            // 显示隐藏经营类目列表
            showList(event) {

                var element = event.currentTarget

                var nextElement = event.currentTarget.parentNode.nextElementSibling

                if(nextElement.isHide) {

                    element.classList.remove('fa-plus')

                    element.classList.add('fa-minus')

                    nextElement.style.height = "auto"

                    nextElement.isHide = false

                }else {

                    element.classList.add('fa-plus')

                    element.classList.remove('fa-minus')

                    nextElement.style.height = 0

                    nextElement.isHide = true

                }

            },

            // 将图片发送到服务器
            getPicture_1(file) {
        
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

                        _this.logoUrl = obj.pagecount

                    },error() {

                        console.log("请求失败")

                    }

                })

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

            // 将图片发送到服务器
            getPicture_4(file) {
        
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

                        _this.serviceUrl = obj.pagecount

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            // 将图片发送到服务器
            getPicture_5(file) {
        
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

                        _this.licenseUrl = obj.pagecount

                    },error() {

                        console.log("请求失败")

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

            // 跳转路由
            handleClick(path) {

                this.$router.push({path:path})

            },

            // 发送请求
            sendMessage() {

                var region = ""

                this.city.forEach(function(value) {

                    region += value

                })

                var _this = this

                var data = {

                    session_id:this.$store.state.session.id,

                    name:this.name || this.companyDetail.name,

                    userName:this.userName || this.companyDetail.userName,

                    contactName:this.contactName || this.companyDetail.contactName,

                    contactPhone:this.contactPhone || this.companyDetail.contactPhone,

                    idCard:this.idCard || this.companyDetail.idCard,

                    idFrontUrl:this.idFrontUrl || this.companyDetail.idFrontUrl ,

                    idBackUrl:this.idBackUrl || this.companyDetail.idBackUrl ,

                    address:region+this.detail || this.companyDetail.address,

                    licenseUrl:this.licenseUrl || this.companyDetail.licenseUrl ,

                    code:this.code || this.companyDetail.code,

                    logoUrl:this.logoUrl || this.companyDetail.logoUrl,

                    serviceUrl:this.serviceUrl || this.companyDetail.serviceUrl ,

                    range:this.alreadyHasBusinessList || this.companyDetail.alreadyHasBusinessList

                }

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Login_Company/edit",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {
            
                        var obj = JSON.parse(data)

                        _this.$refs.warn.innerText = obj.msg

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

        },

        mounted() {

            this.getBusinessList()

            // 判断公司详情是否存在，如果存在则返回公司详情
            var companyDetail = this.$store.state.companyDetail

            this.companyDetail = companyDetail

            // 给所有范围列表加上隐藏标记
            setTimeout(function() {

                var range = document.querySelectorAll('.business-range')

                range.forEach(function(value) {

                    value.isHide = false

                })


            })

        }

    }

</script>

<style lang="scss">

    .edit-company {
        position: relative;
        margin:2rem;

        .edit-company-box {
            position: relative;
            overflow: hidden;
            background:#fff;
            box-shadow:  0 0 2px 2px rgb(226, 226, 226);
            transition: .5s;

            .company-head {
                position: relative;
                line-height: 4rem;
                font-size: 1.2rem;
                background:#fff;
                box-shadow: 0 0 2px 2px rgb(196, 196, 196);
                text-indent: 2rem;
            }

            .company-button {
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

            .company-form-box {
                position: relative;
                overflow: hidden;
                font-size: 1.2rem;
                margin:2rem;
                line-height: 3.5rem;
                border:1px solid #d3d3d3;
                box-shadow: 0 0 1px 1px rgb(226, 226, 226);

                .contact-form-box {
                    position: relative;
                    display: flex;
                    justify-content: space-around;

                    div {
                        position: relative;
                        flex: 1;

                        input {
                            width:80%;
                        }
                    }
                }

                .boxes {
                    position: relative;
                    display: flex;
                    margin-top:3rem;
                    justify-content: space-around;

                    .business-form {
                        position: relative;
                        font-size: 1.2rem;
                        margin:1rem;
                        padding: 1rem;
                        box-shadow: 0 0 1px 1px rgb(226, 226, 226);
                        flex:1;
                        justify-content: space-around;

                        .name {
                            position: relative;
                            margin-left:1.5rem;
                        }

                        .boxss {
                            position: relative;
                            overflow: hidden;
                        }

                        .business-father {
                            position: relative;
                            color:#727272;
                            
                            .father-head {
                                position: relative;
                                line-height: 4rem;
                                background:#f4f4f4;
                                margin:1rem 0;

                                .fa-minus,.fa-plus {
                                    color:#2ec1e6;
                                    margin:0 1rem;
                                }
                            }
                        }

                        .business-range {
                            position: relative;
                            display: block;
                            overflow: hidden;

                            .range-head {
                                position: relative;
                                line-height: 4rem;
                                background:#f4f4f4;
                                margin:1rem 0;
                                margin-left:5rem;

                                .fa-minus,.fa-plus {
                                    color:#2ec1e6;
                                    margin:0 1rem;
                                }
                            }

                        }

                        .button-box {
                            position: absolute;
                            top:0rem;
                            right:1rem;

                            .button {
                                position: relative;
                                text-align: center;
                                padding: .2rem .5rem;
                                display: inline-block;
                                border: 1px solid #59b5e1;
                                color:#fff;
                                background:#59b5e1;
                                font-size: 1.2rem;
                                line-height: 2rem;
                                cursor: pointer;
                                transition: .5s;

                                i {
                                    margin-right:.5rem;
                                }
                            }

                            .button:hover {
                                background:#fff;
                                color:#59b5e1;
                            }

                        }
                    }
                }

                .boxs {
                    position: relative;
                    display: flex;
                    margin-top:3rem;
                    justify-content: space-around;

                    div {
                        position: relative;
                        flex:1;

                        input {
                            width:40%;
                        }
                    }
                }

                .head {
                    position: relative;
                    text-indent: 2rem;
                    margin:2rem 0;
                    border:1px solid #d3d3d3;
                    box-shadow: 0 0 1px 1px rgb(226, 226, 226);
                }

                .company-detail-first {
                    position: relative;
                    display: flex;
                    justify-content: space-around;

                    .company-name,.company-type {
                        flex: 1;

                        input {
                            width:80%;
                        }

                        select {
                            width:80%;
                        }
                    }
                }

                .mes {
                    margin-left:2rem; 
                }

                .head:first-of-type {
                    margin:0;
                }

                .input {
                    height:2.5rem;
                    width:40%;
                    text-indent: 1rem;
                    margin-left:2rem; 
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                select {
                    height:2.8rem;
                    text-indent: 1rem;
                    margin-left:2rem; 
                }
                
                .area-select {
                    width:30%;
                    margin-left:2rem; 
                }

                .area-select .area-selected-trigger {
                    position: relative;
                    top:-.5rem;
                    left:-1rem;
                    padding:0;
                    margin-bottom: .5rem;
                }

                .image {
                    margin-left:10rem; 
                }

                .box {
                    margin:5rem 0;
                }

                .box:first-of-type {
                    margin:0;
                }

                .company-position {
                    span {
                        margin-left:2rem; 
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

        .edit-company-box {
            box-shadow: 0 0 2px 2px rgb(134, 231, 255);
        }

    }

</style>

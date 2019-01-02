<template>
    
    <div class="order-add">

        <div class="order-add-box">

            <div class="order-box-head">
                <div @click="backTo()">
                    <i class="fa fa-angle-left fa-lg"></i><span>添加工单</span>
                </div>
            </div>

            <form class="order-box-form">

                <div class="form-head">
                    维修地址:
                </div>
                <div class="form-position-box" @click="forwardTo('/home_order_add_adress')">
                    <div class="form-warn" v-show="!curPosition.address">
                        请选择地址
                    </div>
                    <div class="form-position" v-show="curPosition.address">
                        {{curPosition.address}}
                    </div>
                    <div class="form-person" v-show="curPosition.address">
                        <span>{{curPosition.name}}</span><span>{{curPosition.phone}}</span>
                    </div>
                    <i class="fa fa-angle-right fa-lg right"></i>
                </div>

                <div class="form-head">
                    具体时间:
                </div>
                <div class="form-time-box form-box" @click="showTimeBox()">
                    <div class="form-time">
                        {{pickerValue | formatDate}}
                    </div>
                    <i class="fa fa-angle-right fa-lg right"></i>
                </div>

                <div class="form-head">
                    维修类目:
                </div>
                <div class="form-type-box form-box" @click="forwardTo('/home_order_add_business')">
                    <div class="form-type">
                        {{type.title}}
                    </div>
                    <i class="fa fa-angle-right fa-lg right"></i>
                </div>

                <div class="form-button">

                    <div v-for="items in types" @click="getType(items)">
                        {{items.title}}
                    </div>

                </div>

                <div class="form-head">
                    维修描述:
                </div>
                <div class="form-description-box form-box">
                    <textarea placeholder="请输入维修描述" v-model="description"></textarea>
                </div>

                <div class="form-head">
                    备注信息:
                </div>
                <div class="form-remark-box form-box">
                    <textarea placeholder="请输入备注信息" v-model="remark"></textarea>
                </div>

                <div class="form-head">
                    上传图片:
                </div>
                <div class="form-photo-box">
                    <input @change="fileChange($event)" type="file" id="upload_file" accept="image/*" capture="camera" multiple style="display: none"/>
                     <div class="add" @click="chooseType">
                        <div class="add-image" align="center">
                            <i class="fa fa-camera fa-lg"></i>
                            <p class="font13" style="color:rgba(0, 0, 0, .2);">添加图片</p>
                        </div>
                    </div>
                    <div class="add-img" v-show="imgList.length">
                        <p class="font14">图片(最多3张，还可上传<span v-text="3-imgList.length"></span>张)</p>
                        <ul class="img-list">
                            <li v-for="(url,index) in imgList">
                                <i class="fa fa-close fa-lg" @click.stop="delImg(index)"></i>
                                <img :src="url.file.src">
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="order-warn" ref="warn"></div>

                <div class="form-button-sure" @click="sendMessage()">
                    确认
                </div>

                <div class="order-box-warn" v-show="showWarn">

                    <div class="order-warn-box">
                        <div class="warn-head">
                            删除图片
                        </div>

                        <div class="warn-content">
                            确认删除所上传的图片吗?
                        </div>

                        <div class="warn-button">
                            <div @click="handleClick('cancel')">
                                取消
                            </div>
                            <div @click="handleClick('ensure')">
                                确认
                            </div>
                        </div>
                    </div>

                </div>

                <mt-datetime-picker class="picker_show"
                            ref="picker"
                            type="datetime"
                            v-model="pickerValue"
                            :startDate = "startDate"
                            :endDate = "endDate"
                            month-format="{value} 月"
                            date-format="{value} 日"
                            hour-format='{value}时'
                            minute-format='{value}分'
                            @confirm="handleConfirm"
                ></mt-datetime-picker>

            </form>

        </div>

    </div>

</template>

<script>

import { formatDate } from '../../global/date.js';

    export default {

        filters: {     
            //时间转换
            formatDate(time) {

                var date = new Date(time);

                return formatDate(date, 'yyyy-MM-dd hh:mm');

            }
        },

        data() {

            return {

                // 存放当前地址信息
                curPosition:"",

                // 保存当前选择的日期
                pickerValue:new Date(),

                visible: false,

                startDate: new Date(),      //设置开始时间

                endDate: new Date('2022-01-22'),   //设置结束时间

                // 保存维修类目
                type:{
                    title:"请选择类目信息"
                },

                // 默认类型选择

                types:[
                    {
                        father:"维修",
                        title:"家电"
                    },
                    {
                        father:"维修",
                        title:"空调"
                    },
                    {
                        father:"维修",
                        title:"洗衣机"
                    },
                ],

                // 保存描述信息
                description:"",

                // 保存备注信息
                remark:"",

                // 是否显示提示框
                showWarn:false,

                showFace: false,
                imgList: [],
                size: 0,
                limit:3, //限制图片上传的数量
                tempImgs:[],

                // 存放图片返回地址
                imgUrl:[]

            }

        },

        methods: {

            // 获取类目信息
            getType(type) {

                this.$store.commit('getType',type)

                this.type = type

            },

            // 显示时间选择表
            showTimeBox() {

                this.$refs.picker.open();

            },

            // 返回上一页
            backTo() {

                this.$router.go(-1)

            },

            // 点击时间表确认按钮隐藏时间表
            handleConfirm() {

                this.$refs.picker.close();

            },

            // 跳转路由
            forwardTo(command) {

                this.$router.push({path:command})

            },

            chooseType() {
                document.getElementById('upload_file').click();
            },
            fileChange(el) {
                if (!el.target.files[0].size) return;
                this.fileList(el.target);
                el.target.value = ''
            },
            fileList(fileList) {
                let files = fileList.files;
                for (let i = 0; i < files.length; i++) {
                    //判断是否为文件夹
                    if (files[i].type != '') {
                        this.fileAdd(files[i]);
                    } else {
                        //文件夹处理
                        this.folders(fileList.items[i]);
                    }
                }
            },
            //文件夹处理
            folders(files) {
                let _this = this;
                //判断是否为原生file
                if (files.kind) {
                    files = files.webkitGetAsEntry();
                }
                files.createReader().readEntries(function (file) {
                    for (let i = 0; i < file.length; i++) {
                        if (file[i].isFile) {
                            _this.foldersAdd(file[i]);
                        } else {
                            _this.folders(file[i]);
                        }
                    }
                });

            },
            foldersAdd(entry) {
                let _this = this;
                entry.file(function (file) {
                    _this.fileAdd(file)
                })
            },
            fileAdd(file) {
                if (this.limit !== undefined) this.limit--;
                if (this.limit !== undefined && this.limit < 0) return;
                //总大小
                this.size = this.size + file.size;
                //判断是否为图片文件
                if (file.type.indexOf('image') == -1) {
                    this.$dialog.toast({mes: '请选择图片文件'});
                } else {
                    let reader = new FileReader();
                    let image = new Image();
                    let _this = this;
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        file.src = this.result;
                        image.onload = function(){
                            let width = image.width;
                            let height = image.height;
                            file.width = width;
                            file.height = height;
                            _this.imgList.push({
                                file
                            });
                        };
                        image.src= file.src;
                    }
                }

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

                        _this.imgUrl.push(obj.pagecount)

                    },error() {

                        console.log("请求失败")

                    }

                })
            },
            delImg(index) {
                this.size = this.size - this.imgList[index].file.size;//总大小
                this.imgList.splice(index, 1);
                this.imgUrl.splice(index,1)
                if (this.limit !== undefined) this.limit = 6-this.imgList.length;
            },
            displayImg() {

            },

            // 新建工单
            sendMessage() {

                var _this = this

                var time = {

                    year:new Date(this.pickerValue).getFullYear(),

                    month:new Date(this.pickerValue).getMonth()+1,

                    day:new Date(this.pickerValue).getDate(),

                    hour:new Date(this.pickerValue).getHours(),

                    minute:new Date(this.pickerValue).getMinutes()

                }

                if(time.minute < 10) {

                    time.minute = "0" + time.minute

                }

                var data = {

                    session_id:this.$store.state.session_id,

                    category:[this.type.father,this.type.title],

                    ordertime:time.year+"-"+time.month+"-"+time.day+" "+time.hour+":"+time.minute,

                    name:this.curPosition.name,

                    phone:this.curPosition.phone,

                    address:this.curPosition.address,

                    describe:this.description,

                    remark:this.remark,

                    url_1:this.imgUrl[0] || "无",

                    url_2:this.imgUrl[1] || "无",

                    url_3:this.imgUrl[2] || "无"

                }

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Mob_Work/addWorkList",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        console.log(obj)

                        var warn = _this.$refs.warn

                        if(obj.status == "ok") {

                            _this.$store.commit('getCurOrderDetail',obj.new_address)

                            _this.$router.push({path:'/home_order_detail'})

                        }else {

                            warn.innerText = obj.msg

                        }


                    },error() {

                        console.log("请求失败")

                    }

                })

            }

        },

        mounted() {

            var orderDetail = this.$store.state.curOrderDetail

            if(orderDetail != "") {

                this.type.father = orderDetail.firstCategory

                this.type.title = orderDetail.category

                this.ordertime = orderDetail.orderTime

                this.name = orderDetail.name

                this.phone = orderDetail.phone

                this.description = orderDetail.describe

                this.remark = orderDetail.remark

            }

            // 判断是否从类目类型中选择了，如果选择则使用该信息
            var type = this.$store.state.type

            if(type != "") {

                this.type = type

            }

            // 判断是否含有当前地址信息，如果有则默认选择第一条地址信息
            var curPosition = this.$store.state.curPosition

            if(curPosition != "") {

                this.curPosition = curPosition

            }

        }

    }

</script>

<style lang="scss">

    .order-add {
        position: relative;
        background:#f4f4f4;

        .order-add-box {
            position: relative;
            text-align: center;
            overflow: hidden;

            .order-box-head {
                position: fixed;
                width:100%;
                z-index:1;
                line-height: 70px;
                font-size: 20px;
                text-align: left;
                background:#fff;

                div {
                    i {
                        position: relative;
                        top:-1px;
                        margin-left: 10px;
                    }
                    span {
                        margin-left: 10px;
                    }
                }
            }

            .order-box-form {
                position: relative;
                margin-top:85px;
                text-align: left;

                .form-head {
                    position: relative;
                    color:#6d6d6d;
                    font-size: 18px;
                    margin:15px 0 15px 15px;
                }

                .form-position-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .form-position{
                        margin:7px 0 7px 15px;
                        font-size: 17px;
                        width:15rem;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }

                    .form-person {
                        margin:7px 0 10px 15px;
                        color:#9e9e9e;

                        span {
                            margin-right:15px;
                        }
                    }

                    .form-warn {
                        font-size: 17px;
                        margin:20px 0 20px 15px;
                        color:#9e9e9e;
                    }

                }

                .form-time-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .form-time {
                        font-size: 17px;
                        margin:20px 0 20px 15px;
                        color:#9e9e9e;
                    }
                }

                .form-type-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .form-type {
                        font-size: 17px;
                        margin:20px 0 20px 15px;
                        color:#9e9e9e;
                    }
                }

                .form-button {
                    position: relative;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;

                    div {
                        position: relative;
                        text-align: center;
                        margin-top:15px;
                        width:90px;
                        height:30px;
                        font-size: 17px;
                        color:#9b9b9b;
                        border:1px solid #dddddd;
                        border-radius: 5px;
                        line-height: 30px;
                    }
                }

                .form-description-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;
                    height:150px;

                    textarea {
                        text-indent: 15px;
                        line-height:25px;
                        font-size: 17px;
                        border:none;
                        outline: none;
                        width:100%;
                        height:100%;
                        color:#9e9e9e;
                    }
                }

                .form-remark-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;
                    height:150px;

                    textarea {
                        text-indent: 15px;
                        line-height:25px;
                        font-size: 17px;
                        border:none;
                        outline: none;
                        width:100%;
                        height:100%;
                        color:#9e9e9e;
                    }
                }

                .form-photo-box {
                    position: relative;
                    background:#fff;
                }

                .order-warn {
                    width:100%;
                    text-align: center;
                    margin-top:20px;
                    color:red;
                }

                .form-button-sure {
                    position: relative;
                    text-align: center;
                    margin:20px auto;
                    width:90%;
                    line-height: 50px;
                    font-size: 15px;
                    font-weight: bold;
                    background-color:#33769b;
                    color:#fff;
                }

                .order-box-warn {

                    position: fixed;
                    text-align: center;
                    top:0;
                    right:0;
                    left:0;
                    bottom:0;
                    z-index:99;
                    background:rgba(0,0,0,.5);

                    .warn-box {
                        position: absolute;
                        top:0;
                        right:0;
                        left:0;
                        bottom:0;
                        margin:auto;
                        width:280px;
                        height:150px;
                        background:#fff;
                        border-radius: 5px;

                        .warn-head {
                            position: relative;
                            font-size: 17px;
                            font-weight: bold;
                            margin-top:30px;
                        }

                        .warn-content {
                            position: relative;
                            color:#989898;
                            margin-top:10px;
                        }

                        .warn-button {
                            position: absolute;
                            bottom: 0;
                            width: 100%;
                            display: flex;
                            border-top:1px solid #dfdfe1;

                            div {
                                position: relative;
                                flex: 1;
                                line-height: 45px;
                            }

                            div:first-of-type {
                                color:#a9a9a9;
                            }

                            div:last-of-type {
                                color:#07c319;
                            }
                        }
                    }

                }

                .right {
                    position: absolute;
                    color:#c4c5c9;
                    top:40%;
                    right:10px;
                }

                .form-box {
                    border-top:1px solid #e6e6e6;
                    border-bottom:1px solid #e6e6e6;
                }

            }

        }

    }

    .app-bg >>>img{
        width: 100%;
        height: 100%;
        -webkit-transform: scale(1.03);
        -moz-transform: scale(1.03);
        -ms-transform: scale(1.03);
        -o-transform: scale(1.03);
        transform: scale(1.03);
    }
    textarea {
        padding: 10px;
    }

    .text-length {
        font-size: 14px;
        z-index: 999;
        width: 100%;
        text-align: right;
        margin-bottom: 10px;
        color: #e4e4e4;
    }

    .warning {
        color: #fe9900;
    }

    .add-img {
        width: 100%;
        padding: 10px;
    }

    .add-img p {
        color: #999;
    }

    .mui-content {
        padding-bottom: 60px;
    }

    .mui-content .idea {
        margin-top: 8px;
        background-color: #FFFFFF;
    }

    .good-item {
        text-align: center;
        width: 33%;
        max-width: 100%;
        overflow: hidden;
        padding-right: 10px;
        padding-bottom: 10px;
        float: left;
    }

    .good-item span {
        font-size: 15px;
        height: 30px;
        line-height: 30px;
        border-radius: 50px;
        display: block;
        width: 100%;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border: 1px solid #CCCCCC;
    }

    .mui-table {
        padding-top: 10px;
        color: #333;
        padding-left: calc(0.5% + 10px);
    }

    .h-line-behind {
        line-height: 40px;
        padding-left: 10px;
    }

    .question {
        border: 0;
        margin-bottom: 10px;
    }

    .add {
        display: inline-block;
        margin-bottom: 20px;
    }

    .add-image {
        margin-top:10px;
        padding-top: 15px;
        margin-left: 10px;
        width: 80px;
        top: 20px;
        height: 70px;
        border: 1px dashed rgba(0, 0, 0, .2);
    }

    .add-image .fa {
        margin-top:10px;
        color:rgba(0, 0, 0, .2);
        font-size: 24px;
    }

    .font13 {
        margin-top:5px;
    }

    .good-item .choose {
        color: #fff;
        background-color: #87582E;
        color: #FFF;
        border: 0;
    }

    .mui-btn-block {
        border: 0;
        border-radius: 0;
        background-color: #87582E;
        color: #fff;
        margin-bottom: 0;
        bottom: 0;
    }

    .mui-buttom {
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 999;

    }

    /*九宫格*/
    .img-list {
        overflow: hidden;
    }

    .img-list > li {
        float: left;
        width: 32%;
        text-align: center;
        margin-top: 1%;
        position: relative;
        list-style: none;

        img {
            width:100%;
            height:100%;
        }

        .fa {
            position: absolute;
            right: 0;
            top:0;
            color:rgb(192, 192, 192);
        }
    }

    .img-list > li > div {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .img-list > li > div .app-bg {
        width: 100%;
        height: 100%;
    }

    .mui-fullscreen {
        z-index: 9999;
    }

    .del {
        position: absolute;
        width: 18px;
        top: 0;
        right: 0;
        z-index: 999
    }

</style>

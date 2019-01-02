<template>
    
    <div class="adress-delete">

        <div class="adress-delete-box">

            <div class="adress-box-head">
                <div @click="backTo()">
                    <i class="fa fa-angle-left fa-lg"></i><span>删除地址</span>
                </div>
            </div>

            <div class="adress-box-list">
                <ul>
                    <li v-for="(items,index) in positionList" @click="isDelete(items,index)">
                        <div class="adress-list-image">
                            <img src="../../images/user/check.png" class="image">
                        </div>
                        <div class="content">

                            <div class="content-position">
                                {{items.address}}
                            </div>

                            <div class="content-name-phone">
                                <span>{{items.name}}</span><span>{{items.phone}}</span>
                            </div>

                        </div>
                        <i class="fa fa-check fa-lg right"></i>
                    </li>
                </ul>
            </div>

            <div class="adress-box-button">
                <div @click="backTo()">
                    取消
                </div>
                <div @click="showWarnBox(true)">
                    确定
                </div>
            </div>

            <div class="adress-box-warn" v-show="showWarn">

                <div class="warn-box">
                    <div class="warn-head">
                        删除地址
                    </div>

                    <div class="warn-content">
                        确认删除所选地址吗?
                    </div>

                    <div class="warn-button">
                        <div @click="handleClick('cancel')">
                            取消
                        </div>
                        <div @click="deletePositionItem()">
                            确认
                        </div>
                    </div>
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
                 *  id:地址id
                 *  user_id:用户
                 *  name:地址名 
                 *  phone:联系电话
                 *  address:地址详情
                 */
                positionList:[],

                // 存放当前地址信息
                curPosition:{},

                // 显示删除提示
                showWarn:false,

                // 存放id数组
                idList:[]


            }

        },

        methods: {

            // 显示提示框
            showWarnBox() {

                this.showWarn = true

            },

            // 处理点击事件
            handleClick(command) {

                if(command == "cancel") {

                    this.showWarn = false

                }else {

                    var data = {

                        // 删除对应的地址

                    }

                    $.ajax({

                        url:"",

                        type:"post",

                        data:JSON.stringify(data),
                        
                        success(data) {

                            // 上传相应的数据

                        },error() {

                            // 对象处理

                        }

                    })

                }

            },

            // 选中该项并置为将要删除状态
            isDelete(items,index) {

                var right = document.querySelectorAll('.right')

                var image = document.querySelectorAll('.image')

                var adressImageBox = document.querySelectorAll('.adress-list-image')

                var _this = this

                if(items.isDelete ==  false) {

                    adressImageBox[index].style.border = "none"

                    image[index].style.opacity = 1

                    right[index].style.display = "block"

                    this.idList.push(items.id)

                    items.isDelete = true

                }else {

                    adressImageBox[index].style.border = "1px solid #cacaca"

                    image[index].style.opacity = 0

                    right[index].style.display = "none"

                    items.isDelete = false

                    this.idList.forEach(function(value,index) {

                        if(value == items.id) {

                            _this.idList.splice(index,1)

                        }

                    })

                }

            },

            // 跳转路由
            forwardTo(path,curMessage) {

                this.$router.push({path:path})

            },

            // 返回上一页
            backTo() {

                this.$router.go(-1)

            },

            // 初始化地址列表数组
            initialPositionList(list) {

                var _this = this

                this.positionList.splice(0,this.positionList.length)

                list.forEach(function(value) {

                    _this.positionList.push(value)

                })

                setTimeout(function() {

                    var right = document.querySelectorAll('.right')

                    var image = document.querySelectorAll('.image')

                    var adressImageBox = document.querySelectorAll('.adress-list-image')

                    _this.positionList.forEach(function(value,index) {

                        adressImageBox[index].style.border = "1px solid #cacaca"

                        image[index].style.opacity = 0

                        right[index].style.display = "none"

                        value.isDelete = false

                    })

                })

            },

            // 获取地址列表
            getPositionList() {

                var _this = this

                var data = {

                    session_id:this.$store.state.session_id

                }

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Mob_Address/AddressList",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.address

                        list.forEach(function(value) {

                            // 增加删除属性，点击地址将该项设置为true
                            value.isDelete = false

                            _this.positionList.push(value)

                        })

                        _this.initialPositionList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

            },


            // 删除地址
            deletePositionItem(id) {

                var _this = this

                var data = {

                    session_id:this.$store.state.session_id,

                    id:this.idList

                }

                if(this.idList.length == 0) {

                    this.showWarn = false

                    return

                }

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Mob_Address/deleteAddress",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        _this.getPositionList()

                    },error() {

                        console.log("请求失败")

                    }

                })

                

                this.showWarn = false

            }

        },

        mounted() {

            var _this = this

            this.getPositionList()

        }

    }

</script>

<style lang="scss">

    .adress-delete {
        position: relative;
        background:#f4f4f4;

        .adress-delete-box {
            position: relative;
            text-align: center;
            overflow: hidden;

            .adress-box-head {
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

            .adress-box-list {
                position: relative;
                margin-top:70px;
                overflow: auto;

                li {
                    position: relative;
                    background:#fff;
                    padding:10px 0;
                    text-align: left;
                    border-bottom: 1px solid #dfdfdf;

                    .adress-list-image {
                        position: absolute;
                        text-align: center;
                        top:25px;
                        display: inline-block;
                        margin-left:10px;
                        border-radius: 50%;
                        height: 25px;
                        width:25px;
                        border:1px solid #cacaca;

                        .image {
                            position: relative;
                            top:-1px;
                            left:-1px;
                            width:110%;
                            height:110%;
                            line-height: 25px;
                            opacity: 0;
                        }
                    }

                    .right {
                        position: absolute;
                        top:30px;
                        right:20px;
                        color:#00ff15;
                        display: none;
                    }

                    .content {
                        position: relative;
                        display: inline-block;
                        margin:5px 0 5px 50px;
                        font-size: 17px;

                        white-space: nowrap;

                        .content-position {
                            width:15rem;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }

                        .content-name-phone {

                            position: relative;
                            margin-top:5px;
                            font-size: 15px;
                            color:#a7a6a6;

                            span {
                                margin-right:5px;
                            }
                        }
                    }
                }

                li:last-of-type {
                    margin-bottom: 10rem;
                }
            }

            .adress-box-button {
                position: fixed;
                bottom:0;
                width:100%;
                display: flex;

                div {
                    position: relative;
                    line-height: 50px;
                    flex:1;
                }

                div:first-of-type {
                    background:#e7e7e7;
                    color:#8b8b8b;
                }

                div:last-of-type {
                    background:#33679a;
                    color:#fff;
                }
            }

            .adress-box-warn {

                position: fixed;
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

        }
    }

</style>

<template>
    
    <div class="adress-add">

        <div class="adress-add-box">

            <div class="adress-box-head">
                <div @click="backTo()">
                    <i class="fa fa-angle-left fa-lg"></i><span>{{addEdit}}</span>
                </div>
            </div>

            <form class="adress-box-form">

                <div>
                    <label for="name">姓名</label>
                    <input type="text" id="name" name="name" v-model="name" autocomplete="off" placeholder="请输入姓名">
                </div>

                <div>
                    <label for="phone">电话</label>
                    <input type="text" id="phone" name="phone" v-model="phone" autocomplete="off" placeholder="请输入电话号码">
                </div>

                <div @click="forwardTo('/map')">
                    <label for="position">位置</label>
                    <input type="text" id="position" name="position" v-model="position" autocomplete="off" placeholder="请选择位置" readonly>
                    <i class="fa fa-angle-right fa-lg right"></i>
                </div>
            </form>

            <div class="adress-box-textarea">
                <textarea v-model="positionDetail" placeholder="请输入详细地址"></textarea>
            </div>

            <div class="adress-box-button" @click="sendMessage()">
                确认
            </div>

            <div class="adress-add-warn" ref="warn"></div>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                // 存放姓名
                name:"",

                // 存放电话号码
                phone:"",

                // 存放位置信息
                position:"",

                // 存放详细地址信息
                positionDetail:"",

                // 存放标题
                addEdit:"添加地址",

                // 存放id值
                id:""

            }

        },

        methods: {

            forwardTo(command) {

                this.$store.commit('setPositonName',this.name)

                this.$store.commit('setPositonPhone',this.phone)

                this.$router.push({path:command})

            },

            // 检查表单信息
            checkForm() {

                if(this.name == "" || this.phone == "" || this.position == "") {

                    return "请有效填写地址信息!"

                }

            },

            // 返回上一页
            backTo() {

                this.$router.go(-1)

            },

            // 发送添加的地址信息
            sendMessage() {

                var exception = this.checkForm()

                var _this = this

                if(exception) {

                    this.$refs.warn.innerText = exception

                    setTimeout(function() {

                        _this.$refs.warn.innerText = ""

                    },2000)

                    return

                }

                if(this.addEdit == "添加地址") {

                    var data = {

                        session_id:this.$store.state.session_id,

                        name:this.name,

                        phone:this.phone,

                        address:this.position+this.positionDetail

                    }

                    $.ajax({

                        url:"http://118.24.136.82/index.php/index/Mob_Address/addAddress",

                        type:"post",

                        data:JSON.stringify(data),

                        success(data) {

                            var obj = JSON.parse(data)

                            var warn = _this.$refs.warn

                            if(obj.status == "ok") {

                                warn.innerText = obj.msg

                                _this.$router.push({path:'/home_adress_list'})


                            }else {

                                warn.innerText = obj.msg

                                setTimeout(function() {

                                    warn.innerText = ""

                                },1500)

                            }

                        },error() {

                            console.log("请求失败")

                        }

                    })

                }else {

                    var data = {

                        session_id:this.$store.state.session_id,

                        id:this.id,

                        name:this.name,

                        phone:this.phone,

                        address:this.position+this.positionDetail

                    }

                    $.ajax({

                        url:"http://118.24.136.82/index.php/index/Mob_Address/editAddress",

                        type:"post",

                        data:JSON.stringify(data),

                        success(data) {

                            var obj = JSON.parse(data)

                            var warn = _this.$refs.warn

                            if(obj.status == "ok") {

                                warn.innerText = obj.msg

                                _this.$router.push({path:'/home_adress_list'})


                            }else {

                                warn.innerText = obj.msg

                                setTimeout(function() {

                                    warn.innerText = ""

                                },1500)

                            }

                        },error() {

                            console.log("请求失败")

                        }

                    })

                }

            }

        },

        mounted() {

            this.addEdit = this.$store.state.addEdit

            this.position = this.$store.state.curPosition.address

            this.name = this.$store.state.curPosition.name

            this.phone = this.$store.state.curPosition.phone

            this.id = this.$store.state.curPosition.id

        }

    }

</script>

<style lang="scss">

    .adress-add {
        position: relative;
        background:#eef2f5;
        height:100%;

        .adress-add-box {
            position: relative;
            text-align: center;
            overflow: hidden;
            height:100%;

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

            .adress-box-form {

                position: relative;
                margin:auto;
                background:white;
                margin-top:130px;
                width:90%;

                div {
                    position: relative;
                    margin:10px 0;
                    font-size: 18px;

                    label {
                        position: absolute;
                        line-height: 50px;
                        font-weight: bold;
                    }

                    input {
                        border:none;
                        width:85%;
                        line-height: 50px;
                        font-size: 18px;
                        text-indent: 33%;
                        color:#cccbcb;
                        border-bottom:1px solid #c5c5c5;
                        outline: none;
                        text-overflow: ellipsis;
                        
                    }

                    #position {
                        border:none;
                    }

                    .right {
                        position: absolute;
                        top:14px;
                        right:30px;
                        color:#a7a6a6;
                    }
                }

                .form-button {
                    position: relative;
                    margin:auto;
                    width:85%;
                    line-height:50px;
                    background-color:#7db2e7;
                    color:#fcfdfd;
                    border-radius: 5px;
                }

            }

            .adress-box-textarea {
                position: relative;
                width:90%;
                margin:auto;
                margin-top:20px;
                height:100px;
                
                textarea {
                    font-size: 17px;
                    font-weight: bold;
                    line-height: 25px;
                    text-indent:10px;
                    outline:none;
                    resize: none;
                    border:none;
                    width:100%;
                    height:100%;
                    color:#cccbcb;
                }
            }

            .adress-box-button {
                position: relative;
                margin:auto;
                margin-top:20px;
                width:90%;
                line-height: 50px;
                font-size: 15px;
                font-weight: bold;
                background-color:#33769b;
                color:#fff;
                border-radius: 5px;
            }

            .adress-add-warn {
                position: absolute;
                width:100%;
                margin-top:20px;
                color:red;
            }

        }

    }

</style>

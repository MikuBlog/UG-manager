<template>
    
    <div class="register">

        <div class="register-box">

            <form class="register-box-form">

                <div>
                    <label for="account">登录名</label>
                    <input type="text" id="account" name="account" v-model="account" autocomplete="off" placeholder="请输入登录名">
                </div>

                <div>
                    <label for="password">密码</label>
                    <input type="password" id="password" name="password" v-model="password" autocomplete="off" placeholder="请输入密码">
                </div>

                <div>
                    <label for="espassword">确认密码</label>
                    <input type="password" id="espassword" name="espassword" v-model="espassword" autocomplete="off" placeholder="请确认密码">
                </div>

                <div>
                    <label for="phone">手机号</label>
                    <input type="phone" id="phone" name="phone" v-model="phone" autocomplete="off" placeholder="请输入手机号码">
                </div>

                <div class="form-button" @click="sendCheck($event)">
                    获取验证码
                </div>
                
                <div>
                    <label for="check">验证码</label>
                    <input type="check" id="check" name="check" v-model="check" autocomplete="off" placeholder="请输入验证码">
                </div>

            </form>

            <div class="register-warn" ref="warn"></div>

            <div class="register-box-button" @click="register()">
                确认
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                // 登录名
                account:"",

                // 密码
                password:"",

                // 确认密码
                espassword:"",

                // 手机号码
                phone:"",

                // 验证码
                check:"",

                // session_id
                session_id:""

            }

        },

        methods: {

            // 发送验证码
            sendCheck(event) {

                var element = event.currentTarget

                var _this = this

                if(element.isSend) {

                    return

                }

                element.isSend = true

                var data = {

                    phone:this.phone

                }

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/message/send",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        if(data != "") {

                            var number = 60

                            _this.session_id = obj.session_id

                            var time = setInterval(function() {

                                element.innerText = number

                                number --                             

                                if(number == -1) {

                                    clearInterval(time)

                                    element.innerText = "重新获取验证码"

                                    element.isSend = false

                                }

                            },1000)

                        }

                    },error() {

                        // 发送失败进行处理

                    }

                })

            },

            // 发送注册数据
            register() {

                var exception = this.checkForm()

                var _this = this

                if(exception) {

                    this.$refs.warn.innerText = exception

                    setTimeout(function() {

                        _this.$refs.warn.innerText = ""

                    },2000)

                    return

                }

                var data = {

                    session_id:this.session_id,

                    account:this.account,

                    password:this.password,

                    espassword:this.espassword,

                    phone:this.phone,

                    check:this.check

                }

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Mob_Login/userReg",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var warn = _this.$refs.warn

                        if(obj.status == "ok") {

                            warn.innerText = obj.msg

                            setTimeout(function() {

                                _this.$router.push({path:'/sign'})

                            },1500)

                        }else {

                            warn.innerText = obj.msg

                            setTimeout(function() {

                                warn.innerText = ""

                            },1500)

                        }

                    },error() {

                        // 注册失败进行处理

                    }

                })

            },

            checkForm() {

                var regexp = /^\w+$/

                if(this.account == "" || this.password == "" || this.espassword == "") {

                    return "请填写相关信息!"

                }

                if(this.espassword != this.password) {

                    return "密码与确认密码不一致!"

                }

                if(this.phone == "") {

                    return "请填写电话号码!"

                }

                if(this.check == "") {

                    return "请填写验证码!"

                }

                // 判断登录名长度
                if(this.account.length > 2 && this.account.length < 22) {

                    // 判断登录名格式
                    if(!regexp.test(this.account)) {

                        return "登录名只能为数字、字母!"

                    }

                }else {

                    return "登录名长度为3-21个字符!"

                }

                if(this.password.length > 7 && this.password.length < 20) {

                    // 判断密码格式
                    if(!regexp.test(this.account)) {

                        return "密码只能为数字、字母!"

                    }

                }else {

                   return "密码长度为8-20个字符!"

                }

            }

        }

    }

</script>

<style lang="scss">

    .register {
        background: #fff;
        .register-box {

            position: relative;
            text-align: center;
            overflow: hidden;

            .register-box-form {

                position: relative;
                margin-top:60px;

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
                        text-indent: 100px;
                        color:#cccbcb;
                        border-bottom:1px solid #b2b2b2;
                        outline: none;
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

            .register-warn {
                position: absolute;
                width:100%;
                margin-top:20px;
                color:red;
            }

            .register-box-button {
                position: relative;
                margin:auto;
                margin-top:250px;
                margin-bottom:30px;
                width:85%;
                line-height: 50px;
                font-size: 18px;
                font-weight: bold;
                background-color:#33769b;
                border-radius: 5px;
                color:#fff;
            }
        }

    }

</style>

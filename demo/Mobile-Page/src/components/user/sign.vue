<template>

    <div class="sign">

        <div class="sign-box">

            <div class="sign-box-image">
                <img src="../../images/user/theme.png">
            </div>

            <form class="sign-box-form">

                <div>
                    <label for="account">登录名</label>
                    <input type="text" id="account" name="account" v-model="account" autocomplete="off" placeholder="请输入登录名">
                </div>

                <div>
                    <label for="password">密码</label>
                    <input type="password" id="password" name="password" v-model="password" autocomplete="off" placeholder="请输入密码">
                </div>

            </form>

            <div class="sign-box-button">

                <div @click="login()">登录</div>
                <div @click="register()">注册</div>

            </div>

            <div class="sign-warn" ref="warn"></div>

            <div class="sign-box-wx">

                <div class="wx-head">

                    <span class="wx-head-line"></span>
                    <span class="wx-head-content">使用第三方登录</span>
                    <span class="wx-head-line"></span>

                </div>

                <div class="wx-image">
                    <img src="../../images/user/wx.png">
                    <div>微信登录</div>
                </div>

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
                password:""

            }

        },

        methods: {

            // 登录
            login() {

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

                    name:this.account,

                    password:this.password

                }

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Mob_Login/userLogin",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        if(obj.status == "ok") {

                            _this.$refs.warn.innerText = obj.msg

                            _this.$store.commit('setSessionId',obj.session.id)

                            setTimeout(function() {

                                _this.$router.push({path:'/home'})

                            },1000)

                        }else {

                            warn.innerText = obj.msg

                            setTimeout(function() {

                                warn.innerText = ""

                            },1500)

                        }

                        

                    },error() {

                        // 发送数据失败进行处理

                    }

                })

            },

            // 跳转至注册页面
            register() {

                this.$router.push({path:"/register"})

            },

            // 检查表单信息
            checkForm() {

                if(this.account == "" || this.password == "") {

                    return "请填写登录名和密码!"

                }

            }

        }

    }

</script>

<style lang="scss">

    .sign {
        background: #fff;

        .sign-box {

            position: relative;
            text-align: center;
            overflow: hidden;

            .sign-box-image {
                position: relative;
                margin:auto;
                margin-top:25%;

                img {
                    width:35%;
                    height:auto;
                }
            }

            .sign-box-form {

                position: relative;
                margin-top:50px;

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
                        color:#b2b2b2;
                        border-bottom:1px solid #b2b2b2;
                        outline: none;
                    }
                }
            }
            
            .sign-box-button {
                position: relative;
                margin-top:30px;
                div {
                    position: relative;
                    margin:auto;
                    width:85%;
                    line-height: 50px;
                    font-size: 15px;
                    font-weight: bold;
                    background-color:#33769b;
                    border-radius: 5px;
                    color:#fff;
                }

                div:last-of-type {
                    margin-top:10px;
                    background-color:#eaeaea;
                    color:#33679b;
                }
            }

            .sign-box-wx {

                position: relative;
                margin-top:80px;

                .wx-head {

                    color:#b2b2b2;
                    font-size: 10px;
                    .wx-head-line {
                        display: inline-block;
                        height:0;
                        width:30%;
                        border-bottom:1px solid #b2b2b2;
                    }

                    .wx-head-content {
                        display: inline-block;
                        position: relative;
                        top:3px;
                    }

                }

                .wx-image {
                    position: relative;
                    margin-top:54px;
                    color:#b2b2b2;
                    font-size: 13px;
                    width:100%;

                    img {
                        width:20%;
                        height:auto;
                    }
                    div {
                        height:100px;
                    }
                }

            }

            .sign-warn {
                position: absolute;
                width:100%;
                margin-top:20px;
                color:red;
            }

        }

    }

</style>

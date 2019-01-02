<template>

    <div class="worker-sign">

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

            </div>

            <div class="sign-warn" ref="warn"></div>

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

                if(exception) {

                    var _this = this

                    this.$refs.warn.innerText = exception

                    setTimeout(function() {

                        _this.$refs.warn.innerText = ""

                    },2000)

                    return

                }

                var data = {

                    account:this.account,

                    password:this.password

                }

                $.ajax({

                    url:"",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        // 对返回的数据进行处理

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

    .worker-sign {
        position: relative;
        height:100%;

        .sign-box {

            position: relative;
            text-align: center;
            height:100%;

            .sign-box-image {
                position: relative;
                margin:auto;

                img {
                    margin-top:30%;
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

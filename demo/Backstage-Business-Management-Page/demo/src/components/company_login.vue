<template>
    
    <div class="login">
        
        <div class="login-box">

            <div class="login-box-form">

                <div class="form-head">UG管理平台</div>

                <input type="text" name="username" id="username" placeholder="请输入用户名" v-model="userName">
                <div class="name-warn" ref="namewarn"></div>
                <input type="password" name="password" id="password" placeholder="请输入密码" v-model="password">
                <div class="password-warn" ref="passwordwarn"></div>

                <div class="button" @click="sendMessage()">登录</div>

                <div class="warn" ref="warn"></div>

            </div>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                // 存放用户名
                userName:"",

                // 存放用户密码
                password:""

            }

        },

        methods: {

            // 验证登录信息
            justify() {

                var regexp = /^\w+$/

                var _this = this

                if(this.userName == "") {

                    this.$refs.namewarn.innerText = "请输入用户名"

                }

                if(this.password == "") {

                    this.$refs.passwordwarn.innerText = "请输入密码"

                }

                if(this.userName.length < 3 || this.userName.length > 21) {

                    this.$refs.namewarn.innerText = "只允许输入3-21个字符"

                }else {

                    if(!regexp.test(this.userName)) {

                        this.$refs.namewarn.innerText = "只允许填数字、字母"

                    }

                }

                if(this.password.length < 8 || this.userName.length > 20) {

                    this.$refs.passwordwarn.innerText = "只允许输入8-20个字符"

                }else {

                    if(!regexp.test(this.password)) {

                        this.$refs.passwordwarn.innerText = "只允许填数字、字母"

                    }

                }

                setTimeout(function() {

                    _this.$refs.passwordwarn.innerText = ""

                    _this.$refs.namewarn.innerText = ""

                },2000)

            },

            // 点击登录
            sendMessage() {

                // this.justify()

                if(this.$refs.namewarn.innerText != "" || this.$refs.passwordwarn.innerText != "") {

                    return 

                }

                var data = {

                    name:this.userName,

                    password:this.password

                }

                var warn = this.$refs.warn

                var _this = this

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Login_Company/login",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        _this.$store.commit('setSession',obj.session)

                        if(obj.status == "ok") {

                            warn.innerText = obj.msg

                            setTimeout(function() {

                                _this.$router.push('/home/company_detail')

                            },1500)

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

    }

</script>

<style lang="scss">

    .login {

        position: relative;
        height: 100%;
        background:#ededed;

        .login-box {

            position: absolute;
            top:0;
            right:0;
            left:0;
            bottom:0;
            margin: auto;
            width:30rem;
            height:40rem;
            background:#fff;

            .login-box-form {

                position: relative;
                text-align: center;

                .form-head {
                    position: relative;
                    margin-top:5rem;
                    font-size: 1.8rem;
                }

                input {
                    outline: none;
                    height:3rem;
                    width:20rem;
                    margin:1rem;
                    border:1px solid #e9e9e9;
                    text-indent: 1rem;
                    border-radius: .5rem;
                }

                input:first-of-type {
                    margin-top:3rem;
                }
                
                .name-warn,.password-warn{
                    position: relative;
                    display: inline-block;
                    text-align: left;
                    width:20rem;
                    font-size: 1.3rem;
                    color:red;
                }

                .button {
                    position: relative;
                    display: inline-block;
                    width:20rem;
                    background:#447feb;
                    border:2px solid #447feb;
                    color:#fff;
                    border-radius: .5rem;
                    font-size: 1.3rem;
                    line-height: 3rem;
                    margin-top:2rem;
                    cursor: pointer;
                    transition: .5s;
                }

                .button:hover {
                    color:#447feb;
                    background:#fff;
                }

                .warn {
                    color:red;
                    position: relative;
                    margin-top:3rem;
                    font-size: 1.3rem;
                }
            }

        }

    }

</style>

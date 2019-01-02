<template>
    
    <div class="edit-password">

        <div class="password-box">

            <div class="password-head">
                添加科目
            </div>

            <div class="password-button">
                <span @click="showBox()">返回</span>
                <span @click="sendMessage()">确认</span>
            </div>

            <div class="password-form">

                <div>科目名:</div>
                <div>
                    <input type="text" placeholder="请输入科目名" v-model="name">
                </div>
                <div>科目总类别:</div>
                <div>
                    <input type="text" placeholder="请输入科目总类别" v-model="allType">
                </div>
                <div>科目类别:</div>
                <div>
                    <input type="text" placeholder="请输入科目类别" v-model="type">
                </div>
                <div>余额方向:</div>
                <div>
                    <input type="text" placeholder="请输入余额方向" v-model="direction">
                </div>

                <div class="warn" style="color:red;text-align:center;" ref="warn"></div>

            </div>

        </div>

        <div class="cancel" v-show="isHide">

            <div class="cancel-box">
                <div class="cancel-head">确认放弃添加科目吗?</div>
                <div class="cancel-button">
                    <span @click="hideBox()">取消</span>
                    <span @click="handleClick('/home/home_bill_list',false)">确认</span>
                </div>
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                // 科目名
                name:"",

                // 科目总类别
                allType:"",

                // 科目类别
                type:"",

                // 余额方向
                direction:"",

                // 是否隐藏取消框
                isHide:false

            }

        },

        methods: {

            // 显示取消框
            showBox() {

                this.isHide = true

            },

            // 隐藏取消框
            hideBox() {

                this.isHide = false

            },

            // 跳转路由
            handleClick(path) {

                this.isHide = false

                this.$router.push({path:path})

            },

            // 发送请求
            sendMessage() {

                var data = {

                    name:this.name,

                    allType:this.allType,

                    type:this.type,

                    direction:this.direction

                }

                var _this = this

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/add/addaccount",

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
         

        }

    }

</script>

<style lang="scss">

    .edit-password {
        position: relative;
        margin:2rem;

        .password-box {
            position: relative;
            overflow: hidden;
            background:#fff;
            box-shadow:  0 0 2px 2px rgb(226, 226, 226);
            transition: .5s;

            .password-head {
                position: relative;
                line-height: 4rem;
                font-size: 1.2rem;
                background:#fff;
                box-shadow: 0 0 2px 2px rgb(196, 196, 196);
                text-indent: 2rem;
            }

            .password-button {
                position: relative;

                span {
                    font-size: 1.2rem;
                    margin:2rem .5rem;
                    padding:.5rem 1rem;
                    border-radius: .3rem;
                    cursor: pointer;
                    transition: .5s;
                }

                span:first-of-type {
                    position: relative;
                    display: inline-block;
                    margin-left:2rem;
                    border:1px solid #d1d1d1;
                }

                span:last-of-type {
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

            .password-form {
                position: relative;
                overflow: hidden;
                margin:3rem 0;
                font-size: 1.2rem;

                div {
                    margin:1rem 2rem;

                    input {
                        position: relative;
                        height:3rem;
                        text-indent: 1.5rem;
                        width: 100%;
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

        .password-box:hover {
            box-shadow: 0 0 2px 2px rgb(134, 231, 255);
        }
    }

</style>

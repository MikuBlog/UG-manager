<template>
    
    <div class="person">

        <div class="person-box">

            <div class="person-box-head">
                <div @click="backTo()">
                    <i class="fa fa-angle-left fa-lg"></i><span>个人中心</span>
                </div>
            </div>

            <div class="person-box-background">
                <div class="person-box-image">
                    <img src="../../images/user/head.jpg">
                </div>
                <div class="person-box-content">
                    {{userName}}
                </div>
            </div>

            <div class="person-box-list">

                <div @click="forwardTo('/home_order_list')">
                    <i class="fa fa-file-text fa-lg fa-icon"></i><span>我的工单</span><i class="fa fa-angle-right fa-lg"></i>
                </div>
                <div @click="forwardTo('/home_adress_list')">
                    <i class="fa fa-map-marker fa-lg fa-icon"></i><span>我的地址</span><i class="fa fa-angle-right fa-lg"></i>
                </div>
                <div>
                    <i class="fa fa-phone fa-lg fa-icon"></i><span>维修咨询</span><i class="fa fa-angle-right fa-lg"></i>
                </div>
                <div>
                    <i class="fa fa-weixin fa-lg fa-icon"></i><span>绑定微信</span><i class="fa fa-angle-right fa-lg"></i>
                </div>
                <div @click="forwardTo('/sign')">
                    <i class="fa fa-undo fa-lg fa-icon"></i><span>注销登录</span><i class="fa fa-angle-right fa-lg"></i>
                </div>

            </div>

            <div class="person-bottom-button">

                <div class="button-box" @click="forwardTo('/home_order_photo')">
                    <i class="fa fa-gavel fa-lg"></i>
                    <div class="button-box-content">
                        我要维修
                    </div>
                </div>

                <div class="button-box" @click="forwardTo('/home_order_list')">
                    <i class="fa fa-file-text fa-lg" @click="forwardTo('/home_order_list')"></i>
                    <div class="button-box-content">
                        工单列表
                    </div>
                </div>

                <div class="button-box" @click="forwardTo('/home_company_list')">
                    <i class="fa fa-telegram fa-lg" @click="forwardTo('/home_company_list')"></i>
                    <div class="button-box-content">
                        周边服务
                    </div>
                </div>

                <div class="button-box" @click="forwardTo('/home_personal_center')">
                    <i class="fa fa-user fa-lg"></i>
                    <div class="button-box-content">
                        个人中心
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

                // 存放用户名
                userName:"Miku灬酱"

            }

        },

        methods: {

            // 返回上一页
            backTo() {

                this.$router.go(-1)

            },

            // 跳转路由
            forwardTo(path) {

                this.$router.push({path:path})

            }

        },

        mounted() {

            if(this.$store.state.userName != "") {

                this.userName = this.$store.state.userName

            }

        }

    }

</script>

<style lang="scss">

    .person {
        position: relative;
        height:800px;

        .person-box {
            position: relative;
            overflow: hidden;
            text-align: center;
            background:white;
            height:100%;

            .person-box-head {
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

            .person-box-background {
                position: relative;
                margin-top:70px;
                overflow: hidden;
                background-color:#5e97cd;

                .person-box-image {
                    position: relative;
                    display: inline-block;
                    margin:10px 0 5px 0;
                    width:100px;
                    height:100px;
                    overflow: hidden;
                    border-radius: 50%;

                    img {
                        width:100%;
                    }
                }

                .person-box-content {
                    position: relative;
                    margin-bottom:10px;
                    color:#fff;
                }
            }

            .person-box-list {
                position: relative;
                line-height: 50px;
                text-align: left;

                div {
                    position: relative;
                    border-bottom: 1px solid #c7c7cc;

                    .fa-icon{
                        position: absolute;
                        left:25px;
                        top:15px;
                        font-size: 25px;
                        color:#464646;
                    }

                    span {
                        margin-left:65px;
                        color:#464646; 
                    }

                    .fa-angle-right {
                        position: absolute;

                        top:15px;
                        right:20px;
                        color:#c7c7cc;
                    }
                }

            }

            .person-bottom-button {
                position: fixed;
                width:100%;
                margin-top:100px;
                bottom:0;
                background:#fff;
                display: flex;
                justify-content: space-around;
                color:#a7a6a6;
                border-top:1px solid #c7c7cc;

                .button-box {
                    position: relative;
                    margin:20px 0 10px 0;

                    i {
                        font-size: 30px;
                    }

                    div {
                        position: relative;
                        font-size: 13px;
                        margin-top:8px;
                    }
                }
            }

        }

    }

</style>

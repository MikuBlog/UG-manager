<template>
    
    <div class="person-detail">

        <div class="person-detail-box">

            <div class="person-box-head">
                <div @click="backTo()">
                    <i class="fa fa-angle-left fa-lg"></i><span>人员详情</span>
                </div>
            </div>

            <div class="person-box-form">
                <div class="person-head">
                    工号:
                </div>
                <div class="person-number-box form-box">
                    <div class="person-number">
                        {{workerMes.number}}
                    </div>
                </div>

                <div class="person-head">
                    姓名:
                </div>
                <div class="person-name-box form-box">
                    <div class="person-name">
                        {{workerMes.name}}
                    </div>
                </div>

                <div class="person-head">
                    电话:
                </div>
                <div class="person-phone-box form-box">
                    <div class="person-phone">
                        {{workerMes.phone}}
                    </div>
                </div>

                <div class="person-head">
                    身份证:
                </div>
                <div class="person-id-box form-box">
                    <div class="person-id">
                        {{workerMes.identity}}
                    </div>
                </div>

                <div class="person-head">
                    身份证正面:
                </div>
                <div class="person-photo-front-box photo-box form-box">
                    <img src="../../images/user/head.jpg">
                </div>

                <div class="person-head">
                    身份证反面:
                </div>
                <div class="person-photo-back-box photo-box form-box">
                    <img src="../../images/user/head.jpg">
                </div>
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                // 存放员工信息
                workerMes:{}

            }

        },

        methods: {

            // 返回上一页
            backTo() {

                this.$router.go(-1)

            }
            
        },

        mounted() {

            // 判断当前员工信息是否存在
            var workerMes = this.$store.state.workerMes

            if(workerMes) {

                this.workerMes = workerMes

            }

        }

    }

</script>

<style lang="scss">

    .person-detail {
        position: relative;
        background:#f4f4f4;

        .person-detail-box {
            position: relative;
            text-align: center;
            overflow: hidden;
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

            .person-box-form {
                position: relative;
                margin-top:85px;
                text-align: left;

                .person-head {
                    position: relative;
                    color:#6d6d6d;
                    font-size: 18px;
                    margin:15px 0 15px 15px;
                }

                .person-number-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .person-number{
                        margin:15px 0 15px 15px;
                        font-size: 17px;
                        color:#9e9e9e;
                    }

                }

                .person-name-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .person-name {
                        font-size: 17px;
                        margin:15px 0 15px 15px;
                        color:#9e9e9e;
                    }
                }

                .person-phone-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .person-phone {
                        font-size: 17px;
                        margin:15px 0 15px 15px;
                        color:#9e9e9e;
                    }
                }

                .person-id-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .person-id {
                        font-size: 17px;
                        margin:15px 0 15px 15px;
                        color:#9e9e9e;
                    }
                }

                .photo-box {
                    position: relative;
                    background:#fff;
                    text-align: center;
                    height:250px;
                    line-height: 250px;

                    img {
                        position: relative;
                        height:70%;
                        vertical-align: middle;
                    }
                }

                .person-photo-back-box {
                    margin-bottom:50px;
                }

                .form-box {
                    border-top:1px solid #e6e6e6;
                    border-bottom:1px solid #e6e6e6;
                }

            }

        }

    }

</style>

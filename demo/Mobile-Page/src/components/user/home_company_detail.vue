<template>
    
    <div class="company-detail">

        <div class="company-detail-box">

            <div class="company-box-head">
                <div @click="backTo()">
                    <i class="fa fa-angle-left fa-lg"></i><span>商户详情</span>
                </div>
            </div>

            <div class="company-box-form">
                <div class="company-head">
                    公司名:
                </div>
                <div class="company-name-box form-box">
                    <div class="company-name">
                        {{curCompany.company}}
                    </div>
                </div>

                <div class="company-head">
                    经营范围:
                </div>
                <div class="company-types-box form-box">
                    <div class="company-type-first" v-for="father in curCompany.range">
                        <div class="company-type-first-head">
                            {{father.fathername}}
                        </div>
                        <div class="company-type-second">
                            <div class="company-type-second-button">
                                <div v-for="range in father.range">
                                    {{range.rangename}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="company-head">
                    地址:
                </div>
                <div class="company-position-box form-box">
                    <div class="company-position">
                        {{curCompany.address}}
                    </div>
                </div>

                <div class="company-head">
                    服务详情:
                </div>
                <div class="company-service-box form-box">
                    <div class="company-service">
                        <img :src="curCompany.serviceUrl">
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

                // 存放公司
                curCompany:""

            }

        },

        methods: {

            // 跳转会上一页
            backTo() {

                this.$router.go(-1)

            }

        },

        mounted() {

            // 判断当前商户信息是否存在
            var curCompany = this.$store.state.curCompany

            this.curCompany = curCompany

        }

    }

</script>

<style lang="scss">

    .company-detail {
        position: relative;
        background:#f4f4f4;

        .company-detail-box {
            position: relative;
            text-align: center;
            overflow: hidden;

            .company-box-head {
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

            .company-box-form {
                position: relative;
                margin-top:85px;
                text-align: left;

                .company-head {
                    position: relative;
                    color:#6d6d6d;
                    font-size: 18px;
                    margin:15px 0 15px 15px;
                }

                .company-name-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .company-name{
                        margin:15px 0 15px 15px;
                        font-size: 17px;
                    }

                }

                .company-types-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .company-type-first {
                        position: relative;

                        .company-type-first-head {
                            position: relative;
                            font-size: 18px;
                            margin:10px 0 10px 10px;
                            color:#717271;
                        }

                        .company-type-second {
                            position: relative;

                            .company-type-second-head {
                                position: relative;
                                font-size: 17px;
                                margin:15px 0 10px 50px;
                                color:#717271;
                            }

                            .company-type-second-button {
                                position: relative;
                                display: flex;
                                flex-wrap: wrap;
                                justify-content: space-around;

                                div {
                                    position: relative;
                                    text-align: center;
                                    margin:10px 0;
                                    width:30%;
                                    height:30px;
                                    font-size: 17px;
                                    color:#000000;
                                    border:1px solid #dddddd;
                                    border-radius: 5px;
                                    line-height: 30px;
                                    background:#f7f7f7;
                                }
                            }
                        }
                    }
                }

                .company-position-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .company-position{
                        margin:15px 0 15px 15px;
                        font-size: 17px;
                    }

                }

                .company-service-box {
                    position: relative;
                    background:#fff;
                    overflow: hidden;

                    .company-service{
                        margin:15px 0 15px 15px;
                        font-size: 17px;
                    }

                }

                .form-box {
                    border-top:1px solid #e6e6e6;
                    border-bottom:1px solid #e6e6e6;
                }

            }
        }
    }

</style>

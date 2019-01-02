<template>
    
    <div class="pay-tips">

        <div class="pay-box">

            <div class="pay-box-head">
                <div @click="forwardTo('/home')">
                    <i class="fa fa-angle-left fa-lg"></i><span>付费提示</span>
                </div>
            </div>

            <div class="pay-box-image">
                <img src="../../images/user/theme.png">
                <div class="pay-box-image-content">
                    您存在代付费工单，请进行付费后再添加新工单
                </div>
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        methods: {

            forwardTo(path) {

                this.$router.push({path:path})

            }

        }

    }

</script>

<style lang="scss">

    .pay-tips {
        position: relative;
        height:100%;

        .pay-box {
            position: relative;
            height:100%;
            margin: auto;
            text-align: center;
            width:90%;
            overflow: hidden;

            .pay-box-head {
                position: fixed;
                right:0;
                left:0;
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

            .pay-box-image {
                position: absolute;
                top:-50px;
                right:0;
                left:0;
                bottom:0;
                margin:auto;
                width:200px;
                height:200px;

                img {
                    width:90%;
                    height:auto;
                }

                .pay-box-image-content {
                    position: relative;
                    margin-top:20px;
                    line-height: 25px;
                    font-weight: bold;
                    font-size: 14px;
                    color:#858988;
                }
            }
        }
    }

</style>

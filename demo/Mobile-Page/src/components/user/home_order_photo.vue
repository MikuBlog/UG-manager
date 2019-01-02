<template>
    
    <div class="order-photo">

        <div class="photo-box">

            <div class="photo-box-head">
                <div @click="forwardTo('/home')">
                    <i class="fa fa-angle-left fa-lg"></i><span>拍摄</span>
                </div>
            </div>
 
            <div class="photo-box-image">
                <img src="../../images/user/theme.png">
                <div class="photo-box-image-content">
                    请点击"拍照"对维修设备进行拍照或选择照片，UG管家将自动填写工单
                </div>
            </div>

            <div class="photo-box-button">
                <div @click="takePhoto()">
                    拍摄
                </div>
                <div @click="forwardTo('/home_order_add')">
                    跳过
                </div>
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        methods: {

            // 跳转路由
            forwardTo(path) {

                this.$router.push({path:path})

            },

            // 调用拍摄接口
            takePhoto() {



            }

        }

    }

</script>

<style lang="scss">

    .order-photo {
        position: relative;
        height:100%;

        .photo-box {
            position: relative;
            height:100%;
            margin: auto;
            text-align: center;
            width:90%;
            overflow: hidden;

            .photo-box-head {
                position: fixed;
                left:0;
                right:0;
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

            .photo-box-image {
                position: absolute;
                top:-140px;
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

                .photo-box-image-content {
                    position: relative;
                    margin-top:20px;
                    line-height: 25px;
                    font-weight: bold;
                    font-size: 14px;
                    color:#858988;
                }
            }

            .photo-box-button {
                position: absolute;
                width:100%;
                bottom:0;
                margin:30px 0;
                div {
                    position: relative;
                    margin:auto;
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
        }
    }

</style>

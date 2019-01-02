<template>
    
    <div class="bind">

        <div class="bind-box">

            <div class="bind-box-head">
                <div @click="forwardTo('/home')">
                    <i class="fa fa-angle-left fa-lg"></i><span>返回</span>
                </div>
            </div>

            <div class="bind-box-image">
                <img src="../../images/user/theme.png">
                <div class="bind-box-content">
                    您已成功绑定!
                </div>
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        methods: {

            forwardTo(command) {

                this.$router.push({path:command})

            }

        }

    }

</script>

<style lang="scss">

    .bind {
        position: relative;
        height:100%;

        .bind-box {
            position: relative;
            text-align: center;
            height:100%;

            .bind-box-head {
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

            .bind-box-image {
                position: absolute;
                top:0;
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

                .bind-box-content {

                    position: relative;
                    font-size: 20px;
                    margin-top:20px;
                    color:#595858;

                }
            }

        }
    }

</style>

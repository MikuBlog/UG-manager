<template>
    
    <div class="welcome">

        <div class="image-box">

            <div class="image">
                <img src="../images/welcome.png">
            </div>

            <div class="head">
                UG管家平台
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {



            }

        },

        methods: {



        },

        mounted() {
            
        }

    }

</script>

<style lang="scss">

    .welcome {
        position: relative;
        height: 100%;
        margin:2rem;

        .image-box {
            position: absolute;
            width:28rem;
            height:28rem;
            top:25rem;
            right:0;
            left: 0;
            margin:auto;
            text-align: center;
            
            .image {
                width:100%;
                height:100%;

                img {
                    width:100%;
                    height:100%;
                }
            }

            .head {
                font-weight: bold;
                font-size: 2.5rem;
                color: #415a95;
            }
        }
    }

</style>

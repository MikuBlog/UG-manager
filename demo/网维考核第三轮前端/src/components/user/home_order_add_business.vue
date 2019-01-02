<template>
    
    <div class="business">

        <div class="business-box">

            <div class="business-box-head">
                <div @click="backTo()">
                    <i class="fa fa-angle-left fa-lg"></i><span>类目选择</span>
                </div>
            </div>

            <div class="business-form-box">
                <div class="business-head">
                    家电
                </div>

                <div class="business-house-box">
                    <div v-for="items in typeHouse.title" @click="getType(typeHouse.father,items)">
                        {{items}}
                    </div>
                </div>

                <div class="business-head">
                    数码产品
                </div>

                <div class="business-house-box">
                    <div v-for="items in typeTel.title" @click="getType(typeTel.father,items)">
                        {{items}}
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

                // 存放家电类型
                typeHouse:{
                    father:"家电",
                    title:[
                        "空调",
                        "洗衣机",
                        "油烟机",
                        "冰箱",
                        "风扇",
                        "烤箱"
                    ]
                },

                // 存放数码产品类型
                typeTel:{
                    father:"数码产品",
                    title:[
                        "手机",
                        "电脑",
                        "相机",
                        "手表"
                    ]
                }

            }

        },

        methods: {

            // 返回上一页
            backTo() {

                this.$router.go(-1)

            },

            // 保存type信息
            getType(father,type) {

                this.$store.commit('getType',{
                    father:father,
                    title:type
                })

                this.$router.push({path:"/home_order_add"})

            }

        }

    }

</script>

<style lang="scss">

    .business {
        position: relative;
        background:#f4f4f4;
        height:100%;

        .business-box {
            position: relative;
            text-align: left;
            overflow: hidden;
            height:100%;

            .business-form-box {
                position: relative;
                overflow: hidden;
                margin-top:70px;
            }

            .business-box-head {
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

            .business-head {
                position: relative;
                color:#6d6d6d;
                font-size: 18px;
                margin:15px 0 15px 15px;
            }

            .business-house-box {
                position: relative;
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                background:#fff;

                div {
                    position: relative;
                    text-align: center;
                    margin:8px 0;
                    width:30%;
                    border:1px solid #e1e1e1;
                    line-height: 30px;
                    border-radius: 5px;
                    background: #f7f7f7;
                }
            }

        }

    }

</style>

<template>
    
    <div class="business-filter">

        <div class="business-filter-box">

            <div class="business-box-head">
                <div @click="backTo()">
                    <i class="fa fa-angle-left fa-lg"></i><span>类目筛选</span>
                </div>
            </div>

            <div class="business-types-box form-box">
                <div class="business-type-first" v-for="items in (types)">
                    <div class="business-type-first-head">
                        {{items.typeName}}
                    </div>
                    <div class="business-type-second" v-for="items_2 in (items.typeSecond)">
                        <div class="business-type-second-head" @click="hideButtonBox($event)">
                            <span>{{items_2.typeName}}</span><i class="fa fa-angle-right fa-lg"></i>
                        </div>
                        <div class="business-type-second-button">
                            <div v-for="(item_3,index) in (items_2.list)" @click="handleClick($event)" class="button">
                                {{item_3}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="business-box-button">
                <div @click="backTo()">取消</div>
                <div @click="saveTypeListSelected()">确认</div>
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                // 存放类目信息(模拟数据)
                types:[

                    {
                        typeName:"维修",

                        typeSecond:[

                            {
                                typeName:"家电",
            
                                list:[
            
                                    "空调",
            
                                    "洗衣机",
            
                                    "油烟机",

                                    "冰箱",

                                    "风扇",

                                    "烤箱"
            
                                ]
                            },

                            {
            
                                typeName:"数码",
            
                                list:[
            
                                    "手机",
            
                                    "平板",

                                    "笔记本",
            
                                    "电脑"
            
                                ]
            
                            }

                        ]
                        
                    },

                    {

                        typeName:"清洗",

                        typeSecond:[

                            {
                                typeName:"家电",
            
                                list:[
            
                                    "空调",
            
                                    "洗衣机",
            
                                    "油烟机",

                                    "冰箱",

                                    "风扇",

                                    "烤箱"
            
                                ]
                            },

                        ]

                    }

                ],

            }

        },

        methods: {

            // 返回上一页
            backTo() {

                this.$router.go(-1)

            },

            // 显示隐藏框
            hideButtonBox(event) {

                var buttonBox = event.target.nextElementSibling

                if(buttonBox.isHide == false) {

                    buttonBox.style.height = 0

                    buttonBox.isHide = true

                }else {

                    buttonBox.style.height = "auto"

                    buttonBox.isHide = false

                }

            },

            // 保存类目筛选结果
            saveTypeListSelected() {

                // 遍历所有被选择的元素
                var buttons = document.querySelectorAll('.button')

                // 创建一个数组保存该序列
                var typeList = []

                buttons.forEach(function(value) {

                    if(value.isSelected) {

                        typeList.push(value.innerText)

                    }

                })

                this.$store.commit('getTypeList',typeList)

                this.backTo()

            },

            // 处理按钮点击事件
            handleClick(event) {

                var _this = event.target

                if(_this.isSelected == false) {

                    _this.style.background = "#43ee00"

                    _this.style.color = "#fff"

                    _this.isSelected = true

                }else {

                    _this.style.background = "#f6f6f6"

                    _this.style.color = "#000000"

                    _this.isSelected = false

                }

            }

        },

        mounted() {

            // 为所有按钮属性加上样式判断
            var buttons = document.querySelectorAll('.button')

            var buttonBox = document.querySelectorAll('.business-type-second-button')

            buttons.forEach(function(value) {

                value.isSelected = false

            })

            buttonBox.forEach(function(value) {

                value.isHide = false

            })

        }

    }

</script>

<style lang="scss">

    .business-filter {
        position: relative;
        overflow: hidden;
        background:#f4f4f4;

        .business-filter-box {
            position: relative;
            text-align: left;
            overflow: hidden;
            margin-bottom:300px;

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

            .business-types-box {
                position: relative;
                overflow: hidden;
                margin:70px 0;

                .business-type-first {
                    position: relative;
                    background:#f4f4f4;

                    .business-type-first-head {
                        position: relative;
                        font-size: 18px;
                        margin:10px 0 10px 15px;
                        color:#717271;
                    }

                    .business-type-second {
                        position: relative;
                        overflow: hidden;
                        background:#fff;

                        .business-type-second-head {
                            position: relative;
                            font-size: 17px;
                            color:#000000;
                            border:1px solid #ededed;
                            border-left:none;
                            border-right: none;

                            span {
                                display: inline-block;
                                margin:15px 0 15px 15px;
                            }

                            i {
                                position: absolute;
                                right:15px;
                                top:18px;
                                color:#c9c2c2;
                            }
                        }

                        .business-type-second-button {
                            position: relative;
                            display: flex;
                            flex-wrap:wrap;
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

            .business-box-button {
                position: fixed;
                bottom:0;
                width:100%;
                text-align: center;
                display: flex;

                div {
                    position: relative;
                    line-height: 50px;
                    flex:1;
                }

                div:first-of-type {
                    background:#e7e7e7;
                    color:#8b8b8b;
                }

                div:last-of-type {
                    background:#33679a;
                    color:#fff;
                }
            }

        }

    }

</style>

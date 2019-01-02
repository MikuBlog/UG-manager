<template>
    
    <div class="adress">

        <div class="adress-box">

            <div class="adress-box-head">
                <div @click="backTo()">
                    <i class="fa fa-angle-left fa-lg"></i><span>地址列表</span>
                </div>
            </div>

            <div class="adress-box-list">
                <ul>
                    <li v-for="items in positionList" @click="forwardTo('/home_adress_add','编辑地址',items)">
                        <i class="fa fa-map-marker fa-lg fa-icon"></i>
                        <div class="content">

                            <div class="content-position">
                                {{items.address}}
                            </div>

                            <div class="content-name-phone">
                                <span>{{items.name}}</span><span>{{items.phone}}</span>
                            </div>

                        </div>
                        <i class="fa fa-angle-right fa-lg right"></i>
                    </li>
                </ul>
            </div>

            <div class="adress-box-button">
                <div @click="forwardTo('/home_adress_delete')">
                    删除
                </div>
                <div @click="forwardTo('/home_adress_add','添加地址')">
                    添加
                </div>
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                /**
                 *  id:地址id
                 *  user_id:用户
                 *  name:地址名 
                 *  phone:联系电话
                 *  address:地址详情
                 */
                positionList:[],

                // 存放当前地址信息
                curPosition:{}

            }

        },

        methods: {

            // 跳转路由
            forwardTo(path,name,curMessage) {

                this.$store.commit('setAddEdit',name)

                if(curMessage) {

                    this.$store.commit('getCurPosition',curMessage)

                }

                this.$router.push({path:path})

            },

            // 返回上一页
            backTo() {

                this.$router.go(-1)

            },

            // 初始化地址列表数组
            initialPositionList(list) {

                var _this = this

                this.positionList.length = 0

                list.forEach(function(value) {

                    _this.positionList.push(value)

                })

            },

            // 获取地址列表
            getPositionList() {

                var _this = this

                var data = {

                    session_id:this.$store.state.session_id

                }

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Mob_Address/AddressList",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.address

                        _this.initialPositionList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

            }     

        },

        mounted() {

            this.getPositionList()

        }

    }

</script>

<style lang="scss">

    .adress {
        position: relative;
        background:#f4f4f4;

        .adress-box {
            position: relative;
            text-align: center;
            overflow: hidden;

            .adress-box-head {
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

            .adress-box-list {
                position: relative;
                overflow: hidden;
                margin:70px 0;
                overflow: auto;

                li {
                    position: relative;
                    background:#fff;
                    padding:10px 0;
                    text-align: left;
                    border-bottom: 1px solid #dfdfdf;

                    i {
                        position: relative;
                        margin-left:10px;
                        top:-13px;
                        color:#333;
                    }

                    .right {
                        position: absolute;
                        top:30px;
                        right:10px;
                        color:#a7a6a6;
                    }

                    .content {
                        position: relative;
                        display: inline-block;
                        margin:5px 0 5px 10px;
                        font-size: 17px;

                        white-space: nowrap;

                        .content-position {
                            width:15rem;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }

                        .content-name-phone {

                            position: relative;
                            margin-top:5px;
                            font-size: 15px;
                            color:#a7a6a6;

                            span {
                                margin-right:5px;
                            }
                        }
                    }
                }

                li:last-of-type {
                    margin-bottom: 10rem;
                }
            }

            .adress-box-button {
                position: fixed;
                bottom:0;
                width:100%;
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

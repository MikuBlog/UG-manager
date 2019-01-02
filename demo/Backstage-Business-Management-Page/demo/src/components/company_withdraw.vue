<template>
    
    <div class="withdraw">

        <div class="withdraw-box">

            <div class="withdraw-head">
                提现管理
            </div>

            <div class="withdraw-button">
                <span @click="showBox()">
                    提现
                </span>
                可提现金额:{{money}}
            </div>

            <div class="withdraw-search">
                <div class="show-number">
                    <span>每页显示:</span>
                    <select>
                        <option value="10">10条</option>
                        <option value="25">25条</option>
                        <option value="50">50条</option>
                        <option value="100">100条</option>
                    </select>
                </div>
            </div>

            <div class="table">

                <table ref="table">

                    <tr>
                        <th>发起时间</th>
                        <th>金额</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>

                    <tr v-for="items in widthdraw">
                        <td>{{items.time}}</td>
                        <td>{{items.price}}</td>
                        <td>{{items.status}}</td>
                        <td>
                            <span class="button"><i class="fa fa-times fa-lg"></i>取消</span>
                        </td>
                    </tr>

                </table>

            </div>

        </div>

        <div class="cancel" v-show="isHide">

            <div class="cancel-box">
                <div class="cancel-head">请输入提现金额</div>
                <div class="input">
                    <div>
                        <input type="text">
                    </div>
                </div>
                <div class="cancel-button">
                    <span @click="hideBox()">取消</span>
                    <span @click="handleClick('/home/company_order_list')">确认</span>
                </div>
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                // 存放取款列表
                widthdraw:[],

                // 可提现金额
                money:123,

                // 是否显示提示框
                isHide:false

            }

        },

        methods: {

            // 显示提示框
            showBox() {

                this.isHide = true

            },

            // 隐藏取消框
            hideBox() {

                this.isHide = false

            },

            // 请求取款列表
            getWithDrawList() {



            }

        },

        mounted() {

            // 检查是否存在在取款列表，有就直接使用
            var withdrawList = this.$store.state.withdrawList

            var _this = this

            if(withdrawList.length != 0) {

                withdrawList.forEach(function(value) {

                    _this.widthdraw.push(value)

                })

            }else {

                this.getWithDrawList()

            }

        }

    }

</script>

<style lang="scss">

    .withdraw {
        position: relative;
        margin:2rem;

        .withdraw-box {
            position: relative;
            overflow: hidden;
            background:#fff;
            box-shadow:  0 0 2px 2px rgb(226, 226, 226);
            transition: .5s;

            .withdraw-head {
                position: relative;
                line-height: 4rem;
                font-size: 1.2rem;
                background:#fff;
                box-shadow: 0 0 2px 2px rgb(226, 226, 226);
                text-indent: 2rem;
            }

            .withdraw-button {
                position: relative;
                margin-top: 2rem;

                span {
                    position: relative;
                    text-align: center;
                    padding: .7rem 1rem;
                    display: inline-block;
                    margin: 1.5rem 1rem 1.5rem 1rem;
                    border: 1px solid #d3d3d3;
                    font-size: 1.2rem;
                    box-shadow: 0 0 1px 1px rgb(243, 243, 243);
                    cursor: pointer;
                    transition: .5s;
                }

                span:first-of-type {
                    margin-left: 2rem; 
                }

                span:hover {
                    box-shadow: 0 0 1px 1px rgb(98, 224, 255);
                }

            }

            .withdraw-search {
                position: relative;
                height:3rem;
                
                i {
                    position: absolute;
                    top:.65rem;
                    left:.5rem;
                    z-index: 1;
                    font-size: 1.6rem;
                    color:#6ebafc;
                }

                .show-number {
                    position: absolute;
                    top:0;
                    right:0;
                    margin-right:2rem;
                    font-size: 1.2rem;

                    select {
                        height:2.6rem;
                    }
                }

            }

            .table {
                position: relative;
                font-size: 1.2rem;
                margin:2rem;
                line-height: 3.5rem;
                border:1px solid #d3d3d3;
                box-shadow: 0 0 1px 1px rgb(226, 226, 226);

                table {
                    position: relative;
                    border-collapse: collapse;
                    width:100%;
                    text-align: center;

                    .icon {
                        position: relative;
                        cursor: pointer;
                    }

                    th {
                        border:1px solid #e3e3e3;
                    }
                    
                    td {
                        border:1px solid #e3e3e3;

                        .button {
                            position: relative;
                            display: inline-block;
                            margin:1rem 0;
                            line-height: 2.8rem;
                            padding:0 1rem;
                            background:#d63d33;
                            border:1px solid #d63d33;
                            color:#fff;
                            transition: .5s;
                            cursor: pointer;
                        }

                        i {
                            position: relative;
                            top:-.2rem;
                            font-size: 1.3rem;
                            margin-right: .5rem; 
                        }

                        .button:first-of-type:hover {
                            background: #fff;
                            color: #d63d33;
                        }

                    }

                    tr:first-of-type {
                        background:rgb(240, 240, 240);
                    }

                    input {
                        height:2.5rem;
                        text-indent: 2rem;
                        width:80%;
                        font-size: 1.2rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                }
            }

        }

        .cancel {
            position: fixed;
            top:0;
            right:0;
            left:0;
            bottom:0;
            background:rgba(0,0,0,.5);

            .cancel-box {
                position: absolute;
                top:0;
                right:0;
                left:0;
                bottom:0;
                margin: auto;
                width:45rem;
                height:15rem;
                background:rgb(240, 240, 240);

                .cancel-head {
                    position: relative;
                    line-height: 4rem;
                    font-size: 1.2rem;
                    text-indent:2rem;
                    background:#fff;
                }

                .input {
                    position: relative;
                    overflow: hidden;
                    background: #fff;

                    div {
                        margin:2rem;

                        input {
                            width:100%;
                            height:2rem;
                        }
                    }
                }

                .cancel-button {
                    position: relative;
                    text-align: right;
                    
                    span {
                        position: relative;
                        display: inline-block;
                        font-size: 1.2rem;
                        margin:1rem .5rem;
                        padding:.4rem .8rem;
                        border-radius: .3rem;
                        cursor: pointer;
                        transition: .5s;
                    }

                    span:first-of-type {
                        border:1px solid #d4d4d4;
                        background: #fff;
                    }

                    span:first-of-type:hover {
                        box-shadow: 0 0 1px 1px rgb(98, 224, 255);
                    }

                    span:last-of-type {
                        border:1px solid #447feb;
                        margin-right:1rem;
                        background:#447feb;
                        color:#fff;
                    }

                    span:last-of-type:hover {
                        background:#fff;
                        color: #447feb;
                    }

                }
            }
        }
    }

</style>

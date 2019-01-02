<template>
    
    <div class="person-assign-list">

        <div class="person-list-box">

            <div class="person-head">
                分配工单
            </div>

            <div class="person-search">
                <i class="fa fa-search fa-lg"></i><input type="text">
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
                        <th>工号</th>
                        <th>登录名</th>
                        <th>姓名</th>
                        <th>电话</th>
                        <th>角色</th>
                        <th>微信名称</th>
                        <th>操作</th>
                    </tr>

                    <tr v-for="items in workerList">
                        <td>{{items.workerId}}</td>
                        <td>{{items.loginName}}</td>
                        <td>{{items.workerName}}</td>
                        <td>{{items.workerPhone}}</td>
                        <td>{{items.role}}</td>
                        <td>{{items.wxName}}</td>
                        <td>
                            <span class="button" @click="handleClick('/home/company_edit_role','edit')"><i class="fa fa-arrow-left fa-lg"></i>分配</span>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input type="text" placeholder="搜索工号">
                        </td>
                        <td></td>
                        <td>
                            <input type="text" placeholder="搜索姓名">
                        </td>
                        <td>
                            <input type="text" placeholder="搜索电话">
                        </td>
                        <td>
                            <input type="text" placeholder="搜索角色">
                        </td>
                        <td></td>
                        <td></td>
                    </tr>

                </table>

            </div>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                // 存放员工列表
                workerList:[]

            }

        },

        methods: {



        },

        mounted() {

            // 判断员工列表是否存在，如果存在则使用该列表
            var workerList = this.$store.state.workerList

            var _this = this

            if(workerList.length != 0) {

                workerList.forEach(function(value) {
                    
                    _this.workerList.push(value)

                })

            }

        }

    }

</script>

<style lang="scss">

    .person-assign-list {
        position: relative;
        margin:2rem;

        .person-list-box {
            position: relative;
            overflow: hidden;
            background:#fff;
            box-shadow:  0 0 2px 2px rgb(226, 226, 226);
            transition: .5s;

            .person-head {
                position: relative;
                line-height: 4rem;
                font-size: 1.2rem;
                background:#fff;
                box-shadow: 0 0 2px 2px rgb(226, 226, 226);
                text-indent: 2rem;
            }

            .person-search {
                position: relative;
                margin:2rem;
                
                i {
                    position: absolute;
                    top:.65rem;
                    left:.5rem;
                    z-index: 1;
                    font-size: 1.6rem;
                    color:#6ebafc;
                }

                input {
                    position: relative;
                    height:2.3rem;
                    width:20%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-indent: 2.5rem;
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
                            background:#57b5e2;
                            border:1px solid #57b5e2;
                            color:#fff;
                            transition: .5s;
                            cursor: pointer;
                        }

                        i {
                            position: relative;
                            top:-.1rem;
                            font-size: 1.3rem;
                            margin-right: .5rem; 
                        }

                        .button:hover {
                            background: #fff;
                            color: #57b5e2;
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

        .person-list-box:hover {
            box-shadow: 0 0 2px 2px rgb(134, 231, 255);
        }
    }

</style>

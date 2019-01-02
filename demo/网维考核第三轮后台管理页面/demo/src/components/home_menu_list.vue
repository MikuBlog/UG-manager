<template>
    
    <div class="role">

        <div class="role-box">

            <div class="role-head">
                菜单列表
            </div>

            <div class="role-button">
                <span @click="handleClick('/home/home_edit_menu','add')">
                    添加菜单
                </span>
            </div>

            <div class="role-search">
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
                        <th>菜单名</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>

                    <tr v-for="items in menuList">
                        <td>{{items.name}}</td>
                        <td>{{items.createtime}}</td>
                        <td>
                            <span class="button" @click="handleClick('/home/home_edit_role')"><i class="fa fa-pencil fa-lg"></i>管理</span>
                            <span class="button" @click="handleClick('/home/home_edit_menu','edit')"><i class="fa fa-pencil fa-lg"></i>编辑</span>
                            <span class="button"><i class="fa fa-trash fa-lg"></i>删除</span>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input type="text" placeholder="搜索菜单名">
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

                // 存放角色列表
                menuList:[]

            }

        },

        methods: {

            // 跳转路由
            handleClick(path,command) {

                if(command == "add") {

                    this.$store.commit('setMenuTitle',"添加菜单")

                }else {

                    this.$store.commit('setMenuTitle',"编辑菜单")

                }

                this.$router.push({path:path})

            },

            // 获取角色列表
            getRoleList() {



            }

        },

        mounted() {

            // 判断角色列表是否存在，如果存在直接使用
            var menuList = this.$store.state.menuLs

            var _this = this

            menuList.forEach(function(value) {

                _this.menuList.push(value)

            })

        }

    }

</script>

<style lang="scss" scoped>

    .role {
        position: relative;
        margin:2rem;

        .role-box {
            position: relative;
            overflow: hidden;
            background:#fff;
            box-shadow:  0 0 2px 2px rgb(226, 226, 226);
            transition: .5s;

            .role-head {
                position: relative;
                line-height: 4rem;
                font-size: 1.2rem;
                background:#fff;
                box-shadow: 0 0 2px 2px rgb(226, 226, 226);
                text-indent: 2rem;
            }

            .role-button {
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

            .role-search {
                position: relative;
                margin-left:2rem;
                
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
                            background:red;
                            border:1px solid red;
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

                        .button:first-of-type {
                            background: #fff;
                            color:#000;
                            border:1px solid #cecece;
                        }

                        .button:nth-of-type(2) {
                            background: #57b5e2;
                            color:#fff;
                            border:1px solid #57b5e2;
                        }

                        .button:first-of-type:hover {
                            box-shadow: 0 0 1px 1px rgb(134, 231, 255);
                        }

                        .button:nth-of-type(2):hover {
                            background:#fff;
                            color:#57b5e2;
                        }

                        .button:last-of-type:hover {
                            background:#fff;
                            color:red;
                        }

                    }

                    tr:first-of-type {
                        background:rgb(240, 240, 240);
                    }

                    input {
                        height:3rem;
                        width: 80%;
                        text-indent: 2rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: 1.2rem;
                    }

                    .behavior {
                        position: relative;
                        overflow: hidden;

                        .behavior-box {
                            position: relative;
                            background: #fafafa;
                            margin:1rem 1rem 3rem 1rem;
                            text-align: left;
                            box-shadow: 0 0 1px 1px rgb(226, 226, 226);

                            .behavior-head {
                                position: relative;
                                text-indent: 1.5rem;
                                border-bottom: 2px solid #5eb2fd;
                            }

                            span {
                                position: relative;
                                display: inline-block;
                                background:#51a841;
                                color:#fff;
                                border:1px solid #51a841;
                                line-height: 2.5rem;
                                padding:.2rem 1rem;
                                margin:1rem 1rem 3rem 1rem;
                                transition: .5s;
                                cursor: pointer;
                            }

                            span:hover {
                                background:#fff;
                                color: #51a841;
                            }
                        }
                    }

                }
            }

        }

        .role-box:hover {
            box-shadow: 0 0 2px 2px rgb(134, 231, 255);
        }
    }

</style>

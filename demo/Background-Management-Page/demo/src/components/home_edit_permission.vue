<template>
    
    <div class="edit-role">

        <div class="edit-role-box">

            <div class="role-head">
                {{editBehavior}}
            </div>

            <div class="role-button">
                <span @click="showBox()" class="button">返回</span>
                <span @click="sendMessage()" class="button">确认</span>
                <span ref="warn" style="color:red;font-size:1.4rem;margin-left:2rem;"></span>
            </div>

            <div class="role-name">
                <span>角色名</span>
                <div>
                    <input type="text" placeholder="请输入角色名" v-model="name">
                </div>
            </div>

        </div>

        <div class="cancel" v-show="isHide">

            <div class="cancel-box">
                <div class="cancel-head">确认放弃编辑角色吗?</div>
                <div class="cancel-button">
                    <span @click="hideBox()">取消</span>
                    <span @click="handleClick('/home/home_permission_list',false)">确认</span>
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
                 *  name:行为名称
                 *  id:行为id
                 */
                allBehaviorList:[],

                // 角色管理标题
                editBehavior:"添加角色",

                // 是否隐藏取消框
                isHide:false,

                // 保存以获取的行为列表
                alreadyHasList:[],

                // 存放行为名称
                name:""

            }

        },

        methods: {

            // 显示取消框
            showBox() {

                this.isHide = true

            },

            // 隐藏取消框
            hideBox() {

                this.isHide = false

            },
            
            // 跳转路由
            handleClick(path) {

                this.$router.push({path:path})

            },

            // 发送请求
            sendMessage() {

                var data = {

                    name:this.name

                }

                var _this = this

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/permission/add",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        _this.$refs.warn.innerText = obj.msg

                    },error() {

                        console.log("发送请求失败")

                    }

                })

            }

        },

        mounted() {


            this.editBehavior = this.$store.state.editBehavior

        }

    }

</script>

<style lang="scss" scoped>

    .edit-role {
        position: relative;
        margin:2rem;

        .edit-role-box {
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
                box-shadow: 0 0 2px 2px rgb(196, 196, 196);
                text-indent: 2rem;
            }

            .role-button {
                position: relative;

                .button {
                    font-size: 1.2rem;
                    margin:2rem .5rem;
                    padding:.5rem 1rem;
                    border-radius: .3rem;
                    cursor: pointer;
                    transition: .5s;
                }

                .button:first-of-type {
                    position: relative;
                    display: inline-block;
                    margin-left:2rem;
                    border:1px solid #d1d1d1;
                }

                span:nth-of-type(2) {
                    position: relative;
                    background:#51a841;
                    border:1px solid #51a841;
                    color:white;
                }

                span:first-of-type:hover {
                    box-shadow: 0 0 2px 2px rgb(134, 231, 255); 
                }

                span:last-of-type:hover {
                    background: #fff;
                    color: #51a841;
                }

            }

            .role-name {
                position: relative;
                font-size: 1.2rem;

                span {
                    position: relative;
                    margin-left: 2rem;
                }

                div {
                    margin:1rem 2rem;
                    
                    input {
                        position: relative;
                        height:3rem;
                        text-indent: 1.5rem;
                        width: 100%;
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
                width:35rem;
                height:8rem;
                background:rgb(240, 240, 240);

                .cancel-head {
                    position: relative;
                    line-height: 4rem;
                    font-size: 1.2rem;
                    text-indent:2rem;
                    background:#fff;
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

        .edit-role-box:hover {
            box-shadow: 0 0 2px 2px rgb(134, 231, 255);
        }
    }

</style>

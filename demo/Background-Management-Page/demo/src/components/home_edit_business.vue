<template>
    
    <div class="edit-role">

        <div class="edit-role-box">

            <div class="role-head">
                {{editBusiness}}
            </div>

            <div class="role-button">
                <span @click="showBox()">返回</span>
                <span @click="sendMessage()">确认</span>
            </div>

            <div class="boxs">

                <div class="role-name">
                    <span>经营类目名:</span>
                    <div>
                        <input type="text" placeholder="请输入经营类目名" v-model="name">
                    </div>
                </div>

                <div class="role-name">
                    <span>经营类目父节点:</span>
                    <div>
                        <select @click="getSelectValue($event)">
                            <option value="emm/emm"></option>
                            <option v-for="items in fatherList" :value="items.idName+'/'+items.id">{{items.name}}</option>
                        </select>
                    </div>
                </div>

            </div>

        </div>

        <div class="cancel" v-show="isHide">

            <div class="cancel-box">
                <div class="cancel-head">确认放弃编辑角色吗?</div>
                <div class="cancel-button">
                    <span @click="hideBox()">取消</span>
                    <span @click="handleClick('/home/home_business_list',false)">确认</span>
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
                editBusiness:"添加经营类目",

                // 是否隐藏取消框
                isHide:false,

                // 保存父节点列表
                fatherList:[],

                // 保存类目名
                name:"",

                // 保存选中的id名
                idName:"",

                // 保存选中的id值
                id:"",

                // 选择确定使用的上传函数
                fName:""

            }

        },

        methods: {

            // 按下确定调用对应的接口
            sendMessage() {

                this[this.fName]()

            },

            // 上传添加类目管理数据
            sendNewMessage() {

                var _this = this

                var data = {}

                data["name"] = this.name

                if((this.id != "" || this.idName != "" ) && this.id != "emm") {

                    data[this.idName] = this.id

                }

                console.log(data)

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/range/add",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        console.log(data)

                        _this.$router.push({path:'/home/home_business_list'})

                    },error() {

                        console.log("数据请求失败")

                    }

                })

            },

            // 上传编辑类目管理数据
            sendEditMessage() {

                var _this = this

                var data = {}

                data[this.$store.state.business.idName] = this.$store.state.business.id

                data["name"] = this.name

                data[this.idName] = this.id

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/range/post",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        console.log(data)

                        _this.$router.push({path:'/home/home_business_list'})

                    },error() {

                        console.log("数据请求失败")

                    }

                })

            },

            // 获取选择元素的值
            getSelectValue(event) {

                var value = event.currentTarget.value

                var valueArray = value.split('/')

                this.idName = valueArray[0]

                this.id = valueArray[1]

            },

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

            // 初始化父节点信息
            initialFatherList(list) {

                var _this = this

                list.forEach(function(value) {

                    _this.fatherList.push(value)

                })

            },

            // 获取所有父节点信息
            getFatherList() {

                var _this = this

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/range/getList",

                    type:"get",

                    success(data) {

                        var obj = JSON.parse(data)

                        var list_1 = []

                        var list_2 = []

                        obj.range.forEach(function(value) {

                            list_1.push({id:value.id,name:value.name,idName:'torang'})

                        })

                        obj.father.forEach(function(value) {

                            list_2.push({id:value.id,name:value.name,idName:'tofather'})

                        })

                        _this.initialFatherList(list_2)

                        _this.initialFatherList(list_1)

                    },error() {

                        console.log("请求失败")

                    }

                })

            }

        },

        mounted() {

            this.editBusiness = this.$store.state.editBusiness

            this.getFatherList()

            if(this.editBusiness == "添加经营类目") {

                this.fName = "sendNewMessage"

            }else {

                this.fName = "sendEditMessage"

            }

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

                span {
                    font-size: 1.2rem;
                    margin:2rem .5rem;
                    padding:.5rem 1rem;
                    border-radius: .3rem;
                    cursor: pointer;
                    transition: .5s;
                }

                span:first-of-type {
                    position: relative;
                    display: inline-block;
                    margin-left:2rem;
                    border:1px solid #d1d1d1;
                }

                span:last-of-type {
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

            .boxs {
                position: relative;
                display: flex;

                .role-name {
                    position: relative;
                    font-size: 1.2rem;
                    flex: 1;

                    span {
                        position: relative;
                        margin-left: 2rem;
                    }

                    div {
                        margin:1rem 2rem;
                        
                        input {
                            position: relative;
                            height:2.5rem;
                            text-indent: 1.5rem;
                            width: 80%;
                        }

                        select {
                            width:80%;
                            height:2.9rem;
                        }
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

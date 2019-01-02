<template>
    
    <div class="business-list">

        <div class="business-box">

            <div class="business-head">
                工单列表
            </div>

            <div class="business-button">
                <span @click="handleClick('/home/home_edit_business','add')">
                    添加经营类目
                </span>
            </div>

            <div class="business-form">

                <div class="business-father" v-for="father in businessList">

                    <div class="father-head">
                        <i class="fa fa-minus fa-lg" @click="showList($event)"></i><span>{{father.fathername}}</span>
                        <div class="button-box">
                            <span class="button" @click="correctBusiness(father.fatherid,'fatherid')"><i class="fa fa-pencil fa-lg"></i>编辑</span>
                            <span class="button" @click="deleteBusiness('fatherid',father.fatherid)"><i class="fa fa-trash fa-lg"></i>删除</span>
                        </div>
                    </div>

                    <div class="boxs">

                        <div class="business-range" v-for="range in father.range">

                            <div class="range-head">
                                <i class="fa fa-minus fa-lg" @click="showList($event)"></i><span>{{range.rangename}}</span>
                                <div class="button-box">
                                    <span class="button" @click="correctBusiness(range.rangid,'rangid')"><i class="fa fa-pencil fa-lg"></i>编辑</span>
                                    <span class="button" @click="deleteBusiness('rangid',range.rangid)"><i class="fa fa-trash fa-lg"></i>删除</span>
                                </div>
                            </div>

                            <div class="boxs">
                                <div class="business-son" v-for="son in range.son">

                                    <div class="son-head">
                                        <i></i><span class="head">{{son.name}}</span>
                                        <div class="button-box">
                                            <span class="button" @click="correctBusiness(son.id,'id')"><i class="fa fa-pencil fa-lg"></i>编辑</span>
                                            <span class="button" @click="deleteBusiness('id',son.id)"><i class="fa fa-trash fa-lg"></i>删除</span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

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

                /**
                 *  fatherid:父级id
                 *  fathername:父级名称
                 *  range:[{
                 *      rangid: 范围id
                 *      rangename: 范围名称
                 *      son:[{
                 *          id: 子级id
                 *          name: 子级名称
                 *          father: 子级对应rangid
                 *      }]
                 *  }]
                 */
                businessList:[]

            }

        },

        methods: {

            // 修改经营范围
            correctBusiness(id,idName) {

                var obj = {

                    id:id,

                    idName:idName

                }

                this.$store.commit('setBusiness',obj)

                this.$store.commit('setBusinessTtile',"编辑经营类目")

                this.$router.push({path:"/home/home_edit_business"})

            },

            // 删除该经营节点
            deleteBusiness(idName,id) {

                var _this = this

                var data = {}

                data[idName] = id

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Range/delete",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        _this.getBusinessList()

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            // 跳转路由
            handleClick(path,command,id) {

                if(command == "add") {

                    this.$store.commit('setBusinessTtile',"添加经营类目")

                }else {

                    this.$store.commit('setBusinessTtile',"编辑经营类目")

                }

                this.$router.push({path:path})

            },

            // 显示隐藏经营类目列表
            showList(event) {

                var element = event.currentTarget

                var nextElement = event.currentTarget.parentNode.nextElementSibling

                if(nextElement.isHide) {

                    element.classList.remove('fa-plus')

                    element.classList.add('fa-minus')

                    nextElement.style.height = "auto"

                    nextElement.isHide = false

                }else {

                    element.classList.add('fa-plus')

                    element.classList.remove('fa-minus')

                    nextElement.style.height = 0

                    nextElement.isHide = true

                }

            },

            // 初始化经营类目列表
            initialBusinessList(list) {

                var _this = this

                this.businessList.length = 0

                list.forEach(function(value) {

                    _this.businessList.push(value)

                })

            },

            // 请求经营类目列表
            getBusinessList() {

                var _this = this

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Range/showList",

                    type:"get",

                    success(data) {

                        var obj = JSON.parse(data)

                        var list = obj.arr

                        _this.initialBusinessList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

            }

        },

        mounted() {

            this.getBusinessList()

            // 给所有范围列表加上隐藏标记
            setTimeout(function() {

                var range = document.querySelectorAll('.business-range')

                var son = document.querySelectorAll('.business-son')

                range.forEach(function(value) {

                    value.isHide = false

                })

                son.forEach(function(value) {

                    value.isHide = false

                })

            })

        }

    }

</script>

<style lang="scss" scoped>

    .business-list {
        position: relative;
        margin:2rem;

        .business-box {
            position: relative;
            overflow: hidden;
            background:#fff;
            box-shadow:  0 0 2px 2px rgb(226, 226, 226);
            transition: .5s;

            .business-head {
                position: relative;
                line-height: 4rem;
                font-size: 1.2rem;
                background:#fff;
                box-shadow: 0 0 2px 2px rgb(226, 226, 226);
                text-indent: 2rem;
            }

            .business-button {
                position: relative;
                margin-top: 2rem;

                span {
                    position: relative;
                    text-align: center;
                    padding: .7rem 1rem;
                    display: inline-block;
                    margin: 1.5rem 1rem 1.5rem 1rem;
                    border: 1px solid rgb(231, 231, 231);
                    font-size: 1.2rem;
                    box-shadow: 0 0 1px 1px rgb(243, 243, 243);
                    cursor: pointer;
                    transition: .5s;
                }

                span:first-of-type {
                    margin-left: 2rem; 
                }

                span:hover {
                    box-shadow: 0 0 1px 1px #59b5e1;
                }

            }

            .business-form {
                position: relative;
                font-size: 1.2rem;
                margin:2rem;
                padding: 1rem;
                box-shadow: 0 0 1px 1px rgb(226, 226, 226);

                .boxs {
                    position: relative;
                    overflow: hidden;
                }

                .business-father {
                    position: relative;
                    color:#727272;
                    
                    .father-head {
                        position: relative;
                        line-height: 4rem;
                        background:#f4f4f4;
                        margin:1rem 0;

                        .fa-minus,.fa-plus {
                            color:#2ec1e6;
                            margin:0 1rem;
                        }
                    }
                }

                .business-range {
                    position: relative;
                    overflow: hidden;

                    .range-head {
                        position: relative;
                        line-height: 4rem;
                        background:#f4f4f4;
                        margin:1rem 0;
                        margin-left:5rem;

                        .fa-minus,.fa-plus {
                            color:#2ec1e6;
                            margin:0 1rem;
                        }
                    }

                    .business-son {
                        position: relative;
                        overflow: hidden;

                        .son-head {
                            position: relative;
                            line-height: 4rem;
                            background:#f4f4f4;
                            margin:1rem 0;
                            margin-left:10rem;

                            .head {
                                position: relative;
                                margin-left:1.5rem;
                            }
                        }
                    }
                }

                .button-box {
                    position: absolute;
                    top:0rem;
                    right:1rem;

                    .button {
                        position: relative;
                        text-align: center;
                        padding: .2rem .5rem;
                        display: inline-block;
                        border: 1px solid #59b5e1;
                        color:#fff;
                        background:#59b5e1;
                        font-size: 1.2rem;
                        line-height: 2rem;
                        cursor: pointer;
                        transition: .5s;

                        i {
                            margin-right:.5rem;
                        }
                    }

                    .button:last-of-type {
                        background:red;
                        border:1px solid red;
                    }

                    .button:hover {
                        background:#fff;
                        color:#59b5e1;
                    }

                    .button:last-of-type:hover {
                        background:#fff;
                        color:red;
                    }
                }
            }
        }
    }

</style>

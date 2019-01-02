<template>
    
    <div class="home">

        <div class="home-background">
            <div class="home-background-image">
                <img src="../images/theme.png">
            </div>
            <div class="home-background-head">
                UG管家平台
            </div>
            <i class="fa fa-bars fa-lg" @click="hideMenu()"></i>
        </div>

        <div class="home-box">

            <div class="left-list">

                <ul>
                    <li v-for="items in menuList">

                        <div class="menu-title" @click="hideChildList($event)">
                            <i class="fa fa-file-text fa-lg"></i>
                            <span>{{items.title}}</span>
                            <i class="fa fa-angle-up fa-lg up-and-down"></i>
                        </div>

                        <div class="menu-childlist-box">
                            <div v-for="item in items.childList" class="menu-childlist" @click="handleClick(item.url,items.title,item.title)">
                                <span>{{item.title}}</span>
                            </div>
                        </div>

                    </li>
                </ul>

            </div>

            <div class="box">

                <div class="parent-menu">
                    {{menuTitle}}
                </div>

                <div class="child-menu">
                    {{menuChildTitle}}
                </div>

                <router-view></router-view>

            </div>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                // 存放菜单列表
                menuList:[],

                // 存放菜单标题
                menuTitle:"商户信息",

                // 存放子菜单标题
                menuChildTitle:"角色管理"

            }

        },

        methods: {

            // 跳转路由
            handleClick(url,menuTitle,menuChildTitle) {

                this.$router.push({path:url})

                this.menuTitle = menuTitle

                this.menuChildTitle = menuChildTitle

            },

            // 隐藏菜单栏
            hideMenu() {

                var menu = document.querySelector('.left-list')

                var box = document.querySelector('.box')

                if(menu.isHide == false) {

                    menu.style.marginLeft = "-20rem"

                    box.style.marginLeft = 0

                    menu.isHide = true

                }else {

                    menu.style.marginLeft = 0

                    box.style.marginLeft = "20rem"

                    menu.isHide = false

                }
                
            },

            // 隐藏子菜单
            hideChildList(event) {

                // 获取父菜单的相邻元素
                var nextElement = event.currentTarget.nextElementSibling

                // 获取事件源元素类名
                var element = event.currentTarget

                if(nextElement.isHide == false) {

                    nextElement.style.height = 0

                    element.lastElementChild.classList.remove('fa-angle-up')

                    element.lastElementChild.classList.add('fa-angle-down')

                    nextElement.isHide = true

                }else {

                    nextElement.style.height = "auto"

                    element.lastElementChild.classList.remove('fa-angle-down')

                    element.lastElementChild.classList.add('fa-angle-up')

                    nextElement.isHide = false

                }

            },

            // 请求菜单数据
            getMenuList() {

                $.ajax({

                    url:"",

                    type:"get",

                    success(data) {

                        // 请求成功处理数据
                            
                    },error() {
                        
                        // 请求失败处理

                    }

                })

            }

        },

        mounted() {

            // 判断菜单是否存在，如果存在就使用该菜单
            var menuList = this.$store.state.menuList

            var _this = this

            if(menuList.length != 0) {

                menuList.forEach(function(value) {

                    _this.menuList.push(value)

                })

            }else {

                this.getMenuList()

            }

            // 为子菜单增加隐藏标志
            setTimeout(function() {

                var childlist = document.querySelectorAll('.menu-childlist-box')

                childlist.forEach(function(value) {

                    value.isHide = false

                })

            })

            // 获取菜单栏对象
            var menu = document.querySelector('.left-list')

            // 为菜单栏增加隐藏标志
            menu.isHide = false

        }

    }

</script>

<style lang="scss">

    .home {

        position: relative;
        height:100%;

        .home-background {
            position: relative;
            height:8rem;
            background:#2ec2e7;
            line-height: 8rem;

            .home-background-image {
                position: relative;
                display: inline-block;
                height:8rem;
                width:8rem;
                margin-left: 2rem; 

                img {
                    vertical-align: middle;
                    width: 50%;
                    height: 50%;
                }
            }

            .home-background-head {
                position: relative;
                left:-4rem;
                color:#eaf8fc;
                display: inline-block;
                vertical-align: middle;
                font-size: 2.5rem;
            }

            i {
                position: relative;
                top:.15rem;
                left:-3.3rem;
                font-size: 2.5rem;
                color:#eaf8fc;
                vertical-align: middle;
                cursor: pointer;
                transition: .5s;
            }

            i:hover {
                color:#92e9ff;
            }

        }

        .home-box {
            position: relative;
            background:rgb(243, 243, 243);
            overflow: hidden;

            .left-list {
                position: relative;
                left:0;
                float: left;
                width:20rem;
                overflow: hidden;
                transition: .5s;

                li {
                    position: relative;
                    overflow: hidden;
                    
                    .menu-title {
                        position: relative;
                        font-size: 1.3rem;
                        line-height: 4rem;
                        background:#fefefe;

                        i:first-of-type {
                            position: relative;
                            top:-.1rem;
                            left:1.5rem;
                        }

                        i:last-of-type {
                            position: absolute;
                            right:1rem;
                            top:1.3rem;
                        }

                        span {
                            position: relative;
                            margin-left:2rem;
                        }

                    }

                    .menu-childlist {
                        position: relative;
                        line-height: 4rem;
                        font-size: 1.3rem;
                        background:#fafafa;
                        cursor: pointer;
                        transition: .2s;

                        span {
                            position: relative;
                            margin-left: 4rem; 
                        }

                    }

                    .menu-childlist:hover {
                        color:#fff;
                        background:rgb(134, 231, 255); 
                    }

                }
            }

            .box {
                position: relative;
                margin:0rem 0rem 0 20rem;
                transition: .5s;

                .parent-menu,.child-menu{
                    position: relative;
                    line-height: 4rem;
                    font-size: 1.3rem;
                }

                .parent-menu {
                    background:#e9e9e9;
                    text-indent: 1rem;
                    font-size: 1.4rem;
                    line-height: 4.5rem;
                }

                .child-menu {
                    background:#fff;
                    text-indent: 3rem;
                }
            }
            
        }

    }

</style>

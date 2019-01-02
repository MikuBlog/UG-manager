<template>

    <div class="home">

        <div class="home-box">

            <div class="home-box-head">
                UG管家
            </div>

            <div class="home-box-background">

                <swiper :options="swiperOption"  ref="mySwiper">
                    <!-- 这部分放你要渲染的那些内容 -->
                    <swiper-slide>
                        <img src="../../images/user/homepic.png" alt="">
                    </swiper-slide>
                    <swiper-slide>
                        <img src="../../images/user/homepic2.png" alt="">
                    </swiper-slide>
                    <swiper-slide>
                        <img src="../../images/user/homepic3.png" alt="">
                    </swiper-slide>
                    <!-- 这是轮播的小圆点 -->
                    <div class="swiper-pagination "  slot="pagination"></div>
                </swiper>

            </div>

            <div class="home-box-button">
                <div class="button-box" @click="forwardTo('/home_order_photo')">
                    <div class="button-box-icon first">
                        <i class="fa fa-mobile-phone fa-lg"></i>
                    </div>
                    <div class="button-box-content">手机维修</div>
                </div>
                <div class="button-box" @click="forwardTo('/home_order_photo')">
                    <div class="button-box-icon second">
                        <i class="fa fa-desktop fa-lg"></i>
                    </div>
                    <div class="button-box-content">电脑维修</div>
                </div>
                <div class="button-box" @click="forwardTo('/home_order_photo')">
                    <div class="button-box-icon third">
                        <i class="fa fa-shopping-basket fa-lg"></i>
                    </div>
                    <div class="button-box-content">家电维修</div>
                </div>
            </div>

            <div class="home-box-help">

                <div class="help-box" @click="forwardTo('/home_order_photo')">
                    <img src="../../images/user/homepeople.png" class="first">
                </div>

                <div class="help-box">
                    <img src="../../images/user/homeperson.png" class="second">
                </div>

            </div>

            <div class="home-box-background-second">
                <img src="../../images/user/homespeed.png" alt="">
            </div>

            <div class="home-show-message">

                <div class="message-box">
                    <img src="../../images/user/homeconsultation.png">
                    <div class="message-box-content">
                        免费咨询
                    </div>
                </div>

                <div class="message-box">
                    <img src="../../images/user/homeguarantee.png">
                    <div class="message-box-content">
                        维修保障
                    </div>
                </div>

                <div class="message-box">
                    <img src="../../images/user/homeprice.png">
                    <div class="message-box-content">
                        价格公道
                    </div>
                </div>

            </div>

            <div class="home-bottom-button">

                <div class="button-box" @click="forwardTo('/home_order_photo')">
                    <i class="fa fa-gavel fa-lg"></i>
                    <div class="button-box-content">
                        我要维修
                    </div>
                </div>

                <div class="button-box" @click="forwardTo('/home_order_list')">
                    <i class="fa fa-file-text fa-lg"></i>
                    <div class="button-box-content">
                        工单列表
                    </div>
                </div>

                <div class="button-box" @click="forwardTo('/home_company_list')">
                    <i class="fa fa-telegram fa-lg"></i>
                    <div class="button-box-content">
                        周边服务
                    </div>
                </div>

                <div class="button-box" @click="forwardTo('/home_personal_center')">
                    <i class="fa fa-user fa-lg"></i>
                    <div class="button-box-content">
                        个人中心
                    </div>
                </div>

            </div>

        </div>

    </div>

</template>

<script>

    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {

        components: {
			swiper,
			swiperSlide
        },
        
        data() {

            return {

                swiperOption: {
                    //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                    loop: true,
                    notNextTick: true,
                    pagination: '.swiper-pagination',
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    autoplay: {
                        delay: 3000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                    //滑动速度
                    speed:1200,
                    paginationClickable: true,
                    spaceBetween: 30,
                    //左右点击
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    //分页器设置         
                    pagination: {
                        el: '.swiper-pagination',
                        clickable :true
                    },
                    onSlideChangeEnd: swiper => {
                        //这个位置放swiper的回调方法
                        this.page = swiper.realIndex+1;
                        this.index = swiper.realIndex;
                    }
                },
                
                // 存放工单列表
                orderList:""

            }

        },

        methods: {

            // 检查工单中是否还有待支付项
            checkOrderList() {

                var list = this.$store.state.orderList

                var isHave = false

                list.forEach(function(value) {

                    if(value.workState == "新建单")

                        isHave = true

                })

                if(isHave) {

                    this.$router.push({path:"/home_order_pay_tips"})

                }else {

                    this.$store.commit('getCurOrderDetail',"")

                    this.$store.commit('getCurPosition',"")

                    this.$store.commit('getType',"")

                    this.$router.push({path:"/home_order_photo"})

                }

            },

            // 跳转路由
            forwardTo(path) {

                if(path == "/home_order_photo") {

                    this.checkOrderList()

                    return

                }

                this.$router.push({path:path})

            },

        },

        //定义这个sweiper对象
		computed: {
 
		    swiper() {
		      return this.$refs.mySwiper.swiper;
            }
            
        },
        
        mounted() {

            var _this = this


            var data = {

                session_id:this.$store.state.session_id

            }

            $.ajax({

                url:"http://118.24.136.82/index.php/index/Mob_Work/showList",

                type:"post",

                data:JSON.stringify(data),

                success(data) {

                    var obj = JSON.parse(data)

                    _this.$store.commit('getOrderList',obj.worklist)

                    _this.orderList = obj.worklist

                },error() {

                    console.log("请求数据失败")

                }

            })

        }

    }

</script> 

<style lang="scss">

    .home {
        position: relative;
        background:#f4f4f4;

        .home-box {
            position: relative;
            text-align: center;

            .home-box-head {
                line-height: 70px;
                font-size: 20px;
                text-align: left;
                text-indent: 30px;
                background:#fff;
            }

            .home-box-background {
                position: relative;

                img {
                    width:100%;
                    height:auto;
                }
            }

            .home-box-button {
                display: flex;
                position: relative;
                top:-3px;
                background:#fff;
            
                .button-box {
                    position: relative;
                    margin:15px 0;
                    flex:1;

                    .button-box-icon {
                        position: relative;
                        display: inline-block;
                        width:80px;
                        height:80px;
                        border-radius: 50%;
                    }

                    i {
                        font-size: 30px;
                        line-height: 80px;
                        color:white;
                    }

                    .fa-mobile-phone {
                        font-size: 45px;
                    }

                    .button-box-content {
                        margin-top:15px;
                        font-size: 15px;
                        font-weight: bold;
                    }
                    .first {
                        background:#6799fd;
                    }
                    .second {
                        position: relative;
                        background:#ff9866;

                        i {
                            position: relative;
                            top:2px;
                        }
                    }
                    .third {
                        background:#9999cb;
                    }
                }
            }

            .home-box-help {
                position: relative;
                margin-top:5px;
                background-color:#fff;
                display: flex;

                .help-box {
                    position: relative;
                    height:100px;
                    margin:10px 5px;
                    flex:1;
                    line-height: 100px;

                    img {
                        position: relative;
                        vertical-align: middle;
                        height:80%;
                    }
                }
            }

            .home-box-background-second {
                position: relative;
                margin-top:8px;

                img {
                    width:100%;
                    height:auto;
                }
            }

            .home-show-message {
                position: relative;
                top:-5px;
                background:#fff;
                display: flex;
                justify-content: space-around;

                .message-box {
                    position: relative;
                    margin:10px 0;
                    flex:1;

                    img {
                        width:40px;
                    }

                    .message-box-content {
                        position: relative;
                        color:#a7a6a6;
                    }
                }
            }

            .home-bottom-button {
                position: relative;
                background:#fff;
                display: flex;
                justify-content: space-around;
                color:#a7a6a6;

                .button-box {
                    position: relative;
                    margin:20px 0 10px 0;

                    i {
                        font-size: 30px;
                    }

                    div {
                        position: relative;
                        font-size: 13px;
                        margin-top:8px;
                    }
                }
            }

        }

    }

</style>

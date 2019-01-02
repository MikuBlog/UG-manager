<template>
    
    <div class="company">

        <div class="company-box">

            <div class="company-box-head">
                <div @click="backTo()">
                    <i class="fa fa-angle-left fa-lg"></i><span>周边服务</span>
                </div>
            </div>

            <div class="company-box-button">
                <div class="button" @click="showCommentBox(true)">
                    距离排序
                </div>
                <div class="button" @click="forwardTo('/home_business_filter')">
                    类目筛选
                </div>
            </div>

            <div class="company-box-list">
                <ul>
                    <li v-for="items in companyList" @click="forwardTo('/home_company_detail',items)">
                        <div class="company-logo">
                            <img src="../../images/user/theme.png">
                        </div>
                        <div class="content">
                            <div class="company-name">{{items.company}}</div>
                            <div class="company-position">{{items.address}}</div>
                        </div>
                        <div class="company-distance"><span class="distance">{{items.distance}}</span>km</div>
                    </li>
                </ul>
            </div>

            <div class="company-bottom-button">

                <div class="button-box" @click="forwardTo('/home_order_photo')">
                    <i class="fa fa-gavel fa-lg"></i>
                    <div class="button-box-content">
                        我要维修
                    </div>
                </div>

                <div class="button-box" @click="forwardTo('/home_order_list')">
                    <i class="fa fa-file-text fa-lg" @click="forwardTo('/home_order_list')"></i>
                    <div class="button-box-content">
                        工单列表
                    </div>
                </div>

                <div class="button-box" @click="forwardTo('/home_compant_list')">
                    <i class="fa fa-telegram fa-lg" @click="forwardTo('/home_company_list')"></i>
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

            <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">

                <mt-picker :slots="slots"  :visible-item-count="5" :show-toolbar="true"  ref="picker" value-key="cName">
                        <span @click="showCommentBox(false)">取消</span>
                        <span @click="handleConfirm">确认</span>
                </mt-picker>

            </mt-popup>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                /**
                 *  distance:距离
                 *  company:名称
                 *  address:地址
                 *  contactPhone:联系电话
                 *  range:[{
                 *      fatherid:父类id
                 *      fathername:父类名称
                 *      range:[{
                 *          rangid:子类id
                 *          rangeName:子类名称
                 *      }] 
                 *  }]
                 */
                companyList:[],

                // 排序条件
                selectCondition:"",

                // 筛选分发表
                slots: [

                    {
                        flex: 1,

                        values: ["距离排序","名称排序"],

                        className: 'slot1',

                        textAlign: 'center',

                    }

                ],

                // 显示筛选表
                popupVisible:false,

                position:"",

            }

        },

        methods: {

            // 显示筛选表
            showCommentBox(command) {

                if(command) {

                    this.popupVisible = true

                }else {

                    this.popupVisible = false

                }

            },

            // 返回上一页 
            backTo() {

                this.$router.go(-1)

            },

            // 跳转路由
            forwardTo(path,items) {

                if(path == '/home_company_detail') {

                    this.$store.commit('getCompanyDetail',items)

                }

                this.$router.push({path:path})

            },

            // 获取排序条件
            handleConfirm () {

                this.selectCondition = this.$refs.picker.getValues()[0]

                this.popupVisible = false

            },

            initialCompanyList(list) {

                var _this = this

                this.companyList.length = 0

                list.forEach(function(value) {

                    _this.companyList.push(value)

                })

            },

            addressDetail(){ //获取地理位置 
                var self = this; 
                //全局的this在方法中不能使用，需要重新定义一下
                var geolocation = new BMap.Geolocation(); 
                //调用百度地图api 中的获取当前位置接口
                geolocation.getCurrentPosition(function(r){ if(this.getStatus() == BMAP_STATUS_SUCCESS){ 
                    //获取当前位置经纬度
                    var myGeo = new BMap.Geocoder();

                    myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result){ 
                        
                        if (result){

                            self.position = result.addressComponents.province+result.addressComponents.city+result.addressComponents.district+result.addressComponents.street

                            var data = {

                                addressA:self.position

                            }

                            $.ajax({

                                url:"http://118.24.136.82/index.php/index/Distance/index",

                                type:"post",

                                data:JSON.stringify(data),

                                success(data) {

                                    var obj = JSON.parse(data)

                                    var list = obj.total

                                    self.initialCompanyList(list)

                                },error() {

                                    console.log("请求失败")

                                }

                            })

                    }});
                } 
                });
            },

        },

        mounted() {

            this.addressDetail()

        }

    }

</script>

<style lang="scss">

    .company {
        position: relative;
        background:#f4f4f4;
        overflow: hidden;

        .company-box {
            position: relative;
            text-align: left;
            overflow: hidden;

            .company-box-head {
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

            .company-box-button {
                position: fixed;
                width:100%;
                z-index:1;
                top:70px;
                line-height: 60px;
                font-size: 18px;
                text-align: center;
                background:#f4f4f4;
                display: flex;

                .button {
                    flex:1;
                    color:#7b7b7b;
                    border:1px solid #e6e6e6;
                }

                .button:first-of-type {
                    border-left:none;
                }

                .button:last-of-type {
                    border-right:none;
                }
            }

            .company-box-list {
                position: relative;
                overflow: hidden;
                margin-top:130px;

                li {
                    position: relative;
                    background:#fff;
                    padding:10px 0;
                    text-align: left;
                    border-bottom: 1px solid #dfdfdf;

                    .company-logo {
                        position: relative;
                        display: inline-block;
                        overflow: hidden;
                        width:50px;
                        height:50px;
                        border:1px solid #aaaaaa;
                        margin-left:15px;
                        line-height: 50px;

                        img {
                            vertical-align: middle;
                            width:100%;
                        }
                    }

                    .content {
                        position: relative;
                        top:-10px;
                        left:10px;
                        display: inline-block;
                        font-size: 17px;

                        .company-name {

                            position: relative;
                            top:10px;
                            font-size: 17px;

                        }

                        .company-position {

                            position: relative;
                            margin-top:15px;
                            top:5px;
                            font-size: 15px;
                            color:#a7a6a6;

                            span {
                                margin-right:5px;
                            }
                        }
                    }

                    .company-distance {
                        position: absolute;
                        right:10px;
                        top:10px;
                        color:#9f9f9f;

                        .distance {
                            position: relative;
                            margin-right:3px;
                        }
                    }

                }

                li:last-of-type {
                    margin-bottom: 10rem;
                }
            }

            .company-bottom-button {
                position: fixed;
                text-align: center;
                width:100%;
                bottom:0;
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

            .mint-popup-bottom {
                width:100%;
                
                .picker-toolbar {
                    line-height: 40px;

                    span:first-of-type {
                        position: absolute;
                        left:15px;
                    }

                    span:last-of-type {
                        position: absolute;
                        right:15px;
                        color:#48bc4b;
                    }
                }

            }

        }
    }

</style>

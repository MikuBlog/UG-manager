<template>
    
    <div class="detail">

        <div class="detail-box">

            <div class="detail-head">
                商户详情
            </div>

            <div class="detail-button">
                <span @click="handleClick('/home/company_edit_company')">
                    编辑信息
                </span>
                <span>
                    绑定微信
                </span>
                <span @click="handleClick('/home/company_edit_password')">
                    修改密码
                </span>
            </div>

            <div class="detail-form">

                <div class="detail-company box">
 
                    <div class="detail-company-head head">
                        公司
                    </div>

                    <div class="detail-company-mes">

                        <div class="detail-company-mark">
                            <span>公司标志:</span>
                            <img :src="companyDetail.logoUrl">
                        </div>

                        <div class="detail-company-loginName">
                            <span>登录名:</span><span>{{companyDetail.userName}}</span>
                        </div> 

                        <div class="detail-company-name">
                            <span>公司名:</span><span>{{companyDetail.name}}</span>
                        </div>  

                        <div class="detail-company-type">
                            <span>类型:</span><span>{{companyDetail.type}}</span>
                        </div>  

                        <div class="detail-company-comment">
                            <span>评价:</span><span>{{companyDetail.score}}</span>
                        </div>   

                        <div class="detail-company-range">
                            <span>服务范围:</span><span v-for="items in range"  class="detail-company-range-button">{{items}}</span>
                        </div>   

                        <div class="detail-company-position">
                            <span>公司地址:</span>
                            <div>
                                <div>{{companyDetail.address}}</div>
                            </div>
                        </div>  

                    </div>

                </div>

                <div class="detail-contact box">

                    <div class="detail-contact-head head">
                        联系人
                    </div>

                    <div class="detail-contact-identify">

                        <span>身份证:</span>

                        <div class="detail-contact-identify-image">
                            <img :src="companyDetail.idFrontUrl">
                            <img :src="companyDetail.idBackUrl">
                        </div>
                        
                    </div>

                    <div class="detail-contact-name">
                        <span>联系人姓名:</span><span>{{companyDetail.contactName}}</span>
                    </div>

                    <div class="detail-contact-phone">
                        <span>联系人电话:</span><span>{{companyDetail.contactPhone}}</span>
                    </div>

                    <div class="detail-contact-identifyNumber">
                        <span>身份证号码:</span><span>{{companyDetail.idCard}}</span>
                    </div>

                </div>

                <div class="detail-server box">

                    <div class="detail-server-head head">
                        服务详情
                    </div>

                    <div class="detail-server">
                        <span>详情图片:</span>
                        <div class="detail-server-image">
                            <img :src="companyDetail.serviceUrl" alt="">
                        </div>
                    </div>

                </div>

                <div class="detail-license box">

                    <div class="detail-license-head head">
                        营业执照
                    </div>

                    <div>
                        <span>营业执照:</span>
                    </div>

                    <div class="detail-license-image">
                        <img :src="companyDetail.licenseUrl">
                    </div>

                    <div>
                        <span>同业社会信用代码:</span><span>{{companyDetail.code}}</span>
                    </div>

                </div>

                <div class="detail-wx box">

                    <div class="detail-wx-head head">
                        微信
                    </div>

                    <div>
                        <span>微信头像:</span>
                    </div>

                    <div class="detail-wx-image">
                        <img src="https://mikuimg.oss-cn-shenzhen.aliyuncs.com/UG%E7%AE%A1%E5%AE%B6/images/head.jpg">
                    </div>

                    <div>
                        <span>微信昵称:</span><span>嘿嘿嘿</span>
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
                 *  address:公司地址
                 *  code:统一社会代码
                 *  contactName:联系人名称
                 *  contactPhone:联系电话
                 *  id:公司id
                 *  idBackUrl:身份证背面
                 *  idFrontUrl:身份证正面
                 *  licenseUrl:营业执照
                 *  logoUrl:公司logo
                 *  serviceUrl:服务详情
                 *  range:经营范围
                 *  state:公司状态
                 *  type:公司类型
                 *  userName:用户名
                 *  userPassword:用户密码
                 *  score:评价
                 */
                companyDetail:"",

                // 存放营业范围
                range:[]

            }

        },

        methods: {

            // 跳转路由
            handleClick(path) {

                this.$store.commit('setCompanyDetail',this.companyDetail)

                this.$router.push({path:path})

            },

            // 请求公司信息
            getCompanyDetail() {

                var _this = this

                var data = {

                    session_id:this.$store.state.session.id

                }

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Login_Company/showList",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        var arr = obj.company.range.split(',')

                        arr.forEach(function(value) {

                            _this.range.push(value)

                        })

                        _this.companyDetail = obj.company

                    },error() {

                        console.log("请求失败")

                    }

                })

            }

        },

        mounted() {

            this.getCompanyDetail()

        }

    }

</script>

<style lang="scss">

    .detail {
        position: relative;
        margin:2rem;

        .detail-box {
            position: relative;
            overflow: hidden;
            background:#fff;
            box-shadow:  0 0 2px 2px rgb(226, 226, 226);
            transition: .5s;
        
            .detail-head {
                position: relative;
                line-height: 4rem;
                font-size: 1.2rem;
                background:#fff;
                box-shadow: 0 0 2px 2px rgb(226, 226, 226);
                text-indent: 2rem;
            }

            .detail-button {
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

            .detail-form {
                position: relative;
                font-size: 1.2rem;
                margin:2rem;
                text-indent: 2rem;
                line-height: 3.5rem;
                border:1px solid #d3d3d3;
                box-shadow: 0 0 1px 1px rgb(226, 226, 226);

                .head {
                    position: relative;
                    margin:1rem 0;
                    border:1px solid #d3d3d3;
                    box-shadow: 0 0 1px 1px rgb(226, 226, 226);
                }

                .detail-company-range {
                    position: relative;

                    .detail-company-range-button {
                        display: inline-block;
                        text-align: center;
                        text-indent: 0;
                        padding:0 1rem;
                        line-height: 2.5rem;
                        border-radius: .5rem;
                        color:white;
                        background:#60b2fd;
                    }
                }

                .head:first-of-type {
                    margin:0;
                }

                .detail-company-position {
                    position: relative;

                    div {
                        position: relative;
                        top: -1.7rem;
                        margin-left: 3.5rem; 
                    }

                }

                span {
                    position: relative;
                    margin:0 .5rem;
                }

                img {
                    vertical-align: top;
                    width:auto;
                    height: 7rem;
                    margin: 1rem 0 1rem 6rem;
                }

                .box {
                    margin:0;
                }

                .box:hover {
                    box-shadow: 0 0 2px 2px rgb(134, 231, 255);
                }

            }

        }

        .detail-box:hover {
            box-shadow: 0 0 2px 2px rgb(134, 231, 255);
        }
    }

</style>

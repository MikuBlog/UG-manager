<template>
    
    <div class="register-number">
        <div class="register-box">

            <div class="register-head">
                注册用户量
            </div>

            <div class="register-time-box">
                <div>
                    <el-date-picker
                    v-model="date"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                    <span class="button" @click="getRegisterAmount()">查询</span>
                </div>
            </div>

            <vue-highcharts :options="options" ref="lineCharts"></vue-highcharts>

        </div>
    </div>

</template>

<script>

    import VueHighcharts from 'vue2-highcharts'

    export default {

        data() {
            return{
                date:"",
                options: {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: '活跃用户量'
                },
                subtitle: {
                    text: 'Source: WorldClimate.com'
                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    title: {
                    text: '人数(/人)'
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                    }
                },
                series: []
                }
            }
        },

        components: {
            VueHighcharts
        },


        methods: {

            setXBar(list) {

                let lineCharts = this.$refs.lineCharts;

                var array_1 = []

                var array_2 = []

                list.forEach(function(value) {

                    array_1.push(value.num)

                    array_2.push(value.date)

                })

                lineCharts.removeSeries()

                lineCharts.addSeries({name:"用户注册量",data:array_1})

                lineCharts.getChart().xAxis[0].setCategories(array_2);

            },
            // 请求用户注册量
            getRegisterAmount() {

                var thisDate = new Date()

                var _this = this

                var DateA = {

                    year:thisDate.getFullYear(),

                    month:thisDate.getMonth()+1,

                    date:1

                }

                var DateB = {

                    year:thisDate.getFullYear(),

                    month:thisDate.getMonth()+1,

                    date:new Date(thisDate.getFullYear(),thisDate.getMonth()+1,0).getDate()

                }

                if(this.date == "") {

                    var data = {

                         timea:DateA.year+"-"+DateA.month+"-"+DateA.date,

                         timeb:DateB.year+"-"+DateB.month+"-"+DateB.date

                    }

                }else {

                    var data = {

                        timea:this.date[0],

                        timeb:this.date[1]

                    }

                }

                $.ajax({

                    url:"http://118.24.136.82/index.php/index/Total/showactivenum",

                    type:"post",

                    data:JSON.stringify(data),

                    success(data) {

                        var obj = JSON.parse(data)

                        _this.setXBar(obj.register)

                    },error() {

                        console.log("请求失败")

                    }

                })
            }

        },

        mounted() {
            
            this.getRegisterAmount()

        }
        
    }

</script>

<style lang="scss">

    .register-number {
        position: relative;
        margin:2rem;
        
        .register-box {
            position: relative;
            overflow: hidden;
            background:#fff;
            box-shadow:  0 0 2px 2px rgb(226, 226, 226);
            transition: .5s;

            .register-head {
                position: relative;
                line-height: 4rem;
                font-size: 1.2rem;
                background:#fff;
                box-shadow: 0 0 2px 2px rgb(226, 226, 226);
                text-indent: 2rem;
                margin-bottom: 2rem;
            }

            .register-time-box {
                position: relative;
                font-size: 1.3rem;
                text-align: right;
                margin:5rem 1.5rem;
            }

            .button {
                position: relative;
                padding: .5rem 1rem;
                margin: 0 1rem;
                background:#57b4e1;
                border:2px solid #57b4e1;
                border-radius: .3rem;
                color:#fff;
                cursor: pointer;
                transition: .5s;
                font-size: 1.2rem;
            }

            .button:hover {
                color:#57b4e1;
                background:#fff;
            }

            .highcharts-container  {
                width: 100%;
            }
        }
    }

</style>

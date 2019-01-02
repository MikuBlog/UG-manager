<template>
  <div class="amap-page-container">
      <div class="map-list-head">
        <div @click="backTo()">
          <i class="fa fa-angle-left fa-lg"></i><span>选择地址信息</span>
        </div>
      </div>
    <div :style="{width:'100%',height:'300px'}">
    <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
          <el-amap-marker v-for="marker in markers" :position="marker" ></el-amap-marker>
      </el-amap>
    </div>

    <div class="map-detail" @click="handleClick('yourself')">
      <div class="map-content-head">
        {{result.province}}{{result.city}}{{result.district}}{{result.township}}
      </div>
      <div class="map-content-detail">
        {{result.detail}}
      </div>
    </div>

    <div class="search-result-box">
      <div class="search-result">
        <span class="search-head-line"></span>
        <span class="search-head-content">搜索结果</span>
        <span class="search-head-line"></span>
      </div>
      <div class="map-list" v-for="items in mapList">
        <div class="map-content-head" @click="handleClick('search',items)">
          {{items}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        data(){
          const self = this;
          return {
            markers: [
                [121.59996, 31.197646],
                [121.40018, 31.197622],
                [121.69991, 31.207649]
            ],
            searchOption: {
                citylimit: false
            },
            mapCenter: [121.59996, 31.197646],
            center: [121.59996, 31.197646],
            lng: 121.59996,
            lat: 31.197646,
            result:[],
            mapList:[],
            loaded: false,
            plugin: [{
              extensions:'all',
              pName: 'Geolocation',
              events: {
                init(o) {
                  // o 是高德地图定位插件实例
                  o.getCurrentPosition((status, result) => {
                    var position = {
                      province:result.addressComponent.province,
                      city:result.addressComponent.city,
                      district:result.addressComponent.district,
                      township:result.addressComponent.township,
                      detail:result.formattedAddress
                    }
                    self.result = position
                    if (result && result.position) {
                      self.lng = result.position.lng;
                      self.lat = result.position.lat;
                      self.center = [self.lng, self.lat];
                      self.loaded = true;
                      self.$nextTick();
                    }
                  });
                }
              }
            },{
            pName: 'ToolBar',
            events: {
              init(instance) {
              }
            }
          },{
            pName: 'Scale',
            events: {
              init(instance) {
              }
            }
          }]
          }
        },
        methods: {
            backTo() {

              this.$router.go(-1)

            },

            addMarker: function() {
                let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
                let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
                this.markers.push([lng, lat]);
            },
            onSearchResult(pois) {
                let _this = this
                let latSum = 0;
                let lngSum = 0;
                if (pois.length > 0) {
                    pois.forEach(poi => {
                    let {lng, lat} = poi;
                    lngSum += lng;
                    latSum += lat;
                    this.markers.push([poi.lng, poi.lat]);
                    });
                    let center = {
                    lng: lngSum / pois.length,
                    lat: latSum / pois.length
                    };
                    this.mapCenter = [center.lng, center.lat];
                }

                this.mapList.length = 0

                pois.forEach(function(value) {

                  _this.mapList.push(
                    value.name
                  )

                })
            },
            
            handleClick(command,mes) {

              if(command == 'yourself') {

                this.$store.commit('getPositionDetail',this.result.detail)

              }else {

                this.$store.commit('getPositionDetail',mes)

              }

              this.$router.go(-1)

            }
        },

        mounted() {

            

        }
   }

</script>

<style lang="scss">
.amap-page-container {
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background:#faf8fd;

      .map-list-head {
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
      
      .amap-demo {
        position: relative;
        height: 300px;
        margin-top:70px;
      }
      .amap-geo {
          position: absolute;
          bottom:30px;
          left:5px;
      }
      .search-box {
        position: absolute;
        top: 85px;
        left: 20px;
        width:90%;
      }
      .map-detail {
        position: relative;
        overflow: hidden;
        background:#fff;

        .map-content-head {
          position: relative;
          margin-top:15px;
          margin-left:15px;
          color:#8e8e8e;
        }

        .map-content-detail {

          position: relative;
          margin:10px 15px;
          color:#b1b1b1;
          font-size: 13px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }

      .search-result-box {

        .search-result {
          position: relative;
          text-align: center;
          margin:20px 0;

                    color:#b2b2b2;
                    font-size: 10px;
                    .search-head-line {
                        display: inline-block;
                        height:0;
                        width:30%;
                        border-bottom:1px solid #b2b2b2;
                    }

                    .search-head-content {
                        display: inline-block;
                        position: relative;
                        top:3px;
                    }

                }

        .map-list {
          position: relative;
          overflow: hidden;
          background:#fff;
          color:#8d8d8d;

          .map-content-head {
            position: relative;
            margin:0 15px;
            padding:15px 0;
          }
        }

      }
}
</style>
<template>
  <div class="map_wrap">
    <div id="container"></div>
    <div class="float_wrap">
      <el-button type="primary" @click="clearMap()">销毁</el-button>
      <div class="readArea">
        {{adds}}
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/assets/eventBus.js";
import addsArr from "./adds.js";
import dataArr from "./json.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      map: {},
      newArr: addsArr,
      adds:[]
      
    };
  },
  methods: {
    renderMap() {
      this.map = new AMap.Map("container", {
        zoom: 4, //级别
        // center: [116.397428, 39.90923], //中心点坐标
        resizeEnable: true
      });
      this.map.on("moveend", this.getCity);
    },
    geocoders() {
      var that = this;
      var geocoder = new AMap.Geocoder({
        city: "全国", //城市，默认：“全国”
        radius: 300 //范围，默认：500
      });
       that.adds=[];
     dataArr.forEach((element, index) => {
        geocoder.getLocation(element.address, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            console.log(result);
            element.center=[result.geocodes[0].location.lng,result.geocodes[0].location.lat]
            that.adds.push(element)
          }
        });
      });
    },
    massMarker() {
      var that = this;
      var mass = new AMap.MassMarks(that.newArr, {
        opacity: 0.8,
        zIndex: 111,
        cursor: "pointer",
        style: {
          url: "https://a.amap.com/jsapi_demos/static/images/mass0.png",
          anchor: new AMap.Pixel(6, 6),
          size: new AMap.Size(11, 11)
        }
      });
      var marker = new AMap.Marker({ content: " ", map: that.map });
      mass.on("mouseover", function(e) {
        marker.setPosition(e.data.lnglat);
        marker.setLabel({ content: e.data.address });
      });
      mass.setMap(this.map);
    },
    clearMap() {
      bus.$emit("clear", "clearMap");
      this.map.clearMap();
    }
  },
  mounted() {
    this.renderMap();
    this.geocoders();
    this.massMarker();
    bus.$on("show", data => {});
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.map_wrap {
  width: 100%;
  height: 100%;
}
#container {
  width: 100%;
  height: 100%;
}
.float_wrap {
  padding-left: 10px;
  padding-right: 10px;
  position: absolute;
  font-size: 12px;
  right: 10px;
  top: 20px;
  line-height: 30px;
}
.readArea {
  height: 400px;
  width: 200px;
  overflow: auto;
  background: seashell;
}
</style>

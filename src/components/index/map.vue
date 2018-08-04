<template>
  <div class="map_wrap">
    <div id="container"></div>
    <div class="float_wrap">
      <el-button type="primary" @click="clearMap()">销毁</el-button>
    </div>
  </div>
</template>

<script>
import bus from "@/assets/eventBus.js"
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      map: {}
    };
  },
  methods: {
    renderMap() {
      this.map = new AMap.Map("container", {
        // zoom: 11, //级别
        // center: [116.397428, 39.90923], //中心点坐标
        resizeEnable: true
      });
      this.map.on("moveend", this.getCity);
      this.map.plugin("AMap.Geolocation", this.location);
    },
    getCity() {
      this.map.getCity(function(data) {
        if (data["province"] && typeof data["province"] === "string") {
          console.log(data);
          // document.getElementById("info").innerHTML =
          //   "城市：" + (data["city"] || data["province"]);
        }
      });
    },
    location() {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition: "RB"
      });
      this.map.addControl(geolocation);
      geolocation.getCurrentPosition();
    },
    clearMap() {
     bus.$emit("clear","clearMap")
     this.map.clearMap();
    }
  },
  mounted() {
    this.renderMap();
     bus.$on("show",(data)=>{})
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
</style>

<template>
  <div class="map_wrap">
    <div id="container"></div>
    <div class="float_wrap">
      <el-button type="primary" @click="clearMap()">销毁</el-button>
      <div id="info"></div>
    </div>
  </div>
</template>

<script>
import bus from "@/assets/eventBus.js";
import capitals from"./marker.js"
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
         zoom: 4,
        resizeEnable: true
      });
      // this.map.on("moveend", this.getCity);
    },
    getCity() {
      this.map.getCity(function(data) {
        if (data["province"] && typeof data["province"] === "string") {
          console.log(data);
          document.getElementById("info").innerHTML =
            "城市：" + (data["city"] || data["province"]);
        }
      });
    },
    //清楚地图上的操作痕迹
    clearMap() {
      bus.$emit("clear", "clearMap");
      this.map.clearMap();
    },
    // getMarkData(){
    //  this.$http.get('./marker.json',(res)=>{
    //     this.marker(res);
    //   })
    // },
    marker() {
      for (var i = 0; i < capitals.length; i += 1) {
        var center = capitals[i].center;
        var circleMarker = new AMap.CircleMarker({
          center: center,
          radius: 10 ,
          strokeColor: "white",
          strokeWeight: 2,
          strokeOpacity: 0.5,
          fillColor: "rgba(0,0,255,1)",
          fillOpacity: 0.5,
          zIndex: 10,
          bubble: true,
          cursor: "pointer",
          clickable: true
        });
        circleMarker.setMap(this.map);
      }
    }
  },
  mounted() {
    this.renderMap();
    this.marker();
    bus.$on("show", data => {
      console.log("导航到订单上传");
    });
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
}
</style>

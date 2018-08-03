<template>
  <div class="map_wrap">
    <div id="container"></div>
    <div class="float_wrap">
      <el-button type="primary" @click="clearMap()">销毁</el-button>
    </div>
  </div>
</template>

<script>
import bus from "@/assets/eventBus.js";
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
    clearMap() {
      bus.$emit("clear", "clearMap");
      this.map.clearMap();
    }
  },
  mounted() {
    this.renderMap();
    bus.$on("show", data => {
      alert(data);
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
  line-height: 30px;
}
</style>

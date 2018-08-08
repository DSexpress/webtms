<template>
  <div class="map_wrap">
    <div id="container"></div>
    <!-- <div class="float_wrap">
      <el-button type="primary" @click="clearMap()">销毁</el-button>
    </div> -->
  </div>
</template>

<script>
import bus from "@/assets/eventBus.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      map: {},
      newArr: [],
      mass:{},//点
    };
  },
  methods: {
    renderMap() {
      this.map = new AMap.Map("container", {
        zoom: 5, //级别
        resizeEnable: true
      });
    },
    massMarker() {
      var that = this;
      that.mass = new AMap.MassMarks(that.newArr, {
        opacity: 0.8,
        zIndex: 111,
        cursor: "pointer",
        style: {
          url: "https://a.amap.com/jsapi_demos/static/images/mass0.png",
          anchor: new AMap.Pixel(6, 6),
          size: new AMap.Size(20, 20)
        }
      });
      var marker = new AMap.Marker({ content: " ", map: that.map });
       that.mass.on("mouseover", function(e) {
        marker.setPosition(e.data.lnglat);
        marker.setLabel({ content: e.data.address });
      });
      that. mass.setMap(this.map);
    },
  },
  mounted() {
    this.renderMap();
    var that  =this;
    bus.$on('getData',data=>{
      // console.log(this.mass)
      if (this.mass.CLASS_NAME) {
        this.mass.clear();
      }
      this.newArr =[];
      this.newArr = data;
      this.massMarker();
    })
    // bus.$on("show", data => {});
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

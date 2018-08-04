<template>
  <div class="map_wrap">
    <div id="container"></div>
    <div class="map_tips">
      <ul>
        <li>
           <img src="https://a.amap.com/jsapi_demos/static/images/mass0.png" alt="">
          <span>已签收</span>
        </li>
        <li>
           <img src="https://a.amap.com/jsapi_demos/static/images/mass1.png" alt="">
          <span>运输中</span>
        </li>
        <li>
           <img src="https://a.amap.com/jsapi_demos/static/images/mass2.png" alt="">
          <span>已揽件</span>
        </li>
      </ul>
     
    </div>
  </div>
</template>

<script>
import bus from "@/assets/eventBus.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      map: {}
    };
  },
  props: ["data"],
  methods: {
    renderMap() {
      this.map = new AMap.Map("container", {
        zoom: 4, //级别
        // center: [116.397428, 39.90923], //中心点坐标
        resizeEnable: true
      });
    },
    massMarker() {
      var style = [
        {
          url: "https://a.amap.com/jsapi_demos/static/images/mass0.png",
          anchor: new AMap.Pixel(6, 6),
          size: new AMap.Size(11, 11)
        },
        {
          url: "https://a.amap.com/jsapi_demos/static/images/mass1.png",
          anchor: new AMap.Pixel(6, 6),
          size: new AMap.Size(11, 11)
        },
        {
          url: "https://a.amap.com/jsapi_demos/static/images/mass2.png",
          anchor: new AMap.Pixel(6, 6),
          size: new AMap.Size(11, 11)
        }
      ];
      var mass = new AMap.MassMarks(this.data, {
        opacity: 0.8,
        zIndex: 111,
        cursor: "pointer",
        style: style
      });
      mass.setMap(this.map);
    }
  },
  mounted() {
    this.renderMap();
    this.$nextTick(() => {
      this.massMarker();
    });
    bus.$on("show", data => {});
  }
};
</script>

<style >
.map_wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
#container {
  width: 100%;
  height: 100%;
}
.map_tips {
  position: absolute;
  left: 48px;
  top: 30px;
  padding: 8px 10px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 5px 5px 10px #888888;
}
.map_tips ul > li {
  float: left;
  font-size: 12px;
  margin-left: 16px;
}
.map_tips ul > li:first-child {
  margin-left: 0;
}
.map_tips ul > li img {
  width: 24px;
  height: 24px;
  border-radius: 100%;
  overflow: hidden;
  vertical-align: middle;
}
.readArea {
  height: 400px;
  width: 200px;
  overflow: auto;
  background: seashell;
}
</style>

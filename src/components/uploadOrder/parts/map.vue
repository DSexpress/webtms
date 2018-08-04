<template>
  <div class="map_wrap">
    <div id="container"></div>
    <div class="float_wrap" v-show="markArr.length > 0&&showTool">
      <el-button type="primary" @click="ellipseEditors(1)">编辑范围</el-button>
      <el-button type="primary" @click="ellipseEditors(2)">确认范围</el-button>
      <div id="info"></div>
    </div>
  </div>
</template>

<script>
import bus from "@/assets/eventBus.js";
import markArr from "./marker";
export default {
  name: "HelloWorld",
  data() {
    return {
      map: {},
      markArr: [],
      showTool: false, //控制tool显示
      center: [116.397428, 39.90923], //点击地图得到中心的点
      ellipseEditor: {}, //编辑椭圆对象
      ellipse: {}, //画椭圆对象
      querys:[],//一个划区的订单
    };
  },
  methods: {
    renderMap() {
      this.map = new AMap.Map("container", {
        zoom: 8,
        resizeEnable: true
      });
    },
    //清楚地图上的操作痕迹
    clearMap() {
      bus.$emit("clear", "clearMap");
      this.map.clearMap();
    },
    marker() {
      for (var i = 0; i < this.markArr.length; i += 1) {
        var center = this.markArr[i].center;
        var circleMarker = new AMap.CircleMarker({
          center: center,
          radius: 10,
          strokeColor: "white",
          strokeWeight: 2,
          fillColor: "rgba(0,0,255,1)",
          zIndex: 10,
          bubble: true,
          cursor: "pointer",
          clickable: true
        });
        circleMarker.setMap(this.map);
      }
    },
    // 点击地图获取初步画圆的中心点
    getCenter() {
      var that = this;
      this.map.on("click", function(e) {
        if (that.markArr.length > 0) {
          that.showTool = true;
          that.center = [e.lnglat.getLng(), e.lnglat.getLat()];
          that.ellipse.setCenter(that.center); //绘制新的椭圆
          that.ellipseEditor = new AMap.EllipseEditor(that.map, that.ellipse); //赋值给修改椭圆对象
        }
      });
    },
    // 编辑椭圆
    ellipseEditors(type) {
      var that = this;
      if (type == 1) {
        that.ellipseEditor.open();
      } else {
        that.confirmArea();
        that.ellipseEditor.close();
      }
    },
    confirmArea() {
      var that = this;
      that.querys = [];
       console.log(that.markArr)
      that.markArr.forEach((item, index) => {
        //选区在椭圆中的点，进行划区,将匹配到的订单移除，地图不再显示已经划区的订单
        if (that.ellipse.contains(item.center)) {
          that.markArr.splice(index, 1)
          that.querys.push(item);
        }
      });
      this.map.clearMap();
      this.marker();
      console.log(that.markArr)
    },
    //提交数据
    postArea() {
      this.querys;
    },
    // 画椭圆的初始样子
    Ellipse() {
      var that = this;
      that.ellipse = new AMap.Ellipse({
        map: that.map,
        center: that.center,
        radius: [6000, 4000],
        strokeColor: "red",
        strokeWeight: 5,
        strokeStyle: "solid",
        fillColor: "transparent",
        zIndex: 10,
        bubble: true,
        cursor: "pointer",
        bubble: false
      });
      return this.ellipse;
    }
  },
  mounted() {
    bus.$on("forMark", data => {
      this.markArr = data;
      this.marker();
    });
    this.renderMap();
    this.getCenter();
    this.Ellipse();
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

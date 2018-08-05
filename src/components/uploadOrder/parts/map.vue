<template>
  <div class="map_wrap">
    <div id="container"></div>
    <div class="float_wrap" v-show="markArr.length > 0&&showTool">
      <el-button type="primary" @click="ellipseEditors(1)">编辑范围</el-button>
      <el-button type="primary" @click="ellipseEditors(2)">确认范围</el-button>
      <div id="info"></div>
    </div>
     <overlay :close.sync="close" title="订单上传">
        <div class=""></div>
      </overlay>
  </div>
</template>

<script>
import bus from "@/assets/eventBus.js";
import markArr from "./marker";
import overlay from "@/components/common/overlay"
export default {
  name: "HelloWorld",
  data() {
    return {
      close:false,
      map: {},
      markArr: [],
      showTool: false, //控制tool显示
      circleMarker:[],
      center: [0,0], //点击地图得到中心的点
      ellipseEditor: {}, //编辑椭圆对象
      ellipse: {}, //画椭圆对象
      querys: [], //一个划区的订单
      hasPost:true,//放置没有确认划区，再次划区
    };
  },
  components:{overlay},
  methods: {
    renderMap() {
      this.map = new AMap.Map("container", {
        zoom: 6,
        resizeEnable: true
      });
    },
    //清楚地图上的操作痕迹
    clearMap() {
      bus.$emit("clear", "clearMap");
      this.map.clearMap();
    },
    marker(data,color) {
      for (var i = 0; i < data.length; i += 1) {
        var center = data[i].center;
        this.circleMarker = new AMap.CircleMarker({
          center: center,
          radius: 10,
          strokeColor: "white",
          strokeWeight: 1,
          fillColor: color,
          zIndex: 10,
          bubble: true,
          cursor: "pointer",
          clickable: true
        });
         this.circleMarker.setMap(this.map);
      }
    },
    // 点击地图获取初步画圆的中心点
    getCenter() {
      var that = this;
      this.map.on("click", function(e) {
        if (that.markArr.length > 0&&that.hasPost) {
          that.showTool = true;
          if (that.ellipseEditor.CLASS_NAME) {
            that.ellipseEditor.close();
          }
          that.center = [e.lnglat.getLng(), e.lnglat.getLat()];
          that.Ellipse().setCenter(that.center); //绘制新的椭圆
          that.ellipseEditor = new AMap.EllipseEditor(that.map, that.ellipse); //赋值给修改椭圆对象
          that.hasPost=false;
        }
      });
    },
    // 编辑椭圆
    ellipseEditors(type) {
      var that = this;
      if (type == 1) {
        that.ellipseEditor.open();
      } else {
        this.close =true;
        that.ellipseEditor.close();
        that.confirmArea();
      }
    },
    confirmArea() {
      var that = this;
      that.querys = [];
      console.log(that.markArr);
      that.markArr.forEach((item, index) => {
        //选区在椭圆中的点，进行划区,将匹配到的订单移除，地图不再显示已经划区的订单
        if (that.ellipse.contains(item.center)) {
          console.log(item.center);
          // that.markArr.splice(index, 1)
          that.querys.push(item);
        }
      });
      this.remove(that.markArr, that.querys);
      // this.map.clearMap();
      console.log(that.querys);
      this.marker(that.querys,'#696969');
      this.hasPost =true;
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
        radius: [600010, 400010],
        strokeColor: "red",
        strokeWeight: 2,
        strokeStyle: "solid",
        fillColor: "transparent",
        zIndex: 10,
        bubble: true,
        cursor: "pointer",
        bubble: false
      });
      return that.ellipse;
    },
    remove(targetArr, arr) {
      arr.forEach((element, i) => {
        targetArr.forEach((item, index) => {
          if (item.center == element.center) {
            targetArr.splice(index, 1);
          }
        });
      });
    }
  },
  mounted() {
    bus.$on("forMark", data => {
      this.markArr = data;
      this.marker(this.markArr,'red');
    });
    this.renderMap();
    this.getCenter();
    // this.Ellipse();
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

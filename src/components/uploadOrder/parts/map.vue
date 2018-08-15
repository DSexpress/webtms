<template>
  <div class="map_wrap">
    <div id="container">
       <div class="tips" :style="{top:tipPos.top+'px',left:tipPos.left+'px'}" v-show="0">{{tipPos.content}}</div>
    </div>
    <div class="float_wrap" v-show="markArr.length > 0&&showTool">
      <el-button type="primary" @click="ellipseEditors(1)">编辑范围</el-button>
      <el-button type="primary" @click="ellipseEditors(2)">确认范围</el-button>
      <!-- <el-button type="danger" @click="resetSet()">取消操作</el-button> -->
      <div id="info"></div>
    </div>
    <!-- 编辑划区 -->
      <overlay :close.sync="close" title="区域划分">
        <div class="">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="配送司机">
              <el-select v-model="form.region" 
              @visible-change="hasDriver"
              placeholder="请选择活动区域">
                 <el-option v-for="(item,index) in userArr" :label="item.uname" :value="item.uid" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="postArea();">提交划区</el-button>
              <el-button @click="close=false;">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </overlay>
      <overlay :close.sync="close1" title="新增司机" >
        <addDriver></addDriver>
      </overlay>
  </div>
</template>

<script>
import bus from "@/assets/eventBus.js";
import overlay from "@/components/common/overlay";
import addDriver from "@/components/driverManege/parts/editUser"
export default {
  name: "HelloWorld",
  data() {
    return {
      close: false,
      close1:false,
      showTips: false,
      tipPos: {
        left: 0,
        top: 0,
        content: "订单地址"
      },
      map: {},
      markArr: [],
      showTool: false, //控制tool显示
      circleMarker: [],
      center: [0, 0], //点击地图得到中心的点
      ellipseEditor: {}, //编辑椭圆对象
      ellipse: {}, //画椭圆对象
      querys: [], //一个划区的订单
      hasPost: true, //放置没有确认划区，再次划区
      userArr: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  components: { overlay,addDriver },
  created() {
    this.getDriver();
  },
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
    marker(data, color) {
      for (var i = 0; i < data.length; i += 1) {
        var center = [data[i].lnglat[0], data[i].lnglat[1]];
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
        this.clickCrilce();
      }
    },
    // 点击地图获取初步画圆的中心点
    getCenter() {
      var that = this;
      this.map.on("click", function(e) {
        if (that.markArr.length > 0 && that.hasPost) {
          that.showTool = true;
          if (that.ellipseEditor.CLASS_NAME) {
            that.ellipseEditor.close();
          }
          that.center = [e.lnglat.getLng(), e.lnglat.getLat()];
          that.Ellipse().setCenter(that.center); //绘制新的椭圆
          that.ellipseEditor = new AMap.EllipseEditor(that.map, that.ellipse); //赋值给修改椭圆对象
          that.hasPost = false;
        }
      });
    },
    // 编辑椭圆
    ellipseEditors(type) {
      var that = this;
      if (type == 1) {
        that.ellipseEditor.open();
      } else {
        this.close = true;
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
        if (that.ellipse.contains([item.lnglat[0], item.lnglat[1]])) {
          // that.markArr.splice(index, 1)
          that.querys.push(item);
        }
      });
      // 此处post请求，保存that.querys,成功之后之后，重新绘制地图，失败清除querys，在最近的椭圆重新划区
    },
    //提交数据
    postArea() {
      if (this.form.region) {
        this.$http.get("TMS/qu/addQu?sjId=" + this.form.region).then(res => {
          if (res.data.status === 1) {
            var userIdd = res.data.data;
            this.postOrder(userIdd);
          }
        });
      } else {
        this.$notify({
          title: "提示",
          message: "请选择司机!",
          duration: 1500,
          type: "warnning"
        });
      }
    },
    postOrder(id) {
      var orderStr = [];
      console.log(this.querys);
      this.querys.forEach((item, index) => {
        orderStr.push(item.oid);
      });
      this.$http
        .get("TMS/qu/addQuOrder?quId=" + id + "&orderIds=" + orderStr.join(","))
        .then(res => {
          if (res.data.status === 1) {
            this.$notify({
              title: "提示",
              message: "区域划分成功！",
              duration: 1500,
              type: "success"
            });
            this.remove(this.markArr, this.querys);
            console.log(this.querys);
            this.marker(this.querys, "#696969");
            this.hasPost = true;
            this.close = false;
          }
        });
    },
    // 画椭圆的初始样子
    Ellipse() {
      var that = this;
      that.ellipse = new AMap.Ellipse({
        map: that.map,
        center: that.center,
        radius: [100010, 100010],
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
    },
    // 点击圆点
    clickCrilce() {
      var that = this;
      that.circleMarker.on("mouseover", function(e) {
        console.log(e);
        that.showTips = true;
        that.tipPos.left = e.pixel.x + 12;
        that.tipPos.top = e.pixel.y - 14;
      });
      that.circleMarker.on("mouseout", function(e) {
        console.log(e);
        that.showTips = false;
      });
    },
     //司机列表
    getDriver() {
      this.$http.get("/TMS/user/getAllUser?type=2").then(res => {
        if (res.data.status === 1) {
          this.userArr = res.data.data;
        }
      });
    },
    //判断是否有司机
    hasDriver(e) {
      if (e && this.userArr.length == 0) {
        this.$confirm("无可配送的司机, 请添加司机账号?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // this.$router.push("/userManage")
            this.close1 =true;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作"
            });
          });
      }
    },
    // 取消当前划区
    resetSet(){
      this.ellipse.hide();
      this.querys=[];
      console.log(this.querys)
    }
  },
  mounted() {
    bus.$on("forMark", data => {
      //请求数据时，想清楚地图上的标记
      console.log(data);
      this.markArr = [];
      this.map.clearMap();
      this.markArr = data;
      this.marker(this.markArr, "red");
    });
    this.renderMap();
    this.getCenter();
    // this.Ellipse()
     bus.$on("closeOverlay",data=>{
       this.close1 =false;
       this.getDriver();
     });
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
  position: relative;
}
.float_wrap {
  padding-left: 10px;
  padding-right: 10px;
  position: absolute;
  font-size: 12px;
  right: 10px;
  top: 20px;
}
.tips {
  min-width: 180px;
  max-width: 240px;
  height: 30px;
  line-height: 30px;
  border-radius: 50px;
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(84, 92, 100);
  z-index: 100;
  font-size: 12px;
  text-align: center;
  color: aliceblue;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>

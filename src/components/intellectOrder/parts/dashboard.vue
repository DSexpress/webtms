<template>
    <div class="work_main">
      <div class="work_wrap" v-show="hidden">
         <div class="title"><i class="el-icon-document"></i>划区订单列表</div>
        <div class="work_section work_section_status">
          <div class="user_list" v-show="!showItem">
            <ul class="order_list">
              <li class="order_item" 
                v-for="(item,index) in dataList"
                 :key="index"
                 @click="mapGetData(item.qid);showItem=true;itemTitle=item.uname;quId=item.qid">
                  <i class="el-icon-tickets"></i>
                  {{item.uname}}
              </li>
            </ul>
          </div>
          <div class="listItem" v-show="showItem">
            <h4 @click="showItem=false;showDetail=false" class="status_title">
              <i class="el-icon-back"></i>{{itemTitle}}
              <i>总共{{itemArr.length}}条</i>              
            </h4>
            <ul class="order_list_detail" >
              <li class="order_item" 
              v-for="(item,index) in  itemArr"
              :key="index"
              :class="{hasColor:item.ostatus==3}"
              @click="showDetail=true;orderItem=item">
                <i class="el-icon-tickets"></i>
                {{item.shgs}}({{item.ostatus==2?"派送中":"已签收"}})
                <i class="el-icon-edit-outline right" style="margin-top:12px;"
                 @click.stop="clickStatus(item)"></i>
              </li>
            </ul>
          </div>
          <div class="order_detail_wrap" v-show="showDetail">
            <p><i class="el-icon-close right" @click="showDetail=false"></i></p>
            <p><span>收货人：</span>{{orderItem.oname}}</p>
             <p><span>订单状态:</span>{{orderItem.ostatus==2?"派送中":"已签收"}}</p>
            <p><span>区块名称：</span>{{orderItem.shgs}}</p>
            <p><span>经纬度：</span>{{orderItem.jd}},{{orderItem.wd}}</p>
            <p>订单地址：{{orderItem.oaddress}}</p>
          </div>
        </div>
      </div>
      <div class="close-arrow" 
        :class="{on:!hidden}" 
        @click="hidden=!hidden;hide()" 
        title="收起左侧面板">
      </div>
      <overlay :close.sync="close" title="修改订单状态">
        <div class="changeOrder_intell">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="证件签收数">
              <el-input v-model.number="form.wholeNum"></el-input>
            </el-form-item>
            <el-form-item label="散件签收数">
              <el-input v-model.number="form.unitNum"></el-input>
            </el-form-item>
            <el-form-item label="签收人">
              <el-input v-model.number="form.receiver"></el-input>
            </el-form-item>
          </el-form>
          <div class="btn_wrap">
            <el-button type="primary" @click="checkOrderStatus()">确认</el-button>
            <el-button @click="close=false;form={}">取消</el-button>
          </div>
        </div>
      </overlay>
    </div>
</template>
<script>
import bus from "@/assets/eventBus.js";
import overlay from "@/components/common/overlay";
export default {
  data() {
    return {
      close: false,
      dataList: [],
      itemArr: [],
      showDetail: false,
      hidden: true,
      close: false,
      showItem: false,
      itemTitle: "",
      orderItem: {},
      form: {
        wholeNum: null,
        unitNum: null,
        receiver: ""
      },
      orderId: null,
      quId:null,
    };
  },
  created() {
    this.getUserList();
  },
  components: { overlay },
  methods: {
    getUserList() {
      this.$http.get("TMS/qu/queryAllQu").then(res => {
        if (res.data.status === 1) {
          this.dataList = res.data.data;
        }
      });
    },
    mapGetData(id) {
      //点击划区列表，获取数据，marker在地图上
      this.$http
        .get("TMS/qu/getQu_OrderBysJId?qId=" + id + "&sjId=0")
        .then(res => {
          if (res.data.status === 1) {
            var markArr = [];
            this.itemArr = res.data.data;
            //处理数据
            res.data.data.forEach(element => {
              element.lnglat = [element.jd, element.wd];
              markArr.push(element);
            });
            bus.$emit("getData", markArr);
          }
        });
    },
    checkOrderStatus() {
      if (this.form.wholeNum && this.form.unitNum && this.form.receiver) {
        this.$http
          .get(
            "TMS//order/changeOrder?oId=" +
              this.orderId +
              "&zjqss=" +
              this.form.wholeNum +
              "&sjqss=" +
              this.form.unitNum +
              "&qsr=" +
              this.form.receiver
          )
          .then(res => {
            if (res.data.status === 1) {
              this.close = false;
              this.mapGetData(this.quId);
              this.$notify({
                title: "提示",
                message: "订单状态已修改！",
                duration: 1500,
                type: "success"
              });
            }
          });
      } else {
        this.$notify({
          title: "提示",
          message: "填写不完整",
          duration: 1500,
          type: "warning"
        });
      }
    },
    hide() {
      bus.$emit("showNav", this.hidden);
    },
    clickStatus(item) {
      if (item.ostatus != 3) {
        this.close = true;
        this.orderId = item.oid;
      } else {
        this.$message({
          showClose: true,
          message: "订单已签收！",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style>
.work_main {
  height: 100%;
  background-color: white;
  position: relative;
}
.work_section {
  width: 290px;
  height: 94vh;
  overflow: auto;
  box-sizing: border-box;
}
.work_section_status {
  padding: 0 3%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.work_wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.upload_btn {
  flex: 1;
  width: 94%;
  margin: 0 auto;
}
.status_title {
  margin-top: 12px;
  cursor: pointer;
}
.user_list,
.listItem {
  flex: 1;
}
.order_detail_wrap {
  height: 45%;
  overflow: auto;
  border-top: 4px solid slategray;
}
.order_detail_wrap {
  box-sizing: border-box;
  padding: 14px;
}
.order_detail_wrap p {
  font-size: 14px;
  padding-top: 12px;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.hasColor {
  /* background-color: #545c64; */
  color: #409eff;
}
.close-arrow {
  position: absolute;
  top: 50%;
  left: 289px;
  width: 28px;
  height: 43px;
  margin-top: -21px;
  z-index: 102;
  cursor: pointer;
  background: transparent url(../../../assets/icon_close.png) no-repeat 0 0;
}
.order_list_detail .order_item {
  line-height: 38px;
  font-size: 14px;
  cursor: pointer;
}
.work_main .on {
  left: 0;
  width: 28px;
  height: 43px;
  background: transparent url(../../../assets/icon_open.png) no-repeat 0 0;
}
.order_list li {
  line-height: 38px;
  font-size: 14px;
  cursor: pointer;
}
.order_list li:hover {
  background-color: #545c64;
  color: white;
}
.changeOrder_intell {
  width: 450px;
}
.changeOrder_intell label {
  font-size: 12px !important;
}
.btn_wrap {
  text-align: center;
}
</style>

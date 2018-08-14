<template>
    <div class="work_main">
      <div class="work_wrap" v-show="hidden">
        <div class="work_section">
            <div class="title">
              <i class="el-icon-document"></i>订单列表 <i>总共{{totalNum}}条</i>
              <i @click="close=true" class="el-icon-upload right" style="margin-top:15px; cursor: pointer;"></i>
            </div>
            <div class="listWrap">
              <!-- orderFiles -->
              <ul class="order_list files_list">
                <li v-for="(item,index) in orderList" :key="index"
                 @click="showDetail=true;showDetailFun(item)" 
                 :title="item.ostatus==2?'已划区':''"
                 class="order_item" 
                 :class="{hasColor:item.ostatus==2}">
                 <i class="el-icon-tickets"></i>{{item.shgs}}</li>
              </ul>
              <p class="getMore" @click="getMore()" v-show="showMore">加载更多</p>
             <div class="order_detail_wrap" v-show="showDetail">
               <p><i class="el-icon-close right" @click="showDetail=false"></i></p>
               <p><span>收货人：</span>{{orderItem.oname}}</p>
               <p><span>区块名称：</span>{{orderItem.shgs}}</p>
               <p><span>经纬度：</span>{{orderItem.jd}},{{orderItem.wd}}</p>
               <p>订单地址：{{orderItem.oaddress}}</p>
             </div>
            </div>             
        </div>
      </div>
      <div class="close-arrow" 
        :class="{on:!hidden}" 
        @click="hidden=!hidden;hide()" 
        title="收起左侧面板">
      </div>
      <overlay :close.sync="close" title="订单上传">
        <files></files>
      </overlay>
    </div>
</template>
<script>
import bus from "@/assets/eventBus.js";
import overlay from "@/components/common/overlay";
import files from "./files";
export default {
  data() {
    return {
      orderList: [],
      orderItem: {}, //订单详情
      totalNum: null,
      hidden: true,
      close: false,
      showItem: false,
      showDetail: false,
      showMore: true,
      pageIndex: 1,
      pageSize: 50,
      pageCountNum: null,
      status: [
        {
          code: 1,
          value: "未分配"
        },
        {
          code: 2,
          value: "已分配"
        },
        {
          code: 3,
          value: "已签收"
        }
      ],
      codeValue: ""
    };
  },
  components: { overlay, files },
  methods: {
    hide() {
      bus.$emit("showNav", this.hidden);
    },
    getOrderList() {
      this.$http
        .get("/TMS/order/getOrderList", {
          params: {
            pageSize: this.pageSize,
            pageNumber: this.pageIndex,
            orderId: 0
          }
        })
        .then(res => {
          if (res.data.status === 1) {
            this.totalNum = res.data.data.countNum;
            this.pageCountNum = res.data.data.pageCountNum;
            var forMarkArr = [];
            this.orderList = [...res.data.data.orderDatas];
            this.orderList.forEach((item, index) => {
              if (item.ostatus == 1) {
                forMarkArr.push(item);
              }
            });
            bus.$emit("forMark", forMarkArr);
          }
        })
        .catch(erro => {
          this.$notify({
            title: "提示",
            message: "未知异常！",
            duration: 1500,
            type: "error"
          });
        });
    },
    showDetailFun(item) {
      this.orderItem = item;
    },
    getMore() {
      this.pageIndex++;
      if (this.pageIndex <= this.pageCountNum) {
        this.getOrderList();
      } else {
        this.showMore = false;
      }
    }
  },
  created() {
    this.getOrderList();
  },
  mounted() {
    bus.$on("freshOrderList", data => {
      this.pageIndex = 1;
      this.getOrderList();
      // this.close = false;
    });
  }
};
</script>

<style>
.getMore {
  text-align: center;
  color: #545c64;
  margin-top: 18px;
  cursor: pointer;
}
.title {
  box-sizing: border-box;
  padding: 0 3%;
}
.work_main {
  height: 100%;
  background-color: white;
  position: relative;
}
.work_section {
  width: 290px;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  /* padding: 0 3%; */
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
.work_main .on {
  left: 0;
  width: 28px;
  height: 43px;
  background: transparent url(../../../assets/icon_open.png) no-repeat 0 0;
}
.files_list,
.listItem {
  box-sizing: border-box;
  padding: 0 3%;
  overflow: auto;
  flex: 1;
  height: 100%;
}
.order_list li {
  line-height: 38px;
  font-size: 14px;
  cursor: pointer;
}
.listWrap {
  display: flex;
  flex-direction: column;
  height: 86vh;
}
.order_list_detail .order_item {
  line-height: 38px;
  font-size: 14px;
  cursor: pointer;
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
.files_list li:hover,
.order_list_detail li:hover {
  background-color: #545c64;
  color: white;
}
.hasColor {
  /* background-color: #545c64; */
  color: #409EFF;
}
</style>

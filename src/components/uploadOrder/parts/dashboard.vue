<template>
    <div class="work_main">
      <div class="work_wrap" v-show="hidden">
        <div class="work_section">
            <div class="title">
              <i class="el-icon-document"></i>订单列表 
              <i @click="close=true" class="el-icon-upload right" style="margin-top:15px; cursor: pointer;"></i>
            </div>
            <div class="listWrap">
              <!-- orderFiles -->
              <ul class="order_list files_list"  v-show="!showItem">
                <li @click="mapGetData();showItem=true;" class="order_item"><i class="el-icon-tickets"></i>订单图层1</li>
                <li class="order_item"><i class="el-icon-tickets"></i>订单图层2</li>
                <li class="order_item"><i class="el-icon-tickets"></i>订单图层3</li>
                <li class="order_item"><i class="el-icon-tickets"></i>订单图层4</li>
              </ul>
              <!-- orderList -->
             <div class="listItem" v-show="showItem">
              <h4 @click="showItem=false;showDetail=false">
                <i class="el-icon-back"></i>订单图层1              
              </h4>
               <ul class="order_list_detail" >
                  <li class="order_item" @click="showDetail=true"><i class="el-icon-tickets"></i>订单</li>
                  <li class="order_item"><i class="el-icon-tickets"></i>订单</li>
                  <li class="order_item"><i class="el-icon-tickets"></i>订单</li>
                  <li class="order_item"><i class="el-icon-tickets"></i>订单</li>
                </ul>
             </div>
             <div class="order_detail_wrap" v-show="showDetail">
               <p>订单详情</p>
                <p>订单详情</p>
                 <p>订单详情</p>
                  <p>订单详情</p>
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
      orderList:[],
      hidden: true,
      close: false,
      showItem:false,
      showDetail:false,
    };
  },
  components: { overlay, files },
  methods: {
    hide() {
      bus.$emit("showNav", this.hidden);
    },
    getOrderList(){
      this.$http.get('TMS/jar/nanme').then(res=>{
        if (res) {
          this.orderList=res
        }
      }).catch(erro=>{
        this.$notify({
          title: "提示",
          message: "未知异常！",
          duration: 1500,
          type: "error"
        });
      })
    },
    mapGetData() {
      this.$http.get("/tms/order").then(res => {
        console.log(res.data)
        bus.$emit("forMark", res.data);
      });
    }
  },
  created(){
    this.getOrderList();
  },
  mounted(){
    bus.$on("freshOrderList",(data)=>{

    })
  }
};
</script>

<style>
.title{
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
.files_list,.listItem{
  box-sizing: border-box;
  padding: 0 3%;
  overflow: auto;
  flex: 1;
  height: 100%;
}
.order_list li {
  padding-top: 16px;
  font-size: 14px;
  cursor: pointer;
}
.listWrap{
  display: flex;
  flex-direction: column;
  height: 86vh;
}
.order_list_detail .order_item{
  padding-top: 16px;
  font-size: 14px;
  cursor: pointer;
}
.order_detail_wrap{
  height: 45%;
  overflow: auto;
  border-top: 1px solid slategray;
}
</style>

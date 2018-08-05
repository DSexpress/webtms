<template>
    <div class="work_main">
      <div class="work_wrap" v-show="hidden">
        <div class="work_section">
            <div class="title"><i class="el-icon-document"></i>划区订单列表</div>
              <ul class="order_list">
                <li class="order_item"><i class="el-icon-tickets"></i>划区图层1</li>
                <li class="order_item"><i class="el-icon-tickets"></i>划区图层2</li>
                <li class="order_item"><i class="el-icon-tickets"></i>划区图层3</li>
                <li class="order_item"><i class="el-icon-tickets"></i>划区图层4</li>
            </ul>
        </div>
      </div>
      <div class="close-arrow" 
        :class="{on:!hidden}" 
        @click="hidden=!hidden;hide()" 
        title="收起左侧面板">
      </div>
    </div>
</template>
<script>
import bus from "@/assets/eventBus.js";
export default {
  data() {
    return {
      hidden: true,
      close:false
    };
  },
  methods: {
    hide() {
      bus.$emit("showNav", this.hidden);
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
  padding: 0 3%;
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
  z-index: 5002;
  cursor: pointer;
  background: transparent url(../../../assets/icon_close.png) no-repeat 0 0;
}
.work_main .on {
  left: 0;
  width: 28px;
  height: 43px;
  background: transparent url(../../../assets/icon_open.png) no-repeat 0 0;
}
.order_list li {
  padding-top: 16px;
  font-size: 14px;
  cursor: pointer;
}
</style>

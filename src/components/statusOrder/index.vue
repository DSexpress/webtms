<template>
    <div class="dash_main">
        <maps class="maps" :data='dataArr' v-show="value3"></maps>
        <order_table  :data='dataArr' v-show="!value3"></order_table>
        <div class="float_wrap">
        <el-switch
            v-model="value3"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="图"
            inactive-text="表">
        </el-switch>
    </div>
    </div>
</template>

<script>
import citys from "./parts/orderData.js";
import maps from "./parts/map";
import order_table from "./parts/orderTable";
export default {
  data() {
    return {
      dataArr: [],
      value3: true,
      dataArr:citys
    };
  },
  components: { maps, order_table }
};
</script>

<style>
.dash_main {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 100%;
}
.maps {
  flex: 1;
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

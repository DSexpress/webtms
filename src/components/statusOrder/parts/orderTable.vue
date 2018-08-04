<template>
    <div class="table_main">
        <h3 class="order_title">订单状态类表明细</h3>
        <div class="table_wrap">
        <table class="table">
         <thead>
             <tr>
                <td width="28px">序号</td>
                <td width="20%">订单号</td>
                <td width="10%">货运司机</td>
                <td>地点</td>
                <td width="10%">预计到达时间</td>
                <td  width="30%">操作</td>
             </tr>
            </thead>
            </table>
            <div class="table_contebt">
             <table class="table">
                <tbody>
                    <tr v-for="(item,index) in dataArr" :key="index">
                        <td width="28px">{{index+1}}</td>
                        <td width="20%">201808021722{{index}}</td>
                        <td width="10%"></td>
                        <td>{{item.name}}</td>
                        <td width="10%"></td>
                        <td width="30%">
                         <el-radio-group v-model="item.style" size="mini">
                            <el-radio-button label="0">已签收</el-radio-button>
                            <el-radio-button label="1" >运输中</el-radio-button>
                            <el-radio-button label="2">揽件中</el-radio-button>
                         </el-radio-group>
                        </td>
                    </tr>
                </tbody>
             </table>
            </div>
        </div>
        <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="currentPage"
         :page-sizes="[100, 200, 300, 400]"
         :page-size="100"
         layout="total, sizes, prev, pager, next, jumper"
         :total="400">
        </el-pagination>
    </div>
</template>

<script>
export default {
  data() {
    return {
      dataArr: [],
      currentPage: 1
    };
  },
  props: ["data"],
  methods: {
    spliceArr() {
      this.data.forEach((element, index) => {
        if (index < 50) {
          this.dataArr.push(element);
        }
      });
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    this.spliceArr();
  }
};
</script>

<style>
.table_main {
  box-sizing: border-box;
  padding: 0 38px;
  background-color: whitesmoke;
  height: 100%;
  width: 100%;
}
.order_title {
  margin: 40px 0;
}
.table_wrap {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
}
.table_contebt {
  max-height: 400px;
  overflow: auto;
}
</style>

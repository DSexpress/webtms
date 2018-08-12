<template>
    <div class="table_main">
        <h3 class="order_title">订单状态类表明细</h3>
        <div class="table_wrap">
          <table class="table">
            <thead>
             <tr>
                <td width="28px">序号</td>
                <td width="180px">订单号</td>
                <td width="100px">货运司机</td>
                <td width="200px">地点</td>
                <td width="120px">签收时间</td>
                <td width="40px">散件签收数</td>
                <td width="40px">整件签收数</td>
                <td width="40px">总件数</td>
                <td>操作</td>
             </tr>
            </thead>
          </table>
            <div class="table_contebt">
             <table class="table">
                <tbody>
                    <tr v-for="(item,index) in dataArr" :key="index">
                      <td width="28px">{{index+1}}</td>
                      <td width="180px">{{item.ono}}</td>
                      <td width="100px">{{item.oshsj?item.oshsj:'-'}}</td>
                      <td  width="200px">{{item.oaddress}}</td>
                      <td width="120px">{{item.oqssj?item.oqss:'-'}}</td>
                       <td width="40px">{{item.osjqss?item.osjqss:'-'}}</td>
                      <td width="40px">{{item.ozjqss?item.ozjqss:'-'}}</td>
                      <td width="40px">{{(item.ozjqss+item.osjqss)?(item.ozjqss+item.osjqss):'-'}}</td>
                      <td>
                         <el-radio-group v-model="item.style" size="mini">
                            <el-radio-button label="3">已签收</el-radio-button>
                            <el-radio-button label="2" >运输中</el-radio-button>
                            <el-radio-button label="1">揽件中</el-radio-button>
                         </el-radio-group>
                        </td>
                    </tr>
                </tbody>
             </table>
            </div>
        </div>
       <!-- <div class="pag">
        <el-pagination
         background
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="currentPage"
         :page-sizes="[10, 20, 30, 40]"
         :page-size="10"
         layout="total, sizes, prev, pager, next, jumper"
         :total="100">
        </el-pagination>
        </div> -->
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
    // this.spliceArr();
  },
  watch: {
    data: {
      handler: function(val, oldVal) {
        this.spliceArr();
      },
      deep: true
    }
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
.pag {
  margin-top: 18px;
}
</style>

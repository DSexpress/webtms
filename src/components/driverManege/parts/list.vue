<template>
    <div class="table_main">
        <h3 class="order_title">货运司机账号管理</h3>
        <div class="table_wrap">
          <div class="tool_bar">
              <label for="">名称:</label>
              <el-input label="名称" v-model="userName" placeholder="请输入内容" clearable class="input"></el-input>
            <label for="" style="margin-left:18px;">状态:</label>
              <el-select v-model="statusValue" clearable placeholder="请选择" class="input">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            <el-button type="primary" style="margin-left:18px;">查询</el-button>
            <el-button type="danger" @click="close=true;"> 新增</el-button>
          </div>
          <table class="table">
            <thead>
             <tr>
                <td>序号</td>
                <td>司机ID</td>
                <td>账号名称</td>
                <td>密码</td>
                <td>操作</td>
             </tr>
            </thead>
          </table>
            <div class="table_contebt">
             <table class="table">
                <tbody>
                    <tr v-for="(item,index) in dataArr" :key="index">
                      <td>{{index+1}}</td>
                      <td>{{item.uid}}</td>
                      <td>{{item.uname}}</td>
                      <td>{{item.upwd}}</td>
                      <td>
                        <el-button type="primary" size="mini">编辑</el-button>
                        <el-button type="danger" size="mini"> 停用</el-button>
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
        <overlay :close.sync="close" title="新增司机">
          <edit></edit>
        </overlay>
    </div>
</template>

<script>
import bus from "@/assets/eventBus.js";
import overlay from "@/components/common/overlay";
import edit from "./editUser"
export default {
  data() {
    return {
      close:false,
      dataArr: [],
      currentPage: 1,
      options: [
        {
          value: "1",
          label: "运输中"
        },
        {
          value: "2",
          label: "未分配"
        },
        {
          value: "3",
          label: "已禁用"
        }
      ],
      statusValue:'',
      userName:'',
    };
  },
  components:{overlay,edit},
  created(){
    this.getData();
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    getData(){
      this.$http.get("/TMS/user/getAllUser?type=1").then(res=>{
        if (res.data.status ===1) {
          this.dataArr = res.data.data;
        }
      })
    }
  },
  mounted() {
    bus.$on("closeOverlay",data=>{
      this.close=false;
      this.getData();
    })
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
.tool_bar{
    padding: 24px 0;
}
.pag{
    margin-top: 18px;
}
</style>

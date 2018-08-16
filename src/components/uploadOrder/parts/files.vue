<template>
    <div class="upload_main" id="drag_wrap">
      <div class="upLoad_con" v-show="!showPro">
        <div class="file_btn_wrap">
          <label for="files" id="filesLoad">点击或拖拽上传订单</label>
			    <input type="file" name="file" id="files" @change="onChange($event)" />
        </div>
        <div class="tips_wrap">
          <p><span>格式说明：</span> 支持.xls格式的表格</p>
          <p><span>必填字段：</span> 数据中至少包含地址或者经纬度字段</p>
          <p><span>最大限制：</span> 文件大小不超过15M</p>
          <p><span>下载标准样式：</span> 
            <a class="downfile" :href="downUrl+'/TMS/file/orderMode.xls'" download="订单模板">示例数据下载————订单模板</a>
          </p>
        </div>
      </div>      
      <div class="progress_con" v-show="showPro">
        <i class="el-icon-back file_back" @click="goback()" title="返回"></i>
        <ul class="proList">
          <li v-for="(item,index) of fileArr" :key="index" v-if="item.file.type">
            <span class="file_name">{{item.file.name}}</span>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="item.pre" class="progress" :color="item.color"></el-progress>
          </li>
        </ul>
      </div>
      <overlay :close.sync="close" title="错误信息" >
       
        <div  class="upload_main errorCon">
           <p><span>导入数量：</span> {{impObj.total}}</p>
            <p><span>错误数量：</span> {{impObj.errorNum}}</p>
          <p v-for="(item,index) of erroArr" :key="index">
            {{index+1}}.{{item}}
          </p>
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
      downUrl: this.$a,
      progress: 0,
      jindu: 0,
      showPro: false,
      fileArr: [], //文件集合
      erroArr: [], //错误信息集合
      impObj: {
        total: null,
        errorNum: null
      }
    };
  },
  components: { overlay },
  methods: {
    // 文件上传
    uploadFiles(data, index) {
      this.showPro = true;
      let config = {
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded); //进度值
          var complete = (progressEvent.loaded / progressEvent.total * 100) | 0;
          this.fileArr[index].pre = complete;
        },
        headers: { "Content-Type": "multipart/form-data" }
      }; //添加请求头
      this.$http
        .post("/TMS/uploadfiles/uploadfileOrder", data, config)
        .then(res => {
          if (res.data.status === 1) {
            //  console.log(res.data.impResponse[0].failImpComName)
            bus.$emit("freshOrderList", "runing");
            this.$notify({
              title: "提示",
              message:
                "成功导入" +
                res.data.impResponse[0].sussCount +
                "条，导入失败" +
                res.data.impResponse[0].failCount +
                "条",
              duration: 3000,
              type: "success"
            });
            if (res.data.impResponse[0].failImpComName) {
              this.close = true;
              this.erroArr = [...res.data.impResponse[0].failImpComName];
              this.impObj.total = res.data.impResponse[0].sussCount;
              this.impObj.errorNum = res.data.impResponse[0].failCount;
            } else {
            }
          } else {
            // this.close =true;
            this.fileArr[index].color = "#f56c6c";
            this.$notify({
              title: "提示",
              message: res.data.error,
              duration: 1500,
              type: "warning"
            });
          }
        });
    },
    // 点击上传单个文件
    onChange(event) {
      this.fileArr = [];
      this.erroArr = [];
      if (event.target.files[0]) {
        this.fileArr.push({
          file: event.target.files[0],
          pre: 0,
          color: "#409eff"
        });
        this.fileArr.forEach((item, index) => {
          var fd = new FormData();
          fd.append("file", item.file);
          this.uploadFiles(fd, index);
        });
      }
    },
    dragleave() {
      var that = this;
      drag_wrap.addEventListener("dragleave", function(e) {
        e.preventDefault();
      });
      drag_wrap.addEventListener("dragenter", function(e) {
        e.preventDefault();
      });
      drag_wrap.addEventListener("dragover", function(e) {
        e.preventDefault();
      });
    },
    // 拖拽上传多个文件
    drop() {
      var that = this;
      that.fileArr = [];
      this.erroArr = [];
      drag_wrap.addEventListener("drop", function(e) {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
          console.log(e.dataTransfer.files);
          for (const item in e.dataTransfer.files) {
            that.fileArr.push({
              file: e.dataTransfer.files[item],
              pre: 0,
              color: "#409eff"
            });
          }
          that.fileArr.forEach((item, index) => {
            if (item.file.name) {
              //拖拽上传
              var fd = new FormData();
              fd.append("file", item.file);
              that.uploadFiles(fd, index);
            }
          });
        }
      });
    },
    // 返回上传文件操作区
    goback() {
      this.showPro = false;
      this.fileArr = [];
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.dragleave();
      this.drop();
    });
  }
};
</script>

<style>
.upload_main {
  width: 440px;
  margin: 0 auto;
  height: 314px;
  border: 1px dashed slategray;
  border-radius: 4px;
  position: relative;
}
.errorCon {
  width: 480px;
  height: 400px;
  overflow: auto;
}
.file_back {
  font-size: 20px;
  color: #409eff;
  cursor: pointer;
}
.progress_con {
  box-sizing: border-box;
  padding: 20px;
}
.errorCon p {
  color: #f56c6c;
  font-size: 14px;
  line-height: 30px;
  margin: 0 15px;
  text-indent: 16px;
  border-bottom: 1px dashed slategray;
}
.proList li {
  margin-top: 12px;
}
.proList .progress {
  display: inline-block;
  width: 50%;
  text-indent: 34px;
}
.file_btn_wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.file_name {
  display: inline-block;
}
#filesLoad {
  display: inline-block;
  border: 1px solid #409eff;
  line-height: 40px;
  border-radius: 4px;
  padding: 0 10px;
  color: #409eff;
  transition: all 0.4s;
}
#filesLoad:hover {
  background-color: #409eff;
  color: white;
}
#files {
  display: none;
}
.tips_wrap {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}
.downfile {
  color: #409eff !important;
}
.tips_wrap p {
  font-size: 12px;
  line-height: 28px;
  margin: 0 20%;
}
.tips_wrap p span {
  color: #c1c1c1;
}
</style>

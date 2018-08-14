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
        <ul class="proList">
          <li v-for="(item,index) of fileArr" :key="index" v-if="item.file.type">
            <span class="file_name">{{item.file.name}}</span>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="item.pre" class="progress"></el-progress>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import bus from "@/assets/eventBus.js";
export default {
  data() {
    return {
      downUrl: this.$a,
      progress: 0,
      jindu: 0,
      showPro: false,
      fileArr: []
    };
  },
  methods: {
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
            bus.$emit("freshOrderList", "runing");
            this.$notify({
              title: "提示",
              message: "上传成功！",
              duration: 1500,
              type: "success"
            });
          } else {
            this.$notify({
              title: "提示",
              message: "上传失败！",
              duration: 1500,
              type: "warning"
            });
          }
        });
    },
    onChange(event) {
      this.fileArr = [];
      if (event.target.files[0]) {
        this.fileArr.push({
          file: event.target.files[0],
          pre: 0
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
    drop() {
      var that = this;
      that.fileArr = [];
      drag_wrap.addEventListener("drop", function(e) {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
          console.log(e.dataTransfer.files);
          for (const item in e.dataTransfer.files) {
            that.fileArr.push({
              file: e.dataTransfer.files[item],
              pre: 0
            });
          }
          console.log(that.fileArr);
          that.fileArr.forEach((item, index) => {
            if (item.file.name) {
              var fd = new FormData();
              fd.append("file", item.file);
              that.uploadFiles(fd, index);
            }
          });
        }
      });
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
.progress_con {
  box-sizing: border-box;
  padding: 20px;
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

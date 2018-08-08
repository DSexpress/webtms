<template>
    <div class="upload_main" id="drag_wrap"   v-loading.fullscreen.lock="loading">
        <div class="file_btn_wrap">
          <label for="files" id="filesLoad">点击或拖拽上传订单</label>
			    <input type="file" name="file" id="files" @change="onChange($event)" />
        </div>
        <div class="tips_wrap">
          <p><span>格式说明：</span> 支持常见的.xls .xlsx .csv格式</p>
          <p><span>必填字段：</span> 数据中至少包含地址或者经纬度字段</p>
          <p><span>最大限制：</span> 文件大小不超过15M</p>
        </div>
    </div>
</template>

<script>
import bus from "@/assets/eventBus.js";
export default {
  data(){
    return{
      loading:false,
    }
  },
  methods: {
    uploadFiles(data) {
      this.loading=true;
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      }; //添加请求头
      this.$http
        .post("/TMS/uploadfiles/uploadfileOrder", data, config)
        .then(res => {
          if (res.data.status === 1) {
             this.loading=false;
            bus.$emit("freshOrderList", "runing");
            this.$notify({
              title: "提示",
              message: "上传成功！",
              duration: 1500,
              type: "success"
            });
          } else {
            this.loading=false;
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
      if (event.target.files[0]) {
        var fd = new FormData();
        fd.append("file", event.target.files[0]);
        this.uploadFiles(fd);
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
      drag_wrap.addEventListener("drop", function(e) {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
          // e.dataTransfer.files;
          for (const item in e.dataTransfer.files) {
            var fd = new FormData();
            fd.append("file", e.dataTransfer.files[item]);
            that.uploadFiles(fd);
          }
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
.file_btn_wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
.tips_wrap{
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}
.tips_wrap p{
  font-size: 12px;
  line-height: 28px;
  margin:0 20%;
}
.tips_wrap p span{
  color: #C1C1C1;
}
</style>

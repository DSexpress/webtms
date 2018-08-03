<template>
    <div class="upload_main" id="drag_wrap">
        <div class="file_btn_wrap">
            <label for="files" id="filesLoad">点击或拖拽上传订单</label>
			<input type="file" name="file" id="files" @change="onChange($event)" />
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    onChange(event) {
      if (event.target.files[0]) {
        var fd = new FormData();
        fd.append("file", event.target.files[0]);
        // fd.append("systemId", 2);
      }
    },
    dragleave() {
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
      drag_wrap.addEventListener("drop", function(e) {
        e.preventDefault();
        alert(11)
        console.log(e.dataTransfer.files);
        if (e.dataTransfer.files.length) {
            e.dataTransfer.files.forEach((item,index)=>{
                //请求,上传多个文件
            })
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
</style>

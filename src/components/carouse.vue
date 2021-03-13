<template>
<div>
    <el-row type="flex" class="row-bg" justify="space-around">
    <el-col :span="6">
        <div class="grid-content bg-purple">
          
  <el-upload
  class="upload-demo"
  ref="upload"
  action="/api/admin/user/uploadCarousel"
  :http-request="httpRequest"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false"
  :on-success="success"
  :on-error="error"
  multiple
  >
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>

    </div>
  </el-col>
</el-row>
</div>

</template>

<script>
  import axios from "axios";
  export default {
    name:'carouse',
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      error(response, file, fileList){
        alert("您上传失败")
      },
      success(response, file, fileList){
        alert("您上传成功")
      },
      beforeUpload(file){
        console.log(file)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
      },
      submitUpload(event) {
           this.$refs.upload.submit();
      },
 

  httpRequest(param){
  console.log(param)
  let url = "/api/admin/user/uploadCarousel";
  let fileObj = param.file // 相当于input里取得的files
  let fd = new FormData()// FormData 对象
  fd.append('carouselFile', fileObj)// 文件对象
 
  let config = {
    headers: {
     'Content-Type': 'multipart/form-data'
    }
  }
  axios.post(url,fd,config).then(res=>{
  //  if(res.code===0){
  //    this.submitForm();//提交表单
  //}
  this.fileList.shift()
  })
}
    },
  
  }
</script>
<style>

.grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

</style>
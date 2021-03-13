<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="课程名称" prop="name" >
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="所属课程" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择课程" @change="upcourse">
        <el-option :label="item.generalName" :value="item.generalId" v-for="item in list" :key="item.generalName"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="特殊资源" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="vip"></el-radio>
      <el-radio label="free"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="课程激活码">
    <el-input type="text" v-model="ruleForm.desc"  placeholder="vip请填写激活码"></el-input>
  </el-form-item>

  <el-form-item label="课程内容">
    <el-upload
  class="upload-demo"
  ref="upload"
  action="/api/api/admin/content/insertTopic"
  :http-request="httpRequest"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false"
  :on-success="success"
  :on-error="error"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
  </el-form-item>

  <el-form-item label="传缩略图">
    <el-upload
  class="upload-demo"
  ref="upload2"
  action="/api/api/admin/content/insertTopic"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileListOne"
  :auto-upload="false"
  :on-success="success"
  :on-error="error"
  :before-upload="uppdf"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
  </el-form-item>


  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
  

  
</el-form>
</template>
<script>
import axios from 'axios';
  export default {
    name:'chapter',
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          type: [],
          resource: '',
          desc: ''
        },
        upPdf:[],
        // fd:new FormData(),
        list:["暂无数据"],
        delist:["暂无数据"],
        
        rules: {
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]
        },
        //上传pdf
        fileList: [],
        fileListOne:[]
      };
    },
    mounted(){
      this.firstDe()
    },
    methods: {
      //代码调试
      
      //课程信息
      upcourse(vId){
         this.delist.shift()
         this.delist.push(vId)
      },
      
    firstDe(){
         axios({
           method:"GET",
              url:'/api/admin/content/listGeneralClasses',
              headers:{
                "Content-Type":"application/x-www-form-urlencoded"
              },
              data:{

              }
              }) .then(res=>{
                this.list.shift()
               for(let i=0;i<res.data.data.length;i++){
                 this.list.push(res.data.data[i])
               }
         })
       },
      //上传按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          } else {
            console.log('error submit!!');
            return false;
          }
        this.$refs.upload.submit();

        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //上传pdf
     
       error(response, file, fileList){
        alert("您上传失败")
      },
      success(response, file, fileList){
      },
      beforeUpload(file){
        // console.log(file)
      },
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handlePreview(file) {
      },
      

      
      //上传图片
      uppdf(file){
        console.log(file)
        this.fd.append('thumbnailFile',file)
      },
      httpRequestOne(param){
         console.log(param)
        this.upPdf.push(param)
      },
   httpRequest(param){
    //  console.log(param.file)
   let url = "/api/admin/content/insertTopic ";
   let fileObj = param.file // 相当于input里取得的files
  let fd = new FormData()// FormData 对象
   fd.append('srcFile', fileObj)// 文件对象
   fd.append('generalId', this.delist)
   fd.append('topicName', this.ruleForm.name)
   fd.append('srcValue', this.ruleForm.resource)
   fd.append('thumbnailFile', this.upPdf)
   let config = {
     headers: {
      'Content-Type': 'multipart/form-data'
     }
   }
   axios.post(url,fd,config).then(res=>{
    if(res.code===0){
      this.submitForm();//提交表单
    }
   }).then(res=>{
   })
 }
    },
  
  }
</script>
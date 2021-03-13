
<template>
<div>
  <!-- 输入框 -->
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="名称" prop="pass">
    <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">
      提交
      </el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form> 
</div>
 

</template>

<script>
import axios from 'axios';
// import Qs from "qs";
//        let chedata = {
//                 userName:'this.ruleForm.pass',
//                 passWord:'this.ruleForm.checkPass'
//               };
import Qs from "qs";
export default {
     data() {
       var validatePass = (rule, value, callback) => {
         if (value === '') {
           callback(new Error('请输入名称'));
         } else {
           if (this.ruleForm.checkPass !== '') {
             this.$refs.ruleForm.validateField('checkPass');
           }
           callback();
         }
       };
       var validatePass2 = (rule, value, callback) => {
         if (value === '') {
           callback(new Error('请输入密码'));
         } else {
           callback();
         }
       };
       
       
       return {
           
         ruleForm: {
           pass: '',
           checkPass: '',
         },
         rules: {
           pass: [
             { validator: validatePass, trigger: 'blur' }
           ],
           checkPass: [
             { validator: validatePass2, trigger: 'blur' }
           ],
         }
       };
     },
     methods: {
       
       submitForm(formName) {
        this.$router.push("/addCourse")//
        //  this.$refs[formName].validate((valid) => {
        //    if (valid) {
             console.log(this.ruleForm.checkPass)
             console.log(this.ruleForm.pass)
            axios({
              method:'post',
              url:'/api/admin/user/login',
              data: Qs.stringify({
                userName:this.ruleForm.pass,
                passWord:this.ruleForm.checkPass
              }),
              }) .then((res) => {
        console.log(res);
        console.log(Object.prototype.toString.call(res.data.data));
      });
    },
  
        //    } else {
        //      alert("输入错误")
        //    }
        //  });
       
       resetForm(formName) {
         this.$refs[formName].resetFields();
       }
     }
   }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

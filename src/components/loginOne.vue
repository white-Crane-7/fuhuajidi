<template>
  <div class="login-page">
    <div class="login-page-form">
      <el-form ref="login" :model="form" class="login-form">
        <el-form-item label="用户名" prop='name' :rules='{required:true,message:"用户名不能为空"}'>
          <el-input type='text' v-model='form.name' placeholder='请输入登录名'></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='pass' :rules='{required:true,message:"密码不能为空"}'>
          <el-input type='password' v-model='form.pass' placeholder='请输入密码'></el-input>
        </el-form-item>
        <el-button @click="submitFormcode('login')" type="primary">点击登录</el-button>
      </el-form>
    </div>
  </div>
  
</template>
<script>

import axios from 'axios';
import Qs from "qs";
export default {
    name:'loginOne',
  data() {
    return {
      form: {
        name: "",
        pass: ""
      }
    };
  },
  methods: {
    submitFormcode(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // axios({
          //     method:'post',
          //     url:'/api/admin/user/login',
          //     data: Qs.stringify({
          //       userName:this.form.name,
          //       passWord:this.form.pass
          //     }),
          //     }) .then((res) => {
          //         console.log(res.data)
          //       if(res.data.code === 201){
          //           alert("密码错误")
          //       }else(
                     this.$router.push("/addCourseOne")
          //       )
          //       });
          
        }
      });
    }
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  height: 100%;
  font-size: 14px;
}

.login-page {
  height: 100%;
  background: url(../../img/bg2.jpg) no-repeat #f0f0f0;
  background-size: 100%;
}

.login-page-form {
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 360px;
  margin: -200px 0 0 -180px;
}

.login-form {
  background: #fff;
  padding: 12px 24px 36px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .el-button {
    width: 100%;
  }
}

.login-copy-right {
  color: #999;
}
</style>
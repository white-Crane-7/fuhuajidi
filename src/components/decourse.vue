<template>
 <div title="分类课程" >
              <el-form :model="form">
                <el-form-item label="分类课程名称" :label-width="formLabelWidth">
                  <el-select v-model="form.region" @change="upcourse">

                     <el-option
                        v-for="item in list"
                        :key="item.generalName"
                        :label="item.generalName"
                        :value="item.generalId">
                     </el-option>
                    
                  </el-select>
                </el-form-item>
              </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="decourse">删除</el-button>
            </div>
</div>
    
</template>

<script>
import axios from 'axios';
import Qs from "qs";
export default {
    
    name:'decarouse',
    data() {
      return {
        dialogTableVisible: false,
        dialogFormVisible: true,
        selectText:"请选择分类课程",
        formLabelWidth: '120px',
        form: {
          reigon:'',
        },
        list:["暂无数据"],//存放课程
        delist:[],//选中的课程
      };
    },
    mounted(){
      this.firstDe()
    },
    methods:{
upcourse(vId){
         this.delist.shift()
         this.delist.push(vId)
      //     let obj = {};
      //     obj = this.list.find((item)=>{//这里的selectList就是上面遍历的数据源
      //     return item.generalName === vId;//筛选出匹配数据
      // });
      // console.log(obj.generalName);//我这边的name就是对应label的
      // console.log(obj.id);
       },
       decourse(){
          this.dialogFormVisible = false
          axios({
           method:"POST",
              url:'/api/admin/content/deleteGeneralClass',
              headers:{
                "Content-Type":"application/x-www-form-urlencoded"
              },
              data:Qs.stringify({
                generalId:this.delist[0]
              })
              }) .then(res=>{
                this.list.shift()
                
         })
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
       }
    }
}
</script>
<style>
    .grid-content {
    border-radius: 4px;
    min-height: 36px;
    text-align: center;
  }
  .image{
    width: 10rem;
    height: 8rem;
    
  }
  .divImage{
    width: 10rem;
    height: 8rem;
    margin: 1rem;
    display: inline-block;
    position: relative;
  }
  /* .el-icon-circle-check{
      font-size: 3rem;
      position: absolute;
      color: #fff;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: none;
      } */
</style>
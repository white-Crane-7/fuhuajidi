<template>
<div>
  <div>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button  type="info" plain  @click="forCourse">
            分类课程上传
          </el-button>
        </div>
        </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button  type="info" plain  @click="forChapter">
          章节上传
          </el-button>
        </div>
        </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button  type="info" plain @click="forCarouse">
          轮播图上传
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>

  <div>

    <!-- 删除分类课程 -->
  <el-row type="flex" class="row-bg" justify="space-around">
    <el-col :span="6">
        <div class="grid-content bg-purple">
          
          <el-button type="text" @click="dialogFormVisible=true">删除分类课程</el-button>

          <el-dialog title="分类课程" :visible.sync="dialogFormVisible">
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
          </el-dialog>

        </div>
    </el-col>
  </el-row>
  <!-- 删除轮播图 -->
  <el-row type="flex" class="row-bg" justify="space-around">
    <el-col :span="6">
        <div class="grid-content bg-purple">
          
          <el-button type="text" @click="dialogFormVisible=true">删除轮播图</el-button>

          <el-dialog title="轮播图名字" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="轮播图" :label-width="formLabelWidth">
                  
                  <div class="divImage" v-for="item in listOne" :key="item.arouseId"  @click="imagechoose">
                    <img :src="item.link" class="image" :alt="item.arouselId">
                  </div>
                  
                </el-form-item>
              </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="decarouse">删除</el-button>
            </div>
          </el-dialog>

        </div>
    </el-col>
  </el-row>

  </div>        
</div>

</template>

<script>
import axios from 'axios';
import Qs from "qs";
 export default {
     name:'addCourse',
    data() {
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        selectText:"请选择分类课程",
        formLabelWidth: '120px',
        form: {
          reigon:'',
        },
        list:["暂无数据"],//存放课程
        listOne:["暂无数据"],//存放轮播图
        delist:[],//选中的课程
        delistCarouse:[],//选中的轮播图
      };
    },
    mounted(){
      this.firstDe()
      this.firstDeOne()
    },
    methods: {
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handlePreview(file) {
      },
      forCourse() {
         this.$router.push("/course");
       },
       forChapter() {
         this.$router.push("/chapter");
       },
       forCarouse() {
         this.$router.push("/carouse");
       },
       //删除轮播图
       decarouse(){
         axios({
           method:"POST",
              url:'/api/admin/user/deleteCarousel',
              headers:{
                "Content-Type":"application/x-www-form-urlencoded"
              },
              data:Qs.stringify({
                carouselId:this.delistCarouse[0]
              })
              }) .then(res=>{
                this.listOne.shift()
         })
       },
       imagechoose(e){
         this.delistCarouse.shift()
        console.log(e.target.alt)
        this.delistCarouse.push(e.target.alt)
       },
       firstDeOne(){
         axios({
           method:"GET",
              url:'/api/admin/user/listAllCarousels',
              headers:{
                "Content-Type":"application/x-www-form-urlencoded"
              },
              data:{

              }
              }) .then(res=>{
                console.log(res)
                this.listOne.shift()
               for(let i=0;i<res.data.data.length;i++){
                 this.listOne.push(res.data.data[i])
               }
                
                console.log("list:",this.listOne)
         })
       },
       //删除分类课程
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
  }
  
</style>

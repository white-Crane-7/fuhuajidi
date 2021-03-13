<template>
<div>
    <div title="轮播图名字">
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="decarouse">删除</el-button>
            </div>

              <el-form :model="form">
                <el-form-item :label-width="formLabelWidth">
                  
                  <div class="divImage" v-for="item in listOne" :key="item.arouseId"  @click="imagechoose">
                    <img :src="item.link" class="image" :alt="item.arouselId" id="img">
                  </div>
                  
                </el-form-item>
              </el-form>

            
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
        listOne:[],//存放轮播图
        delistCarouse:[],//选中的轮播图
      };
    },
    mounted(){
      this.firstDeOne()
    },
    methods:{
      
        imagechoose(e){
        this.delistCarouse.push(e.target.alt);
        console.log(this.delistCarouse)
       },
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
                // for (let index = 0; index < listOne.length; index++) {
                //   this.listOne.shift()
                  
                // }
                // this.firstDeOne()
                window.location.reload();
         })
         
        
       },
      //  imagechoose(e){
      //    this.delistCarouse.shift()
      //   console.log(e.target.alt)
      //   this.delistCarouse.push(e.target.alt)
      // },
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
                this.listOne.shift()
               for(let i=0;i<res.data.data.length;i++){
                 this.listOne.push(res.data.data[i])
               }
                
         })
       },
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
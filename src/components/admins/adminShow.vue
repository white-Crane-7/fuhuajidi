<template>
  <el-table
    :data="adminlist.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="管理员ID"
      prop="adminId">
    </el-table-column>
    <el-table-column
      label="管理员名字"
      prop="userName">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios';
import  Qs from 'qs'
  export default {
    data() {
      return {
        tableData: [],
        search: '',
        adminlist:[]
      }
    },
    mounted(){
      this.showadmin()
    },
    
    methods: {
      showadmin(){
        axios({
           method:"GET",
              url:'/api/admin/user/listAll',
              headers:{
                "Content-Type":"application/x-www-form-urlencoded"
              },
              }) .then(res=>{
              for(let i=0;i<res.data.data.length;i++){
                 this.adminlist.push(res.data.data[i])
               }
         }),
          console.log(this.adminlist)
      },
      handleDelete(index, row) {
        console.log(index);
        console.log(row);
         axios({
            method:"POST",
               url:'/api/admin/user/delete',
               headers:{
                 "Content-Type":"application/x-www-form-urlencoded"
               },
               data:Qs.stringify({
                 userName:row.userName
               })
               }) .then(res=>{
               this.tableData.splice(index,1)
          })
      }
    },
  }
</script>
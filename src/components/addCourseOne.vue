 <template>
    <div>
         <el-radio-group v-model="isCollapse" class="showHeader"  fill="#094f97">
            <el-radio-button :label="false">展开</el-radio-button> 
            <el-radio-button :label="true">收起</el-radio-button> 
        </el-radio-group>
        <div style="display: flex;">
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title" append-to-body>
                   <i class="el-icon-menu"></i>
                    <span slot="title">增删课程</span>
                </template>
                <el-menu-item-group>
                    <span slot="title">轮播图</span>
                    <el-menu-item index="1-1"><router-link to="/carouse">上传轮播图</router-link></el-menu-item>
                    <el-menu-item index="1-2"><router-link to="/decarouse" >删除轮播图</router-link></el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分类课程">
                    <el-menu-item index="1-3"><router-link to="/course">添加分类课程</router-link></el-menu-item>
                    <el-menu-item index="1-4"><router-link to="/decourse">删除分类课程</router-link></el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="章节">
                    <el-menu-item index="1-5"><router-link to="/chapter">添加章节</router-link></el-menu-item>
                    <el-menu-item index="1-6">删除章节</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                <template slot="title" append-to-body>
                   <i class="el-icon-s-custom"></i>
                    <span slot="title">管理员设置</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1"><router-link to="/adminShow">管理员展示</router-link></el-menu-item>
                    <el-menu-item index="2-2"><router-link to="/adminAd">添加管理员</router-link></el-menu-item>
                </el-menu-item-group>
                </el-submenu>
                
            </el-menu>
            <div class="routerShow">
                <router-view></router-view>
            </div>
        </div>
        
    </div>
    
</template>
<style>
    .routerShow{
        flex: 1;
    }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .showHeader{
      background-color: #094f97;
      width: 100%;
  }
</style>

<script>
  export default {
      name:'addCourseOne',
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
        
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
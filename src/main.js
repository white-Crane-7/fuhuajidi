import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios'

//import App from './components/addCourseOne.vue'//
//import App from './components/carouse.vue'//轮播图
//import App from './components/chapter.vue'//章节
//import App from './components/course.vue'//分类课程


import App from './App.vue'
//import App from '../src/components/login.vue'//登录
//import App from './components/upLoad.vue'//分类课程



Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'

import addCourseOne from '../components/addCourseOne.vue'
import loginOne from '../components/loginOne.vue'
import carouse from '../components/carouse.vue'
import decarouse from '../components/decarouse.vue'
import course from '../components/course.vue'
import decourse from '../components/decourse.vue'
import chapter from '../components/chapter.vue'
import adminAd from '../components/admins/adminAd.vue'
import adminShow from '../components/admins/adminShow.vue'



const routes = [
  {
    path: '/',
    name: 'loginOne',
    component:loginOne
  },{
     path: '/addCourseOne',
     name: 'addCourseOne',
     component:addCourseOne,
     children:[
       {
         path:'/carouse',
         component:carouse,
       },
       {
        path:'/decarouse',
        component:decarouse,
      },{
        path:'/course',
        component:course,
      },{
        path:'/decourse',
        component:decourse,
      },{
        path:'/chapter',
        component:chapter,
      },{
        path:'/adminAd',
        component:adminAd,
      },{
        path:'/adminShow',
        component:adminShow,
      }
     ]
   },
  //    path: '/carouse',
  //    name: 'carouse',
  //    component: carouse
  //  },{
  //    path: '/course',
  //    name: 'course',
  //    component: course
  //  },{
  //    path: '/chapter',
  //    name: 'chapter',
  //    component: chapter
  //  },{
  //    path: '/upLoad',
  //    name: 'upLoad',
  //    component: upLoad
  //  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
Vue.use(VueRouter)
export default router

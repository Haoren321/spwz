import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home"
import homeHeader from "../components/homePage/homeHeader"
import uploadVideo from "../views/uploadVideo";
import videopage from "../views/video"
import userSpace from "../views/userSpace"
import user from "../components/userSpace/user"
import videoManage from "../components/userSpace/videoManage"
import adminSystem from "../views/adminSystem"
import tmp_video from "../components/adminSystem/tmp_video"

Vue.use(VueRouter);

// const routes = [
//   {
//     path: "/uploadVideo",
//     name: "uploadVideo",
//     component: uploadVideo
//   }
//   {
//     path: "/about",
//     name: "about",
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ "../views/About.vue")
//   }
// ];
export default new VueRouter({
  mode:'history',
  routes:[{
      path: "/",
      // name: "uploadVideo",
      // component: uploadVideo 
      redirect: "/Home" 
  },
  {
    path: "/Home",
    name: "Home",
    component: Home
  },
  {
    path: "/uploadVideo",
    name: "uploadVideo",
    component: uploadVideo
  },
  {
    path: "/video/:id",
    name: "videopage",
    component: videopage
  },
  {
    path:"/userSpace",
    name:"userSpace",
    component:userSpace,
    children:[
      {path:"user",name:'首页',component:user},
      {path:"videoManage",name:'视频管理',component:videoManage}
    ]
  },
  {
    path:"/adminSystem",
    name:"adminSystem",
    component:adminSystem,
    children:[
      {path:"/adminSystem/tmp_video",name:"审核视频",component:tmp_video}
    ]
  }
]
});

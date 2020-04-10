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
import visitorSpace from "../components/userSpace/visitorSpace"
import errorPage from "../components/errorPage"
import fans from "../components/userSpace/fans"
import category from "../views/category"
import cateforyItem from "../components/categoryPage/cateforyItem"
import search from "../views/search"
import report from "../components/adminSystem/report"
import videoSystemMange from "../components/adminSystem/videoSystemManage"

Vue.use(VueRouter);

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
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
  mode: 'history',
  routes: [{
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
    path: "/visitorSpace/:id",
    name: "visitorSpace",
    component: visitorSpace
  },
  {
    path: "/error/errorPage",
    name: "errorPage",
    component: errorPage
  },
  {
    path: "/userSpace",
    name: "userSpace",
    component: userSpace,
    children: [
      { path: "user", name: '首页', component: user },
      { path: "videoManage", name: '视频管理', component: videoManage },
      { path: "fans", name: '粉丝关注', component: fans }
    ]
  },
  {
    path: "/category",
    name: "category",
    component: category,
    children: [
      { path: "/category/:names", name: "cateforyItem", component: cateforyItem }
    ]
  },
  {
    path: "/search",
    name: "search",
    component: search,
  },
  {
    path: "/adminSystem",
    name: "adminSystem",
    component: adminSystem,
    children: [
      { path: "/adminSystem/tmp_video", name: "审核视频", component: tmp_video },
      { path: "/adminSystem/report", name: "投诉稿件", component: report },
      { path: "/adminSystem/videoSystemMange", name: "管理视频", component: videoSystemMange }
    ]
  },
  ]
});

<template>
  <div id="category">
    <div id="header-warp">
      <homeHeader />
    </div>
    <div id="content-container">
      <nav id="categoryNav">
        <li class="navItem">
          <router-link to="/Home">首页</router-link>
        </li>
        <li class="navItem">
          <router-link to="/category/rank">排行榜</router-link>
        </li>
        <li class="navItem">
          <router-link to="/category/comic">动画</router-link>
        </li>
        <li class="navItem">
           <router-link to="/category/game">游戏</router-link>
        </li>
        <li class="navItem">
          <router-link to="/category/music">音乐</router-link>
        </li>
        <li class="navItem">
         <router-link to="/category/learn">学习</router-link>
        </li>
      </nav>
      <div id="contentItem">
        <router-view id="contentItemView"/>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#category{
  width: 100%;
  height: auto;
}
li {
  list-style: none;
}
#header-warp {
  height: 82px;
}
#content-container {
  margin: 10px auto;
  width: 1108px;
  background: #17233d;
}
#categoryNav {
  width: 100%;
  height: 38px;
  text-align: left;
  border-bottom: 1px solid rgba($color: #000000, $alpha: .4);
  //   background: rgba(0, 0, 0, 0.4);
}
#contentItem {
  width: 100%;
  height: auto;
}
.navItem {
  display: inline-block;
  width: 48px;
  height: 100%;
}
.navItem > a {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 40px;
  color: #d9dadd;
}
.navItem > a:hover {
  color: #2d8cf0;
}
#contentItemView{
  height: auto;
}
</style>
<script>
import homeHeader from "../components/homePage/homeHeader";
export default {
  components: {
    homeHeader
  }
};
</script>
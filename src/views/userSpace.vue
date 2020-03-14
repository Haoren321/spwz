<template>
  <div id="userSpace">
    <div id="header-warp">
      <homeHeader />
    </div>
    <div id="contetn-warp">
      <div id="leftMenu">
        <span>个人中心</span>
        <Divider style="background:rgba(0,0,0,.4);margin:0" />
        <div class="menu">
          <li class="menuStyle">
            <router-link to="/userSpace/user">首页</router-link>
          </li>
          <li class="menuStyle">
            <router-link to="/userSpace/videoManage">视频管理</router-link>
          </li>
          <li class="menuStyle">
            <router-link to="/userSpace/aa">user</router-link>
          </li>
        </div>
      </div>
      <div id="itemView">
        <div class="item-tile">
          <span></span>
          {{itemTitle}}
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
html,body{
  height: auto;
  background: #1b2838;
}
#app{
  height: 100%;
}
#header-warp {
  width: 100%;
  height: 82px;
}
#userSpace {
  //min-height: 800px;
  height: 100%;
}
#contetn-warp {
  display: flex;
  flex-direction: row;
  width: 782px;
  height: 100%;
  margin: 10px auto;
  box-shadow: 1px 2px 5px rgba($color: #000000, $alpha: 0.8);
  background: rgba($color: #273c68, $alpha: 0.4);
}
.item-tile {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 52px;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.4);
  font-size: 16px;
  line-height: 52px;
  text-align: left;
}
.item-tile > span {
  display: inline-block;
  width: 6px;
  height: 28px;
  background: #273c68;
  margin: 10px 8px 0 20px;
  border-radius: 4px;
}
#leftMenu {
  width: 150px;
  height: 100%;
}
.menuStyle {
  padding: 0;
  margin: 0;
  list-style-type: none;
  height: 42px;
  width: 100%;
  //border-bottom: 1px dashed rgba($color: #0b101d, $alpha: .4);
}
#leftMenu > span {
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  height: 52px;
  text-align: center;
  line-height: 52px;
}
.menuStyle > a {
  display: block;
  color: #fff;
  text-align: center;
  line-height: 42px;
  font-size: 14px;
  width: 100%;
  height: 100%;
  font-weight: 300;
  &:hover {
    color: #2d8cf0;
    background: rgba($color: #000000, $alpha: 0.2);
  }
}
.router-link-active {
  background: rgba($color: #000000, $alpha: 0.4);
}
#itemView {
  border-left: 1px solid rgba($color: #000000, $alpha: 0.4);
  height: 100%;
  width: 731px;
  background: #17233d;
}
</style>
<script>
import homeHeader from "../components/homePage/homeHeader";
export default {
  components: {
    homeHeader
  },
  beforeCreate() {
    if (!this.$store.state.isLogin) {
      this.$router.push({ path: "/Home" });
    }
  },
  data() {
    return {
      itemTitle: this.$route.name
    };
  },
  watch: {
    $route(to, from) {
      //console.log(to,from);
      this.itemTitle = to.name;
    }
  },
  methods: {
    gotoItemView(e) {
      //console.log(e);
    }
  }
};
</script>

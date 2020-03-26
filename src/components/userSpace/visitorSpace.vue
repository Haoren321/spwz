<template>
  <div id="userSpace">
    <header>
      <homeHeader />
    </header>
    <div id="container">
      <div id="visitorUser">
        <div class="userIcon">
          <img :src="'/api/'+user.userIcon" alt srcset />
        </div>
        <div class="userName">{{user.userName}}</div>
      </div>
      <div class="xhx"></div>
      <p class="htitle">TA的视频</p>
      <div id="contribute">
        <Card :bordered="false" class="cardUi" v-for="(item,index) in info" v-bind:key="index">
          <p class="cardText">视频名称：{{item.title}}</p>
            <router-link :videoInfo="item" :to="'/video/'+item.sv_id" class="cardImg">
            <img :src="'/api/'+ item.cover_img" alt srcset />
            <div class="plyBtn"><Icon type="ios-play" size="46" color="white" class="icon" /></div>
            </router-link>
          <div class="xhx" style="background: #ffffff;"></div>
          <p class="cardText">简介：{{item.introduction}}</p>
          <p class="cardText">类型：{{item.tags}}</p>
          <p class="cardText">播放数：{{item.cout_watch}}</p>
        </Card>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
header {
  height: 82px;
}
#container {
  margin: 10px auto;
  width: 828px;
  background: #17233d;
}
#visitorUser {
  display: flex;
  flex-direction: row;
  padding: 10px;
}
.htitle{
  text-indent: 10px;
  text-align: left;
}
.userIcon {
  width: 64px;
  height: 64px;
  border-radius: 52px;
}
.userIcon > img {
  width: 64px;
  height: 64px;
  background: #fff;
  border-radius: 48px;
  object-fit: cover;
}
.userName {
  margin: 20px 0 0 10px;
}
.xhx {
  width: 98%;
  margin: 8px auto;
  height: 1px;
  background: rgba($color: #000000, $alpha: 0.4);
}
#contribute {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.cardUi {
  background: #0e1625;
  width: 260px;
  color: #fff;
  margin: 8px;
  text-align: left;
}
.cardImg {
  position: relative;
  display: block;
  width: 228px;
  height: 200px;
  overflow: hidden;
}
.cardImg > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.plyBtn{
  position: absolute;
  width: 228px;
  height: 200px;
  top:245px;
  transition: top 200ms;
  background: rgba($color: #000000, $alpha: 0.4);
}
.cardImg:hover>.plyBtn{
  top: 0px;
}
.cardText {
  margin: 4px 0;
  font-weight: 400;
}
.icon{
  position: relative;
  left: 40%;
  top: 40%;
  border-radius: 50%;
  padding-left: 6px;
  border: 4px solid rgba($color: #ffffff, $alpha: 0.8);
}
</style>
<script>
import homeHeader from "../homePage/homeHeader";
export default {
  components: {
    homeHeader
  },
  data() {
    return {
      info: "",
      user: {
        userId: "",
        userIcon: "",
        userName: ""
      },
      contribute: ""
    };
  },
  mounted() {
    let path = this.$route.path;
    let itemArray = path.split("/");
    this.getInfo(itemArray[2]);
  },
  methods: {
    getInfo(item) {
      let info = new FormData();
      info.append("code", "getInfo");
      info.append("userId", item);
      this.$axios({
        method: "post",
        data: info,
        url: "/api/controller/visitor.php"
      }).then(res => {
        if (res.data == "") {
          this.$router.push({ path: "/error/errorPage" });
        } else {
          this.info = res.data;
          this.user.userId = res.data[0].userId;
          this.user.userIcon = res.data[0].userIcon;
          this.user.userName = res.data[0].userName;
          console.log(res.data);
        }
      });
    }
  }
};
</script>
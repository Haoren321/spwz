<template>
  <div id="fans">
    <div id="fansList">
      <p class="ftitle">粉丝列表：</p>
      <div class="list">
        <div class="listItem" v-for="(item,index) in fans" v-bind:key="index">
          <a :href="'/visitorSpace/'+item.foucsUserId" class="fansImg">
            <img :src="'/api/'+item.foucsUserIcon" alt srcset />
            <p class="fansName">{{item.foucsUserName}}</p>
          </a>
        </div>
      </div>
    </div>
    <div id="careList">
      <p class="ftitle">关注列表：</p>
      <div class="listItem" v-for="(item,index) in care" v-bind:key="index">
        <a :href="'/visitorSpace/'+item.beFoucsId" class="fansImg">
          <img :src="'/api/'+item.beFoucsIcon" alt srcset />
          <p class="fansName">{{item.beFoucsName}}</p>
        </a>
        <Button  type="primary" class="fansFoucsBtn" @click="setCare(index)" v-if="!isFocus">未关注</Button>
        <Button class="fansFoucsBtn" @click="cancelFoucs(index)" v-if="isFocus">已关注</Button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.listItem {
  display: flex;
  flex-direction: row;
  padding: 8px 18px;
  justify-content: space-between;
  border-bottom: 1px dashed rgba($color: #000000, $alpha: 0.6);
  margin: 4px;
}
.fansImg {
  display: flex;
  flex-direction: row;
}
.fansImg > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.fansName {
  margin-top: 14px;
  margin-left: 8px;
}
.fansFoucsBtn {
  margin-top: 4px;
}
.ftitle {
  text-align: left;
  text-indent: 10px;
  margin: 4px;
  font-size: 14px;
}
</style>
<script>
export default {
  data() {
    return {
      user: this.$store.state.user,
      fans: "",
      care: "",
      isFocus: true
    };
  },
  mounted() {
    this.getFansInfo();
  },
  methods: {
    getFansInfo() {
      let userInfo = new FormData();
      let userId = this.user.userId;
      userInfo.append("code", "fansGet");
      userInfo.append("userId", userId);
      this.$axios({
        method: "post",
        data: userInfo,
        url: "/api/controller/userSpace.php"
      }).then(res => {
        this.fans = res.data.fans;
        this.care = res.data.care;
        console.log(this.care);
      });
    },
    setCare(index) {
      console.log(this.care);
        let foucsId = this.$store.state.user.userId;
        let beFoucsId = this.care[index].beFoucsId;
        let beFoucsName = this.care[index].beFoucsName;
        let foucsName = this.$store.state.user.userName;
        let foucsIcon = this.$store.state.user.userIcon;
        let beFoucsIcon = this.care[index].beFoucsIcon;
        let foucs = new FormData();
        foucs.append("code", "upFoucs");
        foucs.append("foucs", foucsId);
        foucs.append("beFoucs", beFoucsId);
        foucs.append("beFoucsName", beFoucsName);
        foucs.append("foucsName",foucsName);
        foucs.append("foucsIcon",foucsIcon);
        foucs.append("beFoucsIcon",beFoucsIcon);
        this.$axios({
          method: "post",
          data: foucs,
          url: "/api/controller/svideoCtro.php"
        }).then(res => {
          if (res.data == 1) {
            this.isFocus = true;
          }
          console.log("bb", res.data);
        });
    },    
    cancelFoucs(index) {
      let foucsId = this.$store.state.user.userId;
      let beFoucsId = this.care[index].beFoucsId;
      let foucs = new FormData();
      foucs.append("code", "delFoucs");
      foucs.append("foucs", foucsId);
      foucs.append("beFoucs", beFoucsId);
      this.$axios({
        method: "post",
        data: foucs,
        url: "/api/controller/svideoCtro.php"
      }).then(res => {
        if (res.data == 1) {
          this.isFocus = false;
        }
        console.log("aa", res.data);
      });
    }
  }
};
</script>
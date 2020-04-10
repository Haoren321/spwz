<template>
  <div id="cateforyItem">
    <div id="content" v-if="itemId != 'rank'">
      <Card :bordered="false" class="cardUi" v-for="(item,index) in videoArray" v-bind:key="index">
        <p class="cardText">视频名称：{{item.title}}</p>
        <router-link :videoInfo="item" :to="'/video/'+item.sv_id" class="cardImg">
          <img :src="'/api/'+ item.cover_img" alt srcset />
          <div class="plyBtn">
            <Icon type="ios-play" size="46" color="white" class="icon" />
          </div>
        </router-link>
        <div class="xhx" style="background: #ffffff;"></div>
        <p class="cardText">简介：{{item.introduction}}</p>
        <p class="cardText">类型：{{item.tags}}</p>
        <p class="cardText">播放数：{{item.cout_watch}}</p>
      </Card>
    </div>
    <div id="rank" v-if="itemId == 'rank'">
      <div class="rank-item" v-for="(item,index) in videoArray" :key="index">
        <div class="num">{{index + 1 }}</div>
        <div class="rank-conten">
          <a :href="'/video/'+item.sv_id" class="img">
            <img :src="'/api/'+item.cover_img" alt srcset />
          </a>
          <a class="rank-info" :href="'/video/'+item.sv_id">
            <div class="item-title">{{item.title}}</div>
            <div class="item-content">
              <div class="item-coutWatch">播放数：{{item.cout_watch}}</div>
              <div class="item-tags">视频分类：{{item.tags}}</div>
              <div class="item-authro">
                <a :href="'/visitorSpace/'+item.author">作者：{{item.userName}}</a>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
#cateforyItem {
  width: 100%;
  height: 100%;
}
#content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.cardUi {
  background: #0e1625 !important;
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
.plyBtn {
  position: absolute;
  width: 228px;
  height: 200px;
  top: 245px;
  transition: top 200ms;
  background: rgba($color: #000000, $alpha: 0.4);
}
.cardImg:hover > .plyBtn {
  top: 0px;
}
.cardText {
  margin: 4px 0;
  font-weight: 400;
}
.icon {
  position: relative;
  left: 40%;
  top: 40%;
  border-radius: 50%;
  padding-left: 6px;
  border: 4px solid rgba($color: #ffffff, $alpha: 0.8);
}
.num {
  width: 70px;
  height: 70px;
  top: 20px;
  left: 0;
  line-height: 70px;
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  color: #b8c0cc;
  font-family: simhei;
}
.rank-item {
  width: 99%;
  margin: 10px 8px;
  padding: 10px 0 20px 20px;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.4);
}
.rank-item,
.rank-conten {
  display: flex;
  flex-direction: row;
}
.rank-item:hover{
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.4);;
}
.rank-conten {
  width: 100%;
}
.rank-conten :hover > .item-title {
  color: #2d8cf0 !important;
}
.img {
  display: inline-block;
  width: 114px;
  height: 70px;
  overflow: hidden;
}
.img > img {
  display: block;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.rank-info {
  display: inline-block;
  width: 100%;
  text-align: left;
  margin-left: 40px;
}
.item-content {
  display: flex;
  flex-direction: row;
  color: #99a2aa;
  margin-top: 20px;
}
.item-title {
  height: 20px;
  line-height: 20px;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
}
.item-tags {
  margin: 0 10px;
}
.item-authro > a {
  color: #99a2aa;
}
</style>
<script>
export default {
  data() {
    return {
      videoArray: "",
      itemId: ""
    };
  },
  watch: {
    $route(to, from) {
      let path = this.$route.path;
      let itemArray = path.split("/");
      this.getVideo(itemArray[2]);
    }
  },
  mounted() {
    let path = this.$route.path;
    let itemArray = path.split("/");
    this.getVideo(itemArray[2]);
  },
  methods: {
    getVideo(itemArray) {
      let getData = new FormData();
      getData.append("code", "cateforyItem");
      getData.append("cateforItem", itemArray);
      this.$axios({
        method: "post",
        data: getData,
        url: "/api/controller/category.php"
      }).then(res => {
        this.itemId = itemArray;
        this.videoArray = res.data;
        console.log(res.data);
      });
    }
  }
};
</script>
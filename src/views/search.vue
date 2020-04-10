<template>
  <div id="search">
    <header>
      <homeHeader />
    </header>
    <div id="content">
      <div class="conten-herder">
          <span>搜索结果</span>
          <a href="/Home"><Icon type="md-home" size="20" />返回首页</a>
      </div>
      <div id="search-result">
        <div v-if="searchData == ''">
            <p>暂无搜索结果，建议更换关键字</p>
        </div>
        <Card
          :bordered="false"
          class="cardUi"
          v-for="(item,index) in searchData"
          v-bind:key="index"
        >
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
    </div>
  </div>
</template>
<style lang="scss" scoped>
header {
  height: 82px;
}
#content {
  width: 1108px;
  background: #17233d;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.6);
}
.conten-herder {
    padding: 10px;
  width: 100%;
  height: 36px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: solid 1px rgba($color: #000000, $alpha: 0.4);
}
#search-result{
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

</style>
<script>
import homeHeader from "../components/homePage/homeHeader";
export default {
  components: {
    homeHeader
  },
  data() {
    return {
      keyWords: "",
      searchData: ""
    };
  },
  created() {
    let keyWords = this.$route.query.keyword;
    this.keyWords = keyWords;
    this.search();
  },
  watch: {
    $route(to, from) {
      let keyWords = this.$route.query.keyword;
      this.keyWords = keyWords;
      this.search();
    }
  },
  methods: {
    search() {
      this.$axios({
        method: "get",
        params: { all: this.keyWords },
        url: "/api/controller/search.php"
      }).then(res => {
        this.searchData = res.data;
        console.log(res.data);
      });
    }
  }
};
</script>
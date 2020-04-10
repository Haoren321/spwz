<template>
  <div id="recommend">
    <div id="recommend-list-item" v-if="reommendId != ''">
      <p style="text-align:left;margin:6px 2px; font-size:16px;">相关推荐</p>
      <div class="listItem" v-for="(item,index) in recommendList" :key="index">
        <a :href="'/video/'+item.sv_id">
          <div class="imgWrap">
            <img :src="'/api/'+item.cover_img" alt srcset />
          </div>
        </a>
        <div class="info">
          <a :href="'/video/'+item.sv_id">
            <p class="title">{{item.title}}</p>
          </a>
          <p class="author">作者：{{item.userName}}</p>
          <p class="countWatch">播放量：{{item.cout_watch}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#recommend-list-item {
  display: flex;
  flex-direction: column;
}
.listItem {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 6px;
}
.imgWrap > img {
  width: 141px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}
.info {
  margin-left: 10px;
  text-align: left;
}
.title {
  height: 32px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
}
.author,
.countWatch {
  font-size: 12px;
  color: #727171;
}
</style>
<script>
export default {
  data() {
    return {
      recommendList: ""
    };
  },
  props: ["reommendId"],
  watch: {
    reommendId: function() {
      this.getList();
    }
  },
  mounted() {},
  methods: {
    getList() {
      let reommendIdData = new FormData();
      reommendIdData.append("code", "getList");
      reommendIdData.append("tags", this.reommendId);
      this.$axios({
        method: "post",
        data: reommendIdData,
        url: "/api/controller/recomment.php"
      }).then(res => {
        this.recommendList = res.data;
        console.log(res.data);
      });
    }
  }
};
</script>
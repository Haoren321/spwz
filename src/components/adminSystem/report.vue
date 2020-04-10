<template>
  <div id="report">
    <div id="report-item">
      <Card class="cardItem" v-for="(item,index) in getReportResult" v-bind:key="index">
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          标题：{{item.title}}
        </p>
        <div class="video">
          <video
            :controls="item.sv_id"
            width="368"
            height="240"
            preload="none"
            :poster="'/api'+item.cover_img"
            :src="'/api'+item.source_url"
          >
            <p>你的浏览器不支持 HTML5 视频。可点击</p>
          </video>
        </div>
        <div class="xhx"></div>
        <div class="videoInfo">
          <p>简介:{{item.introduction}}</p>
          <p>类型:{{item.tags}}</p>
          <p>被举报数次：{{item.cout}}</p>
        </div>
        <div class="xhx" />
        <div class="shenHe" v-show="item.sv_id">
          <Button type="primary" v-on:click="normal(index,item)">不涉嫌违规</Button>
          <Button type="warning" @click="violation(index,item)">删除</Button>
        </div>
        <div class="shenHeInfo" v-show="!item.sv_id">
          <Alert show-icon>审核完成</Alert>
        </div>
      </Card>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#report-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.cardItem {
  width: 400px;
}
.video {
  width: 368px;
  //height: 223px;
  min-height: 223px;
  height: 368px;
  height: 100%;
  cursor: pointer;
}
.video > img {
  width: 100%;
  height: 100%;
}
.videoInfo {
  color: #000;
  font-weight: 500;
  text-align: left;
}
.xhx {
  width: 100%;
  height: 1px;
  margin: 10px 0;
  background: #e8eaec;
}
.shenHe {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
<script>
export default {
  data() {
    return {
      getReportResult: ""
    };
  },
  created() {
    this.getReport();
  },
  methods: {
    getReport() {
      let code = new FormData();
      code.append("code", "getReport");
      this.$axios({
        method: "post",
        data: code,
        url: "/api/controller/adminSystem.php"
      }).then(res => {
        this.getReportResult = res.data;
        console.log(res.data);
      });
    },
    violation(index, item) {
      let code = new FormData();
      let pathItem = item.source_url.split("/");
      pathItem.pop();
      let path = pathItem.join("/");
      console.log(path);
        code.append("code", "violation");
        code.append("reportSvid", item.sv_id);
        code.append("reportPath",path);
        console.log(path);
        this.$axios({
          method: "post",
          data: code,
          url: "/api/controller/adminSystem.php"
        }).then(res => {
            item.sv_id = false;
          console.log(res.data);
        });
    },
    normal(index, item) {
      let code = new FormData();
      code.append("code", "reportDelet");
      code.append("reportSvid", item.sv_id);
      this.$axios({
        method: "post",
        data: code,
        url: "/api/controller/adminSystem.php"
      }).then(res => {
        if (res.data == 1) {
          item.sv_id = false;
        }
        console.log(res.data);
      });
    }
  }
};
</script>
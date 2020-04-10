<template>
  <div id="videoSystemMange">
    <div id="videoSystemMange-item">
      <Card class="cardItem" v-for="(item,index) in videoJson" v-bind:key="index">
        <div class="video">
          <video
            :controls="item.sv_id"
            width="368"
            height="240"
            preload="none"
            :poster="'/api/'+item.cover_img"
            :src="'/api/'+item.source_url"
          >
            <p>你的浏览器不支持 HTML5 视频。可点击</p>
          </video>
        </div>
        <div class="xhx"></div>
        <div class="videoInfo">
          <p>
            视频名称:
            <Input v-model="item.title" :placeholder="item.title" style="width: 300px;" />
          </p>
          <p>
            简介:
            <Input
              v-model="item.introduction"
              :placeholder="item.introduction"
              style="width: 300px;"
            />
          </p>
          <p>
            类型:
            {{item.tags}}
          </p>
          <CheckboxGroup v-model="item.tag">
            <Checkbox label="动画"></Checkbox>
            <Checkbox label="游戏"></Checkbox>
            <Checkbox label="学习"></Checkbox>
            <Checkbox label="音乐"></Checkbox>
          </CheckboxGroup>
        </div>
        <div class="xhx" />
        <div class="shenHe" v-show="item.sv_id">
          <Button type="primary" v-on:click="saveAlterVideo(index,item)">保存</Button>
          <Button type="warning" v-on:click="systemDeletVideo(index,item)">删除</Button>
        </div>
        <div class="shenHeInfo" v-show="!item.sv_id">
          <Alert show-icon>审核完成</Alert>
        </div>
      </Card>
    </div>
  </div>
</template>
<style lang="scss">
input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.6) !important;
}
input::-moz-input-placeholder {
  color: rgba(0, 0, 0, 0.6);
}
input::-ms-input-placeholder {
  color: rgba(0, 0, 0, 0.6);
}
#videoSystemMange-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.cardItem {
  width: 400px;
  margin-bottom: 8px;
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
.videoInfo > p {
  margin: 8px 0;
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
      videoJson: ""
    };
  },
  created() {
    this.videoSystemMange();
  },
  methods: {
    videoSystemMange() {
      let data = new FormData();
      data.append("code", "videoSystemMange");
      this.$axios({
        method: "post",
        data: data,
        url: "/api/controller/adminSystem.php"
      }).then(res => {
        this.videoJson = res.data;
        console.log(res.data);
      });
    },
    systemDeletVideo(index, item) {
      let code = new FormData();
      let pathItem = item.source_url.split("/");
      pathItem.pop();
      let path = pathItem.join("/");
      console.log(path);
      code.append("code", "systemDeletVideo");
      code.append("reportSvid", item.sv_id);
      code.append("reportPath", path);
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
    saveAlterVideo(index, item) {
      console.log(item);
      let data = new FormData();
      data.append("code", "saveAlterVideo");
      data.append("title",item.title);
      data.append("introduction",item.introduction);
      data.append("svid",item.sv_id);
      let tag = item.tags;
      if(item.tag){
        tag = item.tag.join(' ');
         console.log(tag);
      }
      data.append("tag",tag);
      this.$axios({
        method: "post",
        data: data,
        url: "/api/controller/adminSystem.php"
      }).then(res => {
        if(res.data == 1){
          alert("修改成功");
          }
        console.log(res.data);
      });
    }
  }
};
</script>
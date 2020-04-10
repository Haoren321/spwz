<template>
  <div id="tmp_video">
    <Card class="cardItem" v-for="(item,index) in tmp_videoJson" v-bind:key="index">
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        标题：{{item.title}}
      </p>
      <p href="#" slot="extra" style="color:#000">
        <Icon type="ios-loop-strong"></Icon>审核
      </p>
      <div class="video">
        <video
          :controls="item.sv_id"
          width="368"
          height="240"
          preload="none"
          :poster="'/api/video/tmp_video/'+item.videoFile+'/'+item.coverImgName"
          :src="'/api/video/tmp_video/'+item.videoFile+'/'+item.videoName"
        >
          <p>
            你的浏览器不支持 HTML5 视频。可点击
          </p>
        </video>
      </div>
      <div class="xhx"></div>
      <div class="videoInfo">
        <p>投稿时间：{{item.time}}</p>
        <p>简介:{{item.introduction}}</p>
        <p>类型:{{item.tag}}</p>
      </div>
      <div class="xhx"/>
      <div class="shenHe" v-show="item.sv_id">
        <Button type="primary" v-on:click="tongGuo(index,item)">通过</Button>    
        <Button type="warning" v-on:click="buTongGuo(index,item)">不通过</Button>       
      </div>
      <div class="shenHeInfo" v-show="!item.sv_id">
        <Alert show-icon>审核完成</Alert>
      </div>
    </Card>
  </div>
</template>
<style lang="scss" scoped>
#tmp_video {
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
.shenHe{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>
<script>
export default {
  data() {
    return {
      tmp_videoJson: "",
    };
  },
  mounted() {
    this.initTmp_video();
  },
  methods: {
    initTmp_video() {
      let code = new FormData();
      code.append("code", "initTmp_video");
      this.$axios({
        method: "post",
        data: code,
        url: "/api/controller/adminSystem.php"
      }).then(res => {
        this.tmp_videoJson = res.data;
        console.log(res.data);
      });
    },
    tongGuo(index,item){
      let data = new FormData();
      data.append("code","updata");
      data.append("videoInfo",JSON.stringify(this.tmp_videoJson[index]));
      this.$axios({
        method:'post',
        data:data,
        url:"/api/controller/adminSystem.php"
      }).then(res=>{
        if(res.data == 1){
          item.sv_id = false;
        }       
        console.log(res.data);
      })
    },
    buTongGuo(index,item){
      let data = new FormData();
      data.append("code","delet");
      data.append("tmp_svid",this.tmp_videoJson[index].sv_id);
      data.append("tmp_file",this.tmp_videoJson[index].videoFile);
      console.log(this.tmp_videoJson[index].sv_id);
      this.$axios({
        method:'post',
        data:data,
        url:"/api/controller/adminSystem.php"
      }).then(res=>{
        if(res.data == 1){
          item.sv_id = false;
        }       
       console.log(res.data);
      })      
    }
  }
};
</script>
<template>
  <div id="video">
    <header id="video-header">
      <homeHeader ref="headerChild" />
    </header>
    <div id="container">
      <div id="vide-container">
        <div id="video-hader"></div>
        <div id="playerWarp">
          <h1 title="这是视频的标题" class="video-title">这是视频的标题</h1>
          <div class="video-data">
            <span>类型</span>
            <span title="投稿时间">投稿时间</span>
          </div>
          <div class="video-data">
            <span>237万播放</span>
            <span>未经作者授权，禁止转载</span>
          </div>
        </div>
        <div id="bfq-container">
          <div id="wrap-video">
            <bfq class="video" ref="bfq" />
          </div>
        </div>
        <div id="comment">
          <div class="dm-ctr">
            <i-Switch>
              <span slot="open">弹</span>
              <span slot="close">弹</span>
            </i-Switch>
          </div>
          <div class="dm-input-box">
            <input type="text" id="dmInput" />
            <div class="bui-dm">
              发送
            </div>
          </div>
        </div>
      </div>
      <div id="list">
        <div id="danmu-list"></div>
        <div id="recommend-list"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#video-header {
  height: 82px;
}
#video-footer {
  position: absolute;
  bottom: 0;
  height: 70px;
  width: 100%;
}
#container {
  display: flex;
  flex-direction: row;
  width: 1198px;
  margin: auto auto;
  margin-top: 20px;
}
#vide-container {
  width: 848px;
  height: 100%;
  background: #17233d;
}
#list {
  width: 330px;
  background: blue;
  height: 200px;
  margin-left: 20px;
}
.video-title {
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  padding-left: 5px;
  height: 26px;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
.video-data {
  padding-left: 5px;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  color: #c7c7ca;
  height: 16px;
}
#bfq-container {
  margin-top: 10px;
  padding: 7px;
  background: #000;
}
#wrap-video {
  width: 834px;
  overflow: hidden;
}
.video {
  width: 834px;
  height: 540px;
}
#comment {
  width: 100%;
  height: 46px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}
.dm-input-box{
  display: flex;
  flex: row;
}
#dmInput {
  color: #000;
  flex-grow: 1;
  font-weight: 500;
  border: 0;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  padding: 0 5px;
  font-size: 14px;
  min-width: 115px;
  text-decoration: none;
  outline: none;
  width: 300px;
  background:rgba($color: #fff, $alpha: .8);
}
.bui-dm{
    z-index: 13;
    height: 30px;
    width: 60px;
    min-width: 60px;
    line-height: 30px;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 0 2px 2px 0;
    background: #2d8cf0;
    cursor: pointer;
}
</style>
<script>
import homeHeader from "../components/homePage/homeHeader";
import bfq from "../components/bfq/bfq";
export default {
  components: {
    homeHeader,
    bfq
  },
  created: function() {},
  mounted: function() {
    this.$refs.bfq.$data.videoSrc = "/api/video/ksa.webm";
  }
};
</script>
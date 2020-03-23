<template>
  <div id="video-main" style>
    <div id="wrap" @mousemove="videoCtrShwo">
      <div class="jzz" v-if="isLoding">
        <Spin size="large" class="styleJzz" fix>
          <div class="loader">
            <svg class="circular" viewBox="25 25 50 50">
              <circle
                class="path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke-width="3"
                stroke-miterlimit="10"
              />
            </svg>
          </div>
        </Spin>
      </div>
      <div id="dmk"></div>
      <div id="wrap-video">
        <video id="ply" :poster="'/api/'+video.cover_img" :src="'/api/'+video.source_url">
          <p>你的浏览器不支持 HTML5 视频。可点击</p>
        </video>
      </div>
      <div id="play-video-controls" @mouseover="videoCtrMover" @mouseout="interruptTime = false">
        <div id="video-jdt">
          <!-- <Progress
            class="progress"
            :percent="bfqcontrols.jdtLoad"
            :success-percent="bfqcontrols.jdtNow"
            hide-info
          />-->
          <div id="barcontrols" @click="udjdt" @mousemove="showbar" @mouseout="hidebar"></div>
          <Icon
            class="arrow-dd"
            v-if="barisshow"
            type="md-arrow-dropdown"
            color="white"
            :style="{left:jdtposstion - 0.7 +'%'}"
          />
          <div id="jdt-container">
            <div id="jdt-per" :style="{width:bfqcontrols.jdtLoad+'%'}"></div>
            <div id="jdt" :style="{width:bfqcontrols.jdtNow+'%'}"></div>
          </div>
          <Icon
            class="arrow-du"
            v-if="barisshow"
            type="md-arrow-dropup"
            color="white"
            :style="{left:jdtposstion-0.7 +'%'}"
          />
        </div>
        <div id="video-control">
          <div id="play" class="ctr-btn" v-if="switchVideo === 'play'" @click="playVideo">
            <Icon color="#fff" type="ios-play" size="24" />
          </div>
          <div id="stop" class="ctr-btn" v-if="switchVideo === 'stop'" @click="pauseVideo">
            <Icon color="#fff" type="ios-pause" size="24" />
          </div>
          <div id="play-time" style="margin-top:8px">{{playTime}}/{{duration}}</div>
          <div id="volume">
            <div id="volumeWrap">
              <div id="volumeContent">
                <span>{{volume}}</span>
                <div class="volumeJd" @click="alterVolume">
                  <div class="volumeItem">
                    <div class="item" :style="{height:volume+'%'}"></div>
                  </div>
                </div>
              </div>
              <Icon type="md-volume-up" color="#fff" size="24" v-if="!isMute" @click="setMute" />
            </div>
            <div id="volume">
              <Icon
                type="md-volume-off"
                color="#fff"
                size="24"
                v-if="isMute"
                @click="isMute=false"
              />
            </div>
          </div>
          <div id="screen">
            <div id="fullScreen" class="ctr-btn" @click="screenfull" v-if="!isScreenfull">
              <Icon type="ios-qr-scanner" color="#fff" size="24" />
            </div>
            <div id="fullScreen" class="ctr-btn" @click="exitScreenfull" v-if="isScreenfull">
              <img src="../../assets/exit.png" alt srcset />
            </div>
          </div>
          <div id="dmInputFull">
            <i-Switch :value="true" style="margin-top:4px;" @on-change="switchDM">
              <span slot="open">弹</span>
              <span slot="close">弹</span>
            </i-Switch>
            <div class="dm-input-box">
              <input type="text" v-model="biuDm" id="dmInput" />
              <div class="bui-dm" @click="biu">发送</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#wrap {
  position: relative;
  background: #000;
  width: 100%;
  height: 100%;
}
#wrap:hover {
  cursor: pointer;
}
#ply {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: 100%;
  z-index: 10;
  left: 0;
  top: 0;
}
#dmk {
  position: absolute;
  z-index: 11;
  left: 0;
  top: 0;
  opacity: 1;
  width: 100%;
  height: 100%;
  color: #fff;
}

#play-video-controls {
  position: absolute;
  width: 100%;
  z-index: 12;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.4);
}
#barcontrols {
  position: absolute;
  width: 100%;
  height: 18px;
  z-index: 12;
  opacity: 0.5;
}
#video-jdt {
  height: 18px;
}
#jdt-container {
  position: absolute;
  top: 8px;
  height: 4px;
  width: 100%;
  overflow: hidden;
  background: hsla(0, 0%, 100%, 0.2);
}
.arrow-dd,
.arrow-du {
  position: absolute;
}
.arrow-dd {
  top: -3px;
}
.arrow-du {
  top: 8px;
}
#jdt-per {
  position: absolute;
  height: 100%;
  width: 0%;
  background: hsla(0, 0%, 100%, 0.4);
}
#jdt {
  position: absolute;
  height: 100%;
  background: rgba(35, 173, 229, 1);
  width: 0%;
}
#video-control {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 38px;
  display: none;
}
.ctr-btn {
  width: 36px;
  height: 22px;
  margin: 0px;
  padding: 0px;
  margin-top: 8px;
}
.jzz {
  position: absolute;
  width: 100%;
  height: 100%;
}
.styleJzz {
  background: none;
  height: 100%;
  z-index: 11;
}
@keyframes color {
  100%,
  0% {
    stroke: #529dfa;
  }
  50% {
    stroke: #2669fc;
  }
  100% {
    stroke: #0854f8;
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
.loader:before {
  content: "";
  display: block;
  padding-top: 100%;
}
.loader {
  margin: 0 auto;
  width: 60px;
  position: absolute;
  display: block;
  left: 0;
  right: 0;
  z-index: 1;
  -webkit-transform: translate3d(0, -50%, 0);
  transform: translate3d(0, -50%, 0);
  text-align: center;
  top: 50%;
}
.circular {
  -webkit-animation: rotate 2s linear infinite;
  animation: rotate 2s linear infinite;
  height: 100%;
  -webkit-transform-origin: center center;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.4);
}
.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  -webkit-animation: dash 1.5s ease-in-out infinite,
    color 2s ease-in-out infinite;
  animation: dash 1.5s ease-in-out infinite, color 2s ease-in-out infinite;
  stroke-linecap: round;
}
#dmk {
  user-select: none;
  white-space: pre;
  pointer-events: none;
  perspective: 500px;
  display: inline-block;
  will-change: transform;
  font-size: 18px;
  color: rgb(255, 255, 255);
  font-family: SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif;
  font-weight: bold;
  line-height: 1.125;
  opacity: 1;
  text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px,
    rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;
}

#volumeContent {
  position: relative;
  background: rgba(255, 255, 255, 0.2);
  width: 26px;
  height: 96px;
  bottom: 10px;
  cursor: default;
  z-index: 11;
  font-size: 12px;
  visibility: hidden;
}
#screen {
  position: absolute;
  right: 0;
}
.volumeJd {
  position: absolute;
  width: 100%;
  height: 66px;
  bottom: 8px;
  z-index: 12;
  cursor: pointer;
}
.volumeItem {
  position: absolute;
  left: 11px;
  bottom: 0px;
  width: 3px;
  height: 66px;
  background: #fff;
}
.volumeItem > .item {
  position: absolute;
  background: #0079fa;
  width: 3px;
  height: 10px;
  bottom: 0;
}
#volumeWrap {
  position: absolute;
  bottom: 4px;
  z-index: 14;
  right: 40px;
}
#volumeWrap:hover > #volumeContent {
  visibility: visible;
}
#dmInputFull {
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 25%;
  width: 50%;
}
.dm-input-box {
  display: flex;
  flex: row;
}
#dmInput {
  color: #ffffff;
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
  width: 80%;
  background: rgba(0, 0, 0, 0.5);
  margin-left: 8px;
}
.bui-dm {
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
.dm-input-box {
  width: 100%;
}
</style>
<script>
import dmClass from "../../common/dmClass";
var timeCount;
export default {
  props: ["video"],
  data() {
    return {
      bfqcontrols: {
        jdtNow: 0,
        jdtLoad: 1
      },
      jdtposstion: 0,
      dminit: "",
      switchVideo: "play",
      barisshow: false,
      pauseTime: "",
      isLoding: false,
      videoobj: "",
      isScreenfull: false,
      duration: 0,
      playTime: 0,
      isMute: false,
      volume: 0,
      switchDm: true,
      biuDm: "",
      interruptTime: false,
    };
  },
  created: function() {
    //this.initdm();
  },
  mounted: function() {
    this.getDm();
    this.initVideo();
  },
  methods: {
    screenfull() {
      let fullscreen = $("#wrap")[0];
      this.openFullscreen(fullscreen);
    },
    exitScreenfull() {
      // let exitScree = $("#wrap")[0];
      this.exitFullscreen();
    },
    setMute() {
      this.isMute = true;
      this.videoobj.volume = 0;
    },
    initVideo() {
      this.videoobj = $("#ply")[0];
      this.volume = this.videoobj.volume * 100;
      let wrap = $("#dmk")[0];
      this.dm = new dmClass({
        wrapper: wrap,
        dm: ""
      });
      //this.dminit.initDmBuff();
      this.videoobj.oncanplay = () => {
        this.duration = this.getTimeBySecond(this.videoobj.duration);
        this.videoobj.addEventListener("timeupdate", () => {
          this.playTime = this.getTimeBySecond(this.videoobj.currentTime);
          let bufferedIndex = this.videoobj.buffered.length;
          let allTime = this.videoobj.duration;
          this.bfqcontrols.jdtLoad =
            (this.videoobj.buffered.end(bufferedIndex - 1) / allTime) * 100;
          this.bfqcontrols.jdtNow = (this.videoobj.currentTime / allTime) * 100;
          this.pauseTime = this.videoobj.currentTime;
          //this.dminit.intervalInsert(this.videoobj.currentTime);
        });
        this.videoobj.addEventListener("ended", () => {
          this.dm.dmPause();
          this.switchVideo = "play";
          //this.dminit.dmPool = this.damuk.slice();
        });
      };
    },
    playVideo() {
      //this.dminit.dmPool = this.damuk.slice();
      this.videoobj.pause();
      let dmTime = setInterval(() => {
        console.log(this.switchDm);
        let ct = this.videoobj.currentTime;
        if (this.videoobj.paused || !this.switchDm) {
          clearInterval(dmTime);
          console.log("aa");
        }
        this.dm.updataDm(ct);
      }, 500);
      this.dm.dmPlay();
      this.videoobj.play();
      this.switchVideo = "stop";
    },
    pauseVideo() {
      this.dm.dmPause();
      this.videoobj.pause();
      this.switchVideo = "play";
      //animation-play-state
    },
    udjdt(e) {
      this.dm.reset();
      this.videoobj.currentTime =
        (this.jdtposstion / 100) * this.videoobj.duration;
      let playPromise = this.videoobj.play();
      this.isLoding = true;
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.playVideo();
            //this.dm.dmPlay();
            this.isLoding = false;
          })
          .catch(res => {
            console.log(res);
          });
      }
      this.dm.cleanDm();
      //this.dminit.dmPool = this.damuk.slice();
      this.switchVideo = "stop";
    },
    showbar(e) {
      this.jdtposstion = (e.offsetX / $("#video-jdt").width()) * 100;
      this.barisshow = true;
      //console.log(e.offsetX,$('#video-jdt').width());
    },
    hidebar() {
      this.barisshow = false;
    },
    getDm(){
      let getDmFd = new FormData();
      let filePath = this.video.cover_img.split("/");
      getDmFd.append("code","getDm");
      getDmFd.append("filePath",filePath[3]+"/"+ filePath[4]);
      //console.log(filePath[3]+"/"+ filePath[4])
      this.$axios({
        method: "post",
        data:getDmFd,
        url: "/api/controller/dm.php"
      }).then(res => {
        this.dm.dm = res.data;
        //console.log(this.damuk);
      });
    },
    videoCtrShwo(e) {
      let dom = $("#video-control")[0];
      dom.style.display = `flex`;
      clearTimeout(timeCount);
      timeCount = setTimeout(() => {
        if (!this.interruptTime) {
          dom.style.display = `none`;
        }        
      }, 3000);
    },
    videoCtrMover() {
      this.interruptTime = true;
      let dom = $("#video-control")[0];
      dom.style.display = `flex`;
    },
    openFullscreen(element) {
      this.isScreenfull = true;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      }
    },
    alterVolume(e) {
      this.videoobj.volume = 1 - e.offsetY / 66;
      this.volume = (this.videoobj.volume * 100).toFixed(0);
      console.log(this.volume);
    },
    switchDM(status) {
      if (status == true) {
        this.switchDm = true;
        this.playVideo();
      } else {
        this.switchDm = status;
        this.dm.reset();
      }
      console.log(status);
    },
    biu() {
      if (this.$store.state.isLogin == false) {
        if (this.isScreenfull) {
          this.exitFullscreen();
        }
        return this.$Message.error("请登录后再发弹幕！");
      }
      let dm = {
        text: ""
      };
      dm.text = this.biuDm;
      this.dm.biudm(dm);
      console.log(this.biuDm);
    },
    exitFullscreen() {
      this.isScreenfull = false;
      let sc = this.isFullscreen();
      if(!sc){
        return;
      }
      console.log(this.isFullscreen);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.oCancelFullScreen) {
        document.oCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
    getTimeBySecond(second) {
      var hour = parseInt(second / (60 * 60));
      var minute = parseInt((second / 60) % 60);
      var second = parseInt(second % 60);
      return (
        (hour < 10 ? "0" : hour) +
        ":" +
        (minute < 10 ? "0" + minute : minute) +
        ":" +
        (second < 10 ? "0" + second : second)
      );
    },
    isFullscreen() {
      return (
        document.fullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        false
      );
    }
  }
};
</script>
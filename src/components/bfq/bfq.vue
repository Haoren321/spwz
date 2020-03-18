<template>
  <div id="video-main" style>
    <div id="wrap">
      <div id="dmk">
        <div class="jzz" v-if="isLoding">
          <Spin size="large" class="styleJzz">
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
      </div>
      <div id="wrap-video">
        <video id="ply" :poster="'/api/'+video.cover_img" :src="'/api/'+video.source_url">
          <p>你的浏览器不支持 HTML5 视频。可点击</p>
        </video>
      </div>
      <div id="play-video-controls">
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
          <div id="play-time"></div>
          <div id="audio"></div>
          <div id="fullScreen" class="ctr-btn" @click="screefull">
            <Icon type="ios-qr-scanner" color="#fff" size="24" />
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
}
.ctr-btn {
  width: 36px;
  height: 22px;
  margin: 0px;
  padding: 0px;
}
.jzz {
  position: absolute;
  width: 100%;
  height: 100%;
}
.styleJzz {
  background: none;
}
@keyframes color {
  100%,
  0% {
    stroke: #7bbae4;
  }
  50% {
    stroke: #123e68;
  }
  100% {
    stroke: #89b3e9;
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
  width: 80px;
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
}
.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  -webkit-animation: dash 1.5s ease-in-out infinite,
    color 2s ease-in-out infinite;
  animation: dash 1.5s ease-in-out infinite, color 2s ease-in-out infinite;
  stroke-linecap: round;
}
</style>
<script>
import dmClass from "../../common/dmClass";
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
      damuk: [
        {
          item: "1",
          data: "test1test1test1test1test1test1test1test1test1test1test1",
          time: 1
        },
        {
          item: "2",
          data: "test2",
          time: 1
        },
        {
          item: "3",
          data: "test3",
          time: 1
        },
        {
          item: "4",
          data: "test4",
          time: 1
        },
        {
          item: "5",
          data: "test5",
          time: 11
        },
        {
          item: "6",
          data: "test6",
          time: 12
        },
        {
          item: "7",
          data: "test7",
          time: 14
        },
        {
          item: "8",
          data: "test8",
          time: 15
        }
      ]
    };
  },
  created: function() {
    //this.initdm();
  },
  mounted: function() {
    this.initVideo();
  },
  methods: {
    screefull() {
      let fullscreen = $("#wrap")[0];
      this.openFullscreen(fullscreen);
    },
    initVideo() {
      this.videoobj = $("#ply")[0];
      let wrap = $("#dmk")[0];
      this.dm = new dmClass({
        wrapper: wrap,
        dm: this.damuk
      });
      //this.dminit.initDmBuff();
      this.videoobj.oncanplay = () => {
        this.videoobj.addEventListener("timeupdate", () => {
          let bufferedIndex = this.videoobj.buffered.length;
          let allTime = this.videoobj.duration;
          this.bfqcontrols.jdtLoad =
            (this.videoobj.buffered.end(bufferedIndex - 1) / allTime) * 100;
          this.bfqcontrols.jdtNow = (this.videoobj.currentTime / allTime) * 100;
          this.pauseTime = this.videoobj.currentTime;
          //this.dminit.intervalInsert(this.videoobj.currentTime);
        });
        this.videoobj.addEventListener("ended", function() {
          this.switchVideo = "play";
          //this.dminit.dmPool = this.damuk.slice();
        });
      };
    },
    playVideo() {
      //this.dminit.dmPool = this.damuk.slice();
      this.dm.dmPlay();
      let ct = this.videoobj.currentTime;
      let dmTime = setInterval(() => {
        if (this.videoobj.paused) {
          clearInterval(dmTime);
        }
        this.dm.updataDm(ct);
        ct = ct + 0.5;
      }, 500);
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
      this.videoobj.currentTime =
        (this.jdtposstion / 100) * this.videoobj.duration;
      let playPromise = this.videoobj.play();
      this.isLoding = true;
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.videoobj.play();
            this.isLoding = false;
          })
          .catch(res => {
            console.log(res);
          });
      }
      this.dminit.clearDm();
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
    openFullscreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      }
    }
  }
};
</script>
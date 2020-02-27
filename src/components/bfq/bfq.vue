<template>
  <div id="video-main" style>
    <div id="wrap">
      <div id="dmk"></div>
      <div id="wrap-video">
        <video id="ply" :src="videoSrc" />
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
            :style="{left:jdtposstion-1+'%'}"
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
            :style="{left:jdtposstion-1+'%'}"
          />
        </div>
        <div id="video-control">
          <div id="play" class="ctr-btn" v-if="switchVideo === 'play'" @click="playVideo"><Icon  color="#fff" type="ios-play" size="24"/></div>
          <div id="stop" class="ctr-btn" v-if="switchVideo === 'stop'" @click="pauseVideo"><Icon color="#fff" type="ios-pause" size="24"/></div>
          <div id="play-time"></div>
          <div id="audio"></div>
          <div id="fullScreen" class="ctr-btn" @click="screefull"><Icon type="ios-qr-scanner" color="#fff" size="24"/></div>
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
  background: hsla(0,0%,100%,.2)
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
  background: hsla(0,0%,100%,.4)
}
#jdt {
  position: absolute;
  height: 100%;
  background: rgba(35,173,229, 1);
  width: 0%;
}
#video-control{
  display: flex;
  flex-direction: row;
  width: 100%;
}
.ctr-btn{
  width: 36px;
  height: 22px;
  margin: 0px;
  padding: 0px;  
}
</style>
<script>
import dmClass from "../../common/dmClass";
export default {
  data() {
    return {
      videoSrc:'',
      bfqcontrols: {
        jdtNow: 0,
        jdtLoad: 1
      },
      jdtposstion: 0,
      dminit: "",
      switchVideo: "play",
      barisshow: false,
      pauseTime:'',
      damuk: [
        {
          item: "1",
          data: "test1",
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
      var videoobj = $("#ply")[0];
      var wrap = $("#dmk")[0];
      this.dminit = new dmClass({
        wrapper: wrap,
        dmPool: this.damuk.slice()
      });
      this.dminit.initDmBuff();
      var then = this;
      //console.log(dminit.intervalInsert(1));
      videoobj.oncanplay = function() {
        //console.log(videoobj)
        //then.outdamuk();
        videoobj.addEventListener("timeupdate", function() {
          //console.log(then.dminit.dmPool);
          var allTime = videoobj.duration;
          then.bfqcontrols.jdtLoad = (videoobj.buffered.end(0) / allTime) * 100;
          then.bfqcontrols.jdtNow = (videoobj.currentTime / allTime) * 100;
          then.pauseTime = videoobj.currentTime;
          then.dminit.intervalInsert(videoobj.currentTime);
        });
        videoobj.addEventListener("ended",function(){
          then.switchVideo = "play";       
          then.dminit.dmPool = then.damuk.slice();
        });
      };
    },
    playVideo() {
      var videoobj = $("#ply")[0];
      //this.dminit.dmPool = this.damuk.slice();
      this.dminit.dmPlay(this.pauseTime);
      videoobj.play();
      this.switchVideo = "stop";
    },
    pauseVideo() {
      var videoobj = $("#ply")[0];
      this.dminit.dmPause(this.pauseTime);
      videoobj.pause();
      this.switchVideo = "play";
      //animation-play-state 
    },
    udjdt(e) {
      var videoobj = $("#ply")[0];
      var then = this;
      videoobj.currentTime = (this.jdtposstion / 100) * videoobj.duration;
      videoobj.play();
      this.dminit.clearDm();
      this.dminit.dmPool = this.damuk.slice();
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
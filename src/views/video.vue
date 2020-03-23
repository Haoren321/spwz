<template>
  <div id="video">
    <header id="video-header">
      <homeHeader ref="headerChild" />
    </header>
    <div id="container">
      <div id="vide-container">
        <div id="video-hader"></div>
        <div id="playerWarp">
          <h1 title="这是视频的标题" class="video-title">{{videoInfo.title}}</h1>
          <div class="video-data">
            <span>{{videoInfo.tags}}</span>
            <!-- <span title="投稿时间">投稿时间</span> -->
          </div>
          <div class="video-data">
            <span>{{videoInfo.cout_watch}} 播放</span>
            <span>未经作者授权，禁止转载</span>
          </div>
        </div>
        <div id="bfq-container">
          <div id="wrap-video">
            <bfq v-if="!(videoInfo == '')" class="video" :video="videoInfo" />
          </div>
        </div>
        <div class="introduction">{{videoInfo.introduction}}</div>
        <div id="comment">
          <p>评论</p>
          <div class="xhx"></div>
          <div id="comentlist">
            <div class="sendCommet" v-if="isLogin">
              <textarea
                v-model="firstCommentText"
                name="submitCommet"
                id="submitCommet"
                cols="80"
                rows="4"
              ></textarea>
              <Button type="primary" class="submitBtn" @click="fristCommentSubmit">发表评论</Button>
            </div>
            <div style="color:#777" class="login" v-if="!isLogin">
              请
              <Button type="primary" @click="openModal" size="small">登录</Button>后再评论~
            </div>
            <div class="xhx"></div>
            <p v-if="comment == ''">还没有评论~</p>
            <div class="commentItem" v-for="(item,index) in comment" v-bind:key="index">
              <div class="commentContent">
                <a :href="'/visitorSpace/'+item.userId">{{item.userName}}</a>
                <p class="first-commnet">{{item.content}}</p>
                <div class="info">
                  <span class="time">{{item.time}}</span>
                  <span style="cursor: pointer;" class="huifu" @click="huifu(index,item)">&emsp;回复</span>
                </div>
                <div
                  class="itemReply"
                  v-for="(chilItem,chilIndex) in item.reply"
                  v-bind:key="chilIndex"
                >
                  <p v-if="chilItem.reply!=''">
                    <a :href="'/visitorSpace/'+chilItem.userId">{{chilItem.userName}}</a>&emsp;回复&emsp;
                    <a
                      :href="'/visitorSpace/'+chilItem.reply.userId"
                    >{{chilItem.reply.userName}}</a>
                    ：{{chilItem.content}}
                  </p>
                  <p v-if="chilItem.reply ==''">
                    <a :href="'/visitorSpace/'+chilItem.userId">{{chilItem.userName}}</a>
                    ：{{chilItem.content}}
                  </p>
                  <div class="info">
                    <span class="time">{{chilItem.time}}</span>
                    <span
                      style="cursor: pointer;"
                      class="huifu"
                      @click="huifu(index,item,chilItem)"
                    >&emsp;回复</span>
                  </div>
                </div>
              </div>
              <div class="sendCommet" v-if="item.status=='true' && isLogin">
                <textarea
                  v-model="commentText"
                  name="submitCommet"
                  id="submitCommet"
                  cols="80"
                  rows="4"
                  :placeholder="defaultText"
                ></textarea>
                <Button type="primary" class="submitBtn" @click="commentSubmit">发表评论</Button>
              </div>
              <div style="color:#777" class="login" v-if="item.status=='true' && !isLogin">
                请
                <Button type="primary" @click="openModal" size="small">登录</Button>后再评论~
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="list">
        <div id="up-info" v-if="!(videoInfo == '')">
          <img :src="'/api/'+videoInfo.userIcon" alt srcset />
          <div class="up-name">
            <p>{{videoInfo.userName}}</p>
            <i-button
              @click="openModal"
              v-if="!isFocus"
              size="small"
              style="margin:0px 0px 0px 10px;"
              type="primary"
            >
              <Icon type="ios-add" color="#fff" size="16" />关注
            </i-button>
            <i-button
              @click="cancelFoucs"
              v-if="isFocus"
              size="small"
              style="margin:0px 0px 0px 10px;"
              type="primary"
            >已关注</i-button>
          </div>
        </div>
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
  background: #17233d;
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
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}
#up-info {
  display: flex;
  flex-direction: row;
  padding: 15px;
  height: 89px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.8);
}
#up-info > img {
  border-radius: 50%;
  width: 58px;
  height: 58px;
}
.up-name {
  margin-left: 4px;
  margin-top: 6px;
  font-size: 14px;
}
.xhx {
  width: 100%;
  height: 1px;
  margin: 10px 0;
  background: rgba(0, 0, 0, 0.8);
}
#comment {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
#comentlist {
  padding: 10px;
  width: 100%;
}
.commentItem {
  text-align: left;
  width: 100%;
  border-bottom: 1px dashed rgba($color: #000000, $alpha: 0.8);
}
.first-commnet {
  line-height: 20px;
  padding: 2px 0;
  font-size: 14px;
  text-shadow: none;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-word;
}
.itemReply > .info,
.commentContent > .info {
  color: #99a2aa;
  line-height: 26px;
  font-size: 12px;
}
.itemReply {
  padding: 10px;
}
.sendCommet {
  display: flex;
  flex-direction: row;
}
#submitCommet {
  font-size: 12px;
  display: inline-block;
  box-sizing: border-box;
  background-color: #f4f5f7;
  border: 1px solid #e5e9ef;
  overflow: auto;
  border-radius: 4px;
  color: #555;
  width: 100% !important;
  height: 65px;
  transition: 0s;
  padding: 5px 10px;
  line-height: normal;
}
.submitBtn {
  width: 70px;
  height: 64px;
  padding: 8px;
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
  data() {
    return {
      videoInfo: "",
      isFocus: false,
      comment: [],
      defaultText: "",
      commentItem: "",
      commentChildItem: "",
      commentIndex: "",
      commentText: "",
      isLogin: this.$store.state.isLogin,
      firstCommentText: ""
    };
  },
  watch: {
    videoInfo(newVal, oldVal) {
      if (this.$store.state.user != "") {
        this.getFocus(this.$store.state.user.userId, this.videoInfo.userId);
      }
    }
  },
  mounted() {
    //this.videoInfo = this.$route.query.id;
    let path = this.$route.path;
    let itemArray = path.split("/");
    this.initVideo(itemArray[2]);
    //console.log(this.$store.state.user);
  },
  methods: {
    initVideo(sv_id) {
      let videoInfo = new FormData();
      videoInfo.append("code", "initVideo");
      videoInfo.append("sv_id", sv_id);
      this.$axios({
        method: "post",
        data: videoInfo,
        url: "/api/controller/svideoCtro.php"
      }).then(res => {
        this.videoInfo = res.data[0];
        this.getComment();
      });
    },
    getFocus(foucsId, beFoucsId) {
      let foucs = new FormData();
      foucs.append("code", "foucs");
      foucs.append("foucs", foucsId);
      foucs.append("beFoucs", beFoucsId);
      this.$axios({
        method: "post",
        data: foucs,
        url: "/api/controller/svideoCtro.php"
      }).then(res => {
        if (res.data != 0) {
          this.isFocus = true;
        }
        //console.log("aa", res.data);
      });
    },
    openModal() {
      if (this.$store.state.user == "") {
        this.$refs.headerChild._data.isHidden = true;
        this.$refs.headerChild._data.loginModal = true;
        this.$refs.headerChild._data.registerModal = false;
        console.log(this.$refs.headerChild._data);
      } else {
        if(this.$store.state.user.userId == this.videoInfo.userId){
          return this.$Message.error("不能关注自己");
        }
        let foucsId = this.$store.state.user.userId;
        let beFoucsId = this.videoInfo.userId;
        let beFoucsName = this.videoInfo.userName;
        let foucs = new FormData();
        foucs.append("code", "upFoucs");
        foucs.append("foucs", foucsId);
        foucs.append("beFoucs", beFoucsId);
        foucs.append("beFoucsName", beFoucsName);
        this.$axios({
          method: "post",
          data: foucs,
          url: "/api/controller/svideoCtro.php"
        }).then(res => {
          if (res.data == 1) {
            this.isFocus = true;
          }
          //console.log("aa", res.data);
        });
      }
    },
    cancelFoucs() {
      let foucsId = this.$store.state.user.userId;
      let beFoucsId = this.videoInfo.userId;
      let foucs = new FormData();
      foucs.append("code", "delFoucs");
      foucs.append("foucs", foucsId);
      foucs.append("beFoucs", beFoucsId);
      this.$axios({
        method: "post",
        data: foucs,
        url: "/api/controller/svideoCtro.php"
      }).then(res => {
        if (res.data == 1) {
          this.isFocus = false;
        }
        //console.log("aa", res.data);
      });
    },
    getComment() {
      let getCommentFD = new FormData();
      let filePath = this.videoInfo.cover_img.split("/");
      getCommentFD.append("code","getComment");
      getCommentFD.append("filePath",filePath[3]+"/"+ filePath[4]);
      //console.log(filePath[3]+"/"+ filePath[4])
      this.$axios({
        method: "post",
        data:getCommentFD,
        url: "/api/controller/comment.php"
      }).then(res => {
        this.comment = res.data;
        console.log(res.data);
      });
    },
    huifu(index, item, childItem) {
      this.defaultText = "";
      this.commentText = "";
      if (this.commentItem.status) {
        this.commentItem.status = "false";
      }
      if (childItem) {
        this.defaultText = "@" + childItem.userName;
      }
      //let newJson = { userId: "33333", userName: "index", reply: "aaaa" };
      //console.log(this.comment[index].reply);
      //console.log(index,chilIndex);
      //this.comment[index].reply.splice(0,0,newJson);
      //let date = new Date();
      //console.log(date.toLocaleDateString().replace(/\//g,"-")+" "+date.toTimeString().replace(/G.*\)/,""));
      this.commentItem = item;
      this.commentIndex = index;
      this.commentChildItem = childItem;
      this.commentItem.status = "true";
    },
    commentSubmit() {
      if (this.commentText == "") {
        return this.$Message.error("您还没有评论");
      }
      if (this.commentChildItem) {
        let date = new Date();
        let time =
          date.toLocaleDateString().replace(/\//g, "-") +
          " " +
          date.toTimeString().replace(/G.*\)/, "");
        let newComment = {
          userId: this.$store.state.user.userId,
          userName: this.$store.state.user.userName,
          content: this.commentText,
          time: time,
          status:false,
          reply: {
            userId: this.commentChildItem.userId,
            userName: this.commentChildItem.userName
          }
        };
        this.comment[this.commentIndex].reply.splice(0, 0, newComment);
        this.commentItem.status = "false";
        this.sendComment();
        return;
      }
      if (!this.commentChildItem) {
        let date = new Date();
        let time =
          date.toLocaleDateString().replace(/\//g, "-") +
          " " +
          date.toTimeString().replace(/G.*\)/, "");
        let newComment = {
          userId: this.$store.state.user.userId,
          userName: this.$store.state.user.userName,
          content: this.commentText,
          status:false,
          time: time,
          reply: []
        };
        console.log(this.comment);
        this.comment[this.commentIndex].reply.splice(0, 0, newComment);
        this.commentItem.status = "false";
        this.sendComment();
        return;
      }
    },
    fristCommentSubmit() {
      if (this.firstCommentText == "") {
        return this.$Message.error("您还没有评论");
      }
      let date = new Date();
      let time =
        date.toLocaleDateString().replace(/\//g, "-") +
        " " +
        date.toTimeString().replace(/G.*\)/, "");
      let newComment = {
        userId: this.$store.state.user.userId,
        userName: this.$store.state.user.userName,
        content: this.firstCommentText,
        time: time,
        status:false,
        reply: []
      };
      if(this.comment == ""){
        this.comment = [newComment];
        this.sendComment();
        return;
      }
      this.comment.splice(0, 0, newComment);
      this.firstCommentText = "";
      this.commentItem.status = "false";
      this.sendComment();
      return;
    },
    sendComment(){
      let filePath = this.videoInfo.cover_img.split("/");
      let commentFD = new FormData();
      commentFD.append("code","saveComment");
      commentFD.append("filePath",filePath[3]+"/"+ filePath[4]);
      commentFD.append("commentJson",JSON.stringify(this.comment));
      this.$axios({
        method:'post',
        data:commentFD,
        url:"/api/controller/comment.php"
      }).then(res=>{
        console.log(res.data);
      })
    }
  }
};
</script>
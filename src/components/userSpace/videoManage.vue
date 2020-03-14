<template>
  <div id="videoManage">
    <div id="releasedVideo" class="manageStyle">
      <span>已发布的视频</span>
    </div>
    <div id="auditedVideo" class="manageStyle">
      <span>待审核的视频</span>
      <div id="waitingAudit">
        <div class="waitingAudit" v-for="item in audit" v-bind:key="item.sv_id">
          <div class="auditImgWrap">
            <img :src="'/api/video/tmp_video/'+item.videoFile+'/'+item.coverImgName" alt="" srcset="">
          </div>
          <div class="aduitInfo">
            <p >视频的标题：{{item.title}}</p>
            <p>简介：{{item.introduction}}</p>
            <p>投稿时间：{{item.time}}</p>
          </div>
          <span style="color:gray">审核中...</span>
        </div>
      </div>
    </div>
    <div id="upLoadvideo" class="manageStyle">
      <span>上传视频</span>
      <div id="uploadInput">
        <p>文件上传</p>
        <input
          type="file"
          id="fileElem"
          accept="video/*"
          ref="videoFile"
          style="display:none"
          name="video"
          @change="handleFiles"
        />
        <div class="uploadInfo" v-if="isHidden === true">
          <div class="uploadIcon">
            <div class="fileName">{{uploadName}}</div>
            <div class="uploadInfoBtn">
              <span class="del" @click="delTmpVideo">删除</span>
              <span class="succes" v-if="complete === true" style="margin-left:20px;">
                <Icon type="md-checkmark-circle-outline" color="#05befc" size="16" />
              </span>
            </div>
          </div>
          <div class="upLoadJdt" v-bind:style="{width:upLoadJdt+'%'}"></div>
        </div>
        <label id="upLoadBtn" v-if="!isHidden" for="fileElem">添加视频</label>
        <div id="videoInfo">
          <div class="videoCoverImg">
            <span>上传封面</span>
            <input
              accept="image/*"
              @change="uploadCoverImg"
              id="coverImgElem"
              ref="coverImg"
              type="file"
              style="display:none"
            />
            <label id="coverImgBtn" for="coverImgElem">
              <Icon v-if="!coverImgFinish" style="margin-top:30px" type="md-camera" size="36" />
              <img v-if="coverImgFinish" id="coverImgItem" :src="perviewCoverImgSrc" alt />
            </label>
            <div @click="delPerviewImg" v-if="coverImgFinish" class="delCoverImg">
              <Icon type="ios-trash" size="36" />
            </div>
          </div>
          <div id="videoName" style="margin-top:10px;">
            <h4>标题</h4>
            <Input
              v-model="videoInfo.title"
              placeholder="请输入标题"
              style="width: 400px;margin-top:10px;"
            />
          </div>
          <div id="videoIntroduction" style="margin-top:10px;">
            <h4>简介</h4>
            <Input
              v-model="videoInfo.introduction"
              maxlength="200"
              :rows="6"
              show-word-limit
              type="textarea"
              placeholder="Enter something..."
              style="width: 400px;margin-top:10px;"
            />
          </div>
          <div id="videoTag" style="margin-top:10px;">
            <h4>标签</h4>
            <CheckboxGroup v-model="videoInfo.tag">
              <Checkbox label="动画"></Checkbox>
              <Checkbox label="游戏"></Checkbox>
              <Checkbox label="学习"></Checkbox>
              <Checkbox label="音乐"></Checkbox>
            </CheckboxGroup>
          </div>
        </div>
      </div>
      <Button id="release" v-on:click="release" type="primary" style="margin:10px 0px;">发布</Button>
    </div>
    <Modal title="投稿消息" v-model="releaseFinish" cancel-text='' @on-ok="releaseResult">
      <Alert type="success">投稿成功，等待审核.</Alert>
    </Modal>
  </div>
</template>
<style lang="scss">
#videoManage {
  width: 100%;
  height: 100%;
}
.manageStyle {
  margin: 0;
  min-height: 80px;
  margin-top: 10px;
  text-align: left;
  padding-left: 50px;
}
.manageStyle > span {
  display: inline-block;
  height: 30px;
  line-height: 30px;
}
.manageStyle > span::after {
  content: "";
  width: 550px;
  //background:rgba($color: #ffffff, $alpha: .2);
  height: 1px;
  display: block;
  margin: 0;
  margin-left: 15px;
  border-bottom: 1px dashed rgba($color: #fff, $alpha: 0.6);
}
#upLoadvideo {
  padding: 10px 45px;
}
#uploadInput {
  padding-left: 15px;
  margin: 20px 0;
}
.uploadInfo {
  cursor: pointer;
  &:hover > .uploadIcon > .uploadInfoBtn > .del {
    visibility: visible;
  }
}
.uploadIcon {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#upLoadBtn {
  display: inline-block;
  background: #00a1d6;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  font-weight: 400px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #05befc;
  }
}
.upLoadJdt {
  height: 2px;
  background: #05befc;
  margin-top: 10px;
}
.uploadIcon {
  margin-top: 10px;
}
.uploadInfoBtn {
  text-align: right;
}
.del {
  visibility: hidden;
}
.del:hover {
  color: #00a1d6;
}
#videoInfo {
  margin-top: 20px;
}
#coverImgBtn {
  display: block;
  margin: 10px 0;
  background: #fff;
  border: 1px dashed #00a1d6;
  width: 120px;
  height: 100px;
  background: #1b2838;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  &:hover {
    border: 1px dashed #4ccffa;
  }
}
.delCoverImg {
  position: relative;
  top: -110px;
  display: none;
  width: 120px;
  height: 100px;
  background: rgba($color: #fff, $alpha: 0.1);
  border-radius: 4px;
  cursor: pointer;
  padding: 30px 40px;
}
.videoCoverImg {
  height: 140px;
  width: 120px;
  overflow: hidden;
  &:hover > .delCoverImg {
    display: block;
  }
}
#coverImgItem {
  width: 100%;
  height: 100%;
}
.waitingAudit{
  display: flex;
  flex-direction: row;
  height: 90px;
  padding: 10px 0 0 10px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.4);
  background:rgba(39,60,104,0.4);
  margin: 10px 0px 0px 15px;
  width: 550px;
  &:hover{
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.6); 
  }
}
.auditImgWrap{
  width: 120px;
}
.auditImgWrap>img{
  width: 100%;
}
.aduitInfo{
    margin-left: 20px;
    width: 330px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: rgba($color: #fff, $alpha: 0.8);
}
</style>
<script>
export default {
  data() {
    return {
      upLoadJdt: 0,
      uploadName: "",
      isHidden: false,
      complete: false,
      coverImgFinish: false,
      perviewCoverImgSrc: "",
      videoInfo: {
        userId: "",
        introduction: "",
        title: "",
        tag: [],
        videoName: "",
        videoFile: "",
        coverImgName: ""
      },
      videoCoverImg: "",
      releaseFinish:false,
      audit:'',
    };
  },
  mounted(){
    this.initPage();
  },
  methods: {
    initPage(){
      let userId = new FormData();
      userId.append("userId",this.$store.state.user.userId);
      this.$axios({
        method:"post",
        data:userId,
        url: "/api/controller/initVideoPage.php",
      }).then(res=>{
        this.audit = res.data;
        console.log(this.audit);
      })
    },
    async handleFiles(e) {
      this.uploadName = e.target.files[0].name;
      let bytePerPice = 10 * 1024 * 1024;
      //let fileInfo = new FormData();
      let file = this.$refs.videoFile.files[0];
      let start = 0;
      let end;
      let index = 0;
      let fileSize = file.size;
      let fileName = file.name;
      let total = Math.ceil(fileSize / bytePerPice);
      //console.log(file.size);
      let date = new Date().getTime();
      let md5Value = this.$md5(date + fileName); //防止同名文件覆盖
      this.videoInfo.videoName = fileName;
      this.videoInfo.videoFile = md5Value;
      //console.log(file.type);
      while (start < fileSize) {
        end = start + bytePerPice;
        if (end > fileSize) {
          end = fileSize;
        }
        let chunk = file.slice(start, end);
        let sliceIndex = md5Value + index;
        let formData = new FormData();
        formData.append("file", chunk, sliceIndex);
        formData.append("total", total);
        formData.append("orginalName", fileName);
        formData.append("currentIndex", index + 1);
        formData.append("fileType", file.type);
        formData.append("fileMd5", md5Value);
        await this.$axios({
          method: "post",
          data: formData,
          url: "/api/controller/getupload.php",
          headers: { "Content-Type": "multipart/form-data" }
        })
          .then(res => {
            //console.log(res);
            this.upLoadJdt = (res.data / total) * 100;
            this.isHidden = true;
            if (res.data == total) {
              this.complete = true;
            }
            //console.log(res.data);
          })
          .catch(error => {
            console.log(error);
          });
        start = end;
        index++;
      }
    },
    uploadCoverImg(e) {
      let perUrl = URL.createObjectURL(e.target.files["0"]);
      this.perviewCoverImgSrc = perUrl;
      this.coverImgFinish = true;
      this.videoCoverImg = e.target.files["0"];
      //console.log(e.target);
    },
    delPerviewImg() {
      this.$refs.coverImg = "";
      this.perviewCoverImgSrc = "";
      this.coverImgFinish = false;
      this.videoCoverImg = "";
    },
    delTmpVideo() {
      if (this.videoInfo.videoFile != "") {
        this.$axios({
          method: "post",
          data: { dirName: this.videoInfo.videoFile },
          url: "/api/controller/delTmpVideo.php"
        }).then(res => {
          //console.log(res.data);
          this.videoInfo.videoFile = "";
          this.complete = false;
          this.uploadName = "";
          this.isHidden = false;
          this.upLoadJdt = 0;
        });
      }
    },
    release() {
      this.videoInfo.userId = this.$store.state.user.userId;
      this.videoInfo.coverImgName = this.videoCoverImg.name;
      for(let key in this.videoInfo){
        if(this.videoInfo[key] === ''){
          //console.log("the "+key+"  cannot be empty");
          alert("the "+key+"  cannot be empty");
          return ;
        }
      }
      if(this.videoCoverImg == ''){
        alert("the videoCoverImg cannot be empty");
        return ;
      }
      let coverImgInfo = new FormData();
      let jsonVideoInfo;
      let upLoadImgFinish;
      coverImgInfo.append("coverImg", this.videoCoverImg);
      coverImgInfo.append("dir", this.videoInfo.videoFile);
      //console.log(this.videoInfo.videoFile);
      this.$axios({
        method: "post",
        data: coverImgInfo,
        url: "/api/controller/getTmpCoverImg.php",
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        //console.log(res.data);
      });
      jsonVideoInfo = JSON.stringify(this.videoInfo);
      this.$axios({
        method: "post",
        data: jsonVideoInfo,
        url: "/api/controller/saveTmpVideo.php"
      }).then(res => {
        this.releaseFinish = true;
        //console.log(res.data);
      });
      //console.log(JSON.stringify(this.videoInfo));
    },
    releaseResult(){
      location.reload();
    }
  }
};
</script>
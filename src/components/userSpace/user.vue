<template>
  <div id="user">
    <div class="userIcon userStyle">
      <img :src="'/api/'+user.userIcon" alt />
      <input
        accept="image/*"
        @change="alterIcon"
        id="iconElem"
        ref="iconImg"
        type="file"
        style="display:none"
      />
      <label for="iconElem" class="alterIcon">
        <Icon size="36" type="ios-add" class="iconAdd" />
      </label>
      <div class="perView" v-if="perviewIcon !=''">
        <img :src="perviewIcon" alt srcset />
        <Button type="primary" class="perCancel" @click="perCancel">取消</Button>
      </div>
    </div>
    <div class="userName userStyle">
      <span>昵称：</span>
      <input v-model="alterName" class="ipnutText" type="text" :placeholder="user.userName" />
    </div>
    <div class="userID userStyle">
      <span>账号：</span>
      {{user.userId}}
    </div>
    <div class="userEmail userStyle">
      <span>手机：</span>
      {{user.userPhone}}
    </div>
    <div class="userEmail userStyle">
      <span>修改密码：</span>
      <input v-model="newPwd" class="ipnutText" type="text" placeholder="请输入新的密码" />
    </div>
    <div id="alterUserInfo" @click="upInfo">
      <span>保存</span>
    </div>
  </div>
</template>
<style lang="scss">
#user {
  width: 100%;
  margin-top: 20px;
  height: 100%;
  min-height: 500px;
  //background: red;
}
.userIcon {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-flow: row;
}
.userIcon > img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
.userStyle {
  text-align: left;
  height: 52px;
  line-height: 52px;
  text-indent: 2em;
  padding-left: 20px;
  border-bottom: 1px dashed rgba($color: #000000, $alpha: 0.4);
}
.userIcon {
  height: 120px;
}
.userIcon:hover > .alterIcon {
  visibility: visible;
}
#alterUserInfo {
  margin-top: 40px;
}
#alterUserInfo > span {
  display: inline-block;
  width: 70px;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  border-radius: 4px;
  cursor: pointer;
  background: #00a1d6;
  font-weight: 500;
  &:hover {
    background: #05befc;
  }
}
.alterIcon {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba($color: #000000, $alpha: 0.4);
  top: 0;
  left: 20px;
  cursor: pointer;
  visibility: hidden;
}
.iconAdd {
  position: relative;
  left: -25px;
  top: 30%;
}
.perView > img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
.perCancel {
  position: relative;
  top: -40px;
  left: 10px;
}
.ipnutText {
  height: 28px;
  background: rgba($color: #ffffff, $alpha: 1);
  border: 1px solid rgba($color: #000000, $alpha: 1);
  padding: 4px;
  color: #fff;
}
</style>
<script>
export default {
  data() {
    return {
      user: this.$store.state.user,
      perviewIcon: "",
      upIcon: "",
      alterName: "",
      newPwd: ""
    };
  },
  methods: {
    alterIcon(e) {
      let perUrl = URL.createObjectURL(e.target.files["0"]);
      this.perviewIcon = perUrl;
      this.upIcon = e.target.files["0"];
    },
    perCancel() {
      this.perviewIcon = "";
      this.upIcon = "";
    },
    upInfo() {
      if (this.alterName == "" && this.alterName == "" && this.newPwd == "") {
        return;
      }
      if (this.alterName == "") {
        this.alterName = this.user.userName;
      }
      if (this.newPwd == "") {
        this.newPwd = this.user.password;
      }
      let info = new FormData();
      info.append("code", "upInfo");
      info.append("userName", this.alterName);
      info.append("password", this.newPwd);
      info.append("icon", this.upIcon);
      info.append("userPhone", this.user.userPhone);
      info.append("userId", this.user.userId);
      this.$axios({
        method: "post",
        data: info,
        url: "/api/controller/userSpace.php"
      }).then(res => {
        console.log(res.data);
        this.$store.commit("setUserInfo", res.data);
        location.reload();
      });
    }
  }
};
</script>

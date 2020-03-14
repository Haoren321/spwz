<template>
  <div id="login-main">
    <header>
      <div id="logo">
        <img
          src="data:image/png;base64,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"
          alt
        />
      </div>
    </header>
    <div id="login-content">
      <input class="myInput" placeholder="账号" style="width: 320px" v-model="user.userId" />
      <input
        class="myInput"
        placeholder="密码"
        style="width: 320px;margin-top: 15px;"
        v-model="user.userPwd"
      />
      <div class="errMsg">{{errMsg}}</div>
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>
<style lang="scss">
#login-main {
  width: 100%;
  height: 100%;
  background: rgb(12, 25, 53);
  display: flex;
  flex-direction: column;
  align-items: center;
}
#logo {
  width: 100%;
  margin-top: 20px;
}
#login-content {
  width: 320px;
  margin-top: 10px;
}
#logo > img {
  margin: 0 auto;
}
.myInput {
  color: #000;
  flex-grow: 1;
  font-weight: 500;
  border: 0;
  height: 35px;
  line-height: 35px;
  box-sizing: border-box;
  padding: 0 5px;
  font-size: 14px;
  min-width: 115px;
  text-decoration: none;
  outline: none;
  width: 300px;
  background: #fff;
  border-radius: 2px;
}
.login-btn {
  width: 320px;
  height: 35px;
  background: #fff;
  margin-top: 15px;
  text-align: center;
  color: #fff;
  padding-top: 7px;
  font-weight: 500;
  font-size: 14px;
  background: rgba(44, 44, 44, 0.8);
  margin-bottom: 30px;
  cursor: pointer;
  border-radius: 2px;
  &:hover {
    background: rgba(44, 44, 44, 1);
  }
}
.errMsg {
  color: rgba(206, 9, 9, 0.856);
  font-weight: 500;
  font-size: 14px;
  margin-top: 10px;
}
</style>
<script>
export default {
  data() {
    return {
      user: {
        userId: null,
        userPwd: null
      },
      errMsg: ""
    };
  },
  methods: {
    login() {
      let then = this;
      console.log(parseFloat(this.user.userId));
      if (parseFloat(this.user.userId).toString() == 'NaN') return (this.errMsg = "账号只能为数字，不能为空。");
      this.$axios({
        method: "post",
        data: this.user,
        url: "/api/controller/login.php"
      }).then(response => {
        this.errMsg='';
        if (typeof response.data == "string") {
          this.errMsg = response.data;
        } else {
          //更改登录状态
          this.$store.commit("isLogin", true);
          //更新父组件的user
          this.$emit("setUserInfo", response.data);
        }
        console.log(response.data);
        //console.log(this.indexCoverimg);
        //console.log(typeof(response.data));
      });
    }
  }
};
</script>
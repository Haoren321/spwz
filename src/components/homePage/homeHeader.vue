<template>
  <div id="homeHeader">
    <div id="websit-icon">
      <img src="../../assets/svideo_lightblue.png" alt />
    </div>
    <div id="search" v-show="isActive">
      <Input search enter-button placeholder="Enter something..." />
    </div>
    <div id="userLoginItem" v-if="login === false">
      <a id="login" @click="userLogin" style="color:#d9dadd;">
        <Avatar icon="ios-person" />登录
      </a>
      <a id="register" @click.prevent="register" style="color:#d9dadd;">注册</a>
    </div>
    <div id="userLogin" v-if="login === true">
      <img id="userIcon" :src="'/api/'+user.userIcon" />
      <div id="userMenu">
        <div class="userMenuName">{{user.userName}}</div>
        <Divider style="background:rgba(0, 0, 0, .2);margin:10px 0 0 0;" />
        <div class="userConfig">
          <a v-on:click="gotoUser('fans')">
            粉丝
            <span class="text-link">111</span>
          </a>
          <a>
            消息
            <span class="text-link">2</span>
          </a>
          <a>
            关注
            <span class="text-link">10</span>
          </a>
        </div>
        <Divider style="background:rgba(0, 0, 0, .2);margin:0px 0 0 0;" />
        <div class="userconfig">
          <div class="userSpace" v-on:click="gotoUser('user')">个人空间</div>
          <div class="userSpace" v-on:click="gotoUser('videoManage')">投稿管理</div>
        </div>
        <Divider style="background:rgba(0, 0, 0, .2);margin:0px 0 0 0;" />
        <div class="loginOut">
          <a v-on:click="loginOut">退出</a>
        </div>
      </div>
    </div>
    <div id="userName" v-if="login === true">{{user.userName}}</div>
    <Modal v-model="isHidden" width="400" :mask="false" footer-hide class="login-dialog">
      <loginTem v-show="loginModal" @setUserInfo="getUserInfo"></loginTem>
      <registerTem v-show="registerModal" @setUserInfo="getUserInfo"></registerTem>
    </Modal>
  </div>
</template>
<style lang="scss" scoped>
#homeHeader {
  width: 100%;
  height: 100%;
  background: #17233d;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.6);
}
#websit-icon {
  width: 14%;
}
#websit-icon > img {
  width: 134px;
}
#search {
  width: 35%;
  max-width: 444px;
}
#userLoginItem {
  width: 14%;
}
.login-dialog /deep/ .ivu-modal {
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.6);
  width: 800px;
}
.login-dialog /deep/.ivu-modal-body {
  padding: 0;
  margin: 0;
}
#userLogin {
  width: 50px;
  height: 100%;
  margin-left: 45px;
  padding-top: 0px;
  transition: padding-top 0.2s;
}
#userIcon {
  border-radius: 50%;
  position: relative;
  width: 40px;
  height: 40px;
  top: 25px;
  cursor: pointer;
  z-index: 902;
  object-fit: cover;
}
#userLogin:hover {
  padding-top: 18px;
}
#userLogin:hover > #userIcon {
  width: 55px;
  height: 55px;
}
#userMenu {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 210px;
  height: 0px;
  //background: #202d52;
  background: #17233d;
  z-index: 901;
  top: 5px;
  left: -30px;
  visibility: hidden;
  transition: height 0.2s;
  border-radius: 8px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.8);
}
#userLogin:hover > #userMenu {
  visibility: visible;
  height: 280px;
}
#userName {
  margin-top: 10px;
  font-weight: 500;
}
#userLogin:hover ~ #userName {
  visibility: hidden;
}
.userMenuName {
  text-align: left;
  margin-top: 30px;
  font-weight: 500;
  font-size: 18px;
  text-indent: 2em;
}
.userConfig {
  padding: 10px 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.text-link {
  display: block;
}
.userSpace {
  margin: 15px 40px;
  font-size: 14px;
  text-align: left;
  line-height: 120%;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: #2d8cf0;
  }
}
.loginOut {
  margin-top: 10px;
  padding-left: 40px;
  text-align: left;
}
a {
  color: #fff;
  &:hover {
    color: #2d8cf0;
  }
}
</style>
<script>
import loginTem from "../homePage/login";
import registerTem from "../homePage/register"
export default {
  components: {
    loginTem,
    registerTem
  },
  data() {
    return {
      isActive: true,
      login: this.$store.state.isLogin,
      isHidden: false,
      user: this.$store.state.user,
      loginModal:false,
      registerModal:false,
    };
  },
  computed: {
    getLoginState() {
      return this.$store.state.isLogin;
    }
  },
  watch: {
    getLoginState(newVal, oldVal) {
      this.login = this.$store.state.isLogin;
      this.isHidden = !this.$store.state.isLogin;
      location.reload();
      if (this.$store.state.isLogin) {
        this.$store.commit("setUserInfo",this.user);
      }else{
        this.$store.commit("setUserInfo",'');
      }
    }
  },
  methods: {
    userLogin(){
      this.loginModal = true;
      this.registerModal = false;
      this.isHidden = true;
      //console.log(this.loginModal);
    },
    register() {
      this.loginModal = false;
      this.registerModal = true;
      this.isHidden = true;
      //console.log(this.registerModal)
    },
    getUserInfo(userInfo) {
      this.user = userInfo;
    },
    gotoUser(e){
      //console.log(e);
      this.$router.push({path:'/userSpace/'+e,params:{user:this.user}});
    },
    loginOut(){
        this.$store.commit("isLogin",false);
        this.user = '';
        this.isHidden = false;
        location.reload();
    }
  }
};
</script>
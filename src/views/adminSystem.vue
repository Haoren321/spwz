<template>
  <div id="adminSystem">
    <div class="login" v-if="!adminIsLogin">
      <h3>Svideo</h3>
      <div class="xhx"></div>
      <Input type="text" v-model="admin.adminId" placeholder="default size" style="width:300px;" />
      <Input
        type="password"
        password
        placeholder="default size"
        style="width:300px;margin-top:20px;"
        v-model="admin.pw"
      />
      <div class="xhx"></div>
      <Button v-on:click="loginAdmin" type="success" style="width:300px;">登录</Button>
    </div>
    <div id="adminContent" v-if="adminIsLogin">
      <adminContent></adminContent>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  margin: 0 auto;
  width: 380px;
  height: 230px;
  background: rgba(12, 25, 53, 0.4);
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.8);
}
.xhx {
  height: 1px;
  width: 100%;
  margin: 15px 0px;
  background: rgba(223, 222, 222, 0.4);
}
</style>
<script>
import adminContent from "../components/adminSystem/adminContent"
export default {
  components:{
    adminContent
  },
  data() {
    return {
      adminIsLogin: this.$store.state.admin.isLogin,
      admin: {
          adminId:'',
          pw:''
      },
      setAdmin:this.$store.state.admin,
    };
  },
  computed:{
      watchAdmin(){
          return this.$store.state.admin;
      }
  },
  watch:{
      watchAdmin(newVal,Oldval){
          this.adminIsLogin = this.$store.state.admin.isLogin;
      }
  },
  methods: {
    loginAdmin() {
      let admin = new FormData();
      admin.append("admin", JSON.stringify(this.admin));
      admin.append("code", "login");
      this.$axios({
        method: "post",
        data: admin,
        url:"/api/controller/adminSystem.php"
      }).then(res => {
          if(typeof(res.data) != String){
              this.$store.commit("setAdmin",res.data);
          }
      });
    }
  }
};
</script>
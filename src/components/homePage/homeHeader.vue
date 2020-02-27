<template>
    <div id="homeHeader">
        <div id="websit-icon">
            <img src="../../assets/svideo_lightblue.png" alt="">
        </div>
        <div id="search" v-show="isActive">
            <Input search enter-button placeholder="Enter something..." />
        </div>
        <div id="user" v-if="isHidden === false">
            <a id="login" @click="login=true" style="color:#d9dadd;">
                <Avatar icon="ios-person" /> 登录
            </a>
            <a id="register" @click="register" style="color:#d9dadd;">注册</a>
        </div>
        <div id="userLogin" v-if="isHidden === true">
            <Avatar :src="'/api/'+user.userIcon"/> 
            <span>{{user.userName}}</span>
        </div>
        <Modal 
        v-model="login"
        width="400"
        :mask="false"
        footer-hide
        :hidden="isHidden"
        class="login-dialog">
        <loginTem @setUserInfo="getUserInfo">
        </loginTem>    
        </Modal>
    </div>
</template>
<style lang="scss" scoped>
#homeHeader{
    width: 100%;
    height: 100%;
    background: #17233d;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.6);
}
#websit-icon{
    width: 14%;
}
#websit-icon > img{
    width: 134px;
}
#search{
    width: 35%;
}
#user{
    width: 14%;
}
.login-dialog /deep/ .ivu-modal{
     box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.6);
     width: 800px;
}
.login-dialog /deep/.ivu-modal-body{
    padding: 0;
    margin: 0;    
}
#userLogin{
    margin-left: 6%;
}
#userLogin>span{
    margin-left: 8px;
    font-weight: 500;
}
</style>
<script>
import loginTem from "../homePage/login"
export default {
    components:{
        loginTem
    },
    data(){
        return{
            isActive:true,
            login:false,
            isHidden:false,
            user:'',
        }
    },
    computed:{
        getLoginState(){
            return this.$store.state.isLogin;
        }
    },
    watch:{
        getLoginState(newVal, oldVal){
            this.isHidden = this.$store.state.isLogin;
        }
    },
    methods:{
        register(){
            //console.log(this.$store.state)
        },
        getUserInfo(userInfo){
            this.user = userInfo;
            console.log(this.user);
        },
        aa(){
            console.log(this.isHidden);
        }
    }
}
</script>
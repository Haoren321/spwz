<template>
    <div id="homeHeader">
        <div id="websit-icon">
            <img src="../../assets/svideo_lightblue.png" alt="">
        </div>
        <div id="search" v-show="isActive">
            <Input search enter-button placeholder="Enter something..." />
        </div>
        <div id="user" v-if="login === false">
            <a id="login" @click="isHidden=true" style="color:#d9dadd;">
                <Avatar icon="ios-person" /> 登录
            </a>
            <a id="register" @click="register" style="color:#d9dadd;">注册</a>
        </div>
        <div id="userLogin" v-if="login === true">
            <img id="userIcon" :src="'/api/'+user.userIcon"> 
            <span>{{user.userName}}</span>
            <div id="userMenu">
            </div>            
        </div>
        <Modal 
        v-model="isHidden"
        width="400"
        :mask="false"
        footer-hide
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
    max-width: 444px;
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
    width: 80px;
    height: 100%;
    margin-left: 40px;
    padding-top: 0px;
    transition: padding-top .2s;
}
#userIcon{
    border-radius: 50%;
    position: relative;
    width: 35px;
    height: 35px;
    top: 25px;
    cursor: pointer;
    z-index: 902;
}
#userLogin:hover{
    padding-top: 18px;
}
#userLogin:hover>#userIcon{
    margin-left: 10px;
    width: 55px;
    height: 55px;
}
#userLogin>span{
    display: block;
    position: relative;
    margin-bottom: 20px;
    margin-left: 63px;
    font-weight: 500;
    top: -8px;
}
#userLogin:hover>span{
    visibility: hidden;
}
#userMenu{
    position: relative;
    width: 182px;
    height: 100px;
    background: #0b0f1a;
    z-index: 901;
    top: -38px;
    visibility: hidden;
    opacity: 0;
    transition: opacity .4s;
    border-radius: 4px;
}
#userLogin:hover>#userMenu{
    visibility: visible;
    opacity: 1;
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
            this.login = this.$store.state.isLogin;
            this.isHidden = !this.$store.state.isLogin;
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
<template>
  <div id="user">
    <div class="userIcon userStyle">
      <img :src="'/api/'+user.userIcon" alt />
    </div>
    <div class="userName userStyle"><span>昵称：</span>{{user.userName}}</div>
    <div class="userID userStyle"><span>账号：</span>{{user.userId}}</div>
    <div class="userEmail userStyle"><span>邮箱：null</span></div>
    <div id="alterUserInfo"><span>保存</span></div>
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
.userIcon>img{
  height: 100px;
  border-radius: 50%;
}
.userStyle{
    text-align: left;
    height: 52px;
    line-height: 52px;
    text-indent: 2em;
    padding-left: 20px;
    border-bottom: 1px dashed rgba($color: #000000, $alpha: .4);
}
.userIcon{
    height: 120px;
}
#alterUserInfo{
  margin-top: 40px;
}
#alterUserInfo>span{
  display: inline-block;
  width: 70px;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  border-radius: 4px;
  cursor: pointer;
  background: #00a1d6;
  font-weight: 500;
  &:hover{
    background: #05befc;
  }
}
</style>
<script>
export default {
  data() {
    return {
      user: this.$store.state.user
    };
  }
};
</script>

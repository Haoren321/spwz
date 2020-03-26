<template>
  <div id="error">
    <header>
      <homeHeader />
    </header>
    <div id="container">
      <div class="errorImg">
        <img src="../assets/very_sorry.png" alt srcset />
      </div>
      <div class="errorButton">
        <Button type="primary" @click="goHome">返回首页</Button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
header {
  height: 82px;
}
#container {
  margin: 10px;
  display: flex;
  flex-direction: column;
}
</style>
<script>
import homeHeader from "../components/homePage/homeHeader";
export default {
  components: {
    homeHeader
  },
  mounted() {},
  methods: {
    goHome() {
      this.$router.push({ path: "/Home" });
    }
  }
};
</script>
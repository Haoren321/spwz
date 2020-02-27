<template>
  <div id="home">
    <div id="header-warp">
      <homeHeader />
    </div>
    <div id="content-container">
      <homeContent />
    </div>
    <div id="homeFooter-container">
      <homeFooter />
      <div id="elevator">
        <homeElevator/>
      </div>      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import homeHeader from "../components/homePage/homeHeader";
import homeContent from "../components/homePage/homeContent";
import homeFooter from "../components/homePage/homeFooter";
import homeElevator from "../components/homePage/elevator";

export default {
  components: {
    homeHeader,
    homeContent,
    homeFooter,
    homeElevator
  }
};
</script>
<style scoped>
#header-warp {
  width: 100%;
  height: 82px;
}
#content-container {
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 1198px;
}
#homeFooter-container {
  height: 102px;
}
#elevator{
  position: fixed;
  top: 163px;
  right: 0;
  width: 56px;
  height: 400px;
}
@media screen and (max-width: 1199PX){
  #elevator {
    display: none;
  }
}
</style>

<template>
  <div id="homeElevator">
    <div class="elvator" v-for=" value in elvatorData" v-bind:key="value.id">
      <div class="elvator-item" v-bind:class="{elvatorItemActive:value.active}" @click="changeHash(value.id)">{{value.name}}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#homeElevator {
  background: #17233d;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.6);
}
.elvator-item {
  margin-top: 8px;
  cursor: pointer;
  &:hover {
    color: #2d8cf0;
    background-color: #0e1625;
  }
}
.elvatorItemActive {
  color: #2d8cf0;
  background-color: #0e1625;
}
</style>
<script>
export default {
  data() {
    return {
      elvatorBoder: 0,
      elvatorData: [
        { id: "comic", name: "动漫",active:false },
        { id: "game", name: "游戏",active:false },
        { id: "music", name: "音乐",active:false},
        { id: "learn", name: "学习",active:false },
        { id: "homeHeader", name: "TOP" ,active:false}
      ]
    };
  },
  mounted: function() {
    this.changeElvator()
  },
  methods: {
    changeHash(name) {
      document.querySelector("#" + name).scrollIntoView(true);
    },
    changeElvator() {
      $(document).scroll(() => {
        let top = $(document).scrollTop();
        if (top > 214 && top < 514) {
            this.elvatorData[0].active = true;
        }else{
            this.elvatorData[0].active = false;
        }
        if (top > 514 && top < 1074) {
            this.elvatorData[1].active = true;
        }else{
            this.elvatorData[1].active = false;
        }  
        if (top > 1074 && top < 1438) {
            this.elvatorData[2].active = true;
        }else{
            this.elvatorData[2].active = false;
        } 
        if (top > 1438 && top < 1838) {
            this.elvatorData[3].active = true;
        }else{
            this.elvatorData[3].active = false;
        }                      
      });
    }
  }
};
</script>
<template>
  <div id="homeContent">
    <div id="nav">
      <Menu id="menu" mode="horizontal" theme="light" active-name="1">
        <MenuItem name="1">
          <div id="index-link" style="padding-top:0px;">
            <div>
              <Icon type="md-home" id="index-icon" />首页
            </div>
          </div>
        </MenuItem>
        <MenuItem name="2">
          <div id="rank-link" style="padding-top:0px">
            <router-link to="/category/rank">
              <Icon type="ios-stats" id="rank-icon" />排行榜
            </router-link>
          </div>
          <div class="shx"></div>
        </MenuItem>
        <MenuItem name="3">
          <a :href="'/category/'+'comic'" class="categoryLink">
            <Icon type="ios-videocam-outline" />动画
          </a>
        </MenuItem>
        <MenuItem name="4">
          <a :href="'/category/'+'game'" class="categoryLink">
            <Icon type="ios-game-controller-b-outline" />游戏
          </a>
        </MenuItem>
        <MenuItem name="5">
          <a :href="'/category/'+'music'" class="categoryLink">
            <Icon type="ios-musical-notes-outline" />音乐
          </a>
        </MenuItem>
        <MenuItem name="6">
          <a :href="'/category/'+'learn'" class="categoryLink">
            <Icon type="ios-book-outline" />学习
          </a>
        </MenuItem>
      </Menu>
    </div>
    <div id="first">
      <div id="first-left">
        <Carousel
          id="carousel-left"
          arrow="never"
          radius-dot
          autoplay
          :autoplay-speed="carousel_speed"
          loop
        >
          <CarouselItem class="carousel-item" v-for="(item,index) in lunbodata" v-bind:key="index">
            <div class="demo-carousel">
              <router-link :videoInfo="item" :to="'/video/'+item.sv_id">
                <img :src="'/api'+item.cover_img" alt="张子枫小朋友~" />
                <p class="title">{{item.title}}</p>
              </router-link>
            </div>
          </CarouselItem>
        </Carousel>
      </div>
      <div id="first-right">
        <Carousel id="carousel-right" dots="none">
          <CarouselItem>
            <div class="recommend-box">
              <div class="recommend-box-item" v-for="(item,index) in comic.slice(0,6)" :key="index">
                <div class="info-box">
                  <a :href="'/video/'+item.sv_id">
                    <img :src="'/api'+item.cover_img" alt />
                    <div class="info">
                      <p class="title">{{item.title}}</p>
                      <div class="author">
                        <Icon type="ios-square-outline" color="white" size="16" />
                        {{item.userName}}
                      </div>
                      <p>
                        <Icon type="ios-videocam-outline" color="white" size="16" />
                        {{item.cout_watch}}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="recommend-box">
              <div class="recommend-box-item" v-for="(item,index) in comic.slice(0,6)" :key="index">
                <div class="info-box">
                  <a :href="'/video/'+item.sv_id">
                    <img :src="'/api'+item.cover_img" alt />
                    <div class="info">
                      <p class="title">{{item.title}}</p>
                      <div class="author">
                        <Icon type="ios-square-outline" color="white" size="16" />
                        {{item.userName}}
                      </div>
                      <p>
                        <Icon type="ios-videocam-outline" color="white" size="16" />
                        {{item.cout_watch}}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="recommend-box">
              <div class="recommend-box-item" v-for="(item,index) in comic.slice(0,6)" :key="index">
                <div class="info-box">
                  <a :href="'/video/'+item.sv_id">
                    <img :src="'/api'+item.cover_img" alt />
                    <div class="info">
                      <p class="title">{{item.title}}</p>
                      <div class="author">
                        <Icon type="ios-square-outline" color="white" size="16" />
                        {{item.userName}}
                      </div>
                      <p>
                        <Icon type="ios-videocam-outline" color="white" size="16" />
                        {{item.cout_watch}}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="recommend-box">
              <div class="recommend-box-item" v-for="(item,index) in comic.slice(0,6)" :key="index">
                <div class="info-box">
                  <a :href="'/video/'+item.sv_id">
                    <img :src="'/api'+item.cover_img" alt />
                    <div class="info">
                      <p class="title">{{item.title}}</p>
                      <div class="author">
                        <Icon type="ios-square-outline" color="white" size="16" />
                        {{item.userName}}
                      </div>
                      <p>
                        <Icon type="ios-videocam-outline" color="white" size="16" />
                        {{item.cout_watch}}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
    <div class="second" id="comic">
      <div class="left">
        <dir class="card-header">
          <img src="../../assets/dm_icon.png" alt />
          <a>动画</a>
        </dir>
        <div class="card-content">
          <div class="second-list-box">
            <div class="video-card-common" v-for="(item,index) in comic" :key="index">
              <div class="card-pic">
                <a :href="'video/'+item.sv_id">
                  <img :src="'/api'+item.cover_img" alt />
                  <div class="info">
                    <div class="card-right">
                      <span>{{item.title}}</span>
                    </div>
                    <div class="card-left">
                      <span>{{item.userName}}</span>
                      <span>
                        <Icon
                          type="ios-videocam-outline"
                          color="white"
                          size="16"
                          style="margin:6px"
                        />
                        {{item.cout_watch}}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="card-header">
          <span>排行榜</span>
        </div>
        <div class="card-content">
          <div class="rank-item" v-for="(item,index) in comic" :key="index" style="height:42px">
            <a :href="'/video'+item.sv_id">
              <span style="font-size:18px;margin-right:8px;color:gray">{{index}}</span>
              {{item.title}}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="second" id="game">
      <div class="left">
        <dir class="card-header">
          <img src="../../assets/game_icon.png" alt />
          <a>游戏</a>
        </dir>
        <div class="card-content">
          <div class="second-list-box">
            <div class="video-card-common" v-for="(item,index) in game" :key="index">
              <div class="card-pic">
                <a :href="'video/'+item.sv_id">
                  <img :src="'/api'+item.cover_img" alt />
                  <div class="info">
                    <div class="card-right">
                      <span>{{item.title}}</span>
                    </div>
                    <div class="card-left">
                      <span>{{item.userName}}</span>
                      <span>
                        <Icon
                          type="ios-videocam-outline"
                          color="white"
                          size="16"
                          style="margin:6px"
                        />
                        {{item.cout_watch}}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="card-header">
          <span>排行榜</span>
        </div>
        <div class="card-content">
          <div class="rank-item" v-for="(item,index) in game" :key="index" style="height:42px">
            <a :href="'/video'+item.sv_id">
              <span style="font-size:18px;margin-right:8px;color:gray">{{index}}</span>
              {{item.title}}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="second" id="music">
      <div class="left">
        <dir class="card-header">
          <img src="../../assets/music_icon.png" alt />
          <a>音乐</a>
        </dir>
        <div class="card-content">
          <div class="second-list-box">
            <div class="video-card-common" v-for="(item,index) in music" :key="index">
              <div class="card-pic">
                <a :href="'video/'+item.sv_id">
                  <img :src="'/api'+item.cover_img" alt />
                  <div class="info">
                    <div class="card-right">
                      <span>{{item.title}}</span>
                    </div>
                    <div class="card-left">
                      <span>{{item.userName}}</span>
                      <span>
                        <Icon
                          type="ios-videocam-outline"
                          color="white"
                          size="16"
                          style="margin:6px"
                        />
                        {{item.cout_watch}}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="card-header">
          <span>排行榜</span>
        </div>
        <div class="card-content">
          <div class="rank-item" v-for="(item,index) in music" :key="index" style="height:42px">
            <a :href="'/video'+item.sv_id">
              <span style="font-size:18px;margin-right:8px;color:gray">{{index}}</span>
              {{item.title}}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="second" id="learn">
      <div class="left">
        <dir class="card-header">
          <img src="../../assets/learn_icon.png" alt />
          <a>学习</a>
        </dir>
        <div class="card-content">
          <div class="second-list-box">
            <div class="video-card-common" v-for="(item,index) in learn" :key="index">
              <div class="card-pic">
                <a :href="'video/'+item.sv_id">
                  <img :src="'/api'+item.cover_img" alt />
                  <div class="info">
                    <div class="card-right">
                      <span>{{item.title}}</span>
                    </div>
                    <div class="card-left">
                      <span>{{item.userName}}</span>
                      <span>
                        <Icon
                          type="ios-videocam-outline"
                          color="white"
                          size="16"
                          style="margin:6px"
                        />
                        {{item.cout_watch}}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="card-header">
          <span>排行榜</span>
        </div>
        <div class="card-content">
          <div class="rank-item" v-for="(item,index) in learn" :key="index" style="height:42px">
            <a :href="'/video'+item.sv_id">
              <span style="font-size:18px;margin-right:8px;color:gray">{{index}}</span>
              {{item.title}}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/homeContent";
</style>
<script>
export default {
  data() {
    return {
      carousel_speed: 4000,
      indexCoverimg: "/api/img/coverImg/timg.jpg",
      lunbodata: "",
      loddingItem: { comic: false, game: false, music: false, learn: false },
      comic: "",
      game: "",
      music: "",
      learn: "",
      carouselData: [
        {
          svId: "0",
          title: "做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿",
          coverImg: "/api/img/thumbnail/dasao.jpg",
          //var $preview_img;
          sourceUrl: "",
          author: "徐大sao",
          introduction:
            "做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿",
          coutWatch: "231万"
        },
        {
          svId: "1",
          title: "做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿",
          coverImg: "/api/img/thumbnail/dasao.jpg",
          //var $preview_img;
          sourceUrl: "#",
          author: "徐大sao",
          introduction:
            "做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿",
          coutWatch: "231万"
        },
        {
          svId: "2",
          title: "做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿",
          coverImg: "/api/img/thumbnail/dasao.jpg",
          //var $preview_img;
          sourceUrl: "#",
          author: "徐大sao",
          introduction:
            "做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿",
          coutWatch: "231万"
        },
        {
          svId: "3",
          title: "做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿",
          coverImg: "/api/img/thumbnail/dasao.jpg",
          //var $preview_img;
          sourceUrl: "#",
          author: "徐大sao",
          introduction:
            "做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿",
          coutWatch: "231万"
        },
        {
          svId: "4",
          title: "做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿",
          coverImg: "/api/img/thumbnail/dasao.jpg",
          //var $preview_img;
          sourceUrl: "#",
          author: "徐大sao",
          introduction:
            "做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿",
          coutWatch: "231万"
        },
        {
          svId: "5",
          title: "做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿",
          coverImg: "/api/img/thumbnail/dasao.jpg",
          //var $preview_img;
          sourceUrl: "#",
          author: "徐大sao",
          introduction:
            "做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿",
          coutWatch: "231万"
        }
      ]
    };
  },
  created: function() {
    this.getIndexUrl();
    this.lazyLoading("动画");
    this.watchSY();
  },
  methods: {
    getIndexUrl() {
      let getData = new FormData();
      getData.append("code", "recommand");
      this.$axios({
        method: "post",
        data: getData,
        url: "/api/controller/svideoCtro.php"
      }).then(res => {
        this.lunbodata = res.data;
      });
    },
    lazyLoading(tags) {
      let getData = new FormData();
      getData.append("code", "lazyLoading");
      getData.append("tag", tags);
      this.$axios({
        method: "post",
        data: getData,
        url: "/api/controller/loadIndex.php"
      }).then(res => {
        if (tags == "动画") {
          this.comic = res.data;
        } else if (tags == "游戏") {
          this.game = res.data;
        } else if (tags == "音乐") {
          this.music = res.data;
        } else {
          this.learn = res.data;
        }
        console.log(res.data);
      });
    },
    watchSY() {
      $(document).scroll(() => {
        let top = $(document).scrollTop();
        if (top >= 100 && top < 500 && !this.loddingItem["game"]) {
          this.lazyLoading("游戏");
          this.loddingItem["game"] = true;
        }
        if (top >= 500 && top < 1000 && !this.loddingItem["music"]) {
          this.lazyLoading("音乐");
          this.loddingItem["music"] = true;
        }
        if (top >= 1000 && !this.loddingItem["learn"]) {
          this.lazyLoading("学习");
          this.loddingItem["learn"] = true;
        }
      });
    }
  }
};
</script>
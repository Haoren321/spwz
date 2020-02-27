<template>
  <div id="homeContent">
    <div id="nav">
      <Menu id="menu" mode="horizontal" theme="light" active-name="1">
        <MenuItem name="1">
          <div id="index-link">
            <Icon type="md-home" id="index-icon" />
            <div>首页</div>
          </div>
        </MenuItem>
        <MenuItem name="2">
          <div id="rank-link">
            <Icon type="ios-stats" id="rank-icon" />
            <div>排行榜</div>
          </div>
          <div class="shx"></div>
        </MenuItem>
        <MenuItem name="3">
          <Icon type="ios-videocam-outline" />动画
        </MenuItem>
        <MenuItem name="4">
          <Icon type="ios-game-controller-b-outline" />游戏
        </MenuItem>
        <MenuItem name="5">
          <Icon type="ios-musical-notes-outline" />音乐
        </MenuItem>
        <MenuItem name="6">
          <Icon type="ios-book-outline" />学习
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
          <CarouselItem class="carousel-item">
            <div class="demo-carousel">
              <router-link to="/video/av2312">
                <img :src="indexCoverimg" alt="张子枫小朋友~" />
                <p class="title">张子枫小朋友~</p>
              </router-link>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">2</div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">3</div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">4</div>
          </CarouselItem>
        </Carousel>
      </div>
      <div id="first-right">
        <Carousel id="carousel-right" dots="none" loop>
          <CarouselItem>
            <div class="recommend-box">
              <div class="recommend-box-item" v-for="item in carouselData" v-bind:key="item.svId">
                <div class="info-box">
                  <a href>
                    <img :src="item.coverImg" alt />
                    <div class="info">
                      <p class="title">{{item.title}}}</p>
                      <div class="author">
                        <Icon type="ios-square-outline" />{{item.author}}
                      </div>
                      <p>{{item.coutWatch}}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="recommend-box">2</div>
          </CarouselItem>
          <CarouselItem>
            <div class="recommend-box">3</div>
          </CarouselItem>
          <CarouselItem>
            <div class="recommend-box">4</div>
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
              <div class="video-card-common">
                <div class="card-pic">
                  <a href="">
                    <img src="" alt=""/>
                    <div class="count">
                      <div class="card-left">
                        <span></span>
                        <span></span>
                      </div>
                      <div class="card-right">
                        <span></span>
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
          <Button type="default" ghost>
            更多
            <Icon type="ios-more" />
          </Button>
        </div>
        <div class="card-content"></div>
      </div>
    </div>
    <div class="second" id="game">
      <div class="left">
        <dir class="card-header">
          <img src="../../assets/game_icon.png" alt />
          <a>游戏</a>
        </dir>
        <div class="card-content"></div>
      </div>
      <div class="right">
        <div class="card-header">
          <span>排行榜</span>
          <Button type="default" ghost>
            更多
            <Icon type="ios-more" />
          </Button>
        </div>
        <div class="card-content"></div>
      </div>
    </div>
    <div class="second" id="music">
      <div class="left">
        <dir class="card-header">
          <img src="../../assets/music_icon.png" alt />
          <a>音乐</a>
        </dir>
        <div class="card-content"></div>
      </div>
      <div class="right">
        <div class="card-header">
          <span>排行榜</span>
          <Button type="default" ghost>
            更多
            <Icon type="ios-more" />
          </Button>
        </div>
        <div class="card-content"></div>
      </div>
    </div>
    <div class="second" id="learn">
      <div class="left">
        <dir class="card-header">
          <img src="../../assets/learn_icon.png" alt />
          <a>学习</a>
        </dir>
        <div class="card-content"></div>
      </div>
      <div class="right">
        <div class="card-header">
          <span>排行榜</span>
          <Button type="default" ghost>
            更多
            <Icon type="ios-more" />
          </Button>
        </div>
        <div class="card-content"></div>
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
      carouselData:[{
        svId:'0',
        title:'做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿',
        coverImg:'/api/img/thumbnail/dasao.jpg',
        //var $preview_img;
        sourceUrl:'',
        author:'徐大sao',
        introduction:'做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿',
        coutWatch:'231万'        
      },
      {
        svId:'1',
        title:'做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿',
        coverImg:'/api/img/thumbnail/dasao.jpg',
        //var $preview_img;
        sourceUrl:'#',
        author:'徐大sao',
        introduction:'做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿',
        coutWatch:'231万'        
      },
      {
        svId:'2',
        title:'做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿',
        coverImg:'/api/img/thumbnail/dasao.jpg',
        //var $preview_img;
        sourceUrl:'#',
        author:'徐大sao',
        introduction:'做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿',
        coutWatch:'231万'        
      },
      {
        svId:'3',
        title:'做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿',
        coverImg:'/api/img/thumbnail/dasao.jpg',
        //var $preview_img;
        sourceUrl:'#',
        author:'徐大sao',
        introduction:'做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿',
        coutWatch:'231万'        
      },
      {
        svId:'4',
        title:'做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿',
        coverImg:'/api/img/thumbnail/dasao.jpg',
        //var $preview_img;
        sourceUrl:'#',
        author:'徐大sao',
        introduction:'做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿',
        coutWatch:'231万'        
      },
      {
        svId:'5',
        title:'做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿',
        coverImg:'/api/img/thumbnail/dasao.jpg',
        //var $preview_img;
        sourceUrl:'#',
        author:'徐大sao',
        introduction:'做好防护，走出家门，大sao为远方的朋友做了一顿特殊的炸鸡腿',
        coutWatch:'231万'        
      }]
    };
  },
  mounted: function() {
    //this.getIndexUrl()
  },
  methods: {
    getIndexUrl() {
      let then = this;
      this.$axios({
        method: "get",
        url: "/api/controller/svideoCtro.php"
      }).then(function(response) {
        then.indexCoverimg = response.data;
        //console.log(this.indexCoverimg);
        console.log(then.indexCoverimg);
      });
    }
  }
};
</script>
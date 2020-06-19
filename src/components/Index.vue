<template>
  <div class="main-container video-main-page">
    <div class="menu-container close">
      <div class="menu-title">
        <div class="t">子系统</div>
        <div class="close">&times;</div>
      </div>
      <div
        class="menu-sroll"
        id="zxt"
        style="display:none"
      >
        <div
          class="menu-item"
          @click="spsbbjaqxt"
        >视频数据安全管控平台</div>
        <div
          class="menu-item"
          @click="sjaqxt"
        >视频设备安全监测平台</div>
      </div>
      <div
        class="menu-sroll"
        id="htgl"
        style="display:none"
      >
        <div
          class="menu-item"
          @click="spsbbjaqxt"
        >设备列表</div>
      </div>
      <div class="menu-control">
        <div
          class="control-item active"
          data-type="sys"
        >
          <img
            class="logo"
            src="@/assets/img/icon-sys.png"
          />
        </div>
        <!-- <div class="control-item" data-type="admin">
              <img class="logo" src="@/assets/img/icon-search.png"/>
            </div> -->
        <!-- <div class="control-item" data-type="search">
              <img class="logo" src="@/assets/img/icon-search.png"/>
            </div>
            <div class="control-item" data-type="step">
              <img class="logo" src="@/assets/img/icon-step.png"/>
            </div> -->
      </div>
    </div>
    <div class="header">
      <div class="h-wrapper">
        <div class="logo">
          <img src="@/assets/img/title.png" />
        </div>
        <div class="other-info">
          <span class="date">{{ nowDate + ' ' + nowTime }}</span>
          <span class="datetime">{{ nowWeek }}</span>
          <!-- <span class="separate">|</span>
                <span class="weather">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-baoyu"></use>
                    </svg>
                    <span>{{ date }}</span>
                </span> -->
        </div>
        <div class="btn-group">
          <a
            class="btn1"
            style="background-color: rgba(0,153,255,.2);border: 1px solid rgba(0,153,255,.8);color: #ffffff;"
            @click="logout"
          >退出</a>
          <!-- <div class="select">
                    <input value="admin" disabled />
                    <ul class="select-menu">
                        <li @click="logout">退出</li>
                    </ul>
                </div> -->
          <div class="select smenu">
            <span>菜单</span>
          </div>
        </div>
      </div>
    </div>
    <!--菜单-->
    <div class="view-container">
      <el-tabs
        v-model="activeName"
        class="nav-container"
        @tab-click="handleClick"
      >
        <el-tab-pane name="active">
          <span slot="label">
            <div
              class="nav-item active lh15"
              data-type="hy"
            >
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-map"></use>
              </svg>
              <div>AI</div>
            </div>
          </span>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label">
            <div
              class="nav-item lh15"
              data-type="map"
            >
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-hy"></use>
              </svg>
              <div>直播</div>
            </div>
          </span>
        </el-tab-pane>
        <el-tab-pane name="third">
          <span slot="label">
            <div
              class="nav-item lh15"
              data-type="video"
            >
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-video"></use>
              </svg>
              <div>点播</div>
            </div>
          </span>
        </el-tab-pane>
        <el-tab-pane name="fourth">
          <span slot="label">
            <div
              class="nav-item lh15"
              data-type="video"
              @click.stop="spsbbjaqxt"
            >
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-divace"></use>
              </svg>
              <div>设备</div>
            </div>
          </span>
        </el-tab-pane>
        <el-tab-pane name="fifth">
          <span slot="label">
            <div
              class="nav-item lh15"
              data-type="video"
              @click.stop="sjaqxt()"
            >
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-aq"></use>
              </svg>
              <div>安全</div>
            </div>
          </span>
        </el-tab-pane>
      </el-tabs>
      <!-- <div class="nav-container" v-on:click="initEvent($event)">
        <router-link to="./home" @click.native="routerRefresh">
          <div class="nav-item active" data-type="hy">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-map"></use>
              </svg>
              <div>数据</div>
          </div>
          </router-link>
          <router-link to="./map" @click.native="routerRefresh">
          <div class="nav-item" data-type="map">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-hy"></use>
              </svg>
              <div>地图</div>
          </div>
          </router-link>
          <router-link to="./screen" @click.native="routerRefresh">
          <div class="nav-item" data-type="video">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-video"></use>
              </svg>
              <div>视频</div>
          </div>
          </router-link>
        </div> -->
      <!-- 页面-->
      <!-- 页面主体 -->
      <div class="main-content">
        <div class="view-c">
          <home v-if="activeName=='active'" />
          <map1 v-else-if="activeName=='second'" />
          <screen v-else-if="activeName=='third'" />
          <!-- <keep-alive :include="keepAliveData">
                        <router-view v-if="isShowRouter"/>
                    </keep-alive> -->
          <!-- <div class="loading-c" >
                        <Spin size="large"></Spin>
                    </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/style-anjian.css";
import "@/assets/css/demo.css";
import "@/assets/js/jquery.1.10.2.min.js";
import "@/assets/js/init.js";
import "@/assets/js/iconfont.js";
// import '@/assets/js/liquidfill.js'
import "@/assets/js/three.js";
// import '@/assets/js/TrackballControls.js'
// import '@/assets/js/earth.js'
import home from "@/views/Home.vue";
import map1 from "@/views/Map.vue";
import screen from "@/views/Screen.vue";

export default {
  name: "index",
  components: {
    home,
    map1,
    screen
  },
  data() {
    return {
      activeName: "active",
      isShowRouter: true,
      routerAlive: true,
      // 主页路由名称
      home: "home",
      nowDate: "", // 当前日期
      nowTime: "", // 当前时间
      nowWeek: "", // 当前星期
      date: "" // 当前温度
    };
  },
  mounted() {
    this.init();
    this.initEvent();
    this.currentTime();
    this.werter();
  },
  watch: {},
  computed: {
    // 需要缓存的路由
    keepAliveData() {
      return "";
      // this.tagsArry.map(item => item.name)
    }
  },
  methods: {
    handleClick(tab, event) {
      // if (tab.name === 'fourth') {
      //   this.spsbbjaqxt()
      // }
      // if (tab.name === 'fifth') {
      //   this.sjaqxt()
      // }
    },
    // openOther () {
    //   window.open('http://www.baidu.com')
    // },
    spsbbjaqxt() {
      $.ajax({
        url: "http://47.92.121.146:9002/service/skip.devicesecuritypage",
        type: "get",
        dataType: "json",
        success: function(data) {
          // console.log(data.deviceSecurityURL)
          window.open(data.deviceSecurityURL, "_blank");
        }
      });
    },
    sjaqxt() {
      $.ajax({
        url: "http://47.92.121.146:9002/service/skip.datasecuritypage",
        type: "get",
        dataType: "json",
        success: function(data) {
          // console.log(data.deviceSecurityURL)
          window.open(data.deviceSecurityURL, "_blank");
        }
      });
    },
    routerRefresh() {
      this.routerAlive = false;
      this.$nextTick(() => {
        this.routerAlive = true;
      });
    },
    async logout() {
      // await this.$store.dispatch('user/logout')
      this.$router.push(`/`);
    },
    init() {
      // 菜单
      $(".menu-control").on("click", ".control-item", function(e) {
        e.stopPropagation();
        $(this)
          .addClass("active")
          .siblings(".control-item")
          .removeClass("active");
        if ($(".menu-container").hasClass("close")) {
          $(".menu-container").removeClass("close");
        }
        var type = $(this).attr("data-type");
        if (type === "sys") {
          $(".menu-title .t").html("子系统");
          $("#zxt").show();
          // $('#htgl').hide()
        }
        //  else if (type === 'admin') {
        //   $('.menu-title .t').html('后台管理')
        //   $('#zxt').hide()
        //   $('#htgl').show()
        // }
        // else if (type === 'search') {
        //   $('.menu-title .t').html('搜索')
        // } else if (type === 'step') {
        //   $('.menu-title .t').html('设置')
        // }
      });
      $(".menu-container").on("click", ".close", function() {
        $(".menu-container").addClass("close");
      });
      $(".smenu").on("click", function() {
        $(".menu-container").fadeIn(300);
      });
      $(".menu-container").on("mouseleave", function() {
        $(".menu-container").fadeOut(300);
        $(".menu-container").addClass("close");
      });
      // 下拉框
      $(".select-item").on("click", function(e) {
        e.stopPropagation();
        if (
          $(this)
            .find(".drop-menu")
            .is(":visible")
        ) {
          $(this)
            .find(".drop-menu")
            .hide();
        } else {
          $(this)
            .find(".drop-menu")
            .show();
        }
      });
      $(".select-item").on("click", ".menu-item", function(e) {
        e.stopPropagation();
        var parent = $(this).parents(".select-item");
        parent.find(".drop-menu").hide();
        $(this)
          .addClass("cur")
          .siblings(".menu-item")
          .removeClass("cur");
        var value = $(this).attr("data-value");
        var text = $(this).html();
        if (value) {
          parent.find(".select-value").val(value);
        } else {
          parent.find(".select-value").val(text);
        }
        parent.find("span").html(text);
      });
    },
    // 绑定事件
    initEvent() {
      if (this.$route.path === "/home") {
        $(".nav-item").removeClass("active");
        $(".nav-item")
          .eq(0)
          .addClass("active");
      }
      if (this.$route.path === "/map") {
        $(".nav-item").removeClass("active");
        $(".nav-item")
          .eq(1)
          .addClass("active");
      }
      if (this.$route.path === "/screen") {
        $(".nav-item").removeClass("active");
        $(".nav-item")
          .eq(2)
          .addClass("active");
      }
      $(".nav-container").on("click", ".nav-item", function() {
        $(".nav-item").removeClass("active");
        $(this).addClass("active");
      });
    },
    currentTime() {
      setInterval(this.getDate, 500);
    },
    getDate() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let week = new Date().getDay();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      if (week === 1) {
        this.nowWeek = "星期一";
      } else if (week === 2) {
        this.nowWeek = "星期二";
      } else if (week === 3) {
        this.nowWeek = "星期三";
      } else if (week === 4) {
        this.nowWeek = "星期四";
      } else if (week === 5) {
        this.nowWeek = "星期五";
      } else if (week === 6) {
        this.nowWeek = "星期六";
      } else {
        this.nowWeek = "星期日";
      }
      _this.nowTime = hh + ":" + mf + ":" + ss;
      _this.nowDate = yy + "-" + mm + "-" + dd;
    },
    werter() {
      // eslint-disable-next-line no-undef
      $.ajax({
        url:
          "http://api.map.baidu.com/telematics/v3/weather?location=北京&output=json&ak=ZbeFXv8desxK2Rmq76o5ytCk",
        type: "get",
        dataType: "jsonp",
        success: function(data) {
          // let city = data.results[0].currentCity// 当前城市
          // eslint-disable-next-line no-unused-vars
          var pm25 = data.results[0].pm25; // 当前PM2.5
          var weathers = data.results[0].weather_data[0]; // 获取今天的实时天气情况
          // var date = ((weathers.date).substr(14)).replace(')', '') // 获取日期和实时气温：周日 02月19日（实时：10°C）
          // var dayPic = weathers.dayPictureUrl // 白天天气图片
          // eslint-disable-next-line no-unused-vars
          var nightPic = weathers.nightPictureUrl; // 夜间天气图片
          // eslint-disable-next-line no-unused-vars
          var temp = weathers.temperature; // 气温
          // var weather = weathers.weather // 天气描述
          // var wind = weathers.wind// 风力
          // var htmlCon1 = ""+city+"&nbsp;<img src='"+dayPic+"'>"+weather+"&nbsp;"+wind+"&nbsp;"+date;
          // console.log(htmlCon1)
          // var htmlCon =dayPic;
          // $('#icon').attr("xlink:href", "#icon-"+(dayPic.split("/")[6]).replace('.png',''));
          // $("#temp").append((date.substr(14)).replace(')',''));
          // // $(".weather").append(htmlCon);
        },
        error: function(e) {
          alert("error");
        }
      });
    }
  },
  // 销毁定时器
  beforeDestroy() {
    if (this.getDate) {
      console.log("销毁定时器");
      clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
    }
  }
};
</script>

<style lang="less">
.video-main-page {
  .menu-container {
    display: none;
    position: absolute;
    transition: all 0.6s;
    -webkit-transition: all 0.6s;
    right: 0;
    top: 0;
    height: 100%;
    width: 250px;
    background-color: rgba(0, 153, 255, 0.75);
    z-index: 99;
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }

  .el-tabs__item {
    padding: 0 20px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    position: relative;
  }

  .el-tabs__nav {
    height: 65px;
  }

  .el-tabs__nav-wrap:after {
    background-color: #09f;
  }

  .lh15 {
    line-height: 15px;
  }

  .menu-container:before {
    content: "";
    height: 100%;
    width: 300px;
    position: absolute;
    right: 100%;
    top: 0;
    /* background: url(../img/bg-black.png) no-repeat 50%/100% 100% */
  }

  .nav-container {
    border: 1px solid #09f;
    background-color: rgba(0, 153, 255, 0.1);
    border-radius: 3px;
    padding: 7px 10px;
    margin-top: 30px;
    font-size: 0;
    z-index: 99;
    height: 75px;

    .nav-item {
      text-align: center;
      font-size: 14px;
      color: rgba(0, 153, 255, 0.4);
      padding: 7px 10px;
      display: inline-block;
      border-right: 1px solid rgba(0, 153, 255, 0.4);
      cursor: pointer;

      svg {
        font-size: 24px;
      }
    }
  }
  .index-vue {
    height: 100%;
    color: #666;
  }
  /* 侧边栏 */
  aside {
    position: fixed;
    top: 0;
    left: 0;
    width: 90px;
    background: #20222a;
    height: 100%;
    transition: width 0.3s;
    overflow: auto;
  }
  .logo-c {
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 20px;
    margin: 20px 0;
    justify-content: center;
  }
  .logo {
    width: 40px;
    margin-right: 10px;
  }
  .aside-big {
    width: 220px;
  }
  /* 主体页面 */
  .sec-right {
    height: 100%;
    margin-left: 220px;
    transition: margin-left 0.3s;
    overflow: hidden;
    background: #f3f7fd;
  }
  /* 主体页面头部 */
  header {
    height: 50px;
    border-bottom: none;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 40px;
    padding-left: 10px;
    font-size: 14px;
  }
  header .ivu-icon {
    font-size: 24px;
  }
  .refresh-c {
    margin: 0 30px;
    cursor: pointer;
  }

  .h-right {
    display: flex;
    align-items: center;
  }
  .h-left {
    display: flex;
    align-items: center;
  }
  .user-img-c img {
    width: 100%;
  }
  .notice-c {
    cursor: pointer;
    position: relative;
  }
  .newMsg {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ff5722;
    right: 0;
    top: 0;
  }
  .user-img-c {
    width: 34px;
    height: 34px;
    background: #ddd;
    border-radius: 50%;
    margin: 0 40px;
    overflow: hidden;
  }
  .tag-options {
    cursor: pointer;
    position: relative;
  }
  .div-tags {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 4px 0;
  }
  .div-icons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #fff;
    height: 34px;
    width: 160px;
    font-size: 18px;
  }
  /* 标签栏 */
  .ul-c {
    height: 34px;
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    overflow: hidden;
    width: calc(100% - 160px);
  }
  .ul-c li {
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    height: 24px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 3px 5px 2px 3px;
    border: 1px solid #e6e6e6;
  }
  a {
    color: #666;
    transition: none;
  }
  .li-a {
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .ul-c .ivu-icon {
    margin-left: 6px;
  }
  .active {
    background: #409eff;
    border: 1px solid #409eff;
  }
  .active a {
    color: #fff;
  }

  .active .ivu-icon {
    color: #fff;
  }
  /* 主要内容区域 */
  .main-content {
    height: calc(100% - 88px);
    overflow: hidden;
  }
  .view-c {
    margin: 30px 0px 30px 0px;
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .pointer {
    cursor: pointer;
  }
  /* loading */
  .loading-c {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    /* background: rgba(255,255,255,.5); */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .crumbs {
    margin-left: 10px;
    color: #97a8be;
    cursor: default;
  }
  .menu-level-3 .ivu-icon {
    font-size: 18px;
  }

  .shrink {
    text-align: center;
  }
}
</style>

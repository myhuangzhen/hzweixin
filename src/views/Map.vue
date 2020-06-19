<template>
  <div class="hello map-body">
    <div
      class="map-body-container"
      id="container"
      tabindex="0"
    >
      <div
        id="map"
        class="mchart body-container-mchart"
      >
        <div class="treebg">
          <div
            class="treebg-map-div"
            id="left_name"
          >
            <div
              @click="goback"
              class="goback"
            ><img
                class="map-img"
                src="@/assets/img/up.png"
                title="上一级"
              ></div>
            <div
              class="map-img-div"
              style=""
            >{{name}}</div>
          </div>
          <!--<div style="color: antiquewhite;width: 385px;height: 70px;line-height: 70px;text-align: right;position: absolute;font-size: 14px;float: right;font-weight:bold;cursor:pointer;margin-left: 20px;" @click="goback" ><img src="@/assets/img/up.png" title="上一级">返回</div><img src="@/assets/img/up.png" title="上一级">-->
          <div
            id="dname"
            class="none-div"
          ></div>
          <div class="map-div1">
            <div
              id="test"
              class="tagtree map-div2"
            >
              <ul
                id="treeDemo"
                class="ztree topnav_box"
              >

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EventInfoWindow
      ref="enventWindow"
      :map="map"
      :width="520"
      :show="true"
    />
  </div>
</template>

<script>
import AMap from "AMap";
import axios from "axios";
import LivePlayer from "@liveqing/liveplayer";
// import '../assets/css/zTreeStyle.css'
// import '../assets/js/jquery.1.10.2.min.js'
// import '../assets/js/jquery.ztree.core.js'
// import '../assets/js/jquery.ztree.exedit.js'
import makerimg from "../assets/img/line.png";
import nmakerimg from "../assets/img/line0.png";
// eslint-disable-next-line camelcase
import { wgs84_to_gcj02 } from "../assets/js/wgs84_to_gcj02";
import EventInfoWindow from "../components/EventInfoWindow/index.vue";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "hello",
      infoWindow: "",
      name: "省级列表",
      setting: {
        check: {
          enable: true,
          nocheckInherit: false,
          chkboxType: { Y: "p", N: "s" }
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          // beforeClick: this.beforeClick,
          onClick: this.zTreeOnClick,
          onCheck: this.zTreeOnCheck
        }
      },
      json: [
        {
          name: "全国",
          value: "1",
          children: [
            {
              name: "浙江省",
              value: "120.153576, 30.287459"
            },
            {
              name: "安徽省",
              value: "117.283042, 31.86119"
            },
            {
              name: "江西省",
              value: "115.892151, 28.676493"
            },
            {
              name: "重庆市",
              value: "118.8586, 32.915"
            },
            {
              name: "广西省",
              value: "101.0652, 25.1807"
            }
          ]
        }
      ],
      mainMap: null,
      map: null
    };
  },
  components: {
    LivePlayer,
    EventInfoWindow
  },
  // watch: {
  //   $route (to, from) {
  //     this.freshArea()
  //     this.map.setCenter([103.759759, 38.356381])
  //     this.map.setZoom(5)
  //     // this.init()
  //   }
  // },
  mounted() {
    this.init();
    this.freshArea();
  },
  methods: {
    goback: function() {
      if (this.name.indexOf("公司") !== -1) {
        $(".goback").show();
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        var nodes = treeObj.getNodes();
        axios
          .get(
            "http://47.92.121.146:9002/service/map.selectmapshowtree?name=" +
              nodes[0].province
          )
          .then(data => {
            this.itree(data.data.result, "路段列表");
            this.map.setZoom(12);
          });
        // eslint-disable-next-line eqeqeq
      } else if (this.name == "路段列表") {
        $(".goback").hide();
        this.itree(this.json, "省级列表");
        this.map.setCenter([103.759759, 38.356381]);
        this.map.setZoom(5);
        this.map.clearMap();
      } else {
      }
    },
    init: function() {
      document.title = "招商公路视频云平台-地图";
      this.map = new AMap.Map("container", {
        center: [103.759759, 38.356381],
        resizeEnable: true,
        zoom: 5,
        zooms: [5, 16],
        mapStyle: "amap://styles/e55c6b60d2a692686af99f1a44c4851d"
        // mapStyle: 'amap://styles/darkblue'
      });
      var this1 = this.map;
      new AMap.DistrictSearch({
        extensions: "all",
        subdistrict: 0
      }).search("中国", function(status, result) {
        // 外多边形坐标数组和内多边形坐标数组
        var outer = [
          new AMap.LngLat(-360, 90, true),
          new AMap.LngLat(-360, -90, true),
          new AMap.LngLat(360, -90, true),
          new AMap.LngLat(360, 90, true)
        ];
        var holes = result.districtList[0].boundaries;
        var pathArray = [outer];
        pathArray.push.apply(pathArray, holes);
        var polygon = new AMap.Polygon({
          pathL: pathArray,
          strokeColor: "#06254d",
          strokeWeight: 1,
          fillColor: "#06254d",
          fillOpacity: 0.8
        });
        polygon.setPath(pathArray);
        this1.add(polygon);
      });
      // AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
      //   map.addControl(new AMap.ToolBar())
      //   map.addControl(new AMap.Scale())
      // })
    },
    freshArea: function() {
      axios
        .get("/service/map.selectallprovince")
        .then(res => {
          // let zTree = $.fn.zTree.init($('#treeDemo'), this.setting, res)
          // zTree.expandAll(false)
          // zTree.expandNode(zTree.getNodes()[0], true, false, true)
        })
        .catch(err => {
          console.log(err);
        });
      let zTree = $.fn.zTree.init($("#treeDemo"), this.setting, this.json);
      zTree.expandAll(false);
      zTree.expandNode(zTree.getNodes()[0], true, false, true);
    },
    zTreeOnClick: function(event, treeId, treeNode) {
      this.map.setZoom(9);
      if (this.name === "省级列表") {
        axios
          .get("/service/map.selectmapshowtree?name=" + treeNode.name)
          .then(data => {
            $(".goback").show();
            var lnglat = treeNode.value;
            var result = lnglat.split(",");
            this.map.setCenter([result[0], result[1]]);
            this.itree(data.data.result, "路段列表");
            this.map.setZoom(10);
          })
          .catch(err => {
            console.log(err);
          });
        // $.get('http://47.92.121.146:9000/service/map.selectmapshowtree?name=' + treeNode.name, {

        // }).then(data => {
        //   $('.goback').show()
        //   var lnglat = treeNode.value
        //   var result = lnglat.split(',')
        //   this.map.setCenter([result[0], result[1]])
        //   this.itree(data.result, '路段列表')
        //   this.map.setZoom(10)
        // })
        // eslint-disable-next-line eqeqeq
      } else if (this.name === "路段列表") {
        $(".goback").show();
        axios
          .get("/service/map.selectmapshowtree?name=" + treeNode.name)
          .then(data => {
            this.itree(data.data.result, treeNode.name);
            this.map.setZoom(15);
            this.initmarker(treeNode.name);
          })
          .catch(err => {
            console.log(err);
          });
        // $.get('http://47.92.121.146:9002/service/map.selectmapshowtree?name=' + treeNode.name, {

        // }).then(data => {
        //   this.itree(data.result, treeNode.name)
        //   this.map.setZoom(15)
        //   this.initmarker(treeNode.name)
        // })
      } else {
        $(".goback").show();
        var name = treeNode.name;
        var result = treeNode.lonAndLat.split(",");
        let transfromLngLat = wgs84_to_gcj02(
          parseFloat(result[0]),
          parseFloat(result[1])
        );
        let content = `
          <div className="custom-infowindow input-card"> 
          <label style="color:grey">${name}</label> 
          </div></div>`;
        var infoWindow = new AMap.InfoWindow({
          position: transfromLngLat,
          offset: new AMap.Pixel(0, -35),
          content: content
        });
        this.map.setZoom(16);
        this.map.setCenter(transfromLngLat);
        infoWindow.open(this.map);
      }
    },
    initmarker: function(name) {
      // eslint-disable-next-line no-unused-vars
      const self = this;
      var arrdata1;
      const thismap = this.map;
      // eslint-disable-next-line no-unused-vars
      var infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -30)
      });
      this.map.clearMap();
      axios
        .get(
          "/device/selectDeviceLocationInfo?subordinateUnit=" +
            name +
            "&keyword=&id=240A2D4E00FCCC470E013FDADD5BF919"
        )
        .then(data => {
          arrdata1 = data.data.deviceLocationInfo;
          if (arrdata1.length === 0) {
          } else {
            arrdata1.forEach(function(marker) {
              var longitude = marker.longitude;
              var latitude = marker.latitude;
              var dtype;
              let transfromLngLat = wgs84_to_gcj02(longitude, latitude);
              if (marker.deviceStatus === "在线") {
                dtype = makerimg;
              } else {
                dtype = nmakerimg;
              }
              marker = new AMap.Marker({
                map: thismap,
                icon: dtype,
                position: transfromLngLat,
                offset: new AMap.Pixel(-13, -30),
                extData: {
                  markerId: marker.deviceId,
                  name: marker.cameraName,
                  subordinateUnit: marker.subordinateUnit,
                  cameraNum: marker.cameraNum,
                  deviceStatus: marker.deviceStatus
                }
                //  B.position.lat=transfromLngLat[0]
              });
              thismap.setFitView();
              marker.emit("click", {
                target: marker
              });
              marker.on("click", function(e) {
                axios
                  .get(
                    "service/video.GetCameraPlayURL?department=" +
                      this.B.extData.subordinateUnit +
                      "&cameraNum=" +
                      this.B.extData.cameraNum +
                      "&videoType=0&user=JTB000202001200001"
                  )
                  .then(stream => {
                    if (stream.data.code !== 200) {
                      self.$message.error("视频源异常");
                    } else {
                      var videoUrl = stream.data.videoRequestUrl[0].flv_url;
                      console.log(videoUrl);
                      self.$refs.enventWindow.showEventInfoWindow(e, videoUrl);
                    }
                  })
                  .catch(() => {});
              });
            });
          }
        })
        .then(ret => {})
        .always(() => {});
    },
    itree: function(type, name) {
      this.name = name;
      var zTree = $.fn.zTree.init($("#treeDemo"), this.setting, type);
      zTree.expandAll(false);
      zTree.expandNode(zTree.getNodes()[0], true, false, true);
    }
  }
};
</script>

<style lang="less">
.map-body {
  .map-body-container {
    height: 960px;
    margin: 0px 30px 30px 30px;

    .body-container-mchart {
      margin-top: 10px;
      position: relative;
      height: 960px;

      .treebg-map-div {
        color: antiquewhite;
        width: 380px;
        height: 70px;
        line-height: 70px;
        text-align: left;
        position: absolute;
        font-size: 16px;
        float: left;
        font-weight: bold;
        margin-left: 20px;
      }
    }
    .goback {
      float: left;
      width: 50px;
      cursor: pointer;
      display: none;
    }

    .map-img {
      display: block;
      width: 48px;
      height: 57px;
      margin-bottom: 5px;
    }

    .map-img-div {
      float: left;
      font-size: 19px;
    }

    .none-div {
      display: none;
    }

    .map-div1 {
      width: 400px;
      height: 760px;
      top: 40px;
      text-align: left;
      position: absolute;
      font-size: 24px;
      float: left;
    }
    .map-div2 {
      width: 400px;
      position: relative;
      top: 0px;
      z-index: 1000;
      filter: alpha(Opacity=80);
      -moz-opacity: 0.9;
      opacity: 0.9;
      float: left;
    }
  }
  .treebg {
    position: absolute;
    width: 400px;
    height: 850px;
    z-index: 10000;
    margin: 50px 0px 0px 1px;
  }
}
</style>
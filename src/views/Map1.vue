<template>
  <div class="hello map1">
    <div id="container">
      <div id="map" class="mchart map1-mchart" >
        <div class="treebg" >
        <div class="map1-div"  id="left_name">{{name}}</div>
        <div id="dname" class="none"></div>
        <div class="map1-div2">
          <div  id="test" class="tagtree map1-div3" >
            <ul id="treeDemo" class="ztree topnav_box">

            </ul>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
import '../assets/css/zTreeStyle.css'
import '../assets/js/jquery.1.10.2.min.js'
import '../assets/js/jquery.ztree.core.js'
import '../assets/js/jquery.ztree.exedit.js'
// eslint-disable-next-line no-unused-vars
import makerimg from '../assets/img/line.png'
// eslint-disable-next-line no-unused-vars
import nmakerimg from '../assets/img/line0.png'
// eslint-disable-next-line camelcase
import { wgs84_to_gcj02 } from '../assets/js/wgs84_to_gcj02'
export default {
  name: 'HelloWorld',
  data () {
    return {
	   }
	},
  mounted() {
    this.setMapChart()
  },
  methods: {
    setMapChart () {
      // 创建地图实例
      this.map = new AMap.Map('container', {
        zoom: 13, // 级别
        zooms: [8, 18],
        resizeEnable: true, // 是否监控地图容器尺寸变化
        mapStyle: 'amap://styles/blue' // 地图主题
      });
      // 以下是各类方法，光初始化上面代码就行
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: this.createInfoWindow('服务区', ''),
        offset: new AMap.Pixel(16, -25)
      })
      // zoom变化时，触发方法
      this.map.on('zoomend', () => {
        let zoom = this.map.getZoom()
        console.log(zoom)
        // console.log('zoom', zoom)
        if(zoom > 11) {
          // console.log('超过了')
          this.setMarker(this.mapMarker)
        }else {
          this.map.remove(this.allMarker)
        }
      });
      this.setCity('310104')
    },
      // 设置地图当前行政区
    setCity(Location) {
      let that = this;
      this.map.setCity(Location, ()=> {
        this.map.setZoom(14);
      });
    },
    // 设置地图marker
    setMarker (markerList) {
      alert('88888888888')
      // this.map.remove(this.allMarker)
      this.allMarker = []
      markerList = [ // 点标记数组
        {
          address: '上海市徐汇区小木桥路470号',
          id: "d4378a71945248fe8ab4e1f3af20628e",
          latitudeGD: 31.19331,
          level: "市级",
          longitudeGD: 121.460609,
          name: "上海市公共法律服务中心",
          url: "http://sh.12348.gov.cn/sites/12348/zxspace/org-detail.jsp?entityId=d4378a71945248fe8ab4e1f3af20628e"
          },
          {
          address: "南丹东路60号",
          id: "d4378a718fc14dd996b83bb7f1ea1d46",
          latitudeGD: 31.190249,
          level: "区级",
          longitudeGD: 121.444415,
          name: "徐汇区公共法律服务中心",
          url: "http://sh.12348.gov.cn/sites/12348/zxspace/org-detail.jsp?entityId=d4378a718fc14dd996b83bb7f1ea1d46"
          }
	    ]
      markerList.map((e) => {
        console.log(e)
        var marker = new AMap.Marker({
          position: new AMap.LngLat(e.longitudeGD, e.latitudeGD),
          icon: makerimg,
          offset: new AMap.Pixel(-13, -30)
        });
        marker.name = e.name;
        marker.url = e.url
        marker.on('mouseover', e => {
          this.infoWindow.setContent(this.createInfoWindow(e.target.name, e.target.url));
          // console.log('markerMouseOver',e)
          this.infoWindow.open(this.map, e.target.getPosition());
        });
        marker.on('mouseout', e => {
          this.map.clearInfoWindow()
        });
        marker.on('click', e => {
          console.log(111, e);
          if(e.lnglat) {
            console.log(222);
            window.open(e.target.url);
          }
        });
        marker.emit('click', { target: marker });
       
        this.allMarker.push(marker)
      })
       // 将 markers 添加到地图
        this.map.add(this.allMarker);
    },
    // 自定义信息窗体
    createInfoWindow (title, url) {
      let info = '<a style="display: block;font-size: .18rem;background-color: rgba(30,105,204,.8);color: #DDEBF5;padding: .15rem;border-radius: .04rem;text-decoration:none;" href="' + url + '" target="_blank">'+ title +'</a>'
        return info;
    },
  }
}
</script>

<style lang="scss">
.map1 {
  height:960px;
  margin:0px 30px 30px 30px;
  .map1-mchart {
    margin-top: 10px;
    height: 960px;
  }

  .map1-div {
    color: antiquewhite;
    width: 400px;
    height: 70px;
    line-height: 90px;
    text-align: center;
    position: absolute;
    font-size: 24px;
    float: left;
    font-weight:bold;
  }

  .treebg {
  position:absolute;
  width: 400px;
  height:850px;
  z-index: 10000;
  margin: 50px 0px 0px 1px;

}

  .none {
    display: none;
  }

  .map1-div2 {
    width: 400px;
    height: 760px;
    top: 70px;
    text-align: left;
    position: absolute;
    font-size: 24px;
    float: left;
  }

  .map1-div3 {
    width:370px;
    position:relative;
    top:0px;
    z-index:1000;
    filter:alpha(Opacity=80);
    -moz-opacity:0.9;
    opacity: 0.9;
    float:left;
  }
}
</style>
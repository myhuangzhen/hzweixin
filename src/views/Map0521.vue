<template>
  <div class="hello">
    <div style="height:960px;margin:0px 30px 30px 30px" id="container" tabindex="0">
      <div id="map" class="mchart" style="margin-top: 10px;position: relative; height: 960px;">
        <div class="treebg" >
        <div style="color: antiquewhite;width: 400px;height: 70px;line-height: 90px;text-align: center;position: absolute;font-size: 24px;float: left;font-weight:bold" id="left_name">{{name}}</div>
        <div id="dname" style="display: none;"></div>
        <div style="width: 400px;height: 760px;top: 70px;text-align: left;position: absolute;font-size: 24px;float: left;">
          <div style="width:370px;position:relative;top:0px;z-index:1000;filter:alpha(Opacity=80);-moz-opacity:0.9;opacity: 0.9;float:left"  id="test" class="tagtree" >
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
      msg: 'hello',
      infoWindow: '',
      name: '省级列表',
      setting: {
        check: {
          enable: true,
          nocheckInherit: false,
          chkboxType: { 'Y': 'p', 'N': 's' }
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
          name: '全国',
          value: '1',
          children: [
            {
              name: '北京市',
              value: '116.405285, 39.904989',
              children: []
            },
            {
              name: '上海市',
              value: '121.472644, 31.231706',
              children: []
            },
            {
              name: '重庆市',
              value: '106.504962, 29.533155',
              children: []
            },
            {
              name: '江苏省',
              value: '118.767413, 32.041544',
              children: []
            },
            {
              name: '浙江省',
              value: '120.153576, 30.287459',
              children: []
            },
            {
              name: '福建省',
              value: '119.306239, 26.075302',
              children: []
            },
            {
              name: '安徽省',
              value: '117.283042, 31.86119',
              children: []
            },
            {
              name: '江西省',
              value: '115.892151, 28.676493',
              children: []
            },
            {
              name: '山东省',
              value: '117.000923, 36.675807',
              children: []
            },
            {
              name: '上海市',
              value: '121.4648, 31.2891',
              children: []
            }
          ]
        }
      ],
      json1: [
        {
          name: '浙江温州甬台温高速公路有限公司',
          value: '1',
          children: [
            {
              name: '仙台 59停',
              value: '120.5211157, 27.6356351',
              children: []
            },
            {
              name: '63甬台温(G15)K1800+100福向',
              value: '120.4866099, 27.5890781',
              children: []
            },
            {
              name: '64甬台温(G15)K1800+100福向',
              value: '120.4866099, 27.5890781',
              children: []
            },
            {
              name: '仙台 59停',
              value: '120.5211157, 27.6356351',
              children: []
            },
            {
              name: '浙江省',
              value: '120.153576, 30.287459',
              children: []
            },
            {
              name: '福建省',
              value: '119.306239, 26.075302',
              children: []
            },
            {
              name: '安徽省',
              value: '117.283042, 31.86119',
              children: []
            },
            {
              name: '江西省',
              value: '115.892151, 28.676493',
              children: []
            },
            {
              name: '山东省',
              value: '117.000923, 36.675807',
              children: []
            },
            {
              name: '上海市',
              value: '121.4648, 31.2891',
              children: []
            }
          ]
        }
      ],
      json2: [
        {
          name: '重庆沪渝高速公路有限公司',
          value: '1',
          children: [
            {
              name: '沪渝南线G5021垭口隧道K172+000左13',
              uuid: '3e28bcf8-8c7f-11ea-9aaa-94292f6ec45f',
              department: '重庆沪渝高速公路有限公司',
              value: '120.5211157, 27.6356351',
              children: []
            },
            {
              name: '02甬台温(G15)K1685+500福向[乐清]',
              uuid: '3e28c126-8c7f-11ea-9aaa-94292f6ec45f',
              department: '重庆沪渝高速公路有限公司',
              value: '120.5211157, 27.6356351',
              children: []
            },
            {
              name: '03甬台温(G15)K1687+680台向[温州]',
              uuid: '3e28e184-8c7f-11ea-9aaa-94292f6ec45f',
              department: '重庆沪渝高速公路有限公司',
              value: '120.5211157, 27.6356351',
              children: []
            },
            {
              name: '04甬台温(G15)K1687+830台向[乐清]',
              uuid: '3e28e1df-8c7f-11ea-9aaa-94292f6ec45f',
              department: '重庆沪渝高速公路有限公司',
              value: '120.5211157, 27.6356351',
              children: []
            },
            {
              name: '03甬台温(G15)K1687+680台向[温州]',
              uuid: '3e28e235-8c7f-11ea-9aaa-94292f6ec45f',
              department: '重庆沪渝高速公路有限公司',
              value: '120.5211157, 27.6356351',
              children: []
            }
          ]
        }
      ],
      json22: [
        {
          name: '重庆沪渝高速公路有限公司',
          value: '1',
          children: [
            {
              name: '沪渝南线G5021垭口隧道K172+000左13',
              uuid: '3e28bcf8-8c7f-11ea-9aaa-94292f6ec45f',
              department: '重庆沪渝高速公路有限公司',
              value: '120.5211157, 27.6356351',
              children: []
            },
            {
              name: '02甬台温(G15)K1685+500福向[乐清]',
              uuid: '3e28c126-8c7f-11ea-9aaa-94292f6ec45f',
              department: '重庆沪渝高速公路有限公司',
              value: '120.5211157, 27.6356351',
              children: []
            },
            {
              name: '03甬台温(G15)K1687+680台向[温州]',
              uuid: '3e28e184-8c7f-11ea-9aaa-94292f6ec45f',
              department: '重庆沪渝高速公路有限公司',
              value: '120.5211157, 27.6356351',
              children: []
            },
            {
              name: '04甬台温(G15)K1687+830台向[乐清]',
              uuid: '3e28e1df-8c7f-11ea-9aaa-94292f6ec45f',
              department: '重庆沪渝高速公路有限公司',
              value: '120.5211157, 27.6356351',
              children: []
            },
            {
              name: '03甬台温(G15)K1687+680台向[温州]',
              uuid: '3e28e235-8c7f-11ea-9aaa-94292f6ec45f',
              department: '重庆沪渝高速公路有限公司',
              value: '120.5211157, 27.6356351',
              children: []
            }
          ]
        }
      ]
    }
  },
  mounted () {
    this.init()
    this.freshArea()
  },
  methods: {
    init: function () {
      this.map = new AMap.Map('container', {
        center: [103.759759, 38.356381],
        resizeEnable: true,
        zoom: 5,
        zooms: [5, 16],
        mapStyle: 'amap://styles/e55c6b60d2a692686af99f1a44c4851d'
        // mapStyle: 'amap://styles/darkblue'
      })
      // AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
      //   map.addControl(new AMap.ToolBar())
      //   map.addControl(new AMap.Scale())
      // })
    },
    freshArea: function () {
      let zTree = $.fn.zTree.init($('#treeDemo'), this.setting, this.json)
      zTree.expandAll(false)
      zTree.expandNode(zTree.getNodes()[0], true, false, true)
    },
    zTreeOnClick: function (event, treeId, treeNode) {
      var lnglat = treeNode.value
      var result = lnglat.split(',')
      this.map.setZoom(9)
      this.map.setCenter([result[0], result[1]])
      // eslint-disable-next-line eqeqeq
      if (this.name == '省级列表') {
        this.itree(this.json2, '路段列表')
        this.map.setZoom(12)
      // eslint-disable-next-line eqeqeq
      } else if (this.name == '路段列表') {
        this.itree(this.json22, 'XX路段列表')
        this.map.setZoom(14)
        this.initmarker()
      } else {
        let transfromLngLat = wgs84_to_gcj02(121.1437731, 28.3494765)

        let content = `
          <div className="custom-infowindow input-card"> 
          <label style="color:grey">${treeNode.name}</label> 
          </div></div>`
        var infoWindow = new AMap.InfoWindow({
          position: transfromLngLat,
          offset: new AMap.Pixel(0, -35),
          content: content
        })
        this.map.setZoom(12)
        this.map.setCenter(transfromLngLat)
        infoWindow.open(this.map)
      }
    },
    initmarker: function () {
      // eslint-disable-next-line no-unused-vars
      var marker1
      var arrdata1
      const thismap = this.map
      // eslint-disable-next-line no-unused-vars
      var infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -30)
      })
      this.map.clearMap()
      $.get('http://47.92.121.146:8001/device/selectDeviceLocationInfo?subordinateUnit=%E9%87%8D%E5%BA%86%E6%B8%9D%E9%BB%94%E9%AB%98%E9%80%9F%E5%85%AC%E8%B7%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&keyword=&id=240A2D4E00FCCC470E013FDADD5BF919', {

      }).then(data => {
        arrdata1 = data.deviceLocationInfo
        if (arrdata1.length === 0) {

        } else {
          arrdata1.forEach(function (marker) {
            var longitude = marker.longitude
            var latitude = marker.latitude
            var dtype
            // let transfromLngLat = wgs84_to_gcj02(longitude, latitude)
            if (marker.deviceStatus === '在线') {
              dtype = makerimg
            } else {
              dtype = nmakerimg
            }
            marker1 = new AMap.Marker({
              map: thismap,
              icon: dtype,
              position: [marker.longitude, marker.latitude],
              offset: new AMap.Pixel(-13, -30),
              extData: {
                'markerId': marker.deviceId,
                'name': marker.cameraName,
                'subordinateUnit': marker.subordinateUnit,
                'cameraNum': marker.cameraNum,
                'deviceStatus': marker.deviceStatus
              }
              //  B.position.lat=transfromLngLat[0]
            })
            console.log(marker1)
            thismap.setFitView()
            console.log('0000')
            marker1.emit('click', {
              target: marker1
            })
            AMap.event.addListener(marker1, 'click', function () {
              console.log(marker1.B.position.lng + '===================')
              var name = this.B.extData.name
              var info = []
              info.push('<div> <span>' + name + '</span> </div>')
              // let content = `
              //   <div className="custom-infowindow input-card">
              //   <label style="color:grey">${this.B.extData.name}</label>
              //   <div style='text-align: center'><button type="button" class="btn btn-primary btn-sm" id="32" onclick="openInfo('${this.B.extData.name},${this.B.extData.markerId},32,${this.B.extData.subordinateUnit},${this.B.extData.cameraNum},${this.B.extData.deviceStatus}')" >32k播放</button>
              //   <button type="button" class="btn btn-success btn-sm" onclick="openInfo('${this.B.extData.name},${this.B.extData.markerId},1M,${this.B.extData.subordinateUnit},${this.B.extData.cameraNum},${this.B.extData.deviceStatus}')">1M 点播</button>
              //   </div></div>`
              var infoWindow = new AMap.InfoWindow({
                position: this.getPosition(),
                offset: new AMap.Pixel(0, -35),
                content: '<div> <span>213131</span> </div>'
              })
              infoWindow.open(thismap)
            })
          })
        }
      }).then(ret => {
      })
        .always(() => {

        })
    },
    itree: function (type, name) {
      this.name = name
      var zTree = $.fn.zTree.init($('#treeDemo'), this.setting, type)
      zTree.expandAll(false)
      zTree.expandNode(zTree.getNodes()[0], true, false, true)
    }
    // zTreeOnCheck: function (event, treeId, treeNode) {
    //   console.log(treeNode.tId + ', ' + treeNode.name + ',' + treeNode.checked)
    //   let zTree = $.fn.zTree.getZTreeObj('treeDemo')
    //   checkCount = zTree.getCheckedNodes(true).length // 选中
    //   nocheckCount = zTree.getCheckedNodes(false).length // 未选中
    //   changeCount = zTree.getChangeCheckedNodes().length // 获取输入框勾选状态被改变的节点集合（与原始数据 checkedOld 对比）
    //   var checkedNames = []
    //   var checkedIds = []
    //   for (var i = 0; i <= zTree.getCheckedNodes(true).length - 1; i++) {
    //     checkedIds.push(zTree.getCheckedNodes(true)[i].id)
    //     checkedNames.push(zTree.getCheckedNodes(true)[i].name)
    //   };
    // }
  }
}
</script>

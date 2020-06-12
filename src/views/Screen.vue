<template>
  <div class="view-container"
       :style="{'-webkit-transfrom':'scale('+bill+';transform-origin：0,0)'}">
    <!-- 左边 -->
    <section class="border1_jp"
             style="top: 9px;left: 30px;width: 388px;height: 950px;">
      <div class="title">
        <div style="float:left"><img src="@/assets/img/p_menu.png"></div>
        <div style="float:left">摄像头列表</div>
        <div style="float:right;width:200px;margin-top:-10px"
             v-on:click="screen()">
          <img src="@/assets/img/screen.png"
               style="float: right; ">
        </div>
      </div>
      <div style="width: 360px;height: 820px;top: 50px;text-align: left;position: absolute;font-size: 24px;float: left;">
        <div v-show="isShow"
             style="margin:20px 20px 0px 20px">
          <el-input v-model="input"
                    placeholder="请输入摄像头名称"
                    style="width:200px;background-color: transparent;border: 1px solid #3c69d2;color: #ffffff"
                    class="name"></el-input>
          <el-button type="primary"
                     icon="el-icon-search"
                     @click="sxt_treeDemo">搜索</el-button>
        </div>
        <div style="width:380px;position:relative;top:0px;z-index:1000;filter:alpha(Opacity=80);-moz-opacity:0.9;opacity: 0.9;float:left"
             id="test"
             class="tagtree">
          <ul id="sxt_treeDemo"
              class="ztree topnav_box"
              style="height: 800px;">

          </ul>
        </div>
      </div>
    </section>
    <!-- 中间 -->
    <section style="top: 15px;left: 441px;right: 441px;height: 943px;">
      <!-- 行业 -->
      <div id="video-chart"
           class="bchart">
        <div class="mchart"
             style="position: relative; height: 650px;">
          <!-- 分屏组件 -->
          <Screen :parentData="childrenData"
                  ref="Screen"></Screen>
        </div>
        <!-- 底部 -->
        <div class="border5 mt-15"
             style="position: relative; height: 278px;">
          <div class="title"><img src="@/assets/img/p_menu.png">实时抓拍</div>
          <div class="mchart"
               style="height: 100%;">
            <div class="block hori-block ver-center topnav_box"
                 style="position: absolute;top: 50px;left: 30px;right: 10px;bottom: 20px;overflow-y:scroll; overflow-x:scroll;">
              <div class="block-item center "
                   style="width: 20%"
                   v-for="(fit,index) in imgShow"
                   :key="fit.value">
                <div class="simple-info inline-block">
                  <div class="img-content"><img :src="'http://47.92.121.146:8001/snapPreview'+fit.path"
                         @click="clickImg(fit.path,index)" /></div>
                  <!-- <div class="f14">{{fit.cameraName}}</div> -->
                  <div class="f14">{{ fit.date }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 右边 -->
    <section class="border3_jp"
             style="top: 9px;right: 30px;width: 388px;height: 653px;">
      <div class="title2"><img src="@/assets/img/p_menu.png">云台控制</div>
      <div class="mchart"
           style="position: relative;height: 180px;">
        <div class="simple-list "
             style="font-size: 16px;color: #ffffff;height:135px;width:156px;margin-top:20px;float:left">
          <div style="float:center;height:22px;width:137px;"
               command="3"
               title="向上"
               @mousedown.prevent="ptzControl"
               @mouseup.prevent="stop1"
               :style="ytkzbg_3"></div>
          <div style="width:156px;absolute:position;margin-top:5px">
            <div style="float:left;width:23px;height:90px"
                 command="1"
                 title="向左"
                 @mousedown.prevent="ptzControl"
                 @mouseup.prevent="stop1"
                 :style="ytkzbg_1"></div>
            <div style="float:left;width:86px;height:90px;margin-left:5px"
                 command="14"
                 title="复位"
                 @mousedown.prevent="ptzControl"
                 @mouseup.prevent="stop1"
                 :style="ytkzbg"></div>
            <div style="float:left;width:23px;height:90px"
                 command="2"
                 title="向右"
                 @mousedown.prevent="ptzControl"
                 @mouseup.prevent="stop1"
                 :style="ytkzbg_2"></div>
          </div>
          <div style="float:left;height:24px;width:137px"
               command="4"
               title="向下"
               @mousedown.prevent="ptzControl"
               @mouseup.prevent="stop1"
               :style="ytkzbg_4"></div>
        </div>
        <div class="simple-list "
             style="font-size: 16px;color: #ffffff;height:156px;width:220px;margin-top:20px;float:left">
          <div style="float:left;height:50px">
            <div style="width:23px;height:23px;float:left;"
                 command="5"
                 title="变倍短"
                 @mousedown.prevent="ptzControl"
                 @mouseup.prevent="stop1"
                 :style="ytkzbg_5"></div>
            <div style="width:80px;float:left;text-align:center;font-weight:bold">变倍</div>
            <div style="width:23px;height:23px;float:left;"
                 command="6"
                 title="变倍长"
                 @mousedown.prevent="ptzControl"
                 @mouseup.prevent="stop1"
                 :style="ytkzbg_6"></div>
          </div>
          <div style="float:left;height:50px">
            <div style="width:23px;;height:23px;float:left;"
                 command="7"
                 title="聚焦近"
                 @mousedown.prevent="ptzControl"
                 @mouseup.prevent="stop1"
                 :style="ytkzbg_7"></div>
            <div style="width:80px;float:left;text-align:center;font-weight:bold">聚焦</div>
            <div style="width:23px;;height:23px;float:left;"
                 command="8"
                 title="聚焦远"
                 @mousedown.prevent="ptzControl"
                 @mouseup.prevent="stop1"
                 :style="ytkzbg_8"></div>
          </div>
          <div style="float:left;height:50px">
            <div style="width:23px;;height:23px;float:left;"
                 command="9"
                 title="光圈小"
                 @mousedown.prevent="ptzControl"
                 @mouseup.prevent="stop1"
                 :style="ytkzbg_9"></div>
            <div style="width:80px;float:left;text-align:center;font-weight:bold">光圈</div>
            <div style="width:23px;;height:23px;float:left;"
                 command="10"
                 title="光圈大"
                 @mousedown.prevent="ptzControl"
                 @mouseup.prevent="stop1"
                 :style="ytkzbg_10"></div>
          </div>
        </div>
      </div>
      <div class="mchart"
           style="position: relative;height: 360px;">
        <div class="title2"><img src="@/assets/img/p_menu.png">摄像头信息</div>
        <div class="mchart"
             style="position: relative;height: 380px;font-size: 14px;color:#ffffff;">
          <!--font-weight:bold-->
          <table style="width:92%;text-align:left;"
                 class="table">
            <tr>
              <td style='width: 25%'>
                设备名称:
              </td>
              <td style='width: 75%'>
                {{cameraName}}
              </td>
            </tr>
            <tr>
              <td style='width: 25%'>
                单位名称:
              </td>
              <td style='width: 75%'>
                {{roadSection}}
              </td>
            </tr>
            <tr>
              <td style='width: 25%'>
                设备编号:
              </td>
              <td style='width: 75%'>
                {{deviceId}}
              </td>
            </tr>
            <tr>
              <td style='width: 25%'>
                在线状态:
              </td>
              <td style='width: 75%'>
                {{deviceStatus}}
              </td>
            </tr>
            <tr>
              <td style='width: 25%'>
                设备方向:
              </td>
              <td style='width: 75%'>
                {{direction}}
              </td>
            </tr>
            <tr>
              <td>
                所属路段:
              </td>
              <td>
                {{expressway}}
              </td>
            </tr>
            <tr>
              <td>
                设备桩号:
              </td>
              <td>
                {{pileNumber}}
              </td>
            </tr>
            <tr>
              <td>
                所属地区:
              </td>
              <td>
                {{city}}
              </td>
            </tr>
            <tr>
              <td>
                路段公司:
              </td>
              <td>
                {{subordinateUnit}}
              </td>
            </tr>
            <!-- <tr>
                <td>
                  兴趣点名称:
                </td>
                <td>
                  {{poiName}}
                </td>
              </tr> -->
          </table>

          <!-- <div class="simple-list " >
                  设备国标编号：{{deviceId}}
              </div>
              <div class="simple-list ">
                  摄像头名称：{{cameraName}}
              </div>
              <div class="simple-list ">
                  在线状态：{{deviceStatus}}
              </div>
              <div class="simple-list ">
                  方向：{{direction}}
              </div>
              <div class="simple-list ">
                  桩号：{{pileNumber}}
              </div>
              <div class="simple-list ">
                  兴趣点名称：{{poiName}}
              </div>
              <div class="simple-list ">
                  所属地区：{{city}}
              </div>
              <div class="simple-list ">
                  所属路段：{{expressway}}
              </div>
              <div class="simple-list ">
                  所属单位名称：{{roadSection}}
              </div>
              <div class="simple-list ">
                  路段公司名称：{{subordinateUnit}}
              </div> -->
        </div>
      </div>
    </section>
    <section class="border2"
             style="top: 680px;right: 30px;width: 388px;height: 278px;">
      <div class="title"><img src="@/assets/img/p_menu.png">在线状态</div>
      <div id="chart5"
           class="mchart"
           style="height: 100%; -webkit-tap-highlight-color: transparent; user-select: none; background: transparent;"
           _echarts_instance_="ec_1589514833622">
        <div style="position: relative; overflow: hidden; width: 436px; height: 278px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;"><canvas width="545"
                  height="347"
                  data-zr-dom-id="zr_0"
                  style="position: absolute; left: 0px; top: 0px; width: 436px; height: 278px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div>
      </div>
      <div class="block center"
           style="position: absolute;padding: 10px 0px;right: 35px;top: 40px;width: 154px;height:217px"
           v-bind:style="{backgroundImage:'url(' + bg + ')'}">
        <div class="block-item"
             style="padding: 10px 0px;">
          <div class="f18">可用摄像机</div>
          <div class="num f36"
               style="color:#017fee"><img src="@/assets/img/home_zx.png"
                 witch="36px"
                 height="41px" />{{onlineNum}}</div>
        </div>
        <div class="block-item"
             style="padding: 5px 0px;">
          <div class="f18">不可用摄像机</div>
          <div class="num f36"
               style="color:#c9c9cb"><img src="@/assets/img/home_lx.png"
                 witch="36px"
                 height="41px" />&nbsp;&nbsp;{{offlineNum}}</div>
        </div>
      </div>
    </section>
    <!-- <Preview  :imgInfo="viewImg" @showTag="previewImg"  ref="Preview">
          <img style="width: 100%; height: 100%" :src="'http://47.92.121.146:8001//snapPreview'+viewImg" >
        </Preview> -->
  </div>
</template>

<script>
import axios from 'axios'
import Screen from '../views/Screen1'
// import '../assets/css/style-anjian.css'
// import '../assets/css/zTreeStyle.css'
import '../assets/js/jquery.1.10.2.min.js'

export default {
  components: {
    Screen
  },
  data () {
    return {
      isShow: false,
      input: '',
      ytkzbg_3: {
        backgroundImage: 'url(' + require('../assets/img/b_l.png') + ')'
      },
      ytkzbg_1: {
        backgroundImage: 'url(' + require('../assets/img/b_left.png') + ')'
      },
      ytkzbg_2: {
        backgroundImage: 'url(' + require('../assets/img/b_right.png') + ')'
      },
      ytkzbg: {
        backgroundImage: 'url(' + require('../assets/img/start.png') + ')'
      },
      ytkzbg_4: {
        backgroundImage: 'url(' + require('../assets/img/b_b.png') + ')'
      },
      ytkzbg_5: {
        backgroundImage: 'url(' + require('../assets/img/-.png') + ')'
      },
      ytkzbg_6: {
        backgroundImage: 'url(' + require('../assets/img/+.png') + ')'
      },
      ytkzbg_7: {
        backgroundImage: 'url(' + require('../assets/img/-.png') + ')'
      },
      ytkzbg_8: {
        backgroundImage: 'url(' + require('../assets/img/+.png') + ')'
      },
      ytkzbg_9: {
        backgroundImage: 'url(' + require('../assets/img/-.png') + ')'
      },
      ytkzbg_10: {
        backgroundImage: 'url(' + require('../assets/img/+.png') + ')'
      },
      bg: require('../assets/img/sbzt.png'),
      // 传给子级的数据
      childrenData: '',
      imgShow: [],
      openModal: false,
      deleteModal: false,
      type: 'create', // create || edit
      cameraName: '', // 摄像头名称
      deviceStatus: '', // 在线状态
      subordinateUnit: '', // 路段公司名称
      poiName: '', // 高速名称
      expressway: '',
      deviceId: '',
      roadSection: '',
      city: '',
      pileNumber: '',
      direction: '',
      editIndex: -1,
      onlineNum: '',
      offlineNum: '',
      percentage: '',
      action: '',
      ModelForm: {
        id: '',
        hostname: '',
        ip: '',
        status: '',
        operate: ''
      },
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
        edit: {
          enable: true,
          showRemoveBtn: false,
          showRenameBtn: false,
          dblClickExpand: false
        },
        callback: {
          // beforeClick: this.beforeClick,
          onClick: this.zTreeOnClick,
          onCheck: this.zTreeOnCheck,
          beforeDrag: this.beforeDrag,
          beforeDrop: this.beforeDrop,
          onDrop: this.zTreeOnDrop,
          onDblClick: this.ondblclick

        }
      }
    }
  },
  computed: {
    bill: function () {
      return window.innerWidth / 1920
    }
  },
  // created () {
  // },
  mounted () {
    this.myEcharts5()
    this.sxt_treeDemo()
    this.VideoType()
  },
  methods: {
    nodes: function (department, uuid, treeNodes) {
      if (treeNodes.length === undefined) {
        department = treeNodes.department
        uuid = treeNodes.uuid
      } else {
        department = treeNodes[0].department
        uuid = treeNodes[0].uuid
      }
      axios.get('/service/video.GetCameraPlayURL?department=' + department + '&cameraNum=' + uuid + '&videoType=0&user=JTB000202001200001').then(stream => {
        var uuid = treeNodes.uuid
        if (stream.data.code !== 200) {
          this.$message.error('视频源异常')
        } else {
          var videoUrl = stream.data.videoRequestUrl[0].flv_url
          var arr = [uuid, videoUrl]
          this.childrenData = arr
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    ondblclick: function (event, treeId, treeNodes) {
      // 获取选中的节点
      this.Camerainformation(treeNodes.uuid)// 获取摄像头信息
      this.jp(treeNodes.uuid)
      this.nodes(treeNodes.department, treeNodes.uuid, treeNodes)
    },
    fatherMethod: function (uuid) {
      this.Camerainformation(uuid)// 获取摄像头信息
      this.jp(uuid)
    },
    screen: function () {
      this.isShow = !this.isShow
    },
    sxt_treeDemo () {
      document.title = '招商公路视频云平台-视频'
      var name = this.input
      axios.get('/service/map.getmapztree?keyword=' + this.input).then(res => {
        let zTree = $.fn.zTree.init($('#sxt_treeDemo'), this.setting, res.data[0])
        if (name === '') {
          zTree.expandAll(false)
          zTree.expandNode(zTree.getNodes()[0], true, false, true)
        } else {
          zTree.expandAll(true)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    ptzControl (e) {
      var $target = $(e.currentTarget)
      if ($target.attr('command') === '3') {
        this.ytkzbg_3 = {
          backgroundImage: 'url(' + require('../assets/img/b_l_.png') + ')'
        }
      }
      if ($target.attr('command') === '1') {
        this.ytkzbg_1 = {
          backgroundImage: 'url(' + require('../assets/img/b_left_.png') + ')'
        }
      }
      if ($target.attr('command') === '2') {
        this.ytkzbg_2 = {
          backgroundImage: 'url(' + require('../assets/img/b_right_.png') + ')'
        }
      }
      if ($target.attr('command') === '14') {
        this.ytkzbg = {
          backgroundImage: 'url(' + require('../assets/img/start_.png') + ')'
        }
      }
      if ($target.attr('command') === '4') {
        this.ytkzbg_4 = {
          backgroundImage: 'url(' + require('../assets/img/b_b_.png') + ')'
        }
      }
      if ($target.attr('command') === '5') {
        this.ytkzbg_5 = {
          backgroundImage: 'url(' + require('../assets/img/-_.png') + ')'
        }
      }
      if ($target.attr('command') === '6') {
        this.ytkzbg_6 = {
          backgroundImage: 'url(' + require('../assets/img/+_.png') + ')'
        }
      }
      if ($target.attr('command') === '7') {
        this.ytkzbg_7 = {
          backgroundImage: 'url(' + require('../assets/img/-_.png') + ')'
        }
      }
      if ($target.attr('command') === '8') {
        this.ytkzbg_8 = {
          backgroundImage: 'url(' + require('../assets/img/+_.png') + ')'
        }
      }
      if ($target.attr('command') === '9') {
        this.ytkzbg_9 = {
          backgroundImage: 'url(' + require('../assets/img/-_.png') + ')'
        }
      }
      if ($target.attr('command') === '10') {
        this.ytkzbg_10 = {
          backgroundImage: 'url(' + require('../assets/img/+_.png') + ')'
        }
      }
      axios.get('http://47.92.121.146:8001/service/video.PTZControl?cameraNum=' + this.cameraNum + '&action=' + $target.attr('command') + '&step=1&channel_id=&_=1590205505322', {
      })
    },
    stop1 (a) {
      var $target = $(a.currentTarget)
      if ($target.attr('command') === '3') {
        this.ytkzbg_3 = {
          backgroundImage: 'url(' + require('../assets/img/b_l.png') + ')'
        }
      }
      if ($target.attr('command') === '1') {
        this.ytkzbg_1 = {
          backgroundImage: 'url(' + require('../assets/img/b_left.png') + ')'
        }
      }
      if ($target.attr('command') === '2') {
        this.ytkzbg_2 = {
          backgroundImage: 'url(' + require('../assets/img/b_right.png') + ')'
        }
      }
      if ($target.attr('command') === '4') {
        this.ytkzbg_4 = {
          backgroundImage: 'url(' + require('../assets/img/b_b.png') + ')'
        }
      }
      if ($target.attr('command') === '14') {
        this.ytkzbg = {
          backgroundImage: 'url(' + require('../assets/img/start.png') + ')'
        }
      }
      if ($target.attr('command') === '5') {
        this.ytkzbg_5 = {
          backgroundImage: 'url(' + require('../assets/img/-.png') + ')'
        }
      }
      if ($target.attr('command') === '6') {
        this.ytkzbg_6 = {
          backgroundImage: 'url(' + require('../assets/img/+.png') + ')'
        }
      }
      if ($target.attr('command') === '7') {
        this.ytkzbg_7 = {
          backgroundImage: 'url(' + require('../assets/img/-.png') + ')'
        }
      }
      if ($target.attr('command') === '8') {
        this.ytkzbg_8 = {
          backgroundImage: 'url(' + require('../assets/img/+.png') + ')'
        }
      }
      if ($target.attr('command') === '9') {
        this.ytkzbg_9 = {
          backgroundImage: 'url(' + require('../assets/img/-.png') + ')'
        }
      }
      if ($target.attr('command') === '10') {
        this.ytkzbg_10 = {
          backgroundImage: 'url(' + require('../assets/img/+.png') + ')'
        }
      }
      if ($target === '9' || $target === '10') {
        this.action = '13'
      } else {
        this.action = '0'
      }
      setInterval(axios.get('http://47.92.121.146:8001/service/video.PTZControl?cameraNum=' + this.cameraNum + '&action=' + this.action + '&step=1&channel_id=&_=1590205505322', {
      }), 500)
      // axios.get('http://47.92.121.146:8001/service/video.PTZControl?cameraNum=' + this.cameraNum + '&action=' + this.action + '&step=1&channel_id=&_=1590205505322', {
      // })
    },
    jp (uuid) {
      axios.get('/snap/snapview?uuid=' + uuid + '&startTimeParam=2020-5-1%2011:22:35&endTimeParam=2020-5-20%2011:22:35&_=1589944905114').then(res => {
        if (res.data.snapPaths) {
          this.imgShow = res.data.snapPaths
        } else {
          this.$Message.error('请求失败')
        }
      })
    },
    // 点击图片事件
    clickImg (url, index) {
      // 获得图片的url和index，传给弹窗
      this.viewImg = url
      // 打开弹窗
      this.$refs['Preview'].show(this.viewImg)
    },
    myEcharts5 () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('chart5'))
      var datalist = []
      var data = {
        name: '可用',
        value: 1}
      for (var i = 0; i < 2; i++) {
        var item = data.value - (i + 1) * 0.1
        var va = item > 0 ? item : 0
        var percent = (data.value * 100) + '%'
        datalist.push({ name: data.name, value: va, percent: percent })
      }
      var option = {
        series: [{
          type: 'liquidFill',
          radius: '45%',
          center: ['27%', '50%'],
          backgroundStyle: { color: 'transparent' },
          data: datalist,
          color: [new this.$echarts.graphic.LinearGradient(0, 1, 0, 0,
            [{ offset: 0, color: '#0689ff' }, { offset: 1, color: '#00ff8a' }]),
          new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
            [{ offset: 0, color: '#0689ff' }, { offset: 1, color: '#00ff8a' }])],
          itemStyle: {
            normal: {
              opacity: 1, shadowBlur: 20, shadowColor: 'rgba(6,137,255,0.8)'
            }
          },
          label: {
            normal: {
              align: 'center',
              textBorderColor: 'transparent',
              position: 'bottom',
              padding: [20, 0, 0, 0],
              rich: { b: { color: '#fff', fontSize: 18 } },
              formatter: function (params) {
                var data = params.data
                var va = '{b|' + data.name + data.percent + '}'
                return va
              }
            }
          },
          outline: {
            show: true,
            borderDistance: 0,
            itemStyle: {
              color: 'none', borderWidth: 3, borderColor: '#0689ff'
            }
          },
          animationDelay: 1600
        }]
      }
      myChart.setOption(option)
    },
    // 在拖拽之前
    beforeDrag: function (event, treeId, treeNode) {
    },
    zTreeOnDrop: function (event, treeId, treeNodes, targetNode, moveType, isCopy) {
      // 获取选中的节点
      this.Camerainformation(treeNodes[0].uuid)// 获取摄像头信息
      this.jp(treeNodes[0].uuid)
      this.nodes(treeNodes[0].department, treeNodes[0].uuid, treeNodes)
    },
    beforeDrop: function (treeId, treeNodes, targetNode, moveType) {
      return targetNode ? targetNode.drop !== false : true
    },
    zTreeOnClick (event, treeId, treeNode) {
      if (treeNode.children > 0) {
        return
      }
      var zTree = $.fn.zTree.getZTreeObj('sxt_treeDemo')
      zTree.expandNode(treeNode)
      // 获取选中的节点
      // this.Camerainformation(treeNode.uuid)// 获取摄像头信息
      // this.jp(treeNode.uuid)
    },
    Camerainformation (uuid) {
      axios.get('/service/map.selectcamera?uuid=' + uuid).then(stream => {
        this.deviceId = stream.data.videoDeviceBusinessInfos[0].deviceId // 设备国标编号
        this.cameraNum = stream.data.videoDeviceBusinessInfos[0].cameraNum // 摄像头名称
        this.cameraName = stream.data.videoDeviceBusinessInfos[0].cameraName // 摄像头名称
        this.deviceStatus = stream.data.videoDeviceBusinessInfos[0].deviceStatus // 在线状态
        this.direction = stream.data.videoDeviceBusinessInfos[0].direction // 方向
        this.subordinateUnit = stream.data.videoDeviceBusinessInfos[0].subordinateUnit // 路段公司名称
        this.pileNumber = stream.data.videoDeviceBusinessInfos[0].pileNumber // 桩号
        this.poiName = stream.data.videoDeviceBusinessInfos[0].poiName // 兴趣点
        this.expressway = stream.data.videoDeviceBusinessInfos[0].expressway // 所属路段
        this.roadSection = stream.data.videoDeviceBusinessInfos[0].roadSection // 所属单位名称
        this.city = stream.data.videoDeviceBusinessInfos[0].province + '   ' + stream.data.videoDeviceBusinessInfos[0].city // 所属地区
        // 路段公司名称
      }).catch((err) => {
        console.log(err)
      })

      // $.get('http://47.92.121.146:9002/service/map.selectcamera?uuid=' + uuid, {
      //   // map.selectcamera
      // }).then(stream => {
      //   this.deviceId = stream.videoDeviceBusinessInfos[0].deviceId // 设备国标编号
      //   this.cameraNum = stream.videoDeviceBusinessInfos[0].cameraNum // 摄像头名称
      //   this.cameraName = stream.videoDeviceBusinessInfos[0].cameraName // 摄像头名称
      //   this.deviceStatus = stream.videoDeviceBusinessInfos[0].deviceStatus // 在线状态
      //   this.direction = stream.videoDeviceBusinessInfos[0].direction // 方向
      //   this.subordinateUnit = stream.videoDeviceBusinessInfos[0].subordinateUnit // 路段公司名称
      //   this.pileNumber = stream.videoDeviceBusinessInfos[0].pileNumber // 桩号
      //   this.poiName = stream.videoDeviceBusinessInfos[0].poiName // 兴趣点
      //   this.expressway = stream.videoDeviceBusinessInfos[0].expressway // 所属路段
      //   this.roadSection = stream.videoDeviceBusinessInfos[0].roadSection // 所属单位名称
      //   this.city = stream.videoDeviceBusinessInfos[0].province + '   ' + stream.videoDeviceBusinessInfos[0].city // 所属地区
      //   // 路段公司名称
      // })
    },
    // 获取摄像头在线状态
    VideoType () {
      axios.get('/service/camera.selectcameracount').then(stream => {
        console.log(stream)
        this.onlineNum = stream.data.selectCameraCountBO.onlineNum
        this.offlineNum = stream.data.selectCameraCountBO.offlineNum
        this.percentage = stream.data.selectCameraCountBO.percentage
      }).catch((err) => {
        console.log(err)
      })

      // $.get('http://47.92.121.146:8001/service/camera.selectcameracount', {
      // }).then(stream => {
      //   // totalNum=stream.selectCameraCountBO.totalNum
      //   this.onlineNum = stream.selectCameraCountBO.onlineNum
      //   this.offlineNum = stream.selectCameraCountBO.offlineNum
      //   this.percentage = stream.selectCameraCountBO.percentage
      // }).fail(() => {
      // })
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
}
table td,
table th {
  padding: 0.25rem;
  border: 1px solid #017fee;
  color: #ffffff;
  height: 30px;
}

table thead th {
  /* background-color: #CCE8EB; */
  width: 100px;
}

table tr:nth-child(odd) {
  /* background: #fff; */
}

table tr:nth-child(even) {
  /* background: #F5FAFA; */
}
.name >>> .el-input__inner {
  background-color: transparent;
  /* border: 1px solid #3c69d2; */
  color: #ffffff;
  border-radius: 4px;
}
</style>

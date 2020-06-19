<template>
      <div class="view-container">
        <!-- 左边 -->
        <section class="border1_jp" style="top: 9px;left: 30px;width: 388px;height: 950px;">
          <div class="title"><img src="@/assets/img/p_menu.png">摄像头列表</div>
          <div style="width: 360px;height: 760px;top: 70px;text-align: left;position: absolute;font-size: 24px;float: left;">
            <div style="width:360px;position:relative;top:0px;z-index:1000;filter:alpha(Opacity=80);-moz-opacity:0.9;opacity: 0.9;float:left"  id="test" class="tagtree" >
              <!-- <ul id="sxt_treeDemo" class="ztree topnav_box">

              </ul> -->
              <ul class="lvc-nav">
              <li class="nav-pic1 next-layer" title="1">
                <a><img src="@/assets/img/z_+.png">1</a>
                <ol>
                  <li><img src="@/assets/img/z_-.png">1.1</li>
                  <li><img src="@/assets/img/z_-.png">1.2</li>
                </ol>
              </li>
              <li class="nav-pic7 next-layer" title="报表统计">
                <a><img src="@/assets/img/z_+.png">2</a>
                  <ol>
                    <li><img src="@/assets/img/z_-.png">2.1</li>
                      <li><img src="@/assets/img/z_-.png">2.2</li>
                  </ol>
              </li>
              <li class="nav-pic8" title="3">
                <a><img src="@/assets/img/z_-.png">3</a>
              </li>
            </ul>
            </div>
          </div>
      </section>
        <!-- 中间 -->
        <section style="top: 15px;left: 441px;right: 441px;height: 943px;">
            <!-- 行业 -->
            <div id="video-chart" class="bchart">
              <div class="mchart" style="position: relative; height: 650px;">
                <!-- 分屏组件 -->
                <Screen :parentData="childrenData" ref="Screen"></Screen>
            </div>
                <!-- 底部 -->
                <div class="border5 mt-15" style="position: relative; height: 278px;">
                    <div class="title"><img src="@/assets/img/p_menu.png">实时抓拍</div>
                    <div class="mchart" style="height: 100%;">
                        <div class="block hori-block ver-center " style="position: absolute;top: 50px;left: 30px;right: 10px;bottom: 20px;" >
                        <div class="block-item center" style="width: 14.25%" v-for="(fit,index) in imgShow" :key="fit.value">
                          <div class="simple-info inline-block">
                              <div class="img-content"><img :src="'http://47.92.121.146:8001/snapPreview'+fit.path" @click="clickImg(fit.path,index)" /></div>
                              <!-- <div class="f14">{{fit.cameraName}}</div> -->
                              <div class="f14">{{ fit.date }}</div>
                          </div>
                      </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 地图 -->
            <div id="map-chart" class="bchart" style="display: none;">
                <div id="map" class="mchart" style="position: relative; height: 652px; -webkit-tap-highlight-color: transparent; user-select: none;" _echarts_instance_="ec_1589514833624"><div style="position: relative; overflow: hidden; width: 100px; height: 652px; padding: 0px; margin: 0px; border-width: 0px;"></div></div>
                <!-- 底部 -->
                <div class="border5 mt-15" style="position: relative; height: 278px;">
                    <div class="tab-container" style="position: absolute;top: 25px;right: 30px;">
                        <div class="tab-item active">今日</div>
                        <div class="tab-item">本月</div>
                    </div>
                    <div class="title"><img src="@/assets/img/p_menu.png">地市安全事件分析</div>
                    <div id="chart6" class="mchart" style="height: 100%; -webkit-tap-highlight-color: transparent; user-select: none;" _echarts_instance_="ec_1589514833623"><div style="position: relative; overflow: hidden; width: 100px; height: 100px; padding: 0px; margin: 0px; border-width: 0px;"></div></div>
                </div>
            </div>
        </section>
        <!-- 右边 -->
        <section class="border3_jp" style="top: 9px;right: 30px;width: 388px;height: 633px;">
          <div class="title2"><img src="@/assets/img/p_menu.png">云台控制</div>
          <div class="mchart" style="position: relative;height: 180px;">
              <div class="simple-list " style="font-size: 16px;color: #ffffff;height:135px;width:156px;margin-top:20px;float:left">
                  <div style="float:center;margin-left:18px;height:21px;width:93px"><img src="@/assets/img/b_l.png"></div>
                  <div style="width:156px;absolute:position;height:93px;margin-top:-1px">
                    <div style="float:left"><img src="@/assets/img/b_left.png"></div>
                    <div style="float:left"><img src="@/assets/img/start.png"></div>
                    <div style="float:left"><img src="@/assets/img/b_right.png"></div>
                  </div>
                  <div style="float:left;margin-left:18px;height:22px;margin-top:-5px"><img src="@/assets/img/b_b.png"></div>
              </div>
              <div class="simple-list " style="font-size: 16px;color: #ffffff;height:156px;width:220px;margin-top:20px;float:left">
                  <div style="float:left;height:50px">
                    <div style="width:30px;float:left;"><img src="@/assets/img/-.png"></div>
                    <div style="width:80px;float:left;text-align:center;font-weight:bold">变倍</div>
                    <div style="width:30px;float:left;"><img src="@/assets/img/+.png"></div>
                  </div>
                    <div style="float:left;height:50px">
                      <div style="width:30px;float:left;"><img src="@/assets/img/-.png"></div>
                    <div style="width:80px;float:left;text-align:center;font-weight:bold">聚焦</div>
                    <div style="width:30px;float:left;"><img src="@/assets/img/+.png"></div>
                    </div>
                    <div style="float:left;height:50px">
                      <div style="width:30px;float:left;"><img src="@/assets/img/-.png"></div>
                    <div style="width:80px;float:left;text-align:center;font-weight:bold">光圈</div>
                    <div style="width:30px;float:left;"><img src="@/assets/img/+.png"></div>
                    </div>
              </div>
          </div>
          <div class="mchart" style="position: relative;height: 360px;">
            <div class="title2"><img src="@/assets/img/p_menu.png">摄像头信息</div>
            <div class="mchart" style="position: relative;height: 380px;">
              <div class="simple-list " style="font-size: 16px;color: #ffffff;">
                  摄像头名称:{{name}}
              </div>
              <div class="simple-list " style="font-size: 16px;color: #ffffff;">
                  所属地区:
              </div>
              <div class="simple-list " style="font-size: 16px;color: #ffffff;">
                  在线状态:
              </div>
              <div class="simple-list " style="font-size: 16px;color: #ffffff;">
                  方向:上行
              </div>
              <div class="simple-list " style="font-size: 16px;color: #ffffff;">
                  高速名称:{{poiName}}
              </div>
              <div class="simple-list " style="font-size: 16px;color: #ffffff;">
                  路段公司名称:{{subordinateUnit}}
              </div>
          </div>
        </div>
        </section>
        <section class="border2" style="top: 680px;right: 30px;width: 388px;height: 278px;">
            <div class="title"><img src="@/assets/img/p_menu.png">在线状态</div>
            <div id="chart5" class="mchart" style="height: 100%; -webkit-tap-highlight-color: transparent; user-select: none; background: transparent;" _echarts_instance_="ec_1589514833622"><div style="position: relative; overflow: hidden; width: 436px; height: 278px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;"><canvas width="545" height="347" data-zr-dom-id="zr_0" style="position: absolute; left: 0px; top: 0px; width: 436px; height: 278px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div></div>
        <div class="block center border" style="position: absolute;padding: 10px 0px;right: 35px;top: 60px;width: 154px;"><div class="block-item" style="padding: 10px 0px;">
          <div class="f18">可用摄像机</div><div class="num f36">{{onlineNum}}</div>
          </div>
          <div class="block-item" style="padding: 10px 0px;">
            <div class="f18">不可用摄像机</div><div class="num f36">{{offlineNum}}</div></div></div></section>
    <!-- <Preview  :imgInfo="viewImg" @showTag="previewImg"  ref="Preview">
          <img style="width: 100%; height: 100%" :src="'http://47.92.121.146:8001//snapPreview'+viewImg" >
        </Preview> -->
    </div>
</template>

<script>
import axios from 'axios'
import Screen from '../views/Screen1'
import '../assets/js/jquery.1.10.2.min.js'
// import '../assets/js/jquery.ztree.core.js'
// import '../assets/js/jquery.ztree.exedit.js'
export default {
  components: {
    Screen
  },
  data () {
    return {
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
      editIndex: -1,
      onlineNum: '',
      offlineNum: '',
      percentage: '',
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
          showRenameBtn: false
        },
        callback: {
          // beforeClick: this.beforeClick,
          onClick: this.zTreeOnClick,
          onCheck: this.zTreeOnCheck,
          beforeDrag: this.beforeDrag,
          beforeDrop: this.beforeDrop
        }
      },
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
    this.getData()
    this.sxt_treeDemo()
    this.myEcharts5()
    this.jp()
    this.VideoType()
    // eslint-disable-next-line no-undef
    // initEarth('#earth3d', function () {
    //   moveTo(
    //     { z: 470, durtime: 0.4 },
    //     function () {
    //       // eslint-disable-next-line no-undef
    //       $('.bg-map').show()
    //     }
    //   )
    // })
  },
  methods: {
    init () {
      $(".btn-nav").click(function () {
      $(".lvc-wrap").toggleClass("lvc-close")
      $("ol").toggleClass("small-ol")
      $(".next-layer ol").hide()

      if($("#lvc-nav").hasClass('lvc-close')){
        $(".next-layer ").removeClass("arrow")
      }
    })

    //选中状态
    $(".lvc-nav li").click(function () {
      $(this).siblings().find('ol').hide()
      $(this).addClass("active").siblings().removeClass("active")
    })

    //选中子集清除父级active
    $("ol>li").click(function (e) {
      console.log('ol>li clicked')
      e.stopPropagation()
     $(this).parent().parent().removeClass("active")
    })

    //二级导航展开收起
    $(".next-layer").click(function () {
      $(this).children("ol").toggle();
      $(this).toggleClass("arrow").siblings().removeClass("arrow")
    })


     $("ol li").click(function () {
       if($("ol").hasClass('small-ol')) {
         $(".small-ol").hide();
         $(this).parent().parent().addClass("active")
       }
     })
      // 菜单
      $('.menu-control').on('click', '.control-item', function (e) {
        e.stopPropagation()
        $(this).addClass('active').siblings('.control-item').removeClass('active')
        if ($('.menu-container').hasClass('close')) {
          $('.menu-container').removeClass('close')
        }
        var type = $(this).attr('data-type')
        if (type === 'sys') {
          $('.menu-title .t').html('子系统')
        } else if (type === 'search') {
          $('.menu-title .t').html('搜索')
        } else if (type === 'step') {
          $('.menu-title .t').html('设置')
        }
      })
      $('.menu-container').on('click', '.close', function () {
        $('.menu-container').addClass('close')
      })
      $('.smenu').on('click', function () {
        $('.menu-container').fadeIn(300)
      })
      $('.menu-container').on('mouseleave', function () {
        $('.menu-container').fadeOut(300)
        $('.menu-container').addClass('close')
      })
      // 下拉框
      $('.select-item').on('click', function (e) {
        e.stopPropagation()
        if ($(this).find('.drop-menu').is(':visible')) {
          $(this).find('.drop-menu').hide()
        } else {
          $(this).find('.drop-menu').show()
        }
      })
      $('.select-item').on('click', '.menu-item', function (e) {
        e.stopPropagation()
        var parent = $(this).parents('.select-item')
        parent.find('.drop-menu').hide()
        $(this).addClass('cur').siblings('.menu-item').removeClass('cur')
        var value = $(this).attr('data-value')
        var text = $(this).html()
        if (value) {
          parent.find('.select-value').val(value)
        } else {
          parent.find('.select-value').val(text)
        }
        parent.find('span').html(text)
      })
    },
    jp (name) {
      axios.get('http://47.92.121.146:8001/snap/snapview?device_id=34020000001320002020&startTimeParam=2020-5-1%2011:22:35&endTimeParam=2020-5-20%2011:22:35&id=5831F6B306BBBA5B12AF743174F57D18&_=1589944905114').then(res => {
        console.log(res)
        if (res.snapPaths) {
          this.imgShow = res.snapPaths
          // .slice((this.currentPage - 1) * 20, this.currentPage * 20)
          console.log(this.imgShow)
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
    sxt_treeDemo () {
      let zTree = $.fn.zTree.init($('#sxt_treeDemo'), this.setting, this.json22)
      zTree.expandAll(false)
      zTree.expandNode(zTree.getNodes()[0], true, false, true)
    },
    handleOk () {
      this.ModelForm.operate = this.type
      axios.post('http://127.0.0.1:8000/host/', this.ModelForm).then(res => {
        if (res.data.result) {
          this.$Message.success('请求成功')
          this.hostRow.status = this.ModelForm.status
        } else {
          this.$Message.error('请求失败')
        }
      })
      this.openModal = false
      this.ModelForm = {
        hostname: '',
        ip: '',
        status: ''
      }
      this.getData()
    },
    getData () {
    },
    myEcharts5 () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('chart5'))
      var datalist = []
      var data = {
        name: '可用',
        value: 0.993}
      for (var i = 0; i < 2; i++) {
        var item = data.value - (i + 1) * 0.1
        var va = item > 0 ? item : 0
        var percent = (data.value * 100) + '%'
        datalist.push({name: data.name, value: va, percent: percent})
      }
      var option = {
        series: [{
          type: 'liquidFill',
          radius: '45%',
          center: ['27%', '50%'],
          backgroundStyle: { color: 'transparent' },
          data: datalist,
          color: [new this.$echarts.graphic.LinearGradient(0, 1, 0, 0,
            [{offset: 0, color: '#0689ff'}, {offset: 1, color: '#00ff8a'}]),
          new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
            [{offset: 0, color: '#0689ff'}, {offset: 1, color: '#00ff8a'}])],
          itemStyle: {
            normal: {
              opacity: 1, shadowBlur: 20, shadowColor: 'rgba(6,137,255,0.8)' }},
          label: {
            normal: {
              align: 'center',
              textBorderColor: 'transparent',
              position: 'bottom',
              padding: [20, 0, 0, 0],
              rich: {b: { color: '#fff', fontSize: 18 }},
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
    beforeDrag: function (event, treeId, treeNodes) {
      $.get('http://47.92.121.146:8001/service/video.GetCameraPlayURL?department=' + treeId[0].department + '&cameraNum=' + treeId[0].uuid + '&videoType=0&user=JTB000202001200001', {
      }).then(stream => {
        // eslint-disable-next-line no-unused-vars
        var videoUrl = stream.videoRequestUrl[0].flv_url
        // console.log(videoUrl)
        // var x = event.clientX
        // var y = event.clientY
        // console.log(x, y)
        this.childrenData = videoUrl
        // this.$emit('selected', videoUrl)
      }).fail(() => {
      })
    },
    beforeDrop: function (treeId, treeNodes, targetNode, moveType) {
      return targetNode ? targetNode.drop !== false : true
    },
    zTreeOnClick (event, treeId, treeNode) {
      console.log(treeNode)
      // 获取选中的节点
      this.Camerainformation(treeNode.name)// 获取摄像头信息
      this.jp(treeNode.deviceId)
    },
    Camerainformation () {
      this.cameraName = 'aaaaa' // 摄像头名称
      this.deviceStatus = '6666' // 在线状态
      this.subordinateUnit = '7977' // 路段公司名称
      this.poiName = 'asadsa' // 高速名称
    },
    // 获取摄像头在线状态
    VideoType () {
      $.get('http://47.92.121.146:8001/service/camera.selectcameracount', {
      }).then(stream => {
        // totalNum=stream.selectCameraCountBO.totalNum
        this.onlineNum = stream.selectCameraCountBO.onlineNum
        this.offlineNum = stream.selectCameraCountBO.offlineNum
        this.percentage = stream.selectCameraCountBO.percentage
      }).fail(() => {
      })
    }
  }
}
</script>

<style scoped>
@charset "utf-8";
/* CSS Document */

* {
	margin: 0;
	padding: 0;
	font-size: 16px;
}
a {
	cursor: pointer;
}
ul, li {
	list-style: none;
}

.lvc-wrap {
	position: relative;
	width: 270px;
}

.lvc-wrap .btn-nav{
	position: absolute;
	left: 271px;
	top: 40%;
	width: 25px;
	height: 93px;
	border-style: none;
	/* background: url("../images/nuv_03.png") no-repeat transparent; */
	outline: none;
}

.lvc-wrap .btn-nav:hover{
	/* background-image: url("../images/nuv_03_hover.png") */
}

.lvc-nav {
	width: 98%;
	padding-top: 20px;
	border-width: 0 1px 0 1px;
}

.lvc-nav li {
	padding-left: 60px;
	position: relative;
	background-size: auto;
	background-repeat: no-repeat;
	background-position: left 30px top 15px;
}
.lvc-nav li a {
	color: #a5a8ad;
	display: block;
	height: 50px;
	line-height: 40px;
}
.lvc-nav li.active a {
	color: #616366;
}
.lvc-nav li.active:before {
	position: absolute;
	content: "";
	width: 3px;
	height: 100%;
	background: #0d94ff;
	left: 0;
}
.lvc-nav li.nav-pic1 {
	/* background-image: url(../images/nav-pic1.png); */
}
.lvc-nav li.nav-pic1.active{
	/* background-color: #f4f6f8; */
	/* background-image: url(../images/nav-pic1-h.png); */
}
.lvc-nav li.nav-pic2 {
	/* background-image: url(../images/nav-pic2.png); */
}
.lvc-nav li.nav-pic2.active {
	background-color: #f4f6f8;
	/* background-image: url(../images/nav-pic2-h.png); */
}
.lvc-nav li.nav-pic3 {
	/* background-image: url(../images/nav-pic3.png); */
}
.lvc-nav li.nav-pic3.active {
	background-color: #f4f6f8;
	/* background-image: url(../images/nav-pic3-h.png); */
}
.lvc-nav li.nav-pic4 {
	/* background-image: url(../images/nav-pic4.png); */
}
.lvc-nav li.nav-pic4.active {
	background-color: #f4f6f8;
	/* background-image: url(../images/nav-pic4-h.png); */
}
.lvc-nav li.nav-pic5 {
	/* background-image: url(../images/nav-pic5.png); */
}
.lvc-nav li.nav-pic5.active {
	background-color: #f4f6f8;
	/* background-image: url(../images/nav-pic5-h.png); */
}


/*子层 next-layer*/

.lvc-nav li.next-layer.active:before{
	height: 50px;
}
/*.lvc-nav li.next-layer:hover:before{
	background-color: transparent;
}*/
.lvc-nav li.next-layer ol li.active{
	color: #616366;
	background-color: #f4f6f8;
}
.lvc-nav li.next-layer ol {
	width: 270px;
	/* margin-left: -60px; */
	display: none;
	/* background-color: #fff; */
}
.lvc-nav li.next-layer ol li {
	height: 50px;
	line-height: 40px;
	color: #a5a8ad;
	cursor: pointer;
}

.lvc-nav li.next-layer ol li:before {
	position: absolute;
	content: "";
	width: 4px;
	height: 4px;
	background: #919599;
	left: 36px;
	top: 23px;
}
.lvc-nav li.next-layer ol li.active:before{
	background: #616366;
}

.lvc-nav li.next-layer ol li.active:after{
	position: absolute;
	content: "";
	width: 3px;
	height: 100%;
	background: #0d94ff;
	left: 0;
}

.lvc-nav li.next-layer a{
	/* background: url(../images/lvc-arrow-right.png) no-repeat right 10px center; */
}

.lvc-nav li.next-layer.arrow a{
	/* background: url(../images/lvc-arrow-bottom.png) no-repeat right 10px center; */
}


/*收起nav*/
.lvc-wrap.lvc-close {
	width: 80px;
}

.lvc-close .lvc-nav li a {
	display: none;
}

.lvc-close .btn-nav {
	left: 81px;
}

.lvc-close .btn-nav{
	/* background-image: url("../images/nuv_04.png") */
}

.lvc-close .btn-nav:hover{
	/* background-image: url("../images/nuv_04_hover.png") */
}

.lvc-close .lvc-nav li {
	height: 50px;
	line-height: 40px;
}


.lvc-close li.next-layer ol {
	background: #fff;
	border: 1px solid #e8eaed;
	width: auto;
	position: absolute;
	margin: 0;
	margin-left: 20px;
	white-space: nowrap;
	z-index: 2;
}

.lvc-close li.next-layer ol li {
	padding: 0 20px 0 40px;
}

.lvc-close li.next-layer ol li:before {
	left: 20px;
}
li{
  font-size:20px
}


</style>

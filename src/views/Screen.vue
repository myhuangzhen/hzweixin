<template>
  <div class="view-container video-container">
    <!-- 左边 -->
    <section class="border1_jp">
      <div class="section-title">
        <div class="floatLeft"><img src="@/assets/img/p_menu.png"></div>
        <div class="floatLeft">摄像头列表</div>
        <div
          class="screen-num"
          v-on:click="screen()"
        >
          <img
            src="@/assets/img/screen.png"
            class="floatRight"
          >
        </div>
      </div>
      <div class="search-body">
        <div
          v-show="isShow"
          class="input-div"
        >
          <el-input
            v-model="input"
            placeholder="请输入摄像头名称"
            class="name input-name"
          ></el-input>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="searchNode"
          >搜索</el-button>
        </div>
        <div
          style=""
          id="test"
          class="tagtree tree-body"
        >
          <!-- <ul
            id="sxt_treeDemo"
            @dragstart="drag($event)"
            @dragend="endDrag($event)"
            class="ztree topnav_box"
          >
          </ul> -->
          <el-tree
            :data="treeOptions"
            :allow-drop="allowDrop"
            :filter-node-method="filterNode"
            :props="defaultProps"
            node-key="name"
            :default-expanded-keys="['全国']"
            :highlight-current="false"
            class="case__tree--modified"
            :default-expand-all="false"
            @node-drag-end="handleDragEnd"
            draggable
            ref="caseTree"
          >
            <span
              :class="['custom-tree-node',true ?'selected-node':'']"
              slot-scope="{ node, data }"
            >
              <!-- 
              <el-tooltip
                class="item"
                effect="dark"
                placement="top"
                v-if="(node.label.length > 12 )"
              >
                <span slot="content">{{node.label}}</span>
                <span
                  @click="nodeClick(node, data)"
                  @dblclick="nodeDbClick(node, data)"
                  class="text-hidden">
                  {{ node.label }}
                </span>
              </el-tooltip> -->
              <div
                class="text-hidden"
                @click="nodeClick(node, data)"
                @dblclick="nodeDbClick(node, data)"
                v-if="!(node.label.length > 1200)"
              >{{ node.label }}
              </div>
            </span>
          </el-tree>
        </div>
      </div>
    </section>
    <!-- 中间 -->
    <section class="section-mid">
      <!-- 行业 -->
      <div
        id="video-chart"
        class="bchart section-mid-body"
      >
        <div class="mchart ">
          <!-- 分屏组件 -->
          <Screen
            :parentData="childrenData"
            ref="Screen"
            class="screen-body"
          ></Screen>
        </div>
        <!-- 底部 -->
        <div class="border5 mt-15 mid-btn">
          <div class="section-title"><img src="@/assets/img/p_menu.png">实时抓拍</div>
          <div class="mchart mid-btn-div">
            <div class="block mid-btn-block hori-block ver-center topnav_box">
              <div
                class="block-item mid-block-item center "
                v-for="(fit,index) in imgShow"
                :key="fit.value"
              >
                <div class="simple-info inline-block">
                  <div class="img-content"><img
                      :src="'http://47.92.121.146:8001/snapPreview'+fit.path"
                      @click="clickImg(fit.path,index)"
                    /></div>
                  <!-- <div class="f14">{{fit.cameraName}}</div> -->
                  <div class="font14">{{ fit.date }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 右边 -->
    <section class="border3_jp section-right">
      <div class="section-title2"><img src="@/assets/img/p_menu.png">云台控制</div>
      <div class="mchart section-right-body">
        <div class="simple-list right-body-list">
          <div
            command="3"
            class="right-up backCover"
            title="向上"
            @click.prevent="ptzControl1"
            @mousedown.prevent="ptzControl"
            :style="ytkzbg_3"
          ></div>
          <div class="right-div1">
            <div
              style=""
              command="1"
              class="right-left backCover"
              title="向左"
              @mousedown.prevent="ptzControl"
              @mouseup.prevent="stop1"
              :style="ytkzbg_1"
            ></div>
            <div
              style=""
              command="14"
              class="right-reset backCover"
              title="复位"
              @mousedown.prevent="ptzControl"
              @mouseup.prevent="stop1"
              :style="ytkzbg"
            ></div>
            <div
              style=""
              command="2"
              class="right-right backCover"
              title="向右"
              @mousedown.prevent="ptzControl"
              @mouseup.prevent="stop1"
              :style="ytkzbg_2"
            ></div>
          </div>
          <div
            style=""
            command="4"
            title="向下"
            class="right-dw backCover"
            @mousedown.prevent="ptzControl"
            @mouseup.prevent="stop1"
            :style="ytkzbg_4"
          ></div>
        </div>
        <div
          class="simple-list  right-more"
          style=""
        >
          <div class="right-more-div">
            <div
              style=""
              command="6"
              title="变倍短"
              class="right-more1 backCover"
              @mousedown.prevent="ptzControl"
              @mouseup.prevent="stop1"
              :style="ytkzbg_6"
            ></div>
            <div
              class="right-other"
              style=""
            >变倍</div>
            <div
              style=""
              command="5"
              class="right-more2 backCover"
              title="变倍长"
              @mousedown.prevent="ptzControl"
              @mouseup.prevent="stop1"
              :style="ytkzbg_5"
            ></div>
          </div>
          <div
            class="right-more3"
            style=""
          >
            <div
              style=""
              command="7"
              title="聚焦近"
              class="right-more4 backCover"
              @mousedown.prevent="ptzControl"
              @mouseup.prevent="stop1"
              :style="ytkzbg_7"
            ></div>
            <div
              class="right-more5"
              style=""
            >聚焦</div>
            <div
              style=""
              command="8"
              class="right-more6 backCover"
              title="聚焦远"
              @mousedown.prevent="ptzControl"
              @mouseup.prevent="stop1"
              :style="ytkzbg_8"
            ></div>
          </div>
          <div
            class="right-more7"
            style=""
          >
            <div
              style=""
              command="10"
              class="right-more8 backCover"
              title="光圈小"
              @mousedown.prevent="ptzControl"
              @mouseup.prevent="stop1"
              :style="ytkzbg_10"
            ></div>
            <div
              class="right-more9 "
              style=""
            >光圈</div>
            <div
              style=""
              command="9"
              class="right-more10 backCover"
              title="光圈大"
              @mousedown.prevent="ptzControl"
              @mouseup.prevent="stop1"
              :style="ytkzbg_9"
            ></div>
          </div>
        </div>
      </div>
      <div
        class="mchart table-body"
        style=""
      >
        <div class="section-title2"><img src="@/assets/img/p_menu.png">摄像头信息</div>
        <div class="mchart table-body-div">
          <!--font-weight:bold-->
          <table class="table table-inner">
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
    <section
      class="border2 section-btn"
      style=""
    >
      <div class="section-title"><img src="@/assets/img/p_menu.png">在线状态</div>
      <div
        id="chart5"
        class="mchart section6-main"
        style=""
        _echarts_instance_="ec_1589514833622"
      >
        <div style="position: relative; overflow: hidden; width: 436px; height: 278px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;">
          <canvas
            width="545"
            height="347"
            data-zr-dom-id="zr_0"
            style="position: absolute; left: 0px; top: 0px; width: 436px; height: 278px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"
          ></canvas>
        </div>
      </div>
      <div
        class="block center section6-info"
        v-bind:style="{backgroundImage:'url(' + bg + ')'}"
      >
        <div
          class="block-item item10"
          style=""
        >
          <div class="font18">可用摄像机</div>
          <div
            class="num font36"
            style="color:#017fee"
          ><img
              src="@/assets/img/home_zx.png"
              class="section6-img"
            />{{onlineNum}}</div>
        </div>
        <div
          class="block-item item5"
          style="padding: 5px 0px;"
        >
          <div class="font18">不可用摄像机</div>
          <div
            class="num font36"
            style="color:#c9c9cb"
          ><img
              src="@/assets/img/home_lx.png"
              class="section6-img"
            />&nbsp;&nbsp;{{offlineNum}}</div>
        </div>
      </div>
    </section>
    <!-- <Preview  :imgInfo="viewImg" @showTag="previewImg"  ref="Preview">
          <img style="width: 100%; height: 100%" :src="'http://47.92.121.146:8001//snapPreview'+viewImg" >
        </Preview> -->
  </div>
</template>

<script>
import axios from "axios";
import Screen from "../views/Screen1";
// import '../assets/css/style-anjian.css'
// import '../assets/css/zTreeStyle.css'
import "../assets/js/jquery.1.10.2.min.js";

export default {
  components: {
    Screen
  },
  data() {
    return {
      isShow: false,
      treeOptions: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      input: "",
      ytkzbg_3: {
        backgroundImage: "url(" + require("../assets/img/b_l.png") + ")"
      },
      ytkzbg_1: {
        backgroundImage: "url(" + require("../assets/img/b_left.png") + ")"
      },
      ytkzbg_2: {
        backgroundImage: "url(" + require("../assets/img/b_right.png") + ")"
      },
      ytkzbg: {
        backgroundImage: "url(" + require("../assets/img/start.png") + ")"
      },
      ytkzbg_4: {
        backgroundImage: "url(" + require("../assets/img/b_b.png") + ")"
      },
      ytkzbg_5: {
        backgroundImage: "url(" + require("../assets/img/+.png") + ")"
      },
      ytkzbg_6: {
        backgroundImage: "url(" + require("../assets/img/-.png") + ")"
      },
      ytkzbg_7: {
        backgroundImage: "url(" + require("../assets/img/-.png") + ")"
      },
      ytkzbg_8: {
        backgroundImage: "url(" + require("../assets/img/+.png") + ")"
      },
      ytkzbg_9: {
        backgroundImage: "url(" + require("../assets/img/+.png") + ")"
      },
      ytkzbg_10: {
        backgroundImage: "url(" + require("../assets/img/-.png") + ")"
      },
      bg: require("../assets/img/sbzt.png"),
      // 传给子级的数据
      childrenData: "",
      imgShow: [],
      openModal: false,
      deleteModal: false,
      type: "create", // create || edit
      cameraName: "", // 摄像头名称
      deviceStatus: "", // 在线状态
      subordinateUnit: "", // 路段公司名称
      poiName: "", // 高速名称
      expressway: "",
      deviceId: "",
      roadSection: "",
      city: "",
      pileNumber: "",
      direction: "",
      editIndex: -1,
      onlineNum: "",
      offlineNum: "",
      percentage: "",
      action: "",
      ModelForm: {
        id: "",
        hostname: "",
        ip: "",
        status: "",
        operate: ""
      },
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
          // beforeDrag: this.beforeDrag,
          // beforeDrop: this.beforeDrop,
          onDragstart: this.drag,
          onDragend: this.endDrag,
          onDrop: this.zTreeOnDrop,
          onDblClick: this.ondblclick
        }
      }
    };
  },
  computed: {
    bill: function() {
      return window.innerWidth / 1920;
    }
  },
  // created () {
  // },
  mounted() {
    this.myEcharts5();
    this.sxt_treeDemo();
    this.VideoType();
  },
  methods: {
    searchNode() {
      const me = this;
      me.$refs.caseTree.filter(this.input);
    },
    allowDrop(draggingNode, dropNode, type) {
      // treeOptionsObj 树的最后子节点，可拖拽的节点rue
      //
      //
      return false;
    },
    allowDrag(draggingNode) {
      // voidObj 不可拖拽的节点，包括案号节点，二级节点，和文书作废的子节点
      if (true) {
        return true;
      } else {
        return true;
      }
    },
    nodeClick(node, data) {
      // voidObj 不可拖拽的节点，包括案号节点，二级节点，和文书作废的子节点
      if (node.isLeaf) {
        this.Camerainformation(data.uuid); // 获取摄像头信息
        this.jp(data.uuid);
      }
    },
    // 节点搜索过滤
    filterNode(value, data) {
      if (!value) {
        return true;
      }
      if (data.name) {
        return data.name.indexOf(value) !== -1;
      }
      return data.name.indexOf(value) !== -1;
    },
    drag(ev) {
      console.log(12312);
      console.log(ev);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log(draggingNode);
      console.log(dropNode);
      console.log(dropType);
      console.log(ev);
      if (draggingNode.isLeaf) {
        this.Camerainformation(draggingNode.data.uuid); // 获取摄像头信息
        this.jp(draggingNode.data.uuid);
        this.nodes(
          draggingNode.data.department,
          draggingNode.data.uuid,
          draggingNode.data
        );
      }
      // this.$nextTick(() => {
      //   this.dragsEvent();
      // });
    },
    dragsEvent() {
      let arr = document.querySelectorAll("a.level3");
      arr[0].draggable = true;
      arr[0].dragstart = this.drag;
      arr[0].dragend = this.endDrag;
      // console.log(arr);
      arr.forEach(item => {
        item.draggable = true;
        item.dragstart = this.drag;
        item.dragend = this.endDrag;
      });
    },
    nodes: function(department, uuid, treeNodes) {
      if (treeNodes.length === undefined) {
        department = treeNodes.department;
        uuid = treeNodes.uuid;
      } else {
        department = treeNodes[0].department;
        uuid = treeNodes[0].uuid;
      }
      axios
        .get(
          "/service/video.GetCameraPlayURL?department=" +
            department +
            "&cameraNum=" +
            uuid +
            "&videoType=0&user=JTB000202001200001"
        )
        .then(stream => {
          var uuid = treeNodes.uuid;
          if (stream.data.code !== 200) {
            this.$message({
              showClose: true,
              type: 'error',
              message: '视频源异常',
              customClass: 'err-message',
              duration: 10000000
            })
          } else {
            var videoUrl = stream.data.videoRequestUrl[0].flv_url;
            var arr = [uuid, videoUrl];
            this.childrenData = arr;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    nodeDbClick(node, data) {
      if (node.isLeaf) {
        this.Camerainformation(data.uuid); // 获取摄像头信息
        this.jp(data.uuid);
        this.nodes(data.department, data.uuid, data);
      }
    },
    ondblclick: function(event, treeId, treeNodes) {
      // 获取选中的节点
      this.Camerainformation(treeNodes.uuid); // 获取摄像头信息
      this.jp(treeNodes.uuid);
      this.nodes(treeNodes.department, treeNodes.uuid, treeNodes);
    },
    fatherMethod: function(uuid) {
      this.Camerainformation(uuid); // 获取摄像头信息
      this.jp(uuid);
    },
    screen: function() {
      this.isShow = !this.isShow;
    },
    sxt_treeDemo() {
      document.title = "招商公路视频云平台-视频";
      var name = this.input;
      axios
        .get("/service/map.getmapztree?keyword=" + this.input)
        .then(res => {
          this.treeOptions = res.data;
          console.log(res.data[0]);
          // let zTree = $.fn.zTree.init(
          //   $("#sxt_treeDemo"),
          //   this.setting,
          //   res.data[0]
          // );
          // if (name === "") {
          //   zTree.expandAll(false);
          //   zTree.expandNode(zTree.getNodes()[0], true, false, true);
          // } else {
          //   zTree.expandAll(true);
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // ptzControl1 (e) {
    //   var $target = $(e.currentTarget)
    // },
    ptzControl(e) {
      var $target = $(e.currentTarget);
      if ($target.attr("command") === "3") {
        this.ytkzbg_3 = {
          backgroundImage: "url(" + require("../assets/img/b_l_.png") + ")"
        };
      }
      if ($target.attr("command") === "1") {
        this.ytkzbg_1 = {
          backgroundImage: "url(" + require("../assets/img/b_left_.png") + ")"
        };
      }
      if ($target.attr("command") === "2") {
        this.ytkzbg_2 = {
          backgroundImage: "url(" + require("../assets/img/b_right_.png") + ")"
        };
      }
      if ($target.attr("command") === "14") {
        this.ytkzbg = {
          backgroundImage: "url(" + require("../assets/img/start_.png") + ")"
        };
      }
      if ($target.attr("command") === "4") {
        this.ytkzbg_4 = {
          backgroundImage: "url(" + require("../assets/img/b_b_.png") + ")"
        };
      }
      if ($target.attr("command") === "5") {
        this.ytkzbg_5 = {
          backgroundImage: "url(" + require("../assets/img/+_.png") + ")"
        };
      }
      if ($target.attr("command") === "6") {
        this.ytkzbg_6 = {
          backgroundImage: "url(" + require("../assets/img/-_.png") + ")"
        };
      }
      if ($target.attr("command") === "7") {
        this.ytkzbg_7 = {
          backgroundImage: "url(" + require("../assets/img/-_.png") + ")"
        };
      }
      if ($target.attr("command") === "8") {
        this.ytkzbg_8 = {
          backgroundImage: "url(" + require("../assets/img/+_.png") + ")"
        };
      }
      if ($target.attr("command") === "9") {
        this.ytkzbg_9 = {
          backgroundImage: "url(" + require("../assets/img/+_.png") + ")"
        };
      }
      if ($target.attr("command") === "10") {
        this.ytkzbg_10 = {
          backgroundImage: "url(" + require("../assets/img/-_.png") + ")"
        };
      }
      // http://47.92.121.146:8001/service/video.PTZControlTouch?cameraNum=cea92d58-8a8b-11ea-acd6-f0109078901a&action=3&step=1&channel_id=&_=1590205505322
      axios
        .get(
          "http://47.92.121.146:8001/service/video.PTZControlTouch?cameraNum=" +
            this.cameraNum +
            "&action=" +
            $target.attr("command") +
            "&step=1&channel_id=&_=1590205505322"
        )
        .then(res => {
          if (res.data.code === "200") {
          } else {
            this.stop1($target.attr("command"));
          }
        });
    },
    stop1(a) {
      // var $target = $(a.currentTarget)
      if (a === "3") {
        // $target.attr('command')
        this.ytkzbg_3 = {
          backgroundImage: "url(" + require("../assets/img/b_l.png") + ")"
        };
      }
      if (a === "1") {
        this.ytkzbg_1 = {
          backgroundImage: "url(" + require("../assets/img/b_left.png") + ")"
        };
      }
      if (a === "2") {
        this.ytkzbg_2 = {
          backgroundImage: "url(" + require("../assets/img/b_right.png") + ")"
        };
      }
      if (a === "4") {
        this.ytkzbg_4 = {
          backgroundImage: "url(" + require("../assets/img/b_b.png") + ")"
        };
      }
      if (a === "14") {
        this.ytkzbg = {
          backgroundImage: "url(" + require("../assets/img/start.png") + ")"
        };
      }
      if (a === "5") {
        this.ytkzbg_5 = {
          backgroundImage: "url(" + require("../assets/img/+.png") + ")"
        };
      }
      if (a === "6") {
        this.ytkzbg_6 = {
          backgroundImage: "url(" + require("../assets/img/-.png") + ")"
        };
      }
      if (a === "7") {
        this.ytkzbg_7 = {
          backgroundImage: "url(" + require("../assets/img/-.png") + ")"
        };
      }
      if (a === "8") {
        this.ytkzbg_8 = {
          backgroundImage: "url(" + require("../assets/img/+.png") + ")"
        };
      }
      if (a === "9") {
        this.ytkzbg_9 = {
          backgroundImage: "url(" + require("../assets/img/+.png") + ")"
        };
      }
      if (a === "10") {
        this.ytkzbg_10 = {
          backgroundImage: "url(" + require("../assets/img/-.png") + ")"
        };
      }
      // if ($target === '9' || $target === '10') {
      //   this.action = '13'
      // } else {
      //   this.action = '0'
      // }
      // setInterval(axios.get('http://47.92.121.146:8001/service/video.PTZControl?cameraNum=' + this.cameraNum + '&action=' + this.action + '&step=1&channel_id=&_=1590205505322', {
      // }), 500)
      // axios.get('http://47.92.121.146:8001/service/video.PTZControl?cameraNum=' + this.cameraNum + '&action=' + this.action + '&step=1&channel_id=&_=1590205505322', {
      // })
    },
    jp(uuid) {
      var date1 = new Date();
      var time1 =
        date1.getFullYear() +
        "-" +
        (date1.getMonth() + 1) +
        "-" +
        date1.getDate() +
        " " +
        date1.getHours() +
        ":" +
        date1.getMinutes() +
        ":" +
        date1.getSeconds(); // time1表示当前时间
      var date2 = new Date(date1);
      date2.setDate(date1.getDate() - 14);
      var time2 =
        date2.getFullYear() +
        "-" +
        (date2.getMonth() + 1) +
        "-" +
        date2.getDate() +
        " " +
        date2.getHours() +
        ":" +
        date2.getMinutes() +
        ":" +
        date2.getSeconds();
      axios
        .get(
          "/snap/snapview?uuid=" +
            uuid +
            "&startTimeParam=" +
            time2 +
            "&endTimeParam=" +
            time1 +
            "&_=1589944905114"
        )
        .then(res => {
          if (res.data.snapPaths) {
            this.imgShow = res.data.snapPaths;
          } else {
            this.$Message.error("请求失败");
          }
        });
    },
    // 点击图片事件
    clickImg(url, index) {
      // 获得图片的url和index，传给弹窗
      this.viewImg = url;
      // 打开弹窗
      this.$refs["Preview"].show(this.viewImg);
    },
    myEcharts5() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("chart5"));
      var datalist = [];
      var data = {
        name: "可用",
        value: 1
      };
      for (var i = 0; i < 2; i++) {
        var item = data.value - (i + 1) * 0.1;
        var va = item > 0 ? item : 0;
        var percent = data.value * 100 + "%";
        datalist.push({ name: data.name, value: va, percent: percent });
      }
      var option = {
        series: [
          {
            type: "liquidFill",
            radius: "45%",
            center: ["27%", "50%"],
            backgroundStyle: { color: "transparent" },
            data: datalist,
            color: [
              new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 0, color: "#0689ff" },
                { offset: 1, color: "#00ff8a" }
              ]),
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#0689ff" },
                { offset: 1, color: "#00ff8a" }
              ])
            ],
            itemStyle: {
              normal: {
                opacity: 1,
                shadowBlur: 20,
                shadowColor: "rgba(6,137,255,0.8)"
              }
            },
            label: {
              normal: {
                align: "center",
                textBorderColor: "transparent",
                position: "bottom",
                padding: [20, 0, 0, 0],
                rich: { b: { color: "#fff", fontSize: 18 } },
                formatter: function(params) {
                  var data = params.data;
                  var va = "{b|" + data.name + data.percent + "}";
                  return va;
                }
              }
            },
            outline: {
              show: true,
              borderDistance: 0,
              itemStyle: {
                color: "none",
                borderWidth: 3,
                borderColor: "#0689ff"
              }
            },
            animationDelay: 1600
          }
        ]
      };
      myChart.setOption(option);
    },
    // 在拖拽之前
    beforeDrag: function(event, treeId, treeNode) {},
    zTreeOnDrop: function(
      event,
      treeId,
      treeNodes,
      targetNode,
      moveType,
      isCopy
    ) {
      // 获取选中的节点
      console.log(1231312);
      this.Camerainformation(treeNodes[0].uuid); // 获取摄像头信息
      this.jp(treeNodes[0].uuid);
      this.nodes(treeNodes[0].department, treeNodes[0].uuid, treeNodes);
    },
    beforeDrop: function(treeId, treeNodes, targetNode, moveType) {
      console.log(1231);
      return targetNode ? targetNode.drop !== false : true;
    },
    zTreeOnClick(event, treeId, treeNode) {
      if (treeNode.children > 0) {
        return;
      }
      // var zTree = $.fn.zTree.getZTreeObj("sxt_treeDemo");
      // zTree.expandNode(treeNode);
      // this.$nextTick(() => {
      //   this.dragsEvent();
      // });
      // 获取选中的节点
      // this.Camerainformation(treeNode.uuid)// 获取摄像头信息
      // this.jp(treeNode.uuid)
    },
    Camerainformation(uuid) {
      axios
        .get("/service/map.selectcamera?uuid=" + uuid)
        .then(stream => {
          this.deviceId = stream.data.videoDeviceBusinessInfos[0].deviceId; // 设备国标编号
          this.cameraNum = stream.data.videoDeviceBusinessInfos[0].cameraNum; // 摄像头名称
          this.cameraName = stream.data.videoDeviceBusinessInfos[0].cameraName; // 摄像头名称
          this.deviceStatus =
            stream.data.videoDeviceBusinessInfos[0].deviceStatus; // 在线状态
          this.direction = stream.data.videoDeviceBusinessInfos[0].direction; // 方向
          this.subordinateUnit =
            stream.data.videoDeviceBusinessInfos[0].subordinateUnit; // 路段公司名称
          this.pileNumber = stream.data.videoDeviceBusinessInfos[0].pileNumber; // 桩号
          this.poiName = stream.data.videoDeviceBusinessInfos[0].poiName; // 兴趣点
          this.expressway = stream.data.videoDeviceBusinessInfos[0].expressway; // 所属路段
          this.roadSection =
            stream.data.videoDeviceBusinessInfos[0].roadSection; // 所属单位名称
          this.city =
            stream.data.videoDeviceBusinessInfos[0].province +
            "   " +
            stream.data.videoDeviceBusinessInfos[0].city; // 所属地区
          // 路段公司名称
        })
        .catch(err => {
          console.log(err);
        });

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
    VideoType() {
      axios
        .get("/service/camera.selectcameracount")
        .then(stream => {
          this.onlineNum = stream.data.selectCameraCountBO.onlineNum;
          this.offlineNum = stream.data.selectCameraCountBO.offlineNum;
          this.percentage = stream.data.selectCameraCountBO.percentage;
        })
        .catch(err => {
          console.log(err);
        });

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
};
</script>

<style>
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

<style lang="less">
.video-container {
  table thead th {
    /* background-color: #CCE8EB; */
    width: 100px;
  }
  table td,
  table th {
    padding: 0.25rem;
    border: 1px solid #017fee;
    color: #ffffff;
    height: 30px;
  }
  table {
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
  }

  .border1_jp {
    top: 9px;
    left: 30px;
    width: 388px;
    height: 960px;
  }
  .section-title {
    position: absolute;
    display: inline-block;
    font-size: 22px;
    color: #fff;
    top: 30px;
    left: 20px;
  }

  .section-title2 {
    padding: 25px 20px 10px;
    font-size: 22px;
    color: #fff;
  }
  .floatLeft {
    float: left;
  }
  .floatRight {
    float: right;
  }
  .screen-num {
    float: right;
    width: 200px;
    margin-top: -10px;
  }

  .search-body {
    width: 360px;
    height: 840px;
    top: 50px;
    text-align: left;
    position: absolute;
    font-size: 24px;
    float: left;
  }
  .input-div {
    margin: 20px 20px 0px 20px;

    .input-name {
      width: 200px;
      background-color: transparent;
      border: 1px solid #3c69d2;
      color: #ffffff;
      font-size: 14px;
    }

    .el-input__inner {
      height: 40px;
      line-height: 40px;
      border-radius: 4px;
    }
    .el-button {
      font-weight: 500;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    }
  }

  .tree-body {
    width: 380px;
    position: relative;
    top: 0px;
    z-index: 1000;
    filter: alpha(Opacity=80);
    -moz-opacity: 0.9;
    opacity: 0.9;
    float: left;
    height: 98%;

    .el-tree-node:focus > .el-tree-node__content {
      background-color: transparent !important;
      .text-hidden {
        background: #6f709d;
        color: #fff;
      }
    }
    .el-tree-node.is-focus > .el-tree-node__content {
      background-color: transparent !important;
      .text-hidden {
        background: #6f709d;
        color: #fff;
      }
    }
    .el-tree-node.is-current > .el-tree-node__content {
      background-color: transparent !important;
      .text-hidden {
        background: #6f709d;
        color: #fff;
      }
    }

    .el-tree-node__content:hover {
      background-color: transparent !important;
    }

    .el-tree {
      background: transparent;
      overflow-y: auto;
      overflow-x: auto;
      height: 100%;
      color: #fff;
      margin-top: 16px;
      margin-left: 20px;

      .el-tree-node__content {
        height: 34px;
      }
      .el-tree-node {
        width: 580px;
      }
      .el-tree-nod::-webkit-scrollbar {
        width: 4px; /*对垂直流动条有效*/
      }
      .el-tree-nod::-webkit-scrollbar-thumb {
        background-color: red;
      }
    }
    .el-tree .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    // //有子节点 且未展开
    .el-tree .el-icon-caret-right:before {
      width: 26px;
      height: 28px;
      font-size: 16px;
      background-size: 16px;
    }
    // //有子节点 且已展开
    .el-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
      width: 26px;
      height: 28px;
      font-size: 16px;
      background-size: 16px;
    }
    //没有子节点
    .el-tree .el-tree-node__expand-icon.is-leaf::before {
      width: 26px;
      height: 28px;
      font-size: 16px;
      background-size: 16px;
    }

    .el-tree::-webkit-scrollbar {
      width: 6px; /*对垂直流动条有效*/
      height: 6px;
      cursor: pointer;
    }
    .el-tree::-webkit-scrollbar-thumb {
      background-color: #409eff;
      border-radius:3px;
    }

    .is-current {
      background: transparent !important;
    }

    .topnav_box {
      height: 820px;
    }
  }

  .section-mid {
    top: 15px;
    left: 441px;
    right: 441px;
    height: 943px;

    .section-mid-body {
      .mchart {
        position: relative;
        height: 700px;
      }
    }

    .font14 {
      font-size: 14px;
    }

    .mid-btn {
      position: relative;
      height: 238px;

      .mid-btn-div {
        height: 100%;
      }
    }
    .mid-btn-block {
      position: absolute;
      top: 50px;
      left: 30px;
      right: 10px;
      bottom: 20px;
      overflow-y: scroll;
      overflow-x: scroll;

      .mid-block-item {
        width: 20%;
      }
    }
  }

  .section-right {
    top: 9px;
    right: 30px;
    width: 388px;
    height: 700px;

    .section-right-body {
      position: relative;
      height: 180px;

      .right-body-list {
        font-size: 16px;
        color: #ffffff;
        height: 135px;
        width: 156px;
        margin-top: 20px;
        float: left;

        .right-up {
          float: center;
          height: 22px;
          width: 137px;
        }

        .right-div1 {
          width: 156px;
          position: absolute;
          margin-top: 5px;
        }

        .right-left {
          float: left;
          width: 23px;
          height: 90px;
        }
        .right-reset {
          float: left;
          width: 86px;
          height: 90px;
          margin-left: 5px;
        }

        .right-right {
          float: left;
          width: 23px;
          height: 90px;
        }

        .right-dw {
          float: left;
          height: 24px;
          width: 137px;
          position: absolute;
          bottom: 12px;
        }
      }

      .backCover {
        background-size: 100%;
      }

      .right-more {
        font-size: 16px;
        color: #ffffff;
        height: 156px;
        width: 220px;
        margin-top: 20px;
        float: left;

        .right-more-div {
          float: left;
          height: 50px;
        }

        .right-more1 {
          width: 23px;
          height: 23px;
          float: left;
        }

        .right-other {
          width: 80px;
          float: left;
          text-align: center;
          font-weight: bold;
        }

        .right-more2 {
          width: 23px;
          height: 23px;
          float: left;
        }

        .right-more3 {
          float: left;
          height: 50px;
        }
        .right-more4 {
          width: 23px;
          height: 23px;
          float: left;
        }
        .right-more5 {
          width: 80px;
          float: left;
          text-align: center;
          font-weight: bold;
        }
        .right-more6 {
          width: 23px;
          height: 23px;
          float: left;
        }
        .right-more7 {
          float: left;
          height: 50px;
        }
        .right-more8 {
          width: 23px;
          height: 23px;
          float: left;
        }
        .right-more9 {
          width: 80px;
          float: left;
          text-align: center;
          font-weight: bold;
        }
        .right-more10 {
          width: 23px;
          height: 23px;
          float: left;
        }
      }
    }

    .table-body {
      position: relative;
      height: 400px;

      .table-body-div {
        position: relative;
        height: 350px;
        font-size: 14px;
        color: #ffffff;
        overflow-x: auto;
      }

      .table-body-div::-webkit-scrollbar {
        width: 4px; /*对垂直流动条有效*/
      }
      .table-body-div::-webkit-scrollbar-thumb {
        background-color: #409eff;
      }

      .table-inner {
        width: 92%;
        text-align: left;

        td {
          padding: 0;
          height: 36px;
          padding-top: 4px;
          padding-left: 8px;
        }
      }
    }
  }

  .section-btn {
    top: 730px;
    right: 30px;
    width: 388px;
    height: 240px;

    .section6-main {
      height: 100%;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      background: transparent;
      div:first-child {
        width: 100% !important;
        height: 100% !important;

        canvas {
          width: 100% !important;
          height: 100% !important;
        }
      }
    }

    .section6-info {
      position: absolute;
      padding: 0px 0px;
      right: 35px;
      top: 20px;
      width: 154px;
      height: 201px;
      .block-item {
        padding: 15px 0px;
      }
      .font18 {
        font-size: 18px;
      }
      .font36 {
        font-size: 36px;
      }
      .section6-img {
        display: inline-block;
        width: 36px;
        height: 41px;
      }
    }

    .item10 {
      padding: 10px 0px;
    }
    .item5 {
      padding: 5px 0px;
    }
  }
}
.err-message {
  top: 20px !important;
  min-width: 380px !important;
  padding: 15px 15px 15px 20px !important;
  border-radius: 4px !important;
  .el-icon-error {
    font: 15px/21px Arial, Helvetica, simsun, sans-serif;
    margin-right: 10px;
    width: 15px;
    height: 15px;
  }
  .el-icon-error:before {
    width: 14px !important;
    height: 14px !important;
    font-size: 14px !important;
  }

  .el-message__content {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    padding-right: 16px;
    font-size: 16px !important;
    
  }
}
</style>
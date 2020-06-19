<template>
  <div class="hidden-component">
    <div v-show="showMapInfoWindow" ref="mainWin" class="amap-window-container">

      <div class="amap-window-ex">
        <div class="win-main">
          <slot />
        </div>
        <!-- <div class="xq" style="color:#fff;font-size:16px;font-weight:bold"><a v-bind:href="'#/screen'" v-on:click="a()">详情</a></div> -->
        <span class="close-btn" @click="closeMapInfoWindow">
          <i class="el-icon-close" />
        </span>
        <div class="sharp-arrow" />
      </div>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
// eslint-disable-next-line camelcase
import { wgs84_to_gcj02 } from '../../assets/js/wgs84_to_gcj02'// ../assets/js/wgs84_to_gcj02
export default {
  name: 'MapInfoWindow',
  props: {
    map: { // 地图对象
      type: Object,
      default: null,
      require: true
    },
    width: {
      type: Number,
      default: 500
    },
    show: {
      type: Boolean,
      default: false
    },
    showPointMarker: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      showMapInfoWindow: this.show,
      infoWindow: null,
      position: null,
      cywmarker: null
    }
  },
  // computed: {
  //   styles() {
  //     const self = this
  //   }
  // },
  methods: {
    a () {
      // if (this.$route.path === '/screen') {
      $('.nav-item').removeClass('active')
      $('.nav-item').eq(2).addClass('active')
      // }
    },
    /**
     * 关闭窗口
     */
    closeMapInfoWindow () {
      const self = this
      if (self.infoWindow) {
        if (self.cywmarker != null) {
          self.map.remove(self.cywmarker)
          self.cywmarker = null
        }
        self.infoWindow.close()
        this.$emit('closed') // 关闭事件
      }
    },

    showInfoWindow (position, winOffset, name) {
      const self = this
      self.position = position
      this.name = name
      // eslint-disable-next-line no-unused-vars
      let infoWinOffset = new AMap.Pixel(80, -300)
      if (self.showPointMarker) {
        // eslint-disable-next-line no-unused-vars
        let transfromLngLat = wgs84_to_gcj02(self.position.lon, self.position.lat)
        const marker = new AMap.Marker({
          // icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
          // eslint-disable-next-line standard/array-bracket-even-spacing
          position: [ self.position.lon, self.position.lat],
          offset: new AMap.Pixel(0, 0)
        })
        self.map.add(marker)
        if (self.cywmarker != null) {
          self.map.remove(self.cywmarker)
        }
        self.cywmarker = marker
        infoWinOffset = new AMap.Pixel(80, 50)
      }

      if (winOffset) {
        infoWinOffset = winOffset
      }

      self.infoWindow = new AMap.InfoWindow({
        isCustom: true, // 使用自定义窗体
        content: self.$refs.mainWin,
        offset: new AMap.Pixel(5, -30)
        // infoWinOffset
      })
      const _pos = new AMap.LngLat(self.position.lon, self.position.lat)
      self.infoWindow.open(self.map, _pos)
      self.map.setCenter(_pos)

      self.showMapInfoWindow = true
      this.$emit('opened')
    }
  }
}
</script>

<style scoped>
  .amap-window-container {
    width:520px;
  }
  .amap-window-ex {
    border: 1px solid #2071a7;
    background-color: rgba(12, 57, 89, 0.96);
    border-radius: 5px;
    position: relative;
  }

    .sharp-arrow,
    .sharp-arrow::after {
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
    }

    .sharp-arrow {
      border-bottom-width: 0;
      border-width: 32px;
      border-top-color: #2071a7;
      bottom: 0px;
      bottom: -64px;
      left: 220px;
    }

    .sharp-arrow::after {
      border-bottom-width: 0;
      border-top-color: #103656;
      content: " ";
      border-width: 30px;
      margin-left: -30px;
      bottom: -28px;
    }

    .el-tabs__item {
      font-weight: bold;
    }

    .el-form-item--small.el-form-item {
      margin-bottom: 2px;
    }

    .el-form-item--small .el-form-item__content {
      line-height: 26px;
    }

    .el-tabs__header {
      background-color: #104d77;
      padding: 0 20px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .el-tabs__content {
      padding: 0 5px 10px 5px;
    }
    .close-btn {
      position: absolute;
      top: 0px;
      right: 5px;
      display: block;
      height: 40px;
      line-height: 40px;
      width: 30px;
      text-align: center;

      cursor: pointer;
    }
    .close-btn i {
        color: #ffffff;
        font-size: 16px;
      }
    .close-btn:hover i {
        color: #ffffff;
        font-weight: bold;
    }
    .xq {
      position: absolute;
      top: 0px;
      right: 45px;
      display: block;
      height: 40px;
      line-height: 40px;
      width: 100px;
      text-align: center;

      cursor: pointer;
    }
    .xq i {
        color: #ffffff;
        font-size: 16px;
      }
    .xq:hover i {
        color: #ffffff;
        font-weight: bold;
    }
</style>

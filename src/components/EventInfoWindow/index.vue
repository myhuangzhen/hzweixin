<template>
  <div class="hidden-component">
    <MapInfoWindow ref="mapInfoWindow" :map="map" :width="520" :show="true">
      <el-tabs v-model="eventInfoWindowTab" class="event-info-tab">
        <el-tab-pane v-if="selectEvent !== null" :label="selectEvent" name="eventInfo" style="line-height: 15px;" > <!--style="margi" -->
          <live-player
            class="video"
            ref="player"
            :videoUrl = "videoUrl"
            v-loading="loading"
            fluent
            autoplay
            live
            stretch></live-player>
        </el-tab-pane>

      </el-tabs>
    </MapInfoWindow>
  </div>
</template>

<script>
import MapInfoWindow from '../MapInfoWindow/index.vue'
import LivePlayer from '@liveqing/liveplayer'
export default {
  name: 'EventInfoWindow',
  components: {
    MapInfoWindow,
    LivePlayer,
    'el-image-viewer': () => import('element-ui/packages/image/src/image-viewer')
  },
  props: {
    map: {
      type: Object,
      default: null,
      require: true
    }
  },
  data () {
    return {
      mainMap: this.map,
      selectEvent: {},
      eventNodes: [],
      eventInfoWindowTab: 'eventInfo',
      videoUrl: '',
      loading: false
    }
  },
  mounted () {
    // this.play()
  },
  computed: {
  },
  methods: {
    showEventInfoWindow (event, url) {
      const self = this
      self.selectEvent = event.target.B.extData.name
      // + `<a href="">aaaaa77</a>`
      self.eventInfoWindowTab = 'eventInfo' // 地图信息窗口切换回第一个tab页
      self.$refs.mapInfoWindow.showInfoWindow({
        // [121.15258965732974, 28.343568304254056],
        lon: event.lnglat.getLng(),
        lat: event.lnglat.getLat()
      }, url, self.selectEvent)
      this.videoUrl = url
    },
    closeWindow () {
      const self = this
      self.$refs.mapInfoWindow.closeMapInfoWindow()
    },
    play () {
      this.loading = true
    }
  }
}
</script>

<style  scoped>
.el-tab-pane {
  min-height: 200px;
}
</style>

<style scoped>
  .description-ex {
    background: rgba(144, 177, 205, 0.2);
    padding: 10px 10px;
    border-radius: 5px;
    margin: 8px 0;
    margin-bottom: 15px;
  }

  .el-step.is-vertical .el-step__title {
    padding-bottom: 0px;
  }

  .el-step__description {
    padding-right: 10px;
    min-height: 30px;
  }
  .el-form-item__content {
    padding-top: 3px;
  }

  .el-row-record {
    margin-bottom: 10px;
  }
  .no-records {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-bottom: 30px;
    opacity: 0.8;
  }
  .el-tabs__item {
    line-height: 40px;
}
</style>

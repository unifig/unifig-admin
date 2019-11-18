<template>
  <div class="map">
    <el-dialog
      title="选择位置"
      :visible.sync="centerDialogVisible"
      width=500
      center>
      <div class="content">
        <baidu-map v-bind:style="mapStyle" class="bm-view" ak="PkVa5Fes93jiQrEq87HeXjO5ZKp0PU4S"
                   :center="center"
                   :zoom="zoom"
                   :scroll-wheel-zoom="true"
                   @click="getClickInfo"
                   @moving="syncCenterAndZoom"
                   @moveend="syncCenterAndZoom"
                   @zoomend="syncCenterAndZoom">
          <bm-view style="width: 100%; height:500px;"></bm-view>
          <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
          </bm-marker>
          <bm-control :offset="{width: '10px', height: '10px'}">
            <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 999999}">
              <input type="text" placeholder="请输入搜索关键字" class="serachinput">
            </bm-auto-complete>
          </bm-control>
          <bm-local-search :keyword="keyword" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
        </baidu-map>
        
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="primary">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<style></style>
<script>
  import {BaiduMap, BmControl, BmView, BmAutoComplete, BmLocalSearch, BmMarker} from 'vue-baidu-map'
  export default {
    components: {
      BaiduMap,
      BmControl,
      BmView,
      BmAutoComplete,
      BmLocalSearch,
      BmMarker
    },
    data: function () {
      return {
        // centerDialogVisible: true,
        showMapComponent: this.value,
        keyword: '',
        mapStyle: {
          width: '100%',
          height: this.mapHeight + 'px'
        },
        center: {lng: 116.404, lat: 39.915},
        zoom: 15
      }
    },
    watch: {
      value: function (currentValue) {
        this.showMapComponent = currentValue
        if (currentValue) {
          this.keyword = ''
        }
      }
    },
    props: {
      value: Boolean,
      mapHeight: {
        type: Number,
        default: 500
      },
      centerDialogVisible: Boolean
    },
    methods: {
      primary () {
        this.$emit('listen', this.center.lng + ',' + this.center.lat)
      },
      /***
       * 地图点击事件。
       */
      getClickInfo (e) {
        this.center.lng = e.point.lng
        this.center.lat = e.point.lat
      },
      syncCenterAndZoom (e) {
        const {lng, lat} = e.target.getCenter()
        this.center.lng = lng
        this.center.lat = lat
        this.zoom = e.target.getZoom()
      },
      /***
       * 确认
       */
      confirm: function () {
        this.showMapComponent = false
        this.$emit('map-confirm', this.center)
      },
      /***
       * 取消
       */
      cancel: function () {
        this.showMapComponent = false
        this.$emit('cancel', this.showMapComponent)
      }
    }
  }
</script>

<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: 史小雷
 * @Date: 2021-08-28 15:55:26
 * @LastEditors: shiXl
 * @LastEditTime: 2021-09-12 23:21:29
-->
<template>
  <div class="cesiumHome2">
    <el-button type="primary" @click="addGeoJson((active = !active))"
      >addGeoJson</el-button
    >
    <el-button type="primary" @click="add3DTile((active = !active))"
      >add3DTile</el-button
    >
    <el-button type="primary" @click="addKml((active = !active))"
      >addKml</el-button
    >
    <el-button type="primary" @click="remove((active = !active))"
      >清空</el-button
    >
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewer: null,
      active: true,
    };
  },
  mounted() {
    this.initCesium();
  },
  watch: {
    active(newVal, oldVal) {
      console.log(this.viewer);
    },
  },
  methods: {
    initCesium() {
      const viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false,
        timeline: false,
        imageryProvider: false,
      });
      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权信息
      viewer.imageryLayers.removeAll();
      viewer.scene.fxaa = false; // 改善实体的文字和图片清晰度
      viewer.scene.globe.maximumScreenSpaceError = 4 / 3; // 降低性能提供图片质量
      // 添加一个图层
      this.gdLayer = viewer.imageryLayers.addImageryProvider(
        new Cesium.ArcGisMapServerImageryProvider({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        })
      );
      this.viewer = viewer;
    },
    // 定位 https://blog.csdn.net/qq_41156424/article/details/107220776
    async addGeoJson() {
      let res = await Cesium.GeoJsonDataSource.load("cesiumJSON3.json", {
        stroke: Cesium.Color.HOTPINK, // 边线颜色
        fill: Cesium.Color.PINK.withAlpha(0.5), // 填充色
        strokeWidth: 3, // 粗细
      });
      this.viewer.dataSources.add(res);
      this.viewer.flyTo(this.viewer.dataSources.add(res), {
        duration: 5, // 飞行时间
        maximumHeight: 600, // 飞行最大高度
        offset: {
          // 偏移量= 方位角、倾角、旋转角
          heading: 6.283185307179583,
          pitch: -1.568259498695879,
          roll: 0.0,
        },
      });
    },
    async add3DTile() {
      let position = Cesium.Cartesian3.fromDegrees(
        -75.62898254394531,
        40.02804946899414,
        0
      );
      this.viewer.entities.add({
        position: position,
        model: {
          uri: "GroundVehicle.glb",
        },
      });

      this.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          // 相机位置
          -75.62898254394531,
          40.02804946899414,
          100
        ),
        orientation: {
          // 偏移量= 方位角、倾角、旋转角
          heading: 6.283185307179583,
          pitch: -1.568259498695879,
          roll: 0.0,
        },
      });
    },
    async addKml() {
      var options = {
        camera: this.viewer.scene.camera,
        canvas: this.viewer.scene.canvas,
      };
      var promiseKml = new Cesium.KmlDataSource.load("kmlData.kmz", options);
      promiseKml.then((kmlData) => {
        this.viewer.dataSources.add(kmlData);
      });
    },
    remove() {
      if (this.viewer && this.viewer.dataSources) {
        this.viewer.dataSources.removeAll();
        this.viewer.entities.removeAll();
      } else {
        console.error("Viewer or dataSources is not initialized!");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cesiumHome2 {
  width: 100%;
  height: 100%;
  position: relative;
  #cesiumContainer {
    width: 100%;
    height: 100%;
  }
}
</style>

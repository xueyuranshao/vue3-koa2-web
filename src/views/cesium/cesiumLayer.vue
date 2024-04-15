<template>
  <div class="cesium-layer">
    <DataSource></DataSource>
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import DataSource from "@/components/DataSource/DataSource.vue";
export default {
  name: "CesiumLayer",
  components: {
    DataSource,
  },
  setup() {
    const viewer = ref(null);
    onMounted(async () => {
      try {
        viewer.value = await initCesium();
      } catch (error) {
        console.error("Cesium initialization failed:", error);
      }
    });
    const initCesium = async () => {
      const viewerContainer = new Cesium.Viewer("cesiumContainer", {
        animation: false,
        timeline: false,
        // ... 其他必要的配置项
      });
      // 配置Cesium Viewer
      configureCesium(viewerContainer);
      return viewerContainer;
    };
    const configureCesium = (viewerContainer) => {
      viewerContainer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权信息
      viewerContainer.imageryLayers.removeAll();
      viewerContainer.scene.fxaa = false; // 改善实体的文字和图片清晰度
      viewerContainer.scene.globe.maximumScreenSpaceError = 4 / 3; // 降低性能提供图片质量
      // 添加图层
      viewerContainer.imageryLayers.addImageryProvider(
        new Cesium.ArcGisMapServerImageryProvider({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        })
      );
    };
    return {
      viewer,
    };
  },
};
</script>

<style lang="scss" scoped>
.cesium-layer {
  width: 100%;
  height: 100%;
  position: relative;

  #cesiumContainer {
    width: 100%;
    height: 100%;
  }
}
</style>

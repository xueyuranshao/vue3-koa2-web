<!-- BasemapToggle.vue -->
<template>
  <div class="basemap-toggle" @click="toggleBaseMap">
    <el-button size="small">{{ currentBasemapLabel }}</el-button>
  </div>
</template>

<script>
import * as Cesium from "cesium";
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {},
  setup(props) {
    const store = useStore();
    // 使用Vuex中的state来管理当前底图类型
    const currentBasemapKey = ref(store.state.currentBasemapKey || "VECTOR");
    const basemapLabels = {
      VECTOR: "矢量地图",
      IMAGE: "影像地图",
    };
    const toggleBaseMap = () => {
      const nextKey = currentBasemapKey.value === "VECTOR" ? "IMAGE" : "VECTOR";
      store.commit("UPDATE_BASEMAP_KEY", nextKey);

      const imageryLayers = store.state.cesiumViewer.imageryLayers;
      const currentLayer = imageryLayers.get(0);
      if (currentLayer) {
        imageryLayers.remove(currentLayer, true);
      }

      const newLayerConfig = store.state.baseMaps[nextKey];
      const imageryProvider = new Cesium.WebMapTileServiceImageryProvider({
        url: newLayerConfig.urlTemplate,
        layer: newLayerConfig.layer,
        style: "default",
        format: "tiles",
        tileMatrixSetID: "w",
        maximumLevel: 18,
        tilingScheme: new Cesium.GeographicTilingScheme(),
        tileMatrixLabels: [...Array(19).keys()].map((l) => `w${l}`),
        credit: new Cesium.Credit(`天地图-${nextKey} © 天地图`),
        // 在这里注入密钥
        key: store.state.baseMaps.tiandituApiKey,
      });

      const newLayer = new Cesium.ImageryLayer(imageryProvider);
      imageryLayers.add(newLayer, 0);
    };
    return {
      currentBasemapKey,
      currentBasemapLabel: computed(
        () => basemapLabels[currentBasemapKey.value]
      ),
      toggleBaseMap,
    };
  },
};
</script>

<style scoped>
.basemap-toggle {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
}
</style>

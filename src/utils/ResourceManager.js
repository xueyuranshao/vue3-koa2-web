import { loadGeoJsonLayer } from "./layerLoaders"; // 假设这里有两个不同的图层加载函数

function createResourceManager(resources) {
  function updateResourceVisibility(
    cesiumViewer,
    folderIndex,
    itemIndex,
    value
  ) {
    const resource = resources[folderIndex].resources[itemIndex];
    resource.visible = value;
    resource.viewer = cesiumViewer;
    console.log(resource.layerType, resource.layerUrl, resource.visible);
    if (resource.layerType && resource.layerUrl) {
      switch (resource.layerType) {
        case "geojson":
          loadGeoJsonLayer(resource);
          break;
        case "raster":
          break;
        // 可以添加更多类型的图层加载逻辑...
        default:
          console.warn(`未知图层类型: ${resource.layerType}`);
      }
    }
  }

  return {
    updateResourceVisibility,
  };
}

export default createResourceManager;

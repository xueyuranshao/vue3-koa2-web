/**
 * 加载GeoJSON图层服务
 * @param {{ viewer: Cesium.Viewer, visible: boolean, layerUrl: string }} resource - 包含Cesium Viewer引用、图层可见性和URL的资源对象
 */
import * as Cesium from "cesium";
function loadGeoJsonLayer(resource) {
  const viewer = resource.viewer;
  const visible = resource.visible;
  const layerUrl = resource.layerUrl;
  if (!viewer) {
    console.error("未获取到Cesium Viewer");
    return;
  }
  // true
  if (visible) {
    // 未加载过
    if (!resource.dataSource) {
      viewer.dataSources
        .add(Cesium.GeoJsonDataSource.load(layerUrl))
        .then((ds) => {
          resource.dataSource = ds;
          viewer.flyTo(ds);
        });
    } else {
      // 已加载过
      viewer.flyTo(resource.dataSource);
    }
  } else {
    // 不可见状态只有一种情况 --- 已加载
    viewer.dataSources.remove(resource.dataSource);
    resource.dataSource = null;
  }
}

export { loadGeoJsonLayer };

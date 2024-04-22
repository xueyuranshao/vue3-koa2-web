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

  // 检查资源是否已经加载过数据源
  if (!resource.dataSource) {
    const dataSourcePromise = Cesium.GeoJsonDataSource.load(layerUrl);

    dataSourcePromise.then(
      function (dataSource) {
        resource.dataSource = dataSource;
        viewer.dataSources.add(dataSource);
        dataSource.show = Boolean(visible); // 根据资源的可见性决定是否显示(初始化加载)
        // 使用Cesium的readyPromise确保数据加载和渲染完成
        if (visible) {
          viewer.zoomTo(dataSource);
        }
      },
      function (error) {
        console.error("Failed to load GeoJSON data:", error);
      }
    );
  } else {
    // 如果数据源已存在，直接更新显示状态并尝试缩放
    resource.dataSource.show = Boolean(visible);
    if (visible) {
      viewer.zoomTo(resource.dataSource);
    }
  }
}

export { loadGeoJsonLayer };

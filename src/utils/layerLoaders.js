/**
 * 加载geojson图层服务
 */
function loadGeoJsonLayer(resource) {
  const viewer = resource.viewer;
  const visible = resource.visible;
  const layerUrl = resource.layerUrl;

  if (!viewer) {
    console.error("Cesium Viewer is not initialized yet.");
    return;
  }

  // 检查资源是否已经加载过数据源
  if (!resource.dataSource) {
    const dataSourcePromise = Cesium.GeoJsonDataSource.load(layerUrl);

    dataSourcePromise.then(
      function (dataSource) {
        resource.dataSource = dataSource;
        viewer.dataSources.add(dataSource);

        // 根据资源的可见性决定是否显示(初始化加载)
        dataSource.show = Boolean(visible);

        // 如果资源是可见的，则自动缩放至数据源范围
        if (visible) {
          viewer.flyTo(dataSource);
          viewer.zoomTo(dataSource);
        }
      },
      function (error) {
        console.error("Failed to load GeoJSON data:", error);
      }
    );
  } else {
    // 如果数据源已存在，直接更新显示状态
    resource.dataSource.show = Boolean(visible);
    if (visible) {
      viewer.zoomTo(resource.dataSource);
    }
  }
}

export { loadGeoJsonLayer };

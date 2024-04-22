import * as Cesium from "cesium";

class LayerLoader {
  constructor(type, url, visible, viewer) {
    this.type = type;
    this.url = url;
    this.visible = visible;
    this.viewer = viewer;
    this.dataSource = null;
  }

  load() {
    if (!this.viewer || !this.url) {
      console.error("Missing required parameters to manage layer visibility");
      return;
    }

    if (!this.visible) {
      if (this.dataSource) {
        this.viewer.dataSources.remove(this.dataSource);
        this.dataSource = null;
      }
      return;
    }

    // 当图层需要显示时，根据类型加载图层
    if (this.type === "geojson") {
      this.loadGeoJsonLayer();
    } else if (this.type === "raster") {
      // 实现加载Raster图层的逻辑
      console.warn("Loading raster layers is not implemented yet.");
    } else {
      console.warn(`Unknown layer type: ${this.type}`);
    }
  }
// 新增加载GeoJson矢量图层的方法
  loadGeoJsonLayer() {
    if (this.visible) {
      if (!this.dataSource) {
        this.viewer.dataSources
          .add(Cesium.GeoJsonDataSource.load(this.url))
          .then((dataSource) => {
            this.dataSource = dataSource;
            this.viewer.flyTo(dataSource);
          });
      } else {
        this.viewer.flyTo(this.dataSource);
      }
    } else {
      if (this.dataSource) {
        this.viewer.dataSources.remove(this.dataSource);
        this.dataSource = null;
      }
    }
  }
}
  // 新增加载天地图矢量图层的方法
  loadTianDiTuVectorLayer(url, options = {}) {
    if (!this.viewer || !url || !this.visible) {
      console.error("Missing required parameters to load TianDiTu vector layer");
      return;
    }

    if (!this.vectorDataSource) {
      // 使用Cesium的WebMapServiceImageryProvider加载天地图矢量服务
      const imageryProvider = new Cesium.WebMapServiceImageryProvider({
        url,
        layers: options.layers || '', // 天地图矢量图层名称
        maximumLevel: options.maximumLevel || 20,
        credit: new Cesium.Credit('天地图矢量图层'),
      });

      const imageryLayer = new Cesium.ImageryLayer(imageryProvider);
      
      this.viewer.imageryLayers.add(imageryLayer);
      this.vectorDataSource = imageryLayer;
    }

    if (this.visible) {
      this.viewer.flyTo(this.vectorDataSource);
    } else {
      this.viewer.imageryLayers.remove(this.vectorDataSource);
      this.vectorDataSource = null;
    }
  }

  // 新增加载天地图影像图层的方法
  loadTianDiTuRasterLayer(url, options = {}) {
    if (!this.viewer || !url || !this.visible) {
      console.error("Missing required parameters to load TianDiTu raster layer");
      return;
    }

    if (!this.rasterDataSource) {
      // 使用Cesium的WebMapTileServiceImageryProvider加载天地图影像服务
      const imageryProvider = new Cesium.WebMapTileServiceImageryProvider({
        url,
        layer: options.layer || '', // 天地图影像图层名称
        style: options.style || '',
        format: options.format || 'image/jpeg',
        tileMatrixSetID: options.tileMatrixSetID || '',
        maximumLevel: options.maximumLevel || 18,
        credit: new Cesium.Credit('天地图影像图层'),
      });

      const imageryLayer = new Cesium.ImageryLayer(imageryProvider);

      this.viewer.imageryLayers.add(imageryLayer);
      this.rasterDataSource = imageryLayer;
    }

    if (this.visible) {
      this.viewer.flyTo(this.rasterDataSource);
    } else {
      this.viewer.imageryLayers.remove(this.rasterDataSource);
      this.rasterDataSource = null;
    }
  }
class ResourceManager {
  constructor(resources, cesiumViewer) {
    this.cesiumViewer = cesiumViewer;
    this.folders = resources.map((folder) =>
      folder.resources.map(
        (resourceData) =>
          new LayerLoader(
            resourceData.layerType,
            resourceData.layerUrl,
            resourceData.visible,
            this.cesiumViewer
          )
      )
    );
  }
  updateResourceVisibility(folderIndex, itemIndex, value) {
    console.log(folderIndex, itemIndex, value, "---updateResourceVisibility");

    const resource = this.folders[folderIndex][itemIndex];
    resource.visible = value;
    resource.load(); // 调用load方法更新图层状态
  }
}

export default ResourceManager;

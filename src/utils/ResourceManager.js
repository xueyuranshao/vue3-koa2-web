import * as Cesium from "cesium";

class LayerLoader {
  constructor(platForm, type, url, visible, viewer) {
    this.platForm = platForm;
    this.type = type;
    this.url = url;
    this.visible = visible;
    this.viewer = viewer;
    this.dataSource = null;
  }

  load() {
    console.log(this.url, 'load-url')
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
    if (this.platForm === "dataV") {
      switch (this.type) {
        case 'geojson':
          this.loadGeoJsonLayer();
          break;
      }
    } else if (this.platForm === "tianditu") {
      switch (this.type) {
        case 'vector':
          this.loadTianDiTuVectorLayer();
          break;
        case 'raster':
          break;
      }
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
  // 新增加载天地图矢量底图的方法
  loadTianDiTuVectorLayer() {
    debugger
    if (this.visible) {
      if (!this.dataSource) {
        const imageryProvider = new Cesium.WebMapServiceImageryProvider({
          url: this.url,
          subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
          layer: 'vec',
          style: 'default',
          format: 'tiles',
          tileMatrixSetID: 'GoogleMapsCompatible',
          maximumLevel: 18,
        });

        const imageryLayer = new Cesium.ImageryLayer(imageryProvider);
        this.viewer.imageryLayers.add(imageryLayer);
        this.dataSource = imageryLayer; // 这里把 imageryLayer 当作 dataSource 记录下来，但严格来说它不是一个 DataSource，而是 ImageryLayer
      }

      this.viewer.flyToBoundingSphere(this.dataSource.boundingSphere); // 飞向图层的包围球，而不是 flyTo(dataSource)，因为这里 dataSource 是 ImageryLayer
    } else {
      if (this.dataSource && this.dataSource instanceof Cesium.ImageryLayer) {
        this.viewer.imageryLayers.remove(this.dataSource);
        this.dataSource = null;
      }
    }
  }
}

class ResourceManager {
  constructor(componentId, resourcesDirectory, cesiumViewer) {
    this.componentId = componentId;
    this.cesiumViewer = cesiumViewer;
    this.resourceMap = new Map();
    console.log(componentId, resourcesDirectory, cesiumViewer)
    // 遍历资源目录下每一层的资源项
    resourcesDirectory.forEach((folder) => {
      folder.resources.forEach((resourceData) => {
        const key = `${this.componentId}_${resourceData.layerCode}`;
        const layerLoader = new LayerLoader(
          resourceData.platForm,
          resourceData.layerType,
          resourceData.layerUrl,
          resourceData.visible,
          this.cesiumViewer
        );
        this.resourceMap.set(key, layerLoader);
      });
    });
    console.log(this.resourceMap)

  }

  updateResourceVisibility(resource) {
    if (!resource.layerCode || !resource.layerType || !resource.layerUrl) {
      console.error("Invalid resource data for updating visibility. Missing layerCode or other required properties.");
      return;
    }
    const key = `${this.componentId}_${resource.layerCode}`;
    const layerLoader = this.resourceMap.get(key);
    if (!layerLoader) {
      console.error(`Resource with layerCode "${resource.layerCode}" not found in the resource map.`);
      return;
    }
    layerLoader.visible = resource.visible;
    layerLoader.load();
  }
}

export default ResourceManager;

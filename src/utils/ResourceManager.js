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
      this.loadTianDiTuVectorLayer(this.type);
      // switch (this.type) {
        // case 'vector':
        //   this.loadTianDiTuVectorLayer(this.type);
        //   break;
        // case 'raster':
        //   break;
      // }
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
  loadTianDiTuVectorLayer(type) {
    debugger
    this.viewer.imageryLayers.removeAll()
    const tk = 'd5b0f0ba1b63b838c65918dfeaf53eb7'
    if (this.visible) {
      if (!this.dataSource) {
        switch (type) {
          case 'vector':
            //矢量图层
            const sl = new Cesium.WebMapTileServiceImageryProvider({
              url: this.url[0] + '&tk=' + tk,
              subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
              layer: 'vec',
              style: 'default',
              format: 'image/png',
              tileMatrixSetID: 'GoogleMapsCompatible',
              maximumLevel: 18,
            });
            //矢量注记图层
            const slzj = new Cesium.WebMapTileServiceImageryProvider({
              url: this.url[1] + '&tk=' + tk,
              subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
              layer: 'cva',
              style: 'default',
              format: 'image/png',
              tileMatrixSetID: 'GoogleMapsCompatible',
              maximumLevel: 18,
            });
    
            const slLayer = new Cesium.ImageryLayer(sl);
            const slAnnLayer = new Cesium.ImageryLayer(slzj);
            this.viewer.imageryLayers.add(slLayer);
            this.viewer.imageryLayers.add(slAnnLayer);
            break;
          case 'raster':
            //影像图层
            const yx = new Cesium.WebMapTileServiceImageryProvider({
              url: this.url[0] + '&tk=' + tk,
              subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
              layer: 'img',
              style: 'default',
              format: 'image/png',
              tileMatrixSetID: 'GoogleMapsCompatible',
              maximumLevel: 18,
            });
            //影像注记图层
            const yxzj = new Cesium.WebMapTileServiceImageryProvider({
              url: this.url[1] + '&tk=' + tk,
              subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
              layer: 'cia',
              style: 'default',
              format: 'image/png',
              tileMatrixSetID: 'GoogleMapsCompatible',
              maximumLevel: 18,
            });
    
            const yxLayer = new Cesium.ImageryLayer(yx);
            const yxAnnLayer = new Cesium.ImageryLayer(yxzj);
            this.viewer.imageryLayers.add(yxLayer);
            this.viewer.imageryLayers.add(yxAnnLayer);
            break;
        
          default:
            break;
        }
      }
    } else {
      this.viewer.imageryLayers.removeAll()
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

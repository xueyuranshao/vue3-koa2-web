<template>
  <div class="cesium-layer">
<<<<<<< HEAD
    <div
      class="menu-toggle-button"
      @click="toggleMenu"
      :class="{ collapsed: !isMenuOpen }"
    >
      <el-icon>
        <component :is="isMenuOpen ? 'arrow-right' : 'arrow-left'" />
      </el-icon>
    </div>
=======
    <!-- 使用Element Plus的Button组件 -->
    <el-button
      type="text"
      class="menu-toggle-button"
      :class="isMenuOpen ? 'menu-expanded' : 'menu-collapsed'"
      @click="toggleMenu"
    >
      <i :class="isMenuOpen ? 'menu-expanded' : 'menu-collapsed'"></i>
    </el-button>
>>>>>>> cb78cadaccb2f4d3609b8ad8873eafd43dba0c69
    <div class="left-menu-container" :class="{ collapsed: !isMenuOpen }">
      <DataSource></DataSource>
    </div>
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
    const isMenuOpen = ref(true); // 默认设置为展开状态

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

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    return {
      viewer,
      isMenuOpen,
      toggleMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.cesium-layer {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden; // 防止内容溢出

  .menu-toggle-button {
<<<<<<< HEAD
    z-index: 2; // 确保按钮在菜单之上
    background-color: rgba(255, 255, 255, 0.5);
    padding: 5px;
    cursor: pointer;
    border-radius: 50%;
    position: absolute;
    left: 0; /* 修改为与左侧菜单容器边界对齐 */
    top: 50%;
    transform: translateY(-50%) translateX(200px); /* 当菜单展开时，将其移至菜单右侧边缘 */
    transition: transform 0.3s ease; /* 添加过渡效果 */
=======
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    padding: 5px;
    cursor: pointer;
    border-radius: 50%;
    transition: left 0.3s ease, transform 0.3s ease;
    background-color: rgba(255, 255, 255, 0.5);

    &.menu-expanded {
      transform: translateY(-50%) translateX(200px); // 展开状态的样式
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.7);
    }
>>>>>>> cb78cadaccb2f4d3609b8ad8873eafd43dba0c69

    i {
      font-size: 20px;
    }
<<<<<<< HEAD
    &:hover {
      background-color: rgba(108, 126, 185, 0.7);
    }
    &.collapsed {
      transform: translateY(-50%) translateX(0);
    }
=======
>>>>>>> cb78cadaccb2f4d3609b8ad8873eafd43dba0c69
  }

  .left-menu-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px; // 菜单宽度
    height: 100%;
    transition: left 0.3s ease; // 动画效果
    padding: 2px;
    &.collapsed {
      left: -200px; // 收起时移到左侧屏幕外
    }
  }

  #cesiumContainer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%; // 初始宽度为100%
    height: 100%;
    background-color: transparent; // 确保背景色透明，不会显示白色框
    transition: left 0.3s ease;
    .left-menu-container.collapsed ~ & {
      left: 0;
      width: 100%; // 菜单收起时，宽度仍然为100%
    }
  }
}
</style>

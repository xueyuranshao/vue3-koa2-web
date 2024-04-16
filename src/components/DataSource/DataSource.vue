<template>
  <div class="resource-directory-container">
    <div class="directory-content">
      <el-menu
        class="fixed-menu resource-directory"
        :default-active="activeIndex"
        :default-openeds="openedMenus"
        text-color="#333"
        active-text-color="#409EFF"
        mode="vertical"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-submenu
          v-for="(folder, folderIndex) in folders"
          :key="folderIndex"
          :index="folder.index"
          :popper-append-to-body="true"
        >
          <template #title>
            <i :class="folder.icon"></i>
            <span>{{ folder.title }}</span>
          </template>

          <el-menu-item
            v-for="(resource, itemIndex) in folder.resources"
            :key="itemIndex"
            :index="resource.index"
          >
            {{ resource.title }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const folders = ref([
      {
        index: "1",
        title: "顶级目录1",
        icon: "el-icon-folder",
        resources: [
          { index: "1-1", title: "资源1" },
          { index: "1-2", title: "资源2" },
        ],
      },
      {
        index: "2",
        title: "顶级目录2",
        icon: "el-icon-folder",
        resources: [
          { index: "2-1", title: "资源1" },
          { index: "2-2", title: "资源2" },
          { index: "2-3", title: "资源3" },
        ],
      },
    ]);

    const activeIndex = ref("");
    const openedMenus = ref(["1"]);
    // 处理菜单展开事件
    const handleOpen = (key, keyPath) => {
      console.log(`打开了菜单: ${key}, 路径: ${keyPath}`);
    };
    // 处理菜单关闭事件
    const handleClose = (key, keyPath) => {
      console.log(`关闭了菜单: ${key}, 路径: ${keyPath}`);
    };
    return {
      folders,
      activeIndex,
      openedMenus,
      handleOpen,
      handleClose,
    };
  },
};
</script>

<style scoped lang="scss">
:root {
  --page-bg-color: #000;
  --menu-text-color: #fff;
  --menu-hover-bg-color: rgba(255, 255, 255, 0.5);
  --menu-icon-color: #fff;
  --menu-active-icon-color: #007bff;
}
.resource-directory-container {
  position: absolute;
  /* 示例定位属性，根据实际情况调整 */
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  height: 100%;

  .directory-content {
    width: 200px;
    overflow: auto;
  }
  .fixed-menu {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: inherit;
    z-index: 999;
    background-color: var(--page-bg-color); /* 更改为父容器背景颜色或其他深色 */
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    overflow-y: auto;

    .el-menu-item:not(.is-active),
    .el-submenu__title {
      background-color: transparent; /* 去除淡蓝色背景 */
      color: var(--menu-text-color);
    }
  }
}
</style>

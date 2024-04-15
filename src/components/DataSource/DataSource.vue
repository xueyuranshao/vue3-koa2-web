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
    background-color: var(--page-bg-color);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    overflow-y: auto;

    .el-menu-item:not(.is-active),
    .el-submenu__title {
      background-color: #fff;
    }
  }
}
</style>
<style scoped>
/* 淡蓝色菜单背景 */
.resource-directory-container .fixed-menu.resource-directory {
  background-color: #add8e6; /* 淡蓝色 */
}

/* 淡蓝色文本颜色 */
.resource-directory-container .fixed-menu.resource-directory .el-submenu__title,
.resource-directory-container .fixed-menu.resource-directory .el-menu-item {
  color: #333; /* 深色文本以适应淡蓝色背景 */
}

/* 当前激活的子菜单或菜单项的文本颜色 */
.resource-directory-container
  .fixed-menu.resource-directory
  .el-submenu.is-active
  .el-submenu__title,
.resource-directory-container
  .fixed-menu.resource-directory
  .el-menu-item.is-active {
  color: #0000ff; /* 深蓝色，突出激活状态 */
}

/* 鼠标悬停时的菜单项文本颜色 */
.resource-directory-container
  .fixed-menu.resource-directory
  .el-menu-item:hover {
  color: #0000ff; /* 深蓝色，突出悬停状态 */
}

/* 其他可能需要的样式，比如图标颜色等 */
.resource-directory-container
  .fixed-menu.resource-directory
  .el-submenu__icon-arrow {
  color: #333; /* 深色图标 */
}

/* 根据需要添加更多样式 */
</style>

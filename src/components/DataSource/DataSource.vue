<template>
  <div class="resource-directory-container">
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
          :class="{
            'custom-resource-style': !resource.visible,
            'custom-resource-active-style': resource.visible,
          }"
          style="display: flex; align-items: center"
        >
          <div
            :class="{
              'resource-title': true,
              'resource-title-active': resource.visible,
            }"
          >
            {{ resource.title }}
          </div>
          <el-switch
            style="margin-left: 10px"
            v-model="resource.visible"
            @change="updateResourceVisibility(folderIndex, itemIndex, $event)"
            active-color="#409EFF"
            inactive-color="#ccc"
          />
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const folders = ref([
      {
        index: "1",
        title: "土地资源",
        icon: "el-icon-folder",
        resources: [
          { index: "1-1", title: "图层1", visible: false },
          { index: "1-2", title: "图层2", visible: false },
        ],
      },
      {
        index: "2",
        title: "耕地资源",
        icon: "el-icon-folder",
        resources: [
          { index: "2-1", title: "图层1", visible: false },
          { index: "2-2", title: "图层2", visible: false },
          { index: "2-3", title: "图层3", visible: false },
        ],
      },
    ]);

    const activeIndex = ref("");
    const openedMenus = ref(["1"]);
    // 处理菜单展、关闭开事件
    const handleOpen = (key, keyPath) => {
      console.log(`打开了菜单: ${key}, 路径: ${keyPath}`);
    };
    const handleClose = (key, keyPath) => {
      console.log(`关闭了菜单: ${key}, 路径: ${keyPath}`);
    };
    const updateResourceVisibility = (folderIndex, itemIndex, value) => {
      // 在这个方法中，实际上已经不需要做任何事情了，
      // 因为我们已经在v-model中直接修改了resource.visible
      // folders.value[folderIndex].resources[itemIndex].visible = value;
    };
    return {
      folders,
      activeIndex,
      openedMenus,
      handleOpen,
      handleClose,
      updateResourceVisibility,
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
  --menu-resource-active-color: red; // 定义一个新的活动资源文本颜色变量
}
.resource-directory-container {
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  // // 添加悬停效果
  // transition: box-shadow 0.3s ease-in-out;
  // &:hover {
  //   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  // }
  // // 若需要在展开子菜单时，整个目录有更深的阴影
  // .el-menu--collapse .el-submenu.is-active {
  //   .el-submenu__title {
  //     box-shadow: inset 0 -4px 0 var(--menu-hover-bg-color);
  //   }
  // }
  .fixed-menu {
    width: 100%;
    height: 100%;
    z-index: 999;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    overflow-y: auto;
    // // 去掉默认的选中样式
    // .el-menu-item.is-active {
    //   &,
    //   & > * {
    //     background-color: transparent !important;
    //     color: var(--menu-text-color) !important;
    //     font-weight: normal !important;
    //     border-left: none !important;
    //   }
    // }
    // // 添加与switch联动的样式
    // .custom-resource-active-style {
    //   font-weight: bold;
    //   background-color: rgba(0, 0, 0, 0.05); // 或者你希望的其他背景颜色
    //   color: var(
    //     --menu-resource-active-color
    //   ) !important; // 使用新的活动资源文本颜色变量
    // }

    .resource-title {
      color: var(--menu-text-color);
    }

    .resource-title-active {
      color: red !important;
    }
  }
}
</style>

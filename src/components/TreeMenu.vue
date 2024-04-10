<template>
  <div>
    <template v-for="menu in MenuList">
      <el-submenu
        v-if="
          menu.children &&
          menu.children.length > 0 &&
          menu.children[0].menuType == 1
        "
        :key="menu._id"
        :index="menu.path"
      >
        <template #title>
          <i :class="menu.icon"></i>
          <span>{{ menu.menuName }}</span>
        </template>
        <tree-menu :MenuList="menu.children" />
      </el-submenu>
      <el-menu-item
        v-else-if="menu.menuType == 1 && menu.menuType == 1"
        :index="menu.path"
        :key="menu.menuName"
      >
        <template #title>
          <el-icon> <component :is="menu.icon" /> </el-icon>
          <span>{{ menu.menuName }}</span>
        </template></el-menu-item
      >
    </template>
  </div>
</template>

<script>
export default {
  name: "TreeMenu",
  props: {
    MenuList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style></style>

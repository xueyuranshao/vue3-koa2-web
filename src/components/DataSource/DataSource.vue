<template>
  <el-menu
    class="fixed-menu left-menu"
    :default-active="activeIndex"
    :default-openeds="['1']"
    text-color="#333"
    active-text-color="#409EFF"
    mode="vertical"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-submenu
      v-for="(submenu, index) in menuItems"
      :key="index"
      :index="submenu.index"
    >
      <template #title>
        <i :class="submenu.icon"></i>
        <span>{{ submenu.title }}</span>
      </template>
      <el-menu-item
        v-for="(item, itemIndex) in submenu.children"
        :key="itemIndex"
        :index="item.index"
      >
        {{ item.title }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const menuItems = ref([]);
    const isCollapse = ref(false); // 新增变量，控制是否折叠菜单
    // 初始化接口调用
    onMounted(() => {
      console.log(menuItems, "mounted初始化调用");
      window.addEventListener("resize", handleResize);
      handleResize();
      getDataSource();
    });
    const getDataSource = async () => {
      console.log("created初始化调用");
      menuItems.value = [
        {
          index: "1",
          title: "导航一",
          icon: "el-icon-location",
          children: [
            { index: "1-1", title: "选项1" },
            { index: "1-2", title: "选项2" },
          ],
        },
        {
          index: "2",
          title: "导航二",
          icon: "el-icon-menu",
          children: [
            { index: "2-1", title: "选项1" },
            {
              index: "2-2",
              title: "子菜单",
              children: [{ index: "2-2-1", title: "选项1" }],
            },
          ],
        },
      ];
    };

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        isCollapse.value = true;
      } else {
        isCollapse.value = false;
      }
    };
    return {
      menuItems,
      handleResize,
    };
  },
};
</script>

<!-- :root 伪类来定义进行全局的变量设置和样式设置。:root 表示文档根元素，一般情况下是表示 <html> 元素。 -->
<!-- 定义 :root 后，所有变量都将被保存在 :root 中，并且可以在整个页面的任何位置使用。这使得我们可以轻松地为网站设置一些通用的变量，如颜色、字体、间距等等。 -->
<style scoped lang="scss">
:root {
  --page-bg-color: #000; /* 假设页面背景色为黑色，您可以根据实际情况更改 */
  --menu-text-color: #fff;
  --menu-hover-bg-color: rgba(255, 255, 255, 0.5);
  --menu-icon-color: #fff;
  --menu-active-icon-color: #007bff;
}

body {
  background-color: var(--page-bg-color);
}

.fixed-menu {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  z-index: 999;
  background-color: var(--page-bg-color); /* 将菜单背景色设置为页面背景色 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  overflow-y: auto;
  padding: 20px 0;

  /* 保持 el-menu-item 的白色背景 */
  .el-menu-item:not(.is-active),
  .el-submenu__title {
    background-color: #fff;
  }

  /* 其他样式保持不变... */
}
</style>

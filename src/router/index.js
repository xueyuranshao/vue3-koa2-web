import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/components/Home.vue";
import storage from "./../utils/storage";
import API from "./../api";
import utils from "./../utils/utils";

const routes = [
  {
    name: "home",
    path: "/",
    meta: {
      title: "首页",
    },
    component: Home,
    redirect: "/welcome",
    children: [
      {
        name: "welcome",
        path: "/welcome",
        meta: {
          title: "欢迎登录",
        },
        component: () => import("@/views/Welcome.vue"),
      },
    ],
  },
  {
    name: "login",
    path: "/login",
    meta: {
      title: "登录",
    },
    component: () => import("@/views/Login.vue"),
  },
  {
    name: "404",
    path: "/404",
    meta: {
      title: "页面不存在",
    },
    component: () => import("@/views/404.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 修复线上部署不能访问问题
async function loadAsyncRoutes() {
  let userInfo = storage.getItem("userInfo") || {};
  if (userInfo.token) {
    try {
      const { menuList } = await API.getPermissionList();
      console.log(menuList, '---menuList')

      let routes = utils.generateRoute(menuList);
      const modules = import.meta.glob("../views/*.vue"); // view下第一层级vue文件
      const topLevelModules = import.meta.glob("../views/*/*.vue"); // view下第二层级vue文件
      const topLevelTwoModules = import.meta.glob("../views/*/*/*.vue"); // view下第三层级vue文件
      let concatModules = {
        ...modules,
        ...topLevelModules,
        ...topLevelTwoModules,
      };
      routes.map((route) => {
        let url = `../views/${route.component}.vue`;
        route.component = concatModules[url];
        router.addRoute("home", route);
      });
    } catch (error) { }
  }
}
loadAsyncRoutes();
// 判断当前地址是否可以访问
/*
function checkPermission(path) {
  let hasPermission = router.getRoutes().filter(route => route.path == path).length;
  if (hasPermission) {
      return true;
  } else {
      return false;
  }
}
*/
// 导航守卫
// 假设我们有以下白名单路由名称或路径
const whiteList = ['/login', '/cesium/cesiumLayer'];

router.beforeEach(async (to, from, next) => {
  if (whiteList.includes(to.path)) { // 如果目标路由在白名单中
    document.title = to.meta.title;
    next(); // 直接放行
  } else if (to.name) {
    if (router.hasRoute(to.name)) {
      document.title = to.meta.title;
      // 这里可以根据实际情况检查用户是否已登录，未登录则跳转至登录页
      // 比如：if (!userInfo.token) next('/login');
      next();
    } else {
      next("/404");
    }
  } else {
    await loadAsyncRoutes();
    let curRoute = router.getRoutes().filter((item) => item.path == to.path);
    if (curRoute && curRoute.length) {
      document.title = curRoute[0].meta.title;
      next({ ...to, replace: true });
    } else {
      next("/404");
    }
  }
});

export default router;

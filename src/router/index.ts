import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 路由回转的滚动行为（是保持原来滚动的位置还是重置到顶部）
  scrollBehavior(to, from, savedPosition) {
    // savedPosition：包含上次滚动信息（页面滚动的位置）
    if (savedPosition) {
      return savedPosition; // 页面保持原来滚动的位置
    } else {
      return {
        // left:水平方向页面位置，top:垂直方向页面位置
        left: 0,
        top: 0,
      };
    }
  },
});


export default router

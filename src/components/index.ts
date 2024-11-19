import SvgIcon from "@/components/SvgIcon/index.vue";
import Pagination from "@/components/pagination/index.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 对外暴露插件对象
// export default {
//   // 务必叫做install
//   // 在Vue3中，install方法常用于创建插件或全局工具类。
//   install(app: any) {
//     // install参数是App实例对象，可以使用app的方法（其中包括组成组件）
//     app.component("SvgIcon", SvgIcon);
//     app.component("Pagination",Pagination)
//   },
// };

// 批量注册组件
// 全局组件对象
const allGloablComponents: any = { SvgIcon, Pagination };

export default {
  install(app: any) {
    // 使用Object.keys取出数组中的对象的key
    Object.keys(allGloablComponents).forEach((key) => {
      app.component(key, allGloablComponents[key]);
    });
    
    // 全局注册icon组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};

// 路由鉴权的文件（项目中路由能不能被访问的权限设置）
import router from "@/router/index";
import setting from "./setting";
import nprogress from "nprogress"; // js插件没有定义ts类型，所以报错
import "nprogress/nprogress.css";
// 在组件外部同步是获取不到pinia仓库的：需要引入大仓库
import useUserStore from "./store/modules/user";
import pinia from "./store";
let userStore = useUserStore(pinia); // useUserStore(pinia)手动创建pinia实例
// 路由全局守卫
// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  nprogress.start();
  let token = userStore.token;
  let name = userStore.name;
  // 路由需要访问权限
  if (token) {
    // 登录成功后就不能访问login了
    if (to.path === "/login") {
      next(from.path);
    } else {
      // 有用户信息就放行，没有就发请求再放行
      if (name) {
        next();
      } else {
        try {
          await userStore.getUserInfo();
          next();
        } catch (error) {
          // token过期或者token错误（手动修改）
          console.log("token过期或者token错误（手动修改）");
          userStore.useLogout(); // 相当于退出登录
          next({
            path: "/login",
            query: {
              redirect: to.path,
            },
          });
        }
      }
    }
    // 没有token就返回登录
  } else {
    // 是否是需要访问权限的路由
    if (!to.meta.requiresAuth) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.path,
        },
      });
    }
  }
});

// 路由后置守卫
router.afterEach((to, from, next) => {
  // 设置页面的dom的标题为路由标题和平台名称结合， document.title是用来获取HTML文档标题的属性
  document.title = `${setting.title}-${to.meta.title}`;
  nprogress.done();
});

// 第一个问题：实现进度条 --nprogress
// 第二个问题：路由鉴权

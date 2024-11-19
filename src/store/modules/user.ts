// 创建用户相关的小仓库
import { defineStore } from "pinia";
import { reqUserLogin, reqUserInfo, reqLogout } from "@/api/user/user";
import type { loginForm, loginResponse, uerResponse } from "@/api/user/type";
import type { UserState } from "./types/type"; // 引入仓库数据类型
import { SET_TOKEN, GET_TOKEN, RENOVE_TOKEN } from "@/utils/token"; // 引入操作本地存储的工具的方法
import { routes } from "@/router/routes"; // 引入菜单要挂载的路由
let useUserStore = defineStore("user", {
  // 小仓库：存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 为什么token要放在pinia中呢
      menuRoutes: routes, // 仓库存储菜单的路由
      name: "",
      avatar: "",
    };
  },
  // 异步|逻辑的地方
  actions: {
    // 用户登录的方法
    async userLogin(loginForm: loginForm) {
      let res: loginResponse = await reqUserLogin(loginForm);
      if (res.code == 200) {
        // 存储token（用于指定用户唯一标识）
        // 由于pinia|Vuex村粗数据其利用js对象，需要本地持久存储
        this.token = res.data as string; // 断言的意义在于：保证res.data.token是string类型的时候再赋值给它
        SET_TOKEN(res.data as string);
        // 返回成功信息
        return "ok";
      } else {
        // 返回失败，提示失败信息，处理业务码的失败信息
        return Promise.reject(new Error(res.data)); // promise
      }
    },

    // 获取用户信息的回调
    async getUserInfo() {
      let res: uerResponse = await reqUserInfo(this.token as string);
      if (res.code === 200) {
        const { avatar, name } = res.data;
        this.name = name;
        this.avatar = avatar;
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },

    // 退出登录的回调(1、发请求通知后端清除token，2、清除仓库数据)
    async useLogout() {
      let res = await reqLogout();
      if (res.code === 200) {
        // 退出成功清除用户信息
        this.name = "";
        this.avatar = "";
        this.token = "";
        RENOVE_TOKEN();
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
  },
  // 计算属性
  getters: {},
});
export default useUserStore;

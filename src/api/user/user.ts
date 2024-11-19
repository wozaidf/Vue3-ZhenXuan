import axiosIstance from "../../utils/request";
import type { loginForm, loginResponse, uerResponse,logoutResponse } from "./type";
// 放置user相关的api

// enum用于定义枚举类型数据,这里定义API枚举用于统一管理API地址
enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout"
}

// 暴露请求函数
// 用户登录的接口
export function reqUserLogin(data: loginForm) {
  return axiosIstance<loginForm,loginResponse>({
    // <any,any>定义请求参数类型和返回数据的类型
    url: API.LOGIN_URL,
    method: "post",
    data,
  });
}

// 获取用户信息的接口
export const reqUserInfo = function (token: string) {
  return axiosIstance<string,uerResponse>({
    url: API.USERINFO_URL,
    method: "get",
    headers: {
      // authorization: `Bearer ${token}`, // authorization记得小写（正规写法）
        token, // 简单写法
    },
  });
};

// 用户退出登录的接口
export function reqLogout(){
  return axiosIstance<any,logoutResponse>({
    url:API.LOGOUT_URL,
    method:"post",
  })
}
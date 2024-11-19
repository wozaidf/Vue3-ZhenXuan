// 定义全部接口返回数据的基础的ts类型
interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 登录接口需要的ts类型
// 登录请求的数据类型
export interface loginForm {
  username: string;
  password: string;
}
// 登录返回数据类型
export interface loginResponse extends ResponseData {
  data: string;
}

// 获取用户信息接口需要的ts类型
// 获取用户信息返回的数据类型
export interface uerResponse extends ResponseData {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}

// 用户退出登录接口需要的ts类型
// 退出接口返回数据类型
export interface logoutResponse extends ResponseData {
  data: null;
}

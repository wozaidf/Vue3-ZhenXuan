// 封装本地存储数据与读取数据的方法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem("token", token);
};

// 本地存储获取数据
export const GET_TOKEN = () => {
  return localStorage.getItem("token");
};

// 清除本地存储的token
export const RENOVE_TOKEN = () => {
  return localStorage.removeItem("token")
};

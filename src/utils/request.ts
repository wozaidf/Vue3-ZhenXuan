// 进行axios二次封装，使用它的请求和拦截器
import axios from "axios";
import { ElMessage } from "element-plus";
// 创建axios实例对象优点：可以配置其他配置（基础路径baseUrl、timeOut）
// import.meta.env获取全局变量
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径上携带/api
  timeout: 5000,
});

// 设置拦截器(请求和响应 拦截器)
// 使用请求拦截器
axiosInstance.interceptors.request.use((config) => {
  // config配置对象有headers属性请求头，经常给服务器携带公共参数
  // 返回配置对象
  return config;
});

// 使用响应拦截器(有两个回调函数，一个是成功，一个是失败)
axiosInstance.interceptors.response.use(
  (response) => {
    // 成功回调
    return response.data; // 简化数据
  },
  (error) => {
    // 失败的回调：处理http网路错误
    // 定义一个变量：存储网路错误信息
    let message = "";
    // http状态码
    let status = error.response.status;
    switch (status) {
      case 401:
        message = "TOKEN过期";
        break;
      case 403:
        message = "无权访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器出现问题";
        break;
      default:
        message = "网络出现问题";
        break;
    }
    // 提示信息
    ElMessage({
      message,
      type: 'error',
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;

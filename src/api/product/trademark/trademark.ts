// trademark路由相关的接口
import axiosInstance from "@/utils/request";
import type {
  TrademarkResponse,
  Trademark,
  AddUpdateRemoveTrademarkResponse,
} from "./type";
// trademark品牌相关接口
enum API {
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  TRADEMARK_SAVE_URL = "/admin/product/baseTrademark/save",
  TRADEMARK_UPDATE_URL = "/admin/product/baseTrademark/update",
  TRADEMARK_REMOVE_URL = "/admin/product/baseTrademark/remove/",
}

// 获取品牌列表数的接口
export function reqHasTrademark(page: number, limit: number) {
  return axiosInstance<any, TrademarkResponse>({
    url: API.TRADEMARK_URL + `${page}/${limit}`,
    method: "get",
  });
}

// 新增和修改的请求接口方法
export function reqAddUpdateTrademark(data: Trademark) {
  // 有id就是修改回调
  if (data.id) {
    return axiosInstance<any, AddUpdateRemoveTrademarkResponse>({
      url: API.TRADEMARK_UPDATE_URL,
      method: "put",
      data,
    });
  } else {
    return axiosInstance<any, AddUpdateRemoveTrademarkResponse>({
      url: API.TRADEMARK_SAVE_URL,
      method: "post",
      data,
    });
  }
}

// 删除品牌的请求接口
export function reqRemoveTrademark(id: number) {
  return axiosInstance<any, any>({
    url: API.TRADEMARK_REMOVE_URL + id,
    method: "delete",
  });
}

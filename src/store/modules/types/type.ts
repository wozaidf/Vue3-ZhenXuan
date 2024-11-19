// 定义小仓库数据state类型
import type { RouteRecordRaw } from "vue-router"; // 路由对象的ts类型
import type {trademarkListData} from "@/api/product/trademark/type"
// 用户仓库
export interface UserState {
  token: string | null; // token在没有用户时候是为空的
  menuRoutes: RouteRecordRaw[];
  name: string;
  avatar: string;
}
// setting仓库
export interface layoutSettingState {
  isExpand: boolean;
  isCollapse: boolean;
  refresh: boolean;
}

// trademark仓库
export interface trademarkState{
  trademarkList:trademarkListData
}

// trademark路由相关的接口参数和返回数据ts类型
// 获取tradmemark品牌列表的接口
interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 获取分页列表的返回的数据ts类型
// 品牌列表的单个品牌的信息（可以作为新增提交表单）
export interface Trademark {
  id?: number;
  logoUrl: string;
  tmName: string;
}

// trademark返回的Records数组
export type Records = Trademark[]; // 给Trademark[]起别名为Records

// trademark获取品牌列表返回的所有数据类型
export interface TrademarkResponse extends ResponseData {
  data: {
    current: number;
    pages: number;
    records: Records;
    searchCount: boolean;
    size: number;
    total: number;
  };
}


// 新增修改品牌的接口的ts类型
// 请求返回的数据类型
export interface AddUpdateRemoveTrademarkResponse extends ResponseData {
  data: null;
}


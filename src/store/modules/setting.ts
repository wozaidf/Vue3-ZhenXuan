// 小仓库：layout组件相关的配置仓库
import { defineStore } from "pinia";
import { layoutSettingState } from "./types/type";
let useLayoutSettingStore = defineStore("SettingStore",{
    state(): layoutSettingState  {
    return {
      isExpand: true, // 用户控制菜单扩展还是收缩
      isCollapse:false, // 控制el-menu收缩的字段
      refresh:false,
    };
  },
});

export default useLayoutSettingStore;

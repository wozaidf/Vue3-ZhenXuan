<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
            <div :class="{ fold: isExpand ? false : true }">
                <!-- 展示菜单 -->
                <el-scrollbar class="scrollbar">
                    <!-- 菜单组件 -->
                    <el-menu :router="true" :default-active="$route.path" :collapse="isCollapse">
                        <!-- :default-active="$route.path"刷新时通过路由信息高亮激活并展开菜单 -->
                        <Menu :menuList="userStore.menuRoutes"></Menu>
                    </el-menu>
                </el-scrollbar>
            </div>
        </div>
        <!-- 顶部与导航 -->
        <div class="layout_tabbar" :class="{ fold: isExpand ? false : true }">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区 -->
        <div class="layout_main" :class="{ fold: isExpand ? false : true }">
            <Main></Main>
        </div>
    </div>
</template>

<script lang="ts" setup name="layout">
import Logo from "./logo/index.vue"
import Menu from "./menu/index.vue"
import Main from "./main/index.vue"
import Tabbar from "./tabbar/index.vue"
import { storeToRefs } from "pinia"
import { useRoute } from "vue-router";
import useUserStore from "@/store/modules/user"
import useLayoutSettingStore from "@/store/modules/setting"
// 获取layout相关配置仓库
let layoutSettingStore = useLayoutSettingStore()
// 1、获取tabbar组件点击icon的切换的字段，（用于修正菜单、顶部导航和主要展示区域的样式）
// 2、获取折叠展开el-menu的属性字段
let { isExpand, isCollapse } = storeToRefs(layoutSettingStore)



// 获取用户相关的小仓库，1、将当前路由地址传给Menu组件用于激活默认样式，2、将仓库中路由数组传给子组件Menu
let userStore = useUserStore()
let $route = useRoute()

</script>

<style lang="scss" scoped>
.layout_container {
    width: 100vw;
    height: 100vh;
}

/* 左侧导航 */
.layout_slider {
    width: $base-menu-width;
    height: 100%;
    background-color: $base-menu-background-color;
    transition: all 0.3s;

    // background: linear-gradient(to bottom, red, yellow);
    .scrollbar {
        width: 100%;
        height: calc(100vh - $base-menu-logo-height); // 滚动区域高度

        .el-menu {
            border-right: none;
        }
    }
    .fold {
        width: $base-menu-fold-width;
    }
}




/* 顶部导航 */
.layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;
    top: 0;
    right: 0px;

    // 使用父选择器，与父选择器layout_tabbar是同级别
    &.fold {
        width: calc(100vw - $base-menu-fold-width)
    }
}

/* 内容展示 */
.layout_main {
    position: fixed;
    height: calc(100% - $base-tabbar-height);
    width: calc(100% - $base-menu-width);
    top: $base-tabbar-height;
    right: 0px;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
        width: calc(100vw - $base-menu-fold-width)
    }
}
</style>

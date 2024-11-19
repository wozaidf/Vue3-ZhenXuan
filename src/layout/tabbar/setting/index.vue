<template>
    <div class="tabbar-right">
        <el-button size="small" icon="Refresh" circle @click="updateRefresh"> </el-button>
        <el-button size="small" icon="FullScreen" circle @click="fullScreen"> </el-button>
        <el-button size="small" icon="Setting" circle> </el-button>
        <img :src="userStore.avatar" alt="" style="width: 24px;height: 24px; margin: 0 10px;border-radius: 50%;">
        <!-- 下拉菜单 -->
        <el-dropdown>
            <span class="el-dropdown-link" style="display: flex;">
                {{ userStore.username }}
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts" setup name="setting">
import useLayoutSettingStore from "@/store/modules/setting"
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from "vue-router";
import {ElMessage} from "element-plus"
let $router = useRouter()
let $route = useRoute()

// 刷新按钮的回调
let layoutSettingStore = useLayoutSettingStore()
const updateRefresh = function () {
    layoutSettingStore.refresh = true
}

// 全屏模式的回调，document.fullscreenElement用来判断是否是全屏，返回（true | null）
const fullScreen = function () {
    if (!document.fullscreenElement) {
        // 切换全屏模式，document.documentElement获取当前html元素，requestFullscreen标识全屏
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}

// 获取用户的个人信息
let userStore = useUserStore()

// 退出登录，1、要发请求（告诉本次token已经失效） 2、仓库中关于用户的信息要清楚 3、跳转登录页面
const logout = async function () {
    // 清楚仓库中相关数据，利用仓库中的方法
    try {
        await userStore.useLogout()
        // 回到登录路由
        $router.push({
            path: "/login",
            query: {
                redirect: $route.path
            }
        })
    } catch (error) {
        ElMessage({
            type:"error",
            message:error.message
        })
    }

}


</script>

<style scoped>
.tabbar-right {
    display: flex;
    margin-right: 20px;

    .el-dropdown-link {
        align-items: center;
        cursor: pointer;
    }
}
</style>
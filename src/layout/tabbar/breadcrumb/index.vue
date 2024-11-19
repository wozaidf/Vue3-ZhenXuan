<template>
    <div class="tabbar-left">
        <el-icon @click="expandFoldClick" style="cursor: pointer ">
            <component :is="isExpand ? 'Fold' : 'Expand'"></component>
        </el-icon>
        <el-breadcrumb separator-icon="ArrowRight" style="margin-left: 10px;">
            <el-breadcrumb-item v-for="levelRouteItem in $route.matched" :key="levelRouteItem.path"
                :to="`${levelRouteItem.path}`" v-show="levelRouteItem.meta.title">
                <!-- 面包屑展示匹配路由的标题 -->
                <el-icon style="margin-right: 2px;vertical-align: middle; ">
                    <component :is="levelRouteItem.meta.icon"></component>
                </el-icon>
                <span style="vertical-align: middle;">{{ levelRouteItem.meta.title }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts" setup name="breadcrumb">
import useLayoutSettingStore from '@/store/modules/setting';
import { storeToRefs } from "pinia"
import { useRoute } from "vue-router"
let $route = useRoute()
// 过滤出面包屑的数组（过滤掉不显示面包屑的路由，在路由meta添加新字段来判断）这是一种方法 或着使用v-show

// 获取setting仓库的数据
let layoutSettingStore = useLayoutSettingStore()
let { isExpand, isCollapse } = storeToRefs(layoutSettingStore)

// 折叠/展开的icon点击的回调
const expandFoldClick = function () {
    if (isExpand.value) {
        // 菜单展开
        isExpand.value = false
        isCollapse.value = true
    } else {
        // 菜单折叠
        isExpand.value = true
        isCollapse.value = false
    }
}
</script>

<style scoped>
.tabbar-left {
    display: flex;
    margin-left: 20px;

}
</style>
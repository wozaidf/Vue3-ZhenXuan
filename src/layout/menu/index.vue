<template>
    <!-- 动态生成菜单：根据项目路由展示菜单项 -->
    <!--  -->
    <!-- <el-menu v-for="item in menuList" :key="item.path" class="menu" :default-active="routePath" > </el-menu> -->
    <template v-for="item in menuList" :key="item.path" class="menu">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item v-if="!item.meta.hidden" :index="item.path" >
                <!-- <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute"
            :style="{ marginLeft: level + 'px' }"  > -->
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有子路由，但只有一个 -->
        <template v-if="item.children && item.children.length == 1">
            <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path" >
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有子路由，且大于一个 -->
        <template v-if="item.children && item.children.length > 1">
            <el-sub-menu v-if="!item.meta.hidden" :index="item.path" class="el-sub-menu">
                <template #title>
                    <!-- 一级路由标题 -->
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <!-- 将一级路由的children递归过去，将下两级的子菜单路由的缩进数据也传递过去 -->
                <Menu :menuList="item.children"></Menu>
                <!-- <Menu :menuList="item.children" :level="20" :routePath="route.path"></Menu> -->
            </el-sub-menu>
        </template>
        <template> v-for="item in menuList" :key="item.path" class="menu"
        </template>
    </template>
</template>

<script lang="ts">
export default {
    name: "Menu"
}
</script>

<script lang="ts" setup name="Menu">

// 获取父组件layout的全部路由组件
defineProps(["menuList", "level", "routePath"])

// 进行路由跳转
// const goRoute = function (vc: any) {
//     $router.push(vc.index)
//     console.log(vc);
// }
</script>

<style scoped>
.elsubmenu {
    /* 递归menu组件的时候没有将下拉首行缩进的样式传到下一层组件中 */
    margin-left: 20px;
}
</style>
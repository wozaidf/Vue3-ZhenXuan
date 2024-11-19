<template>
    <div class="tabbar">
        <Breadcrumb></Breadcrumb>
        <Setting></Setting>
    </div>
</template>

<script lang="ts" setup name="tabbar">
import Breadcrumb from "./breadcrumb/index.vue"
import Setting from "./setting/index.vue"
</script>

<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to right, white, rgb(211, 177, 211), rgb(223, 215, 205));
}
</style>
<template>
  <!-- 路由组件出口的位置 -->
  <!-- v-slot是插槽将要展示的路由组件注入进来 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="!refresh" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup name="main">
import useLayoutSettingStore from "@/store/modules/setting"
import { storeToRefs } from "pinia";
import { watch, nextTick } from "vue"
let layoutSettingStore = useLayoutSettingStore()
let { refresh } = storeToRefs(layoutSettingStore)


// 监视仓库中的刷新字段的变化
watch(refresh, () => {
  // 当前dom收到仓库数据的影响发生改变，nextTick会等待dom更新完再执行
  nextTick(() => {
    refresh.value = false
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0);

}

.fade-leave-to {
  opacity: 0;
  transform: scale(1);

}
</style>
<script setup lang="ts">
import Menu from '@/components/admin/memu.vue'
import Navbar from '@/components/admin/navbar.vue'
import HistoryLink from '@/components/admin/historylink.vue'
import { RouterView, useRoute } from 'vue-router'
import { menuStore } from '@/store/menuStore'
import { Transition, watch } from 'vue'

menuStore().init()

const route = useRoute()
watch(
  route,
  () => {
    menuStore().addHistoryMenu(route)
  },
  { immediate: true },
)
</script>

<template>
  <div class="admin grid grid-cols-[auto_1fr] h-screen w-screen">
    <!-- 菜单 -->
    <Menu />
    <div class="content bg-gray-200 gird grid-rows-[auto_1fr]">
      <div>
        <!-- 面包屑 -->
        <Navbar />
        <!-- 历史链接 -->
        <HistoryLink />
      </div>
      <div class="md:m-3 rounded-md relative md:h-[80%] h-[91%] overflow-y-auto">
        <RouterView #default="{ Component, route }">
          <!-- 可以进行添加动画的 -->
          <Transition
            mode=""
            class="animate__animated"
            :enter-active-class="route.meta.animation?.in ?? 'animate__fadeInRight'"
            :leave-active-class="route.meta.animation?.out ?? 'animate__fadeOutLeft'">
            <component :is="Component" class="absolute w-full"></component>
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.animate__fadeInRight {
  animation-duration: 0.5s; /* don't forget to set a duration! */
}
.animate__fadeOutLeft {
  animation-duration: 0.5s; /* don't forget to set a duration! */
}
</style>
<script lang="ts">
export default {
  router: { meta: { auth: true } },
}
</script>

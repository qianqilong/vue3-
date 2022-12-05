<script setup lang="ts">
import { menuStore } from '@/store/menuStore'

const { historyMenus, removeHistoryMenu } = menuStore()

/**删除历史菜单 */
function deleteMenu(imemu?: IMenu) {
  removeHistoryMenu(imemu)
}
</script>

<template>
  <div class="hidden md:block p-3 border-t border-b bg-gray-50" v-show="historyMenus.length">
    <div class="grid grid-flow-col gap-2 justify-start">
      <router-link
        :to="{ name: item?.route }"
        v-for="item of historyMenus"
        class="border rounded-sm py-2 px-3 text-sm cursor-pointer duration-300 bg-white text-gray-600 hover:bg-violet-500 hover:text-white"
        :class="{ active: $route.name === item?.route }"
        >{{ item?.title }}
        <i class="fas fa-xmark ml-1 hover:text-yellow-300" @click.prevent="deleteMenu(item)"></i>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.active {
  @apply bg-violet-700 text-white;
}
</style>

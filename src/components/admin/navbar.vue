<script setup lang="ts">
import { userStore } from '@/store/userStore'
import { logout } from '@/utils'
import { menuStore } from '@/store/menuStore'

const store = menuStore()

const infostore = userStore()
</script>

<template>
  <div class="bg-white p-4 flex justify-between items-center">
    <div class="flex items-center">
      <i
        class="fas fa-align-left mr-2 text-gray-600 cursor-pointer"
        v-if="store.close"
        @click="store.checkoutClose(false)"></i>
      <i class="fas fa-align-right mr-2 text-gray-600 cursor-pointer" v-else @click="store.checkoutClose(true)"></i>
      <!-- 面包屑 -->
      <crumbs class="md:block hidden" />
    </div>

    <!-- 个人 -->
    <div class="flex items-center relative cursor-pointer mr-3">
      <notice />
      <div class="group flex justify-center items-center relative cursor-pointer mr-3">
        <img :src="infostore.info?.avatar" class="w-8 h-8 rounded-full object-cover" />
        <span class="ml-1 text-xs text-gray-600">{{ infostore.info?.name }}</span>
        <section
          class="group-hover:block absolute top-full items-center z-10 bg-white shadow-sm px-3 whitespace-nowrap border rounded-md hidden">
          <div class="ql-menu">
            <a class="fas fa-folder-open"></a>
            <span class="span">文档资料</span>
          </div>
          <div class="ql-menu">
            <a class="fas fa-home"></a>
            <span class="span">网站首页</span>
          </div>
          <div class="ql-menu" @click="logout()">
            <a class="fas fa-sign-out-alt"></a>
            <span class="span">退出登录</span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ql-menu {
  @apply flex items-center border-b py-3;
  .span {
    @apply text-xs text-gray-600 ml-2;
  }
}
</style>

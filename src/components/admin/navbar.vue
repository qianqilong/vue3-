<!--
 * @Author: 1959377950 1959377950@qq.com
 * @Date: 2022-11-28 20:19:00
 * @LastEditors: 1959377950 1959377950@qq.com
 * @LastEditTime: 2022-12-03 15:02:16
 * @FilePath: \Vue\src\components\admin\navbar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { userStore } from '@/store/userStore'
import { logout } from '@/utils'
import { menuStore } from '@/store/menuStore'

const store = menuStore()

const { info } = userStore()
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
        <img :src="info?.avatar" class="w-8 h-8 rounded-full object-cover" />
        <span class="ml-1 text-xs text-gray-600">{{ info?.name }}</span>
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

<script setup lang="ts"></script>

<template>
  <div class="h-screen w-screen bg-gray-700 flex flex-col justify-center items-center">
    <img src="/image/avatar.jpg" alt="" class="w-40 h-40 object-cover rounded-full border-8 border-white mb-5" />
    <div>
      <RouterLink to="/admin/home" class="ql-btn">后台管理</RouterLink>
      <RouterLink to="/auth/login" class="ql-btn ml-3 !bg-fuchsia-700">用户登录</RouterLink>
    </div>
    <div class="text-gray-300 text-sm font-mono drop-shadow-md mt-3">SurpriseNovel后台管理系统</div>
  </div>
  <RouterView></RouterView>
</template>

<style lang="scss" scoped>
.ql-btn {
  @apply bg-violet-800 text-white p-2 rounded-md hover:bg-violet-600 duration-300;
}
</style>

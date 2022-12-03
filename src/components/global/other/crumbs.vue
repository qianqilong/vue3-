<script setup lang="ts">
import { menuStore } from '@/store/menuStore'

const store = menuStore()
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item to="/admin">首页</el-breadcrumb-item>

    <template v-if="store.route?.matched.length && !$route.path.includes('admin')">
      <el-breadcrumb-item :to="store.route.path" v-for="(item, index) in store.route?.matched" :key="index">{{
        item.meta.menu?.title
      }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<style scoped lang="scss"></style>

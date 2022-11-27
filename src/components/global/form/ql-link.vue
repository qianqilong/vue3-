<script setup lang="ts"></script>

<template>
  <a href="" class="lg-a">
    <slot></slot>
  </a>
</template>

<style scoped lang="scss">
.lg-a {
  @apply text-xs text-gray-700 hover:text-violet-700;
}
</style>

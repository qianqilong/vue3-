<script setup lang="ts"></script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style>
.toastui-editor-mode-switch {
  display: none !important;
}
.fullscreen {
  position: fixed !important;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: #fff;
}
.w-e-toolbar {
  z-index: 1 !important;
}
.w-e-menu {
  z-index: 2 !important;
}
.w-e-text-container {
  z-index: 1 !important;
}
</style>

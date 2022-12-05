<script setup lang="ts"></script>

<template>
  <RouterView />
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
</style>

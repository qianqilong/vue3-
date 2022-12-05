<script setup lang="ts">
import wangEditor from '@/components/editor/wangEditor/editor.vue'
import { ref } from 'vue'

const content = ref('')
</script>

<template>
  <div>
    <wangEditor v-model="content" />
    <div>{{ content }}</div>
  </div>
</template>

<style scoped lang="scss"></style>

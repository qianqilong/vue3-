<script setup lang="ts">
import Markdown from '@/components/editor/markdown/editor.vue'
import { ref } from 'vue'

const content = ref('')
</script>

<template>
  <div>
    <Markdown v-model="content" :height="80" />
    {{ content }}
  </div>
</template>

<style scoped lang="scss"></style>

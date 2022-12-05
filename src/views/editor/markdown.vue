<script setup lang="ts">
import Markdown from '@/components/editor/markdown/meditor.vue'
import { ref } from 'vue'

const content = ref('')
</script>

<template>
  <div>
    <meditor v-model="content" :height="80" />
    {{ content }}
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { ref } from 'vue'

const content = ref('')
</script>

<template>
  <div>
    <weditor v-model="content" />
    <div>{{ content }}</div>
  </div>
</template>

<style scoped lang="scss"></style>

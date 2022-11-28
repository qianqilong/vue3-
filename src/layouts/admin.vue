<script setup lang="ts"></script>

<template>
  <div>admin</div>
  <RouterView></RouterView>
</template>

<style scoped></style>
<script lang="ts">
export default {
  router: { meta: { auth: true } },
}
</script>

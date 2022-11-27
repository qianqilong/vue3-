<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  modelValue: string
  placeholder: string
  error?: string
  type?: string
}
interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  error: '',
})
const emit = defineEmits<Emits>()

const value = computed({
  set(v: string) {
    emit('update:modelValue', v)
  },
  get() {
    return props.modelValue
  },
})
</script>

<template>
  <div>
    <input :type="type ? type : 'text'" class="input" v-model="value" :placeholder="placeholder" />
    <p class="rounded-md bg-pink-500 text-white text-xs px-2 mt-2 py-1" v-if="error !== ''">{{ error }}</p>
  </div>
</template>

<style scoped lang="scss">
.input {
  @apply outline-none rounded-sm py-1 px-2 border w-full ring-offset-2 ring-violet-600 duration-300 placeholder:text-sm focus:ring-2 focus:border-white;
}
</style>

<script setup lang="ts">
import { nextTick } from 'vue'
import wangEditor from './wangEditor'

interface Props {
  /**高度 */
  height?: number
  /**初始值 */
  modelValue?: string
  /**上传图片地址 */
  uploadAddr?: string
}
interface Emits {
  (e: 'update:modelValue', data: string): void
}
const props = withDefaults(defineProps<Props>(), {
  height: 400,
  modelValue: '',
  uploadAddr: '/api/upload/image',
})
const emit = defineEmits<Emits>()
nextTick(() => {
  new wangEditor('#wang', props, (newValue: string) => {
    emit('update:modelValue', newValue)
  })
})
</script>

<template>
  <div id="wang"></div>
</template>

<style scoped lang="scss">

</style>

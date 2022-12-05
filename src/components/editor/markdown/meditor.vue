<script setup lang="ts">
import { nextTick } from 'vue'
import ToastEdit from './toastEdit'

interface Props {
  /**定义了高度 */
  height?: number
  /**定义内容 */
  modelValue?: string
}
interface Emits {
  /**更新父组件中的内容  */
  (e: 'update:modelValue', value: string): void
}
const props = withDefaults(defineProps<Props>(), {
  height: 80,
  modelValue: '',
})
const emit = defineEmits<Emits>()

nextTick(() => {
  const toastUi = new ToastEdit('#editor', props.modelValue, `${props.height > 100 ? 100 : props.height}vh`)
  toastUi.editor.on('change', (type: string) => {
    // emit('update:modelValue', toastUi.editor[type === 'markdown' ? 'getMarkdown' : 'getHTML']())
    emit('update:modelValue', toastUi.editor.getHTML())
  })
})
</script>

<template>
  <div id="editor"></div>
</template>

<style scoped lang="scss">
// @import 'https://uicdn.toast.com/editor/latest/toastui-editor.min.css';
#editor {
  background-color: white;
}
</style>

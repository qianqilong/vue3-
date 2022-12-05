<script setup lang="ts">
import gsap from 'gsap'

interface Props {
  /**上一级标签 */
  tag?: string
  /**加载时间 */
  duration?: number
  /**延迟时间 */
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  tag: '',
  duration: 1,
  delay: 1,
})
const index = ref(props.delay)
/**进入动画之前 */
function beforeEnter(el: any) {
  gsap.set(el, {
    opacity: 0,
  })
}
/**进入动画 */
function enter(el: any) {
  gsap.to(el, {
    opacity: 1,
    duration: props.duration,
    delay: index.value++ * 0.2,
  })
}
</script>

<template>
  <div class="animate-list">
    <TransitionGroup appear :tag="tag" name="qlanimate" @enter="enter" @before-enter="beforeEnter">
      <slot />
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
.animate-list {
  position: relative;
}
:global(.qlanimate-leave-active) {
  transition: all 1s ease;
  position: absolute;
  width: 100%;
}

:global(.qlanimate-leave-to) {
  opacity: 0 !important;
}
:global(.qlanimate-move) {
  transition: all 1s ease;
}
</style>

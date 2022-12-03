<!--
 * @Author: 1959377950 1959377950@qq.com
 * @Date: 2022-12-03 10:23:19
 * @LastEditors: 1959377950 1959377950@qq.com
 * @LastEditTime: 2022-12-03 12:23:58
 * @FilePath: \Vue\src\components\global\other\notice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { nextTick, ref } from 'vue'

const activeName = ref('site')
const show = ref(false)
nextTick(() => {
  document.documentElement.addEventListener('click', (e) => {
    show.value = false
  })
})
</script>

<template>
  <div class="notice">
    <i class="fas fa-message" @click.stop="show = !show"></i>
    <el-tabs v-model="activeName" class="lists" v-show="show" @click.stop>
      <el-tab-pane label="系统通知" name="site">
        <a href="">文本（text），从词源上来说，它表示编</a>
        <a href="">文本（text），从词源上来说，它表示编</a>
        <a href="">文本（text），从词源上来说，它表示编</a>
        <a href="">文本（text），从词源上来说，它表示编</a>
      </el-tab-pane>
      <el-tab-pane label="站内通知" name="message"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.notice {
  @apply relative mr-5 text-sm;
  .lists {
    @apply absolute bg-white px-3 py-2 border rounded-md shadow-md right-[-20px] z-10 w-[190px]  md:w-[300px];
    a {
      @apply truncate overflow-hidden block border-b pb-2 my-2 hover:text-violet-600;
    }
  }
}
</style>

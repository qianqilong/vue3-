<script setup lang="ts">
import { articleAPI } from '@/apis/article'

const articles = ref()
articleAPI().then(({ data }) => {
  articles.value = data
})

/**删除的方法 */
function deleteFn(id: number) {
  const index = articles.value.findIndex((item: any) => item.id === id)
  articles.value.splice(index, 1)
}
</script>

<template>
  <div class="article">
    <animate-list tag="ul" :duration="1" :delay="1">
      <li :data-index="index" v-for="(item, index) in articles" :key="item.id" @click="deleteFn(item.id)">
        {{ item.title }}
      </li>
    </animate-list>
  </div>
</template>

<style scoped lang="scss">
ul {
  li {
    padding: 10px;
    margin-bottom: 20px;
    background-color: #8e44ad;
    color: white;
  }
}
// .animate-leave-active {
//   transition: all 1s ease;
//   position: absolute;
//   width: 100%;
// }

// .animate-leave-to {
//   opacity: 0 !important;
// }
// .animate-move {
//   transition: all 1s ease;
// }
</style>

<script setup lang="ts">
import { menuStore } from '@/store/menuStore'
import { useRouter } from 'vue-router'

const store = menuStore()
const router = useRouter()
/**
 * 重置所有菜单
 * @param state 1表示父级路由 2表示子级路由
 */
function resetMenus(state: number) {
  store.menus.forEach((item) => {
    if (state === 1) {
      item.isClick = false
    }
    item.children.forEach((item) => item && (item.isClick = false))
  })
}
/**
 * 点击主菜单，显示子菜单
 * @param pRoute子路由
 * @param cRoute父级路由
 */
function handle(Menu?: IMenu, cMenu?: Menu) {
  if (Menu) {
    resetMenus(1)
    Menu.isClick = true
  }
  if (cMenu) {
    // store.close = true
    resetMenus(2)
    cMenu.isClick = true
    router.push({
      name: cMenu.route,
    })
  }
}
/**点击首页 */
function handleHome() {
  router.push('/admin')
  // store.close = true
}
</script>

<template>
  <div>
    <div class="menu w-[200px] min-h-screen bg-gray-800 p-4" :class="{ close: store.close }">
      <!-- logo -->
      <div class="logo">
        <i class="fas fa-bolt-lightning mr-2 text-[30px] text-violet-500"></i>
        <span class="text-md text-white">SurpriseNovel</span>
      </div>
      <!-- 菜单 -->
      <div class="left-container">
        <dl v-for="(item, index) in store.menus" :key="index">
          <!-- 菜单标题 -->
          <dt @click="handle(item)">
            <section class="flex items-center" @click="item.title == '首页' && handleHome()">
              <i class="mr-2 text-xl" :class="item.icon"></i>

              <span class="text-md">{{ item.title }}</span>
            </section>
            <section v-if="item.title !== '首页'">
              <i class="fas fa-angle-down duration-300" :class="{ 'rotate-180': item.isClick }"></i>
            </section>
          </dt>
          <!-- 菜单内容-->
          <dd>
            <div
              v-show="item.isClick && !store.close"
              v-for="(sub, index) in item.children"
              :class="{ active: $route.name === sub.route }"
              :key="index"
              @click="handle(undefined, sub)">
              {{ sub.title }}
            </div>
          </dd>
        </dl>
      </div>
    </div>
    <div class="bg block md:hidden" @click="store.checkoutClose(true)" v-if="!store.close"></div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  .left-container {
    .logo {
      @apply text-gray-300 flex items-center;
    }
    dl {
      @apply text-gray-300 text-sm;

      dt {
        @apply text-sm mt-6 flex justify-between cursor-pointer items-center;
      }
      dd {
        div {
          @apply py-3 mt-2 pl-4 text-white rounded-md cursor-pointer duration-300 hover:bg-violet-500 bg-gray-700;
          &.active {
            @apply bg-violet-700;
          }
        }
      }
    }
  }
  /**关闭侧边栏的状态 */
  &.close {
    width: 70px;
    .logo {
      span {
        visibility: hidden;
      }
    }
    .left-container {
      dl {
        @apply relative;
        dt {
          section {
            span {
              @apply hidden;
            }
            &:nth-of-type(2) {
              @apply hidden;
            }
          }
        }

        &:hover {
          dd {
            @apply absolute  w-[150px] z-10;
            div {
              display: block !important ;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .menu {
    @apply h-full w-[200px] absolute left-0 top-0 z-40;
  }
  .bg {
    @apply bg-gray-500  opacity-75 h-screen w-screen absolute top-0 left-0 z-20;
  }
  .close {
    @apply hidden;
  }
}
</style>

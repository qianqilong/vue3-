<script setup lang="ts">
import { echart1, echart2 } from '@/utils/echart'
import { ElCard } from 'element-plus'
import { reactive, nextTick } from 'vue'
import * as echarts from 'echarts'

interface ICard {
  title: string
  price: number
  icon: string
  iconColor: string
  totalTitle: string
  total: number
}
// 数目
const cards: Array<ICard> = reactive([
  {
    title: '用户数',
    price: 13566,
    icon: 'fas fa-person-breastfeeding',
    iconColor: 'text-violet-500',
    totalTitle: '总人数',
    total: 12312,
  },
  {
    title: '销售额',
    price: 23566,
    icon: 'fas fa-coins',
    iconColor: 'text-green-500',
    totalTitle: '总销售额',
    total: 6432,
  },
  {
    title: '订单数',
    price: 32167,
    icon: 'fab fa-canadian-maple-leaf',
    iconColor: 'text-blue-500',
    totalTitle: '总订单数',
    total: 79876,
  },
  {
    title: '评论数',
    price: 54667,
    icon: 'fas fa-comment-dots',
    iconColor: 'text-red-500',
    totalTitle: '总评论数',
    total: 58643,
  },
])

// import * as echarts from 'echarts';

nextTick(() => {
  // 基于准备好的dom，初始化echarts实例
  echarts.init(document.getElementById('echart1') as any).setOption(echart1 as any)
  echarts.init(document.getElementById('echart2') as any).setOption(echart2 as any)
})
</script>

<template>
  <div>
    <div class="grid md:grid-cols-4 gap-3 bg-gray-200">
      <el-card
        shadow="hover"
        :key="total"
        :body-style="{ padding: '20px' }"
        v-for="{ title, price, icon, totalTitle, total, iconColor } of cards"
        class="cursor-pointer">
        <template #header>
          <div class="flex justify-between items-center text-sm">
            {{ title }}
            <!-- <el-tag type="danger" size="normal" effect="dark">月</el-tag> -->
            <span style="background: #f56c6c" class="px-[6px] py-[2px] rounded-md text-xs text-white">月</span>
          </div>
        </template>
        <section class="flex mt-2 justify-between items-center">
          <span class="text-xl">${{ price }}</span>
          <i class="text-2xl" :class="[icon, iconColor]"></i>
        </section>
        <section class="text-xs flex justify-between mt-3">
          {{ totalTitle }}
          <span class="text">{{ total }}</span>
        </section>
      </el-card>
    </div>
    <!-- 数据表 -->
    <div class="mt-5 grid md:grid-cols-2 gap-3">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <template #header>
          <div>用户统计</div>
        </template>
        <div id="echart1" class="h-72 w-full"></div>
      </el-card>
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <template #header>
          <div>销售额</div>
        </template>
        <div id="echart2" class="h-72 w-full"></div>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

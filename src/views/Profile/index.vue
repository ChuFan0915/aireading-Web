<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  router.push('/login')
}

const menuItems = [
  { label: '阅读统计', desc: '查看你的阅读数据' },
  { label: '阅读设置', desc: '字体、主题、翻页方式' },
  { label: '关于', desc: 'Novel Reader v0.1.0' }
]
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">我的</h1>

    <n-card class="!rounded-2xl">
      <div class="flex items-center gap-4">
        <n-avatar round size="large" color="#3f3f46">U</n-avatar>
        <div>
          <p class="text-base font-semibold">用户</p>
          <p class="text-sm text-neutral-500">user@example.com</p>
        </div>
      </div>
    </n-card>

    <n-list bordered>
      <n-list-item v-for="item in menuItems" :key="item.label">
        <div class="flex w-full items-center justify-between gap-3">
          <div>
            <p class="text-sm font-medium">{{ item.label }}</p>
            <p class="text-xs text-neutral-500">{{ item.desc }}</p>
          </div>
          <span class="text-neutral-400">›</span>
        </div>
      </n-list-item>
    </n-list>

    <n-button block secondary @click="handleLogout">退出登录</n-button>
  </div>
</template>

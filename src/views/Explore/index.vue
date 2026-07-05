<script setup lang="ts">
import { ref } from 'vue'

const categories = ['全部', '玄幻', '武侠', '科幻', '言情', '历史', '悬疑']
const activeCategory = ref('全部')
const searchText = ref('')
</script>

<template>
  <div class="space-y-6">
    <n-input v-model:value="searchText" size="large" round placeholder="搜索书名、作者">
      <template #prefix>🔎</template>
    </n-input>

    <div class="flex gap-2 overflow-x-auto pb-1">
      <n-tag
        v-for="cat in categories"
        :key="cat"
        round
        checkable
        :checked="activeCategory === cat"
        @update:checked="(checked:boolean) => checked && (activeCategory = cat)"
      >
        {{ cat }}
      </n-tag>
    </div>

    <n-card title="为你推荐" size="small">
      <n-empty description="暂无推荐内容" />
    </n-card>
  </div>
</template>

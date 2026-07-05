<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Props {
  mode?: 'desktop' | 'mobile'
}

withDefaults(defineProps<Props>(), {
  mode: 'mobile'
})

const route = useRoute()
const router = useRouter()

const tabs = [
  { name: 'bookshelf', label: '书架', icon: '📚' },
  { name: 'explore', label: '发现', icon: '🧭' },
  { name: 'profile', label: '我的', icon: '👤' }
]

const currentTab = computed(() => String(route.name ?? 'bookshelf'))

const navigate = (name: string) => {
  if (name !== currentTab.value) router.push({ name })
}
</script>

<template>
  <nav v-if="mode === 'desktop'" class="flex flex-col gap-2">
    <n-button
      v-for="tab in tabs"
      :key="tab.name"
      quaternary
      class="!justify-start !rounded-xl"
      :class="currentTab === tab.name ? '!bg-neutral-900 !text-white dark:!bg-neutral-100 dark:!text-neutral-900' : '!text-neutral-700 dark:!text-neutral-200'"
      @click="navigate(tab.name)"
    >
      <span class="mr-2">{{ tab.icon }}</span>
      <span>{{ tab.label }}</span>
    </n-button>
  </nav>

  <nav v-else class="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white/90 px-2 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 backdrop-blur dark:border-neutral-800 dark:bg-black/80">
    <div class="mx-auto grid max-w-xl grid-cols-3 gap-2">
      <n-button
        v-for="tab in tabs"
        :key="tab.name"
        quaternary
        class="!h-12 !rounded-xl"
        :class="currentTab === tab.name ? '!bg-neutral-900 !text-white dark:!bg-neutral-100 dark:!text-neutral-900' : '!text-neutral-700 dark:!text-neutral-200'"
        @click="navigate(tab.name)"
      >
        <div class="flex flex-col items-center text-xs">
          <span>{{ tab.icon }}</span>
          <span class="mt-0.5">{{ tab.label }}</span>
        </div>
      </n-button>
    </div>
  </nav>
</template>

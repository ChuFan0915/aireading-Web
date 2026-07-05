<script setup lang="ts">
import Header from './componts/Header.vue'
import Tapbar from './componts/Tapbar.vue'
</script>

<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
    <Header />

    <div class="mx-auto flex w-full">
      <aside class="sticky top-[61px] hidden h-[calc(100vh-61px)] w-56 shrink-0 border-r border-neutral-200 px-3 py-6 dark:border-neutral-800 lg:block">
        <Tapbar mode="desktop" />
      </aside>

      <main class="flex-1 !px-2.5 pb-24 sm:p-6 lg:pb-6">
        <router-view />
      </main>
    </div>

    <div class="lg:hidden">
      <Tapbar mode="mobile" />
    </div>
  </div>
</template>

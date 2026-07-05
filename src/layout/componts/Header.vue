<script setup lang="ts">
import {ref} from 'vue'
import {Search}  from '@vicons/ionicons5'
import SearchWeb from './SearchWeb.vue';
const active=ref<boolean>(false)
const ShowSearch=()=>{
  active.value=true
}

</script>

<template>
  <header class="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/85 backdrop-blur dark:border-neutral-800 dark:bg-black/70">
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
      <span class="text-lg font-semibold tracking-tight sm:text-xl">Novel Reader</span>
      <n-button quaternary  @click="ShowSearch">
        <template #icon>
         <n-icon>
           <Search/>
         </n-icon>
        </template>
        搜索</n-button>
    </div>
    <SearchWeb
    :isActive="active"
    @close="active=false"
    />
  </header>
</template>

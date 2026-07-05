<template >
    <!-- 整一个遮罩层 -->
    <div class="fixed z-10 bg-black/20 inset-0" @click="emit('close')">
        <div class="absolute right-0 top-0 h-full w-72 bg-white shadow-xl overflow-y-auto" @click.stop> 
            <!-- 渲染目录的盒子 -->
             <div class="flex items-center justify-between !px-4 h-12 border-b border-neutral-100">
                <span class="text-sm font-medium">目录</span>
                <n-button @click="emit('close')" >
                    x
                </n-button>
             </div>
              <ul !py-2>
                <li 
                v-for="(c,i) in chapters"
                class="!px-4 !py-4 text-sm cursor-pointer"
                :class="{
                    'bg-neutral-100 text-neutral-900 font-medium':i===currentIndex,
                    'text-neutral-500 hover:bg-neutral-50':i!==currentIndex
                }"
                @click="emit('jump',i)"
                >
                <span class="text-xs text-neutral-300 mr-2">{{ c.index }}</span>
                {{ c.title }}
            </li>
              </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Chapter } from '@/types';
defineProps<{
    chapters:Chapter[]
    currentIndex:number
}>()
// 定义子组件的接受类型
const emit=defineEmits<{
    close:[]
    jump:[index:number]
}>()

</script>
<style lang="">
    
</style>
<template >
   <div class="!px-10 items-center justify-center flex !py-10 overflow-y-auto">
    <article>
    <h1  class="text-center font-semibold mb-8 tracking-wider " :style="{fontSize:`${setting.fontSize+4}px`}">
        {{ chapter.title }}
    </h1>
     <!-- 正文内容 -->
    <div class="!mt-2.5" >
        <p
        v-for="(p,i) in paragraphs"
        :key="i"
        class="indent-8 leading-relaxed tracking-wide"
        >{{ p }}</p>
    </div>
   </article>
   </div>
</template>
<script setup lang="ts">
    import { computed,onMounted  } from 'vue';
    import type { Chapter,ReadinSettings } from '@/types';
    
    const props=defineProps<{
        chapter:Chapter
        setting:ReadinSettings
    }>()
    // 切割段落
    const paragraphs=computed(()=>props.chapter.content.split('\n').filter(p=>p.trim()))
    const getBackColor=()=>{
        console.log(props.setting);
        
    }
    onMounted(()=>
        getBackColor()
    )

</script>
<style lang="">
    
</style>
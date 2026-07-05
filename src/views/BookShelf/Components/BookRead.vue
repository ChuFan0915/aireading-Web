<template >
    <div class="fixed inset-0 z-50 flex flex-col w-full"  :class="{
         'bg-white text-neutral-900': setting.theme === 'light',
      'bg-neutral-950 text-neutral-100': setting.theme === 'dark',
      'bg-amber-50 text-amber-900': setting.theme === 'sepia',
       'bg-[#c7edcc] text-[#2f4f2f]': setting.theme==='green'
    }"> 
    <!-- 我估计有些时候px被覆盖了 -->
         <header class="flex items-center justify-between h-12 shrink-0 border-b border-neutral-200/50 !px-4"  >
      <button class="text-sm text-neutral-500 hover:text-neutral-900" @click="router.back()">
        ← 返回
      </button>
      <span class="text-xs text-neutral-400">{{ progress }}%</span>
      <div class="flex items-center gap-3">
        <n-button class="text-sm text-neutral-500 hover:text-neutral-900" @click="showChapterList= true">
          目录
        </n-button>
        <n-button class="text-sm text-neutral-500 hover:text-neutral-900" @click="showSetting = true">
          设置
        </n-button>
      </div>
    </header>
    <!-- 内容区 -->
    <main class="flex-1 overflow-y-auto px-6 py-8">
        <!-- 内容区 -->
         <div class="mx-auto" :style="{fontSize:`${setting.fontSize}px`,lineHeight:`${setting.lineHeight}px`}">
            <ChapterContent
                v-if="currentchapter"
                :chapter="currentchapter"
                :setting="setting"
            />
         </div>
    </main>
    <!-- 底部控制区 -->
    <div class=" flex gap-5 fixed bottom-10 !px-5 justify-between w-full" >
        <n-button @click="goprev">上一页</n-button>
        <n-button @click="goNext">下一页</n-button>
    </div>
    <!-- 底部的页码 -->
     <footer class="flex items-center justify-center h-10 shrink-0 border-t border-neutral-200/50">
        <span class="text-xs text-neutral-400">
            {{ currentIndex+1 }}
        </span>
     </footer>
     <ChapterList
     v-if="showChapterList"
     :chapters="bookDetail?.chapters??[]"
     :current-index="currentIndex"
     @close="showChapterList=false"
     @jump="jumpChapter"
     />
     <ReadingSetting
        v-if="showSetting"
        :setting="setting"
        :isActive="showSetting"
        @close="showSetting=false"
        @update-setting="updateSetting"
        />
    </div>
</template>
<script setup lang="ts">
    import { ref,onMounted,computed,onUnmounted} from 'vue';
    import { useRoute,useRouter } from 'vue-router';
    import { getBookDetail } from '@/utils/serves';
    import ChapterContent from './ChapterContent.vue';
    import ChapterList from './ChapterList.vue';
    import ReadingSetting from './ReadingSetting.vue';
    import type { BookDetail,ReadinSettings } from '@/types';
    const route=useRoute()
    const router=useRouter()
    const bookId=route.params.bookId as  string
    // 拿到路由地址的下的bookId
    const bookDetail=ref<BookDetail|null>(null)
    const currentIndex=ref(0)
    const showChapterList=ref(false)
    const showSetting=ref<boolean>(false)
    // 设置阅读状态
    const setting=ref<ReadinSettings>({
        fontSize:18,
        lineHeight:1.8,
        theme:'light',
        
    })
    // 当前的章节
    const currentchapter=computed(()=>bookDetail.value?.chapters[currentIndex.value])
    const updateSetting=(value:ReadinSettings)=>{
        // 通知该组件的seeting更新
        setting.value=value
    }
    onUnmounted(()=>{
        window.removeEventListener('keydown',OnKeydown)
    })
    // 阅读的进度
    const progress=computed(()=>bookDetail.value?Math.round((currentIndex.value/bookDetail.value.chapters.length)*100):0)
    // 翻页
    const goNext=()=>{
        if(bookDetail.value&&currentIndex.value<bookDetail.value.chapters.length-1){
            // 因为这儿的currentindex是从0开始计算的
            currentIndex.value++
        }
    }
    // 后退到上一页
    const goprev=()=>{
        if(currentIndex.value>0){
            currentIndex.value--
            // 防止减到负数,所以做一个判断
        }
    }
    // 跳转到指定的章节
    const jumpChapter=(index:number)=>{
        currentIndex.value=index
        showChapterList.value=false
    }
    // 通过左右来进行键盘事件
    const OnKeydown=(e:KeyboardEvent)=>{
        if(e.key==='ArrowLeft')goprev()//上一章
        if(e.key==='ArrowRight')goNext()//下一章
    }
    onMounted(async()=>{
        const res=await getBookDetail(bookId)
        bookDetail.value=res.data
        window.addEventListener('keydown',OnKeydown)
        
    })
</script>
<style scoped>
    
</style>
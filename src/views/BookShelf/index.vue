<script setup lang="ts">
import { uploadBook, getBookshelf } from '@/utils/serves'
import { gsap } from 'gsap'
import { computed, onMounted, ref } from 'vue'
import type { UploadCustomRequestOptions } from 'naive-ui'
import router from '@/router'
interface bookData {
  id:string
  bookId:string
  cover:string
}
const bookData = ref([])
// 当前页码的数据
const currentPage=ref<number>(0)
  // 当前的书
const handleFinish = async ({ file, onFinish }: UploadCustomRequestOptions) => {
  try {
    const formData = new FormData()
    formData.append('file', file.file as File)
    await uploadBook(formData)
    fetchData()
    onFinish()
  } catch (error) {
    console.error('上传失败', error)
  }
}

const fetchData = async () => {
  try {
    const res = await getBookshelf()
    bookData.value = res.data
  } catch (err) {
    console.log(err, '获取错误')
  }
}
const currentBook=computed<bookData[]>(()=>{
  return  bookData.value.slice(currentPage.value*8,currentPage.value*8+8)
})
onMounted(() => {
  fetchData()

})

const handleRead = (bookId: string) => {
  router.push(`/read/${bookId}`)
}
const handleSlider=()=>{
  if((currentPage.value+1)*8<bookData.value.length){
    currentPage.value++
  }else{
    currentPage.value=0
  }
}
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between  !px-8 gap-4 !py-2.5">
      <span class="text-6xl font-bold sm:text-4xl  whitespace-nowrap ">书架</span>
      <n-upload :custom-request="handleFinish" :show-file-list="false">
        <n-button>上传文件</n-button>
      </n-upload>
    </div>

    <div class="!px-5">
      <div class="bookshelf">
        <n-grid cols="2 s:2 l:4" responsive="screen" :x-gap="16" :y-gap="20">
          <n-grid-item v-for="(book) in currentBook" :key="book.id">
            <div
              class="book-3d"
              @click="handleRead(book.bookId)"
            >
              <div class="book-spine bg-center bg-contain bg-no-repeat" :style="{ backgroundImage:`url(${book.cover})`}">
    
              </div>
            </div>
          </n-grid-item>
        </n-grid>
        <n-button class="!mt-2.5" @click="handleSlider">换个口味</n-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ===== 书架容器 — Apple 浅橡木风格 ===== */
.bookshelf {
  background: linear-gradient(180deg, #f5e6d3 0%, #e8d5c4 50%, #dcc8b5 100%);
  border-radius: 12px;
  height: 560px;
  padding: 20px 16px 16px;
  position: relative;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.6),
    0 2px 12px rgba(0, 0, 0, 0.06),
    0 8px 24px rgba(0, 0, 0, 0.04);
}

/* 细腻木纹 */
.bookshelf::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 4px,
    rgba(139, 105, 60, 0.04) 4px,
    rgba(139, 105, 60, 0.04) 8px
  );
  border-radius: 12px;
  pointer-events: none;
}

/* ===== 搁板线 ===== */
.n-grid {
  position: relative;
}

.n-grid::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  height: 4px;
  background: linear-gradient(180deg, #c4b5a5, #b8a99a);
  border-radius: 2px;
}

/* ===== 3D 书容器 ===== */
.book-3d {
  position: relative;
  height: clamp(160px, 25vw, 220px);
  cursor: pointer;
  max-width: 150px;
}

/* ===== 书脊 ===== */
.book-spine {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    2px 2px 6px rgba(0, 0, 0, 0.15),
    inset -2px 0 4px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  will-change: transform, box-shadow;
}

/* 书脊顶部高光 */
.book-spine::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12), transparent);
  border-radius: 6px 6px 0 0;
  pointer-events: none;
}



/* ===== 底部阴影（书立在搁板上） ===== */
.book-3d::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 10%;
  width: 80%;
  height: 6px;
  background: rgba(0, 0, 0, 0.08);
  filter: blur(4px);
  border-radius: 50%;
  pointer-events: none;
  transition: all 0.3s ease;
}

/* hover 时底部阴影拉长（配合 GSAP 抽出效果） */
.book-3d:hover::after {
  width: 50%;
  left: 0;
  opacity: 0.5;
}

/* ===== 暗黑模式 ===== */
@media (prefers-color-scheme: dark) {
  .bookshelf {
    background: linear-gradient(180deg, #2c1810 0%, #3d2317 50%, #2c1810 100%);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 4px 20px rgba(0, 0, 0, 0.4);
  }

  .n-grid::after {
    background: linear-gradient(180deg, #4a3528, #3d2a1e);
  }

  .book-spine {
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.35), inset -2px 0 4px rgba(0, 0, 0, 0.2);
  }
}
</style>

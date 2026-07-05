<template >
    <div>
        <!-- 因为这儿的vue的v-model直接修改props不对,因为是props是只读的 -->
         <n-drawer :show="isActive" :height="200"  placement="bottom" @update:show="handleShow" >
    <n-drawer-content title="页面设置"  closable>
      <div class="flex gap-2.5">
        <span class="text-sm text-neutral-600  w-[30px]">大小</span>
      <n-slider 
      :value="setting.fontSize"
      :min="14"
      :max="28"
      @update:value="handleUpdatefont"
      />
      </div>
      <div class="flex gap-2.5">
        <span class="text-sm text-neutral-600">颜色</span>
        <n-tooltip placement="top" trigger="hover">
      <template #trigger>
        <div class="icons-container">
           <Moon class="icons" @click="updateColor('light')"/>
        </div>
       
      </template>
      <span> 夜晚</span>
    </n-tooltip>
    <n-tooltip placement="top" trigger="hover">
        <template #trigger>
           <div class="icons-container">
             <SunnySharp  class="icons" @click="updateColor('dark')"/>
           </div>
        </template>
        <span>日间</span>
    </n-tooltip>
    <n-tooltip placement="top" trigger="hover">
      <template #trigger>
        <BookOutline class="icons" @click="updateColor('sepia')"/>
      </template>
       <span>书皮</span>
    </n-tooltip>
    <n-tooltip placement="top" trigger="hover">
      <template #trigger>
      <EyeOffOutline class="icons" @click="updateColor('green')"/>
      </template>
      <span>护眼</span>
    </n-tooltip>
      </div>
    </n-drawer-content>
  </n-drawer>
    </div>
</template>
<script setup lang="ts">
import type { ReadinSettings } from '@/types';

import {
  SunnySharp,
  Moon,BookOutline,
  EyeOffOutline
} from '@vicons/ionicons5'
// 定义子组件的接收类型
const props = defineProps<{
  setting: ReadinSettings,
  isActive:boolean
}>()

const emit=defineEmits<{
    (e:'update-setting',value:ReadinSettings):void
    (e:'close'):void
}>()
const handleShow=(val:any)=>{
  if(!val){
    emit('close')
  }
}
const handleUpdatefont=(value:number)=>{
  const newSeeting:ReadinSettings={
    fontSize:value,
    lineHeight:props.setting.lineHeight,
    theme:props.setting.theme,
  }
  emit('update-setting',newSeeting)
}
// 更改主题色
const updateColor=(color:string)=>{
  const newSetting:ReadinSettings={
    fontSize:props.setting.fontSize,
    lineHeight:props.setting.lineHeight,
    theme:color
  }
  emit('update-setting',newSetting)
}
</script>
<style scoped>
    .icons{
      height: 25px;
      width: 25px;
    }
</style>
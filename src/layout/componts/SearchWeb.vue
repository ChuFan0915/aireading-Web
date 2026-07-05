<template >
    <n-drawer :show="props.isActive" :width="502" placement="top" @update:show="handleClose" > 
    <n-drawer-content closable >
        <template #header>
         <h2>搜索小说</h2>
      </template>
      <n-input placeholder="搜索"  >
      <template #prefix>
        <n-icon :component="BookOutline" />
      </template>
    </n-input>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup lang="ts">
import {  BookOutline } from '@vicons/ionicons5'
const props = defineProps<{
  isActive:boolean
}>()
const emit=defineEmits<{
    (e:'close'):void
}>()
const handleClose=(val:string)=>{
    if(!val){
        emit('close')
    }
}
</script>
<style >
    
</style>
<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui'

const themeOverrides = {
  common: {
    primaryColor: '#1f1f1f',
    primaryColorHover: '#2a2a2a',
    primaryColorPressed: '#151515',
    primaryColorSuppl: '#1f1f1f',
    borderRadius: '12px',
    borderColor: '#e5e5e5',
    textColorBase: '#171717'
  },
  Button: {
    textColor: '#171717',
    textColorHover: '#171717',
    textColorPressed: '#171717',
    borderHover: '1px solid #d4d4d4',
    borderPressed: '1px solid #cfcfcf'
  },
  Input: {
    borderHover: '1px solid #d4d4d4',
    borderFocus: '1px solid #c8c8c8',
    boxShadowFocus: '0 0 0 2px rgba(0, 0, 0, 0.06)'
  },
  Card: {
    borderColor: '#ececec'
  },
  Tabs: {
    tabColorSegment: '#f5f5f5',
    tabBorderColor: '#e7e7e7'
  }
}
</script>
<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NMessageProvider>
      <router-view />
    </NMessageProvider>
  </NConfigProvider>
</template>

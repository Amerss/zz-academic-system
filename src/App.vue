<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped lang="scss">
.box {
  height: 200px;
  width: 200px;
  div {
    height: 50px;
    width: 50px;
    background-color: aqua;
  }
}
</style>

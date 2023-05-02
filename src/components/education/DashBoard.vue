<template>
  <el-card>
    <div class="flex items-center">
      <el-breadcrumb separator="/" class="mr-5">
        <el-breadcrumb-item v-for="item in crumb">{{ item.meta.name }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-icon><QuestionFilled color="#18ac82" /></el-icon>
      <span class="text-xs text-green-default">帮助</span>
    </div>
    <slot> </slot>
  </el-card>
</template>

<script setup lang="ts">
let route = useRoute()
const crumb = ref(route.matched)
</script>

<style lang="scss" scoped>
:deep(.el-breadcrumb) {
  font-size: 20px;
}
</style>

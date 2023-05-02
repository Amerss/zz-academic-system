<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        :default-active="route.fullPath"
        text-color="#4b6165"
        active-color="#17ad83"
        class="el-menu-vertical-demo"
        router
      >
        <el-menu-item
          :index="parentIndex + item.path"
          v-for="item in aside?.children"
          :key="item.id"
        >
          <span class="mx-5">●</span>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useMenu } from '@/hooks/useMenu'

const { aside } = useMenu()
const route = useRoute()

const parentIndex = ref<string>()

watchEffect(() => {
  parentIndex.value = route.matched[0].path
})
</script>

<style lang="scss" scoped>
.tac {
  height: 420px;
  overflow: auto;
  background-color: #f7f7f7;
}
.el-menu-item {
  height: 60px;
}
:deep() {
  .is-active {
    color: #17ad83 !important;
    border-right: 1px solid #17ad83;
  }
}
</style>

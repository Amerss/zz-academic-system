<template>
  <main>
    <div class="logo">
      <img class="logo_img" src="../../assets/logo.svg" alt="" />
      <span>Z-教务管理系统</span>
    </div>
    <div class="header_menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        text-color="#4b6165"
        active-color="#fff"
        @select="handleSelect"
        router
      >
        <el-menu-item
          :index="item.path"
          v-for="item in data"
          :key="item.id"
          :disabled="item.id == 4"
          >{{ item.name }}</el-menu-item
        >
      </el-menu>
    </div>
    <div class="operation flex justify-around justify-items-center">
      <div class="flex justify-around">
        <el-icon :size="20" color="#4b6165"><Service /></el-icon>
        帮助中心
      </div>
      <div class="name">您好，{{ userInfo.username }}</div>
      <div>
        <el-icon :size="20" color="#4b6165"><Bell /></el-icon>
      </div>
      <div @click="logout">退出</div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useMenu } from '@/hooks/useMenu'
import { useLogin } from '@/hooks/useUser'

const activeIndex = ref<string>('')
const { data } = useMenu()
const { userInfo, logout } = useLogin()

const route = useRoute()

watchEffect(() => {
  activeIndex.value = route.fullPath.slice(0, route.fullPath.lastIndexOf('/'))
})

const handleSelect = (key: string) => {
  activeIndex.value = key
}
</script>

<style lang="scss" scoped>
main {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
.logo {
  display: flex;
  width: 200px;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: #4b6165;
  .logo_img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
}
.header_menu {
  width: calc(100vw - 600px);
  &:deep(.el-menu-item) {
    padding: 0 20px;
  }
  &:deep() {
    .el-menu--horizontal {
      border-bottom: none;
    }
    .is-active {
      color: #fff !important;
      background-color: #17ad83 !important;
      border-bottom: none;
    }
    .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
    .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
      color: #fff;
      background-color: rgba($color: #17ad83, $alpha: 0.3);
      border-bottom: none;
    }
    .el-menu-item {
      border: none;
    }
  }
}
.operation {
  width: 350px;
  font-size: 14px;
  color: #4b6165;
  & > div {
    cursor: pointer;
  }
}
.name {
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>

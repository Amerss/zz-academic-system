<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderView></HeaderView>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <AsideView></AsideView>
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.el-header {
  height: 60px;
  padding: 0;
}
.el-aside {
  padding-top: 20px;
}
.el-main {
  height: calc(100vh - 60px);
  padding-top: 20px;
}
</style>

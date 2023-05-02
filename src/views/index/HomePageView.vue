<template>
  <main class="flex justify-between p-3">
    <section class="left">
      <!-- 教务指南 -->
      <div class="guide">
        <div class="text-gray-900">教务指南</div>
        <div class="data">
          <el-row :gutter="10">
            <el-col v-for="item in list" :key="item.id" :xs="24" :md="12" :lg="8">
              <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <img :src="item.img_url" style="width: 100%; height: 150px" />
              </el-card>
              <div class="text-center mt-1 text-gray-600 text-sm">
                {{ item.name }}
              </div>
            </el-col>
          </el-row>
        </div>
        <el-pagination
          v-model:current-page="pagination.pagenum"
          v-model:page-size="pagination.pagesize"
          :background="true"
          layout="prev, pager, next, total"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 常见问题 -->
      <div class="question mt-16">
        <div class="text-gray-900 mb-5">常见问题</div>
        <ul>
          <li
            v-for="item in qusetions"
            :key="item.id"
            class="hover mb-2 text-sm text-gray-500"
            @click="lookAnswer(item)"
          >
            <el-icon><QuestionFilled /></el-icon>
            {{ item.question }}
          </li>
        </ul>
      </div>
      <el-dialog v-model="centerDialogVisible" title="常见问题" width="30%" center>
        <template #header>
          <div class="my-header">
            <h4 style="color: #17ad83">常见问题</h4>
          </div>
        </template>
        <div class="answer">
          <div>问题：</div>
          <div>{{ selectQuestion?.question }}</div>
        </div>
        <div class="answer">
          <div>解决方案：</div>
          <div>{{ selectQuestion?.answer }}</div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="centerDialogVisible = false">关闭</el-button>
          </span>
        </template>
      </el-dialog>
    </section>
    <section class="right">
      <el-calendar>
        <template #date-cell="{ data }">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(2).join() }}
            {{ data.isSelected ? '✔️' : '' }}
          </p>
        </template>
      </el-calendar>
      <div class="share mt-6">
        <div>
          <div class="text-gray-900 mb-4">教务问题反馈</div>
          <div class="box pl-3 flex flex-col items-center justify-center">
            <img class="share_img" src="../../assets/share.png" />
            <div class="broad">
              <div>
                <span>微信名称：</span>
                <span>教务问题反馈</span>
              </div>
              <div>
                <span>微信号：</span>
                <span>zzily7</span>
              </div>
            </div>
            <div class="flex self-start mt-2">
              <img style="width: 40px; height: 40px" src="../../assets/logo.svg" class="mr-2" />
              <div class="text-xs flex flex-col justify-center">
                <p>教务系统BUG反馈与需求</p>
                <p class="text-gray-400">扫一扫二维码反馈您的问题</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { getGuide, getQuestion } from '@/api'
import type { IGuideDate, IPage, IQuestion } from '@/typings'

// 分页
const list = ref<IGuideDate[]>()
const total = ref<number>(0)
const pagination = ref<IPage>({
  pagenum: 1,
  pagesize: 6
})
const handleCurrentChange = (val: number) => {
  pagination.value.pagenum = val
}
watchEffect(() => {
  getGuide(pagination.value).then((res) => {
    list.value = res.content
    total.value = res.total
  })
})

// 问题
const qusetions = ref<IQuestion[]>()
const selectQuestion = ref<IQuestion>()
getQuestion().then((res) => {
  qusetions.value = res
})
const centerDialogVisible = ref(false)
const lookAnswer = (item: IQuestion) => {
  centerDialogVisible.value = true
  selectQuestion.value = item
}
</script>

<style lang="scss" scoped>
main {
  background-color: #fff;
}
.left {
  width: 70%;
}
.right {
  width: 30%;
}
.data {
  padding: 10px 10px 0 10px;
}
.el-col {
  margin-bottom: 20px;
  cursor: pointer;
}
.el-pagination {
  :deep(.number) {
    background-color: #f5f7fa !important;
  }
  :deep(.is-active) {
    background-color: #17ad83 !important;
  }
  :deep(.el-pager li):hover {
    color: #17ad83 !important;
  }
}
.hover:hover {
  color: #17ad83;
  font-size: 16px;
  cursor: pointer;
}
:deep(.el-dialog) {
  width: 60%;
}
.answer {
  display: flex;
  & > div:nth-child(1) {
    width: 70px;
  }
  & > div:nth-child(2) {
    width: calc(100% - 70px);
  }
  margin: 10px 0;
}

.share_img {
  width: 150px;
  height: 150px;
}
.el-calendar {
  height: 400px;
  overflow: auto;
  font-size: 12px;
  &:deep() {
    .el-calendar-day {
      height: 45px;
      padding: 5px;
    }
  }
}
.is-selected {
  color: #1989fa;
}
.broad {
  background-color: #f0f0f0;
  font-size: 12px;
  width: 200px;
  padding: 5px;
  margin-top: 10px;
}
</style>

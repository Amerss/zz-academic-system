<template>
  <main>
    <DashBoard>
      <div class="select_group mt-5">
        <div class="mt-4">
          <el-input
            v-model="form.jobName"
            placeholder="请输入职位或公司关键字"
            class="input-with-select"
          >
            <template #prepend>
              <el-select v-model="form.jobType" placeholder="请选择" style="width: 115px">
                <el-option label="全部" value="" />
                <el-option label="全职" value="01" />
                <el-option label="兼职" value="02" />
                <el-option label="实习" value="03" />
              </el-select>
            </template>
            <template #append>
              <el-button
                style="width: 100px"
                :icon="Search"
                @click="params = { ...params, ...form }"
              />
            </template>
          </el-input>
        </div>
        <div class="mt-4">
          <el-form :inline="true" :model="params" class="demo-form-inline">
            <el-form-item label="公司性质">
              <el-select v-model="params.property">
                <el-option
                  v-for="item in property"
                  :key="item.lable"
                  :label="item.lable"
                  :value="item.lable == '全部' ? '' : item.lable"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="职位类别">
              <el-select v-model="params.categoryCode">
                <el-option
                  v-for="item in categoryCode"
                  :key="item.lable"
                  :label="item.lable"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="薪资水平">
              <el-select v-model="params.monthPay">
                <el-option
                  v-for="item in monthPay"
                  :key="item.lable"
                  :label="item.lable"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </DashBoard>

    <el-card class="mt-5">
      <div class="flex justify-center pb-2">
        今日平台职位总数<span class="text-green-default">{{ total }}</span
        >,欢迎投递
      </div>
      <div class="flex flex-col my-3 border-b-2 border-dashed" v-for="item in list">
        <div class="flex justify-around mb-2">
          <div class="border flex justify-center items-center" style="width: 110px; height: 110px">
            <el-image style="width: 100px; height: 100px" :src="item.recLogo" fit="fill">
              <template #error>
                <div class="flex justify-center items-center" style="height: 100%; font-size: 30px">
                  <el-icon><icon-picture /></el-icon>
                </div>
              </template>
            </el-image>
          </div>
          <div class="flex flex-col justify-around text-xs" style="height: 110px">
            <div class="text-xl text-green-default">{{ item.jobName }}</div>
            <div>
              <span>{{ item.degreeName }}</span>
              <span class="mx-2">|</span>
              <span>{{ item.lowMonthPay + 'k-' + item.highMonthPay + 'k' }}</span>
            </div>
            <div style="width: 300px" class="truncate">
              <span>{{ item.areaCodeName }}</span>
              <span class="mx-2">|</span>
              <span>{{ item.major ? item.major : '专业不限' }}</span>
            </div>
          </div>
          <div class="flex flex-col justify-around text-xs">
            <div class="text-xl text-green-default flex items-center" style="width: 350px">
              <span>{{ item.recName }}</span>
              <el-image
                v-if="item.memberLevel != '0'"
                class="ml-2"
                style="width: 60px; height: 25px"
                src="https://t1.chei.com.cn/ncss/student/img/v-tag-pc.png"
              ></el-image>
            </div>
            <div>
              <span>{{ item.recProperty }}</span>
              <span class="mx-2">|</span>
              <span>{{ item.recScale }}</span>
              <span class="mx-2">|</span>
              <span> 招聘{{ item.headCount }}人 </span>
            </div>
            <div>&nbsp;</div>
          </div>
          <div class="flex flex-col justify-around text-xs">
            <el-button type="primary" @click="goOther(item.jobId)"> 查看详细 </el-button>
            <div class="self-end">{{ dayjs(item.updateDate).format('YYYY-MM-DD HH:mm') }}</div>
            <div>来源：大学生就业服务平台</div>
          </div>
        </div>
        <div v-if="item.recTags" class="flex px-20 py-2 border-t border-dashed text-xs">
          {{ item.recTags }}
        </div>
      </div>

      <el-pagination
        v-model:current-page="params.offset"
        v-model:page-size="pagenation.limit"
        :background="true"
        layout="prev, pager, next, jumper,total"
        :total="pagenation.count"
        @size-change=""
        @current-change=""
      />
    </el-card>
  </main>
</template>

<script setup lang="ts">
import { getRecruitInfo } from '@/api/open'
import { Search, Picture as IconPicture } from '@element-plus/icons-vue'
import { property, categoryCode, monthPay } from '@/assets/menuTree/recruit'
import dayjs from 'dayjs'

const form = ref({
  jobName: '',
  jobType: ''
})

const params = ref({
  jobType: '', //实习03/兼职02/全职01
  areaCode: '', //地方编码
  jobName: '', //搜索内容
  monthPay: '', //工资
  industrySectors: '', //行业
  recruitType: '',
  property: '', //公司性质
  categoryCode: '', //公司类别
  memberLevel: '',
  offset: 1,
  limit: 10,
  keyUnits: '',
  degreeCode: '',
  sourcesName: '', //职位来源
  sourcesType: '',
  _: Date.now()
})

const total = ref<number>()
const list = ref()
interface IPage {
  count: number
  limit: number
  offset: number
  total: number
}
const pagenation = ref<IPage>({
  count: 100,
  limit: 10,
  offset: 1,
  total: 10
})

getRecruitInfo(params.value).then((res: any) => {
  pagenation.value = res.pagenation
  list.value = res.list
  total.value = res.pagenation.count
})
watchEffect(() => {
  getRecruitInfo(params.value).then((res: any) => {
    pagenation.value = res.pagenation
    list.value = res.list
  })
})

const goOther = (id: string) => {
  window.open(`https://www.ncss.cn/student/jobs/${id}/detail.html`)
}
</script>

<style lang="scss" scoped>
.select_group {
  .el-input {
    height: 40px;
    .el-select {
      &:deep(.el-input__inner) {
        height: 40px;
      }
      &:deep(.el-input__wrapper) {
        box-shadow: none !important;
      }
    }
    & > .el-button {
      width: 100px;
      font-size: 18px;
    }
  }
  //   .el-form {
  //     height: 35px;
  //   }
}
.border,
.border-dashed {
  border-color: #ccc !important;
}
.text-xs {
  color: #999;
}
</style>

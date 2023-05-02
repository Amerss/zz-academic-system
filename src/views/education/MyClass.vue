<template>
  <DashBoard>
    <div class="search mt-5">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="班级名称">
          <el-input v-model="formInline.class_name" />
        </el-form-item>
        <el-form-item label="专业方向">
          <el-input v-model="formInline.major" />
        </el-form-item>
        <el-form-item label="班主任名称">
          <el-input v-model="formInline.headmaster" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="20">
        <el-col class="mb-3" :span="6">
          <el-card :body-style="{ padding: '10px' }" shadow="hover">
            <transition>
              <div class="addClass flex items-center justify-center" @click="addClass">
                <el-icon><Plus /></el-icon>
                <span class="ml-2">新建班级</span>
              </div>
            </transition>
          </el-card>
        </el-col>
        <el-col class="mb-3" v-for="item in classList" :key="item.id" :span="6">
          <el-card :body-style="{ padding: '10px' }" shadow="hover">
            <div class="flex justify-between">
              <div class="info">
                <h2>{{ item.class_name }}</h2>
                <div>
                  班主任：<span>{{ item.headmaster }}</span>
                </div>
                <div>
                  教师：<span>{{ item.teacher_name.slice().join('、') }}</span>
                </div>
                <div>
                  专业方向：<span>{{ item.major }}</span>
                </div>
                <div>
                  年级：<span>{{ item.grade }}级</span>
                </div>
                <div>
                  班级人数：<span>{{ item.number }}</span>
                </div>
              </div>
              <div class="operation flex flex-col justify-between">
                <div class="flex justify-between text-green-default">
                  <el-tooltip content="添加学员">
                    <el-icon @click="delClass"><User /></el-icon>
                  </el-tooltip>
                  <el-tooltip content="班级邀请码" placement="top">
                    <el-icon @click="open(item.class_name)"><Grid /></el-icon>
                  </el-tooltip>
                  <el-tooltip content="编辑班级">
                    <el-icon @click="emitClass(item)"><Edit /></el-icon>
                  </el-tooltip>
                  <el-tooltip content="删除班级" placement="top">
                    <el-icon @click="delClass"><Stamp /></el-icon>
                  </el-tooltip>
                </div>
                <el-tag class="ml-2" :type="item.test ? 'success' : 'warning'">{{
                  item.test ? '开放每日一测' : '未开放每日测试'
                }}</el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </DashBoard>
  <el-dialog v-model="dialogFormVisible" :title="isEmitting ? '修改班级' : '新建班级'">
    <el-form :model="form">
      <el-form-item label="班级名称" label-width="140px">
        <el-input v-model="form.class_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="班主任" label-width="140px">
        <el-input v-model="form.headmaster" autocomplete="off" />
      </el-form-item>
      <el-form-item label="老师" label-width="140px">
        <el-select v-model="form.teacher_name" multiple style="width: 240px">
          <el-option v-for="item in 5" :key="item" :label="'test' + item" :value="'test' + item" />
        </el-select>
      </el-form-item>
      <el-form-item label="班级人数" label-width="140px">
        <el-input-number v-model="form.number" :min="1" :max="999" />
      </el-form-item>
      <el-form-item label="班级专业" label-width="140px">
        <el-input v-model="form.major" autocomplete="off" />
      </el-form-item>
      <el-form-item label="年级" label-width="140px">
        <el-select v-model="form.grade" style="width: 240px; height: 40px">
          <el-option v-for="item in 6" :key="item" :label="'201' + item" :value="'201' + item" />
        </el-select>
      </el-form-item>
      <el-form-item label="每日一测" label-width="140px">
        <el-switch
          v-model="form.test"
          style="--el-switch-on-color: #17ad83; --el-switch-off-color: #ff4949"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="comfirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { postMyClass, postAddClass, postEmitClass } from '@/api/class'
import { getQrcode } from '@/api/open'
import type { IClass, ISearchClass } from '@/typings/class'
import { ElNotification, ElMessage } from 'element-plus'

const open = (str: string) => {
  let params = {
    key: '0e465aca17429701db2a7e4fca4a0ee8',
    type: 1,
    fgcolor: Math.floor(Math.random() * 16777215).toString(16),
    w: 100,
    text: `${str}欢迎您的加入---张震的毕业设计`
  }
  getQrcode(params).then((res) => {
    let code = 'data:image/png;base64,' + res.base64_image
    ElNotification({
      title: str + '班级邀请码',
      dangerouslyUseHTMLString: true,
      message: `<div class="flex flex-col justify-center items-center"><img src="${code}" /><div>请使用微信扫码</div></div>`,
      duration: 8000
    })
  })
}

const formInline = reactive<ISearchClass>({
  class_name: '',
  major: '',
  headmaster: ''
})

const classList = ref<IClass[]>()
postMyClass().then((res) => {
  classList.value = res
})

const onSubmit = () => {
  // 查询
  if (formInline.class_name != '' || formInline.major != '' || formInline.headmaster != '') {
    postMyClass(formInline).then((res) => {
      classList.value = res
    })
  }
}

const dialogFormVisible = ref(false)
let form = ref<IClass>({
  class_name: '',
  grade: '',
  headmaster: '',
  id: 0,
  number: 0,
  teacher_name: [],
  major: '',
  test: true
})

let isEmitting = ref<boolean>(false)

const addClass = () => {
  form.value = {
    class_name: '',
    grade: '',
    headmaster: '',
    id: 0,
    number: 0,
    teacher_name: [],
    major: '',
    test: true
  }
  dialogFormVisible.value = true
  isEmitting.value = false
}

const comfirm = () => {
  if (isEmitting.value) {
    // 修改
    postEmitClass(form.value).then((res) => {
      classList.value = res
      ElMessage({
        message: '修改成功',
        type: 'success'
      })
    })
  } else {
    // 添加
    postAddClass(form.value).then((res) => {
      classList.value = res
      ElMessage({
        message: '添加成功',
        type: 'success'
      })
    })
  }
  dialogFormVisible.value = false
}

const delClass = () => {
  ElMessage({
    message: '暂无权限，请联系管理员。',
    type: 'warning'
  })
}

const emitClass = (item: IClass) => {
  isEmitting.value = true
  form.value = item
  dialogFormVisible.value = true
}
</script>

<style lang="scss" scoped>
.el-button--primary {
  background-color: #17ad83;
}
.info {
  div {
    font-size: 14px;
    color: #535353;
    span {
      color: #a8a8a8;
    }
  }
}
.el-row {
  :deep(.el-card__body) {
    height: 160px;
  }
}
.addClass {
  height: 100%;
  transition: all 0.5s;
}
.addClass:hover {
  font-size: 18px;
  color: #17ad83;
  cursor: pointer;
}
.operation {
  .el-icon:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
}
</style>

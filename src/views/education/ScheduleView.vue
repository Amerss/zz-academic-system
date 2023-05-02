<template>
  <main>
    <div class="export">
      <el-button type="primary" @click="addSchedule">添加课程</el-button>
      <el-button type="success" @click="exportXLSX">导出表格</el-button>
    </div>
    <DashBoard>
      <el-table :data="tableData" style="width: 100%" height="530" class="mt-5">
        <el-table-column prop="cno" label="课程号" width="180" sortable />
        <el-table-column prop="cname" label="课程名" width="180" />
        <el-table-column prop="ccredit" label="学分" width="100" sortable />
        <el-table-column prop="capacity" label="容量" width="100" sortable />
        <el-table-column prop="prename" label="先修课" width="180">
          <template #default="{ row }">
            {{ row.prename ? row.prename : '无' }}
          </template>
        </el-table-column>
        <el-table-column prop="tno" label="教师编号" width="170" sortable />
        <el-table-column prop="teacher" label="教师" width="150" />
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="{ row }">
            <el-button link type="success" size="small" @click="emitSchedule(row)">编辑</el-button>
            <el-popconfirm title="此操作不可逆，确认删除?" @confirm="delSchedule(row.cno)">
              <template #reference>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </DashBoard>
    <el-dialog v-model="dialogFormVisible" :title="isAdd ? '添加课程' : '修改课程'">
      <el-form :model="scheduleForm">
        <el-form-item label="课程号" label-width="100px">
          <el-input v-model="scheduleForm.cno" :disabled="isAdd ? false : true" />
        </el-form-item>
        <el-form-item label="课程名" label-width="100px">
          <el-input v-model="scheduleForm.name" />
        </el-form-item>
        <el-form-item label="学分" label-width="100px">
          <el-input-number v-model="scheduleForm.credit" :min="1" />
        </el-form-item>
        <el-form-item label="容量" label-width="100px">
          <el-input-number v-model="scheduleForm.capacity" :min="1" />
        </el-form-item>
        <el-form-item label="先修课" label-width="100px">
          <el-input v-model="scheduleForm.preCourse" disabled />
        </el-form-item>
        <el-form-item label="教师编号" label-width="100px">
          <el-select v-model="scheduleForm.tno" placeholder="Select">
            <el-option
              v-for="item in teacherList"
              :key="item"
              :label="item.name"
              :value="item.username"
            >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">{{
                item.username
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </main>
</template>

<script setup lang="ts">
import { getCourseList, getTeacherList, putCourse, addCourse, delCourse } from '@/api/class'
import type { ICourse } from '@/typings/class'
import { exportExcel } from '@/utils/utils'
import {ElMessage} from "element-plus";

const tableData = ref<ICourse[]>()
const teacherList = ref()
const isAdd = ref<boolean>(false)
// 获取数据
const getList = () => {
  getCourseList().then((res) => {
    tableData.value = res
  })
}
getList()

getTeacherList().then((res) => {
  teacherList.value = res
})

// 编辑数据
const dialogFormVisible = ref<boolean>()
const scheduleForm = ref<ICourse>({
  capacity: 0,
  cno: '',
  cpno: null,
  credit: 0,
  name: '',
  preCourse: '',
  teacher: '',
  tno: ''
})
const emitSchedule = (data: ICourse) => {
  console.log(data)
  scheduleForm.value = { ...data, name: data.cname, preCourse: data.prename, credit: data.ccredit }
  dialogFormVisible.value = true
  isAdd.value = false
}
// 添加数据
const addSchedule = () => {
  isAdd.value = true
  dialogFormVisible.value = true
  scheduleForm.value = {
    capacity: 0,
    cno: '',
    cpno: null,
    credit: 0,
    name: '',
    preCourse: '',
    teacher: '',
    tno: ''
  }
}
const confirm = () => {
  if (isAdd.value) {
    addCourse(scheduleForm.value).then((res) => {
      ElMessage({
        type: 'success',
        message: '新建课程成功'
      })
      getList()
      dialogFormVisible.value = false
    })
  } else {
    putCourse(scheduleForm.value).then((res) => {
      ElMessage({
        type: 'success',
        message: '修改信息成功'
      })
      getList()
      dialogFormVisible.value = false
    })
  }
}
// 删除数据
const delSchedule = (id: string) => {
  delCourse(id).then((res) => {
    getList()
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
  })
}
// 生成表格文件
const sheetArr = ['课程号', '课程名', '学分', '先修课', '教师编号', '教师']
const exportXLSX = () => {
  exportExcel(tableData.value, 'schedle', sheetArr, '课程安排')
}
</script>

<style lang="scss" scoped>
main {
  position: relative;
}
.export {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>

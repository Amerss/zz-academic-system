<template>
  <main>
    <el-button type="success" class="export" @click="exportXLSX">导出表格</el-button>
    <DashBoard>
      <el-table :data="tableData" style="width: 100%" height="530" class="mt-5">
        <el-table-column fixed prop="sno" label="学号" width="180" sortable />
        <el-table-column prop="sname" label="姓名" width="180" />
        <el-table-column
          prop="sex"
          label="性别"
          width="100"
          :filters="[
            { text: '男', value: '男' },
            { text: '女', value: '女' }
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="scope.row.sex === '男' ? 'success' : 'danger'" disable-transitions>{{
              scope.row.sex
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sage" label="年龄" width="100" sortable />
        <el-table-column prop="admi_date" label="入学时间" width="150" sortable />
        <el-table-column prop="school" label="学院" width="150" />
        <el-table-column prop="sdept" label="专业" width="180" />
        <el-table-column fixed="right" label="操作" width="160">
          <template #default="{ row }">
            <el-button link type="success" size="small" @click="emitStudentInfo(row)"
              >编辑</el-button
            >
            <el-popconfirm title="确认删除?" @confirm="delStudent(row.sno)">
              <template #reference>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </DashBoard>
    <el-dialog v-model="dialogFormVisible" :title="`编辑${formStudent.sname}的信息`">
      <el-form :model="formStudent">
        <el-form-item label="学号" label-width="100px">
          <el-input v-model="formStudent.sno" disabled />
        </el-form-item>
        <el-form-item label="姓名" label-width="100px">
          <el-input v-model="formStudent.name" />
        </el-form-item>
        <el-form-item label="性别" label-width="100px">
          <el-radio-group v-model="formStudent.sex" class="ml-4">
            <el-radio label="男" size="large">男</el-radio>
            <el-radio label="女" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" label-width="100px">
          <el-input-number v-model="formStudent.age" :min="1" :max="1000" />
        </el-form-item>
        <el-form-item label="入学时间" label-width="100px">
          <el-date-picker v-model="formStudent.admi_date" type="date" placeholder="Pick a day" />
        </el-form-item>
        <el-form-item label="学院" label-width="100px">
          <el-input v-model="formStudent.school" />
        </el-form-item>
        <el-form-item label="专业" label-width="100px">
          <el-input v-model="formStudent.sdept" />
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
import { getStudentsAll, putStudentsInfo, delStudentsInfo } from '@/api/student'
import type { IStudentList } from '@/typings/student'
import { exportExcel } from '@/utils/utils'
import { ElMessage } from 'element-plus'

const tableData = ref<IStudentList[]>()

const getStuList = () => {
  getStudentsAll().then((res) => {
    tableData.value = res
  })
}
getStuList()

const filterTag = (value: string, row: IStudentList) => {
  return row.sex === value
}

let formStudent = ref<IStudentList>({
  admi_date: '',
  email: '',
  hobby: '',
  intro: '',
  age: 0,
  school: '',
  sdept: '',
  sex: '',
  name: '',
  sno: '',
  tel: ''
})
const dialogFormVisible = ref(false)

const emitStudentInfo = (data: IStudentList) => {
  formStudent.value = { ...data, name: data.sname, age: data.sage }
  dialogFormVisible.value = true
}

const confirm = () => {
  putStudentsInfo(formStudent.value.sno, formStudent.value).then((res) => {
    ElMessage({
      type: 'success',
      message: '修改成功'
    })
    getStuList()
    dialogFormVisible.value = false
  })
}

const delStudent = (sno: string) => {
  delStudentsInfo(sno).then(() => {
    getStuList()
  })
}

const sheetArr = ['学号', '姓名', '性别', '年龄', '入学时间', '学院', '专业']
const exportXLSX = () => {
  exportExcel(tableData.value, 'student', sheetArr, '学生表')
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

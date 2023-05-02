<template>
  <DashBoard>
    <el-table :data="tableData" style="width: 100%" height="530" class="mt-5">
      <el-table-column fixed prop="username" label="编号" sortable />
      <el-table-column fixed prop="name" label="姓名" sortable>
        <template #default="{ row }">
          {{ row.name }}
          <el-tag class="ml-3" v-if="row.username == userInfo.userID" type="danger">本人</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="权限"
        :filters="[
          { text: '管理员', value: '管理员' },
          { text: '教师', value: '教师' }
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="{ row }">
          <el-tag :type="row.username > 150000 ? '' : 'success'">{{
            row.username > 150000 ? '管理员' : '教师'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template #default="{ row }">
          <el-button
            link
            type="success"
            size="small"
            :disabled="row.username < 150000 ? false : true"
            @click="emitInfo(row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="修改信息">
      <el-form :model="form" label-position="top">
        <el-form-item label="编号">
          <el-input v-model="form.username" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </DashBoard>
</template>

<script setup lang="ts">
import { getTeacherList, getManagementList, putTeacher } from '@/api/class'
import type { ITeacher } from '@/typings/student'
import { useLogin } from '@/hooks/useUser'
import { ElMessage } from 'element-plus'

const { userInfo } = useLogin()
const tableData = ref<ITeacher[]>()

function getInfo() {
  getTeacherList().then((res) => {
    tableData.value = res
  })
  getManagementList().then((res) => {
    tableData.value = [...tableData.value!, ...res]
  })
}
getInfo()

const filterTag = (value: string, row: any) => {
  if (value === '教师') {
    return row.username < 15000
  } else {
    return row.username > 15000
  }
}

type Info = {
  username: string
  name: string
}
let form = ref<Info>({
  username: '',
  name: ''
})

const dialogFormVisible = ref(false)
const emitInfo = (row: Info) => {
  dialogFormVisible.value = true
  form.value = { ...row }
}
const confirm = () => {
  putTeacher(form.value).then(() => {
    getInfo()
    ElMessage({
      type: 'success',
      message: '修改成功'
    })
    dialogFormVisible.value = false
  })
}
</script>

<style lang="scss" scoped></style>

<template>
  <main>
    <DashBoard>
      <el-descriptions :column="3" border class="my-5" direction="vertical">
        <el-descriptions-item label="姓名" align="center" width="100px">{{
          userInfo.username
        }}</el-descriptions-item>
        <el-descriptions-item label="性别" align="center" width="100px">
          <el-tag size="small" :type="userInfo.info?.sex == '女' ? 'danger' : 'success'">{{
            userInfo.info?.sex
          }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="年龄" align="center" width="100px">{{
          userInfo.info?.age
        }}</el-descriptions-item>
        <el-descriptions-item label="头像" align="center" width="100px">
          <el-avatar
            :size="60"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
        </el-descriptions-item>
        <el-descriptions-item label="手机号" align="center" width="100px">{{
          userInfo.info?.tel ? userInfo.info?.tel : '未填写'
        }}</el-descriptions-item>
        <el-descriptions-item label="邮箱" align="center" width="100px">{{
          userInfo.info?.email ? userInfo.info?.email : '未填写'
        }}</el-descriptions-item>
        <el-descriptions-item label="简介" align="center">{{
          userInfo.info?.intro ? userInfo.info?.intro : '暂无简介'
        }}</el-descriptions-item>
      </el-descriptions>
      <div class="flex justify-center">
        <el-button type="success" plain @click="dialog = true">编辑我的信息</el-button>
      </div>
    </DashBoard>
    <el-drawer
      ref="drawerRef"
      v-model="dialog"
      title="修改我的简介"
      direction="rtl"
      class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="姓名" label-width="70px">
            <el-input v-model="form.name" autocomplete="off" disabled />
          </el-form-item>
          <el-form-item label="年龄" label-width="70px">
            <el-input-number v-model="form.age" :min="1" :max="199" />
          </el-form-item>
          <el-form-item label="性别" label-width="70px">
            <el-radio-group v-model="form.sex" class="ml-4">
              <el-radio label="男" size="large">男</el-radio>
              <el-radio label="女" size="large">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电话" label-width="70px">
            <el-input v-model="form.tel" autocomplete="off" />
          </el-form-item>
          <el-form-item label="邮箱" label-width="70px">
            <el-input v-model="form.email" autocomplete="off" />
          </el-form-item>
          <el-form-item label="简介" label-width="70px">
            <el-input v-model="form.intro" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer flex justify-center">
          <el-button @click="dialog = false">取消</el-button>
          <el-button type="primary" @click="emitInfo">提交</el-button>
        </div>
      </div>
    </el-drawer>

    <el-card class="mt-10">
      <h1><strong>其他操作</strong></h1>
      <el-button type="danger" plain class="mt-5" @click="dialogFormVisible = true"
        >修改密码</el-button
      >
    </el-card>
    <el-dialog v-model="dialogFormVisible" title="修改密码">
      <el-form :model="passWord" :rules="rules">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passWord.oldPassword" type="password" />
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="passWord.password" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="changePassword"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </main>
</template>

<script setup lang="ts">
import { useLogin } from '@/hooks/useUser'
import { ElDrawer } from 'element-plus'
import { putEmitClass, putEmitPassword } from '@/api/center'
import type { IProfile } from '@/typings/user'
import type { FormRules } from 'element-plus'

const { userInfo, getPro, logout } = useLogin()

const dialog = ref(false)

const form = reactive<IProfile>({ ...userInfo.value.info, name: userInfo.value.username })

const drawerRef = ref<InstanceType<typeof ElDrawer>>()

const emitInfo = () => {
  putEmitClass(userInfo.value.userID, form).then((res) => {
    getPro(userInfo.value.userID as string)
    drawerRef.value!.close()
    ElMessage({
      message: `修改成功！`,
      type: 'success'
    })
  })
}

const dialogFormVisible = ref(false)

let validatePass = (rule: any, value: string, callback: any): void => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

let validatePass2 = (rule: any, value: string, callback: any): void => {
  if (value === '') {
    callback(new Error('请输入新密码'))
  } else if (value == passWord.oldPassword) {
    callback(new Error('不可与旧密码相同'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  oldPassword: [{ validator: validatePass, trigger: 'blur' }],
  password: [{ validator: validatePass2, trigger: 'blur' }]
})

const passWord = reactive<{ oldPassword: string; password: string }>({
  oldPassword: '',
  password: ''
})

const changePassword = () => {
  putEmitPassword(userInfo.value.userID, passWord).then((res) => {
    if (res.status == 1105) {
      logout()
    }
  })
  dialogFormVisible.value = false
}
</script>

<style lang="scss" scoped>
.my-label {
  background: var(--el-color-success-light-9);
}
.my-content {
  background: var(--el-color-danger-light-9);
}
.el-descriptions {
  :deep(th) {
    font-weight: 600 !important;
  }
}
</style>

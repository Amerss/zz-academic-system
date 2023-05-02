<template>
  <main>
    <header class="flex justify-between py-3.5 px-32">
      <div class="flex items-center">
        <img class="logo_img" src="../../assets/logo.svg" />
        <span class="font-semibold">Z-教务管理系统</span>
      </div>
      <el-link type="info" href="https://www.zhipin.com/?sid=sem_pz_bdpc_dasou_title"
        >前往IT人才经纪平台</el-link
      >
    </header>
    <section class="bg">
      <img class="bg_img" src="../../assets/bg.jpg" />
      <el-card>
        <div class="flex items-center justify-center py-10">
          <img class="logo_img" src="../../assets/logo.svg" />
          <span class="text-lg font-semibold text-green-default">Z-教务管理系统</span>
        </div>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-form-item prop="pass">
            <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item class="btw">
            <el-link @click="resetForm(ruleFormRef)">重置</el-link>
            <el-link disabled>注册账号</el-link>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="success" @click="submitForm(ruleFormRef)"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </section>
    <section class="resources">
      <div class="mt-8">
        <div class="tip text-center text-gray-600">
          <p class="tracking-widest">TEACHING RESOURCES</p>
          <P class="font-semibold text-green-default">教学资源</P>
          <el-row :gutter="30" style="padding: 0 20px; margin: 20px 0">
            <el-col v-for="item in list" :key="item.id" :md="12" :lg="6">
              <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <img :src="item.img_url" style="width: 100%; height: 150px" />
              </el-card>
              <div class="text-center mt-1 text-gray-600 text-sm">
                {{ item.name }}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="mt-8">
        <div class="tip text-center text-gray-600">
          <p class="tracking-widest">COMMON FUNCTIONS</p>
          <P class="font-semibold text-green-default">常用功能</P>
          <el-row :gutter="30" style="padding: 0 20px; margin: 20px 0">
            <el-col v-for="item in list" :key="item.id" :md="12" :lg="6">
              <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <img :src="item.img_url" style="width: 100%; height: 150px" />
              </el-card>
              <div class="text-center mt-1 text-gray-600 text-sm">
                {{ item.name }}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </section>
    <footer class="px-32 flex justify-between">
      <div class="left flex flex-col">
        <div class="flex items-center my-5">
          <img class="logo_img" src="../../assets/logo.svg" alt="" />
          <span>行百里者半九十 专注你的紧要几步</span>
        </div>
        <ul class="mb-2">
          <li><a href="#">关于我们</a></li>
          <li><a href="#">注册协议</a></li>
          <li><a href="#">隐私协议</a></li>
          <li><a href="#">常见问题</a></li>
          <li><a href="#">帮助中心</a></li>
        </ul>
        <div class="mb-2">
          <span>友情链接：</span>
          <el-link>厚溥教育</el-link>
        </div>
        <div class="mb-2">地址：荆州市荆州区荆州学院太湖港校区</div>
      </div>

      <div class="right">
        <img src="../../assets/share.png" v-for="i in 2" :key="i" />
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { useLogin } from '@/hooks/useUser'
import { ElMessage } from 'element-plus'
import { getGuide } from '@/api'
import type { IGuideDate } from '@/typings'

const ruleFormRef = ref<FormInstance>()
const validatePass = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    if (ruleForm.password !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('password', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
const ruleForm = reactive({
  username: '',
  password: ''
})

const rules = reactive<FormRules>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }]
})
let { getInfo } = useLogin()
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      getInfo(ruleForm)
    } else {
      ElMessage({
        message: `请输入正确的账号和密码!`,
        type: 'error'
      })
      return false
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const list = ref<IGuideDate[]>()
getGuide({ pagenum: 1, pagesize: 4 }).then((res) => {
  list.value = res.content
})
</script>

<style lang="scss" scoped>
main {
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
.logo_img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
header {
  background-color: #fff;
}
.bg {
  position: relative;
  width: 100vw;
  overflow: hidden;
  height: 500px;
  .bg_img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
  .el-card {
    position: absolute;
    z-index: 9;
    right: 80px;
    top: calc(100% / 2 - 400px / 2);
    height: 400px;
    width: 350px;
  }
  .el-link {
    color: #17ad83;
  }
}
.btw {
  &:deep(.el-form-item__content) {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }
}

.el-button--success {
  background-color: #17ad83;
}
footer {
  color: #adadad;
  background-color: #333;
  ul > li {
    float: left;
    margin-right: 15px;
    color: #adadad;
  }
  .el-link {
    color: #adadad;
  }
  ul > li:hover,
  .el-link:hover {
    color: #fff;
  }
}
.right {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
    margin-left: 20px;
  }
}
</style>

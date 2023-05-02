import { defineStore } from 'pinia'
import type { Info, userinfo } from '@/typings/user'
import { getProfile, onLogin, onLogout } from '@/api'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<{ username: string; userID: number | string; info?: userinfo }>({
      username: '',
      userID: 0,
      info: undefined
    })
    const token = ref<string>()
    const router = useRouter()

    const getInfo = (body: Info) => {
      onLogin(body).then((res) => {
        if (res.status == 1105) {
          userInfo.value.username = res.name
          userInfo.value.userID = body.username
          token.value = res.token
          getPro(body.username)
          router.push('/')
          ElMessage({
            message: `${res.name},欢迎回来！`,
            type: 'success'
          })
        } else if (res.status == 1100) {
          ElMessage({
            message: res.message,
            type: 'error'
          })
        } else {
          ElMessage({
            message: `网络错误!`,
            type: 'error'
          })
        }
      })
    }

    const logout = () => {
      onLogout().then((res) => {
        if (res.code === 200) {
          localStorage.removeItem('token')
          localStorage.removeItem('userInfo')
          router.push('/login')
          ElMessage({
            message: `退出成功,欢迎再来！`,
            type: 'success'
          })
        }
      })
    }

    const getPro = (userID: string) => {
      getProfile(userID).then((res) => {
        userInfo.value.info = res[0]
      })
    }

    return { userInfo, token, getInfo, logout, getPro }
  },
  {
    persist: {
      enabled: true, //开启持久化
      // 存储策略
      strategies: [
        {
          key: 'userInfo',
          storage: localStorage,
          paths: ['userInfo'] // 存储的内容
        },
        {
          key: 'token',
          storage: localStorage,
          paths: ['token'] // 存储的内容
        }
      ]
    }
  }
)

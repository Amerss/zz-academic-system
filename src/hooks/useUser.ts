import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

export const useLogin = () => {
  const userStore = useUserStore()
  const { userInfo, token } = storeToRefs(userStore)
  const { getInfo, logout, getPro } = userStore

  const isLogin = computed<boolean>(() => {
    return Boolean(token.value && userInfo.value)
  })

  return { userInfo, token, getInfo, logout, getPro, isLogin }
}

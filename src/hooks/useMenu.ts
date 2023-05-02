import { useRequest } from 'vue-request'
import { useMenuStore } from '@/stores/menu'
import { storeToRefs } from 'pinia'

export const useMenu = () => {
  const menuStore = useMenuStore()
  const { menu, aside } = storeToRefs(menuStore)
  const { getMenuList, getAside } = menuStore
  const route = useRoute()

  const { data, loading, error } = useRequest(getMenuList, {
    cacheKey: 'menu',
    // 缓存时间 5min
    cacheTime: 5 * 60 * 1000
  })

  watch(
    () => route,
    () => {
      getAside()
    },
    {
      deep: true,
      immediate: true
    }
  )

  return { menu, aside, data, loading, error }
}

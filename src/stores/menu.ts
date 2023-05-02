import { defineStore } from 'pinia'
import type { IMenu } from '@/typings'
import { getMenu } from '@/api/index'

export const useMenuStore = defineStore('menu', () => {
  const menu = ref<IMenu[]>()
  const aside = ref<IMenu>()

  const getMenuList = async () => {
    const data = await getMenu()
    menu.value = data
    getAside()
    return data
  }

  let route = useRoute()

  const getAside = () => {
    aside.value = menu.value?.find((v) => route.fullPath.includes(v.path))
  }

  return { menu, getMenuList, aside, getAside }
})

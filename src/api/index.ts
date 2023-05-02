import type { IGuide, IMenu, IPage, IQuestion } from '@/typings'
import type { IPostInfo, Info } from '@/typings/user'
import http from '@/utils/http'

// 登录
// export const onLogin = async (body: Info): Promise<IPostInfo> => {
//   const {
//     data: { postInfo }
//   } = await http.post('/login', body)
//   return postInfo
// }

export const onLogin = async (body: Info): Promise<IPostInfo> => {
  const { data } = await http.post('/app/super-user/login', body)
  // const result = await getProfile(body.username)
  return data
}

export const getProfile = async (userId: string): Promise<any[]> => {
  const {
    data: { result }
  } = await http.get('/app/super-user/profile/' + userId)
  return result
}

export const onLogout = async (): Promise<any> => {
  const { data } = await http.get('/logout')
  return data
}

// 获取菜单
export const getMenu = async (): Promise<IMenu[]> => {
  const {
    data: { data }
  } = await http.get('/api/menu')
  return data
}

// 获取指南
export const getGuide = async (body: IPage): Promise<IGuide> => {
  const {
    data: { data }
  } = await http.post('/guide', body)
  return data
}

// 获取问题
export const getQuestion = async (): Promise<IQuestion[]> => {
  const {
    data: {
      data: { questions }
    }
  } = await http.get('/question')
  return questions
}

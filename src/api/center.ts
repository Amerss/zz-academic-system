import http from '@/utils/http'
import type { IProfile } from '@/typings/user'

export const putEmitClass = async (userID: number | string, body: IProfile): Promise<any> => {
  const {
    data: { data }
  } = await http.put(`/app/super-user/profile/${userID}`, body)
  return data
}

export const putEmitPassword = async (
  userID: number | string,
  body: {
    oldPassword: string
    password: string
  }
): Promise<any> => {
  const { data } = await http.put(`/app/super-user/reset/${userID}`, body)
  return data
}

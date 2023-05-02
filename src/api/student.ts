import type { ITeacher } from '@/typings/student'
import http from '@/utils/http'

export const getStudentsAll = async (): Promise<any> => {
  const {
    data: { result }
  } = await http.get('/app/super-user/info/student/all')
  return result
}

export const putStudentsInfo = async (studentId: string, body: any): Promise<any> => {
  const {
    data: { data }
  } = await http.put('/app/super-user/info/student/' + studentId, body)
  return data
}

export const delStudentsInfo = async (studentId: string): Promise<any> => {
  const { data } = await http.delete('/app/super-user/info/student/' + studentId)
  return data
}

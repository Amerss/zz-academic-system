import type { IClass, ICourse, ISearchClass } from '@/typings/class'
import type { ITeacher } from '@/typings/student'
import http from '@/utils/http'

// 获取班级
export const postMyClass = async (body?: ISearchClass): Promise<IClass[]> => {
  const {
    data: { data }
  } = await http.post('/education/classes', body)
  return data
}

// 添加班级
export const postAddClass = async (body: IClass): Promise<IClass[]> => {
  const {
    data: { data }
  } = await http.post('/education/classes/add', body)
  return data
}

// 编辑班级
export const postEmitClass = async (body: IClass): Promise<IClass[]> => {
  const {
    data: { data }
  } = await http.post('/education/classes/emit', body)
  return data
}

// 获取所有教师
export const getTeacherList = async (): Promise<ITeacher[]> => {
  const {
    data: { result }
  } = await http.get('/app/super-user/user/all/teacher')
  return result
}

export const putTeacher = async (body: { username: string; name: string }): Promise<ITeacher[]> => {
  const {
    data: { result }
  } = await http.put('/app/super-user/user/teacher/' + body.username, body)
  return result
}
// 获取所有管理员
export const getManagementList = async (): Promise<ITeacher[]> => {
  const {
    data: { result }
  } = await http.get('/app/super-user/user/all/management')
  return result
}
// 获取课程表格
export const getCourseList = async (): Promise<ICourse[]> => {
  const {
    data: { result }
  } = await http.get('/app/course/all')
  return result
}

// 编辑课程
export const putCourse = async (body: ICourse): Promise<any> => {
  const { data } = await http.put(`/app/super-user/info/course/${body.cno}`, body)
  return data
}

// 添加课程
export const addCourse = async (body: ICourse): Promise<any> => {
  const { data } = await http.post('/app/super-user/info/course', body)
  return data
}

// 删除课程/super-user/info/course/111
export const delCourse = async (cno: string): Promise<any> => {
  const { data } = await http.delete('/app/super-user/info/course/' + cno)
  return data
}

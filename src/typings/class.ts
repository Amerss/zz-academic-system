export interface IClass {
  class_name: string
  grade: string | number
  headmaster: string
  id: number
  number: number
  teacher_name: string[]
  major: string
  test: boolean
}

export interface ISearchClass {
  class_name: string
  major: string
  headmaster: string
}

export interface ICourse {
  ccredit?: number
  credit?: number
  cname?: string
  name?: string
  prename?: null | string
  preCourse?: null | string
  capacity: number
  cno: string
  cpno: null | number
  teacher: string
  tno: string
}

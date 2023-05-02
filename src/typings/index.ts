export interface IMenu {
  id: string | number
  name: string
  path: string
  children?: IMenu[]
}

export interface IPage {
  pagenum: number
  pagesize: number
}

export interface IGuideDate {
  id: number
  img_url: string
  name: string
}

export interface IGuide {
  pagenum: number
  pagesize: number
  content: IGuideDate[]
  total: number
  totalPages: number
}

export interface IQuestion {
  id: number
  question: string
  answer: string
}

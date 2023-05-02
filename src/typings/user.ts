export interface IUserInfo {
  name: string
  age: number
  sex: number
  address: string
  phone: string | number
  email: string
}

// export interface IPostInfo {
//   userInfo: IUserInfo
//   token: string
// }

export interface IPostInfo {
  name: string
  status: number
  token: string
  url: null | string
  result: userinfo[]
  message?: string
}

export interface userinfo {
  sex: string
  age: number
  email: string
  tel: string
  intro: string
}

export interface Info {
  username: string
  password: string
}

export interface IProfile {
  name: string
  sex?: string
  age?: number
  email?: string
  tel?: string
  intro?: string
}

import { menu } from '@/assets/menuTree/menu'
import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
import pkg from 'mockjs'
const { Random } = pkg
import type { IClass } from '@/typings/class'

let guide = Mock.mock(() => {
  let list = []
  for (let i = 0; i < 18; i++) {
    // 利用mockjs的Random随机生成数字并转成十六进制，拼接。
    const color =
      '#' +
      Random.integer(180, 255).toString(16) +
      Random.integer(140, 255).toString(16) +
      Random.integer(120, 220).toString(16)
    list.push({
      img_url: Random.image('200x150', color, ' MOCK-IMAGE '),
      name: Random.ctitle(5, 8),
      id: Random.increment(1)
    })
  }
  return list
})

type Tclass = { classList: IClass[] }
let classes: Tclass = Mock.mock({
  'classList|12': [
    {
      id: '@increment(1)',
      class_name: 'DW' + '@increment(1000,9999)',
      headmaster: '@cname',
      teacher_name: () => {
        return ['@cname', '@cname', '@cname']
      },
      grade: '@integer(2015,2023)',
      number: '@integer(30,50)',
      major: `@pick(['web前端', '.NET', 'JAVA', 'UI'])`,
      'test|1': '@boolean'
    }
  ]
})

const mock: Array<MockMethod> = [
  {
    url: '/login',
    method: 'post',
    response: (config) => {
      const { username, password } = config.body
      if (username === 'admin' && password === '123456') {
        return {
          code: 200,
          message: 'ok',
          postInfo: {
            userInfo: {
              name: '张震',
              age: 18,
              sex: 1,
              address: '湖北省武汉市',
              phone: '13477725227',
              email: '13477725227@163.com'
            },
            token: 'SDFLasdasdkjasdasKJASLKdasdaDASHDAS'
          }
        }
      } else {
        return {
          code: 500,
          message: '用户名或密码错误'
        }
      }
    }
  },
  {
    url: '/logout',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok'
      }
    }
  },
  {
    url: '/api/menu',
    method: 'get',
    response: () => {
      return {
        status: 200,
        message: 'ok',
        data: menu
      }
    }
  },
  {
    url: '/guide',
    method: 'post',
    response: (config) => {
      let body = config.body
      let arr = guide
      let [index, size, total] = [body.pagenum, body.pagesize, arr.length]
      let len: number = total / size
      let totalPages: number = len - parseInt(`${len}`) > 0 ? parseInt(`${len}`) + 1 : len
      let newDataList = arr.slice((index - 1) * size, index * size)
      return {
        status: 200,
        message: 'ok',
        data: {
          pagenum: index,
          pagesize: size,
          content: newDataList,
          total: total,
          totalPages: totalPages
        }
      }
    }
  },
  {
    url: '/question',
    method: 'get',
    response: () => {
      return {
        status: 200,
        message: 'ok',
        data: Mock.mock({
          'questions|6': [
            {
              id: '@increment(1)',
              question: '@csentence(20,30)' + '?',
              answer: `@cparagraph(3,10)`
            }
          ]
        })
      }
    }
  },
  {
    url: '/education/classes',
    method: 'post',
    response: ({ body }) => {
      let data: IClass[] = []
      if (!body || (body.class_name == '' && body.major == '' && body.headmaster == '')) {
        data = classes.classList
      } else {
        data = [
          ...classes.classList.filter((v) => v.class_name == body.class_name),
          ...classes.classList.filter((v) => v.major == body.major),
          ...classes.classList.filter((v) => v.headmaster == body.headmaster)
        ]
      }
      return {
        status: 200,
        data
      }
    }
  },
  {
    url: '/education/classes/add',
    method: 'post',
    response: ({ body }) => {
      console.log(body)
      let data: IClass[] = [body as IClass, ...classes.classList]
      return {
        status: 200,
        data
      }
    }
  },
  {
    url: '/education/classes/emit',
    method: 'post',
    response: ({ body }) => {
      console.log(body)
      let data = classes.classList.map((v) => {
        if (v.id == body.id) {
          v = body as IClass
        }
        return v
      })

      return {
        status: 200,
        data
      }
    }
  }
]

export default mock

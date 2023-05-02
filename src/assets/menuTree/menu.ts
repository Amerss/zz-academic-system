import type { IMenu } from '@/typings'

export const menu: IMenu[] = [
  {
    id: 1,
    name: '首页',
    path: '/index',
    children: [
      {
        id: 1,
        name: '管理中心',
        path: '/home'
      },
      {
        id: 2,
        name: '个人中心',
        path: '/center'
      }
    ]
  },
  {
    id: 2,
    name: '教学管理',
    path: '/education',
    children: [
      {
        id: 1,
        name: '班级管理',
        path: '/class'
      },
      {
        id: 2,
        name: '学生管理',
        path: '/student'
      },
      {
        id: 3,
        name: '课程管理',
        path: '/schedule'
      },
      {
        id: 4,
        name: '在校教师',
        path: '/log'
      },
      {
        id: 5,
        name: '我的测试卷',
        path: '/test'
      }
    ]
  },
  {
    id: 3,
    name: '校园招聘',
    path: '/recruit',
    children: [
      {
        id: 1,
        name: '招聘信息',
        path: '/info'
      }
    ]
  },
  {
    id: 4,
    name: '时光机',
    path: '/history',
    children: [
      {
        id: 1,
        name: '我们的时光',
        path: '/photo'
      }
    ]
  }
]

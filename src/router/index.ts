import { ElMessage } from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    component: () => import('@/views/login/LoginView.vue')
  },
  // 首页
  {
    path: '/index',
    component: () => import('@/views/IndexView.vue'),
    redirect: '/index/home',
    meta: {
      name: '首页'
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/index/HomePageView.vue'),
        meta: {
          name: '管理中心'
        }
      },
      {
        path: 'center',
        component: () => import('@/views/index/CenterView.vue'),
        meta: {
          name: '个人中心'
        }
      }
    ]
  },
  // 教学管理
  {
    path: '/education',
    component: () => import('@/views/IndexView.vue'),
    meta: {
      name: '教学管理'
    },
    redirect: '/education/class',
    children: [
      {
        path: 'class',
        component: () => import('@/views/education/MyClass.vue'),
        meta: {
          name: '班级管理'
        }
      },
      {
        path: 'student',
        component: () => import('@/views/education/StudentsTable.vue'),
        meta: {
          name: '学生管理'
        }
      },
      {
        path: 'schedule',
        component: () => import('@/views/education/ScheduleView.vue'),
        meta: {
          name: '课程管理'
        }
      },
      {
        path: 'test',
        component: () => import('@/views/education/MyTestView.vue'),
        meta: {
          name: '我的测试卷'
        }
      },
      {
        path: 'log',
        component: () => import('@/views/education/LogView.vue'),
        meta: {
          name: '在校教师'
        }
      }
    ]
  },
  // 校园招聘
  {
    path: '/recruit',
    component: () => import('@/views/IndexView.vue'),
    redirect: '/recruit/info',
    meta: {
      name: '校园招聘'
    },
    children: [
      {
        path: 'info',
        component: () => import('@/views/recruit/RecruitView.vue'),
        meta: {
          name: '招聘信息'
        }
      }
    ]
  },
  // 时光机
  {
    path: '/history',
    component: () => import('@/views/IndexView.vue'),
    redirect: '/history/photo',
    children: []
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if (localStorage.getItem('token')) {
    next()
  } else {
    next('/login')
    ElMessage({
      message: '请先登录',
      type: 'error'
    })
  }
})

export default router

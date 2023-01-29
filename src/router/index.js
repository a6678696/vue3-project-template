import { createRouter, createWebHistory } from 'vue-router'

let history = createWebHistory()
let routes = [
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('@/view/404/index.vue')
    },
    {
        path: '/',
        name: 'login',
        component: () => import('@/view/login/index.vue')
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('@/view/main/index.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/userManage',
        name: 'userManage',
        component: () => import('@/view/userManage/index.vue'),
        meta: {
            requireAuth: true
        }
    }
]

export default createRouter({ history, routes })
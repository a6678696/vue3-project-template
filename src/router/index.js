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
    }
]

const router = createRouter({ history, routes })

router.beforeEach((to, from, next) => {
    //token用于判断用户是否登录
    let token = window.sessionStorage.getItem('token');
    //判断该路由是否需要登录权限,不需要直接跳转
    if (!to.meta.requireAuth) {
        //用户已经登录的话不准跳转到登录页面
        if (to.path === '/') {
            if (token !== null) {
                next('/main');
            }
        }
        next();
    } else {
        if (token === null) {
            next('/');
        } else {
            next();
        }
    }
})

export default router
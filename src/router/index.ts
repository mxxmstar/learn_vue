import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Signup  from '../pages/signup/signup.vue'
import Login  from '../pages/login/login.vue'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    // 添加默认路由定向到登录页面
    {
        path: '/',
        redirect: '/login'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Signup  from '../pages/signup/signup.vue'
import Login  from '../pages/login/login.vue'
import View from '../pages/pic_stream/view.vue'
import TestBackBtn from '../pages/test/TestBackBtn.vue'
import Manage from '../pages/Manage/index.vue'
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
    {
        path: '/view',
        name: 'View',
        component: View
    },
    // 添加默认路由定向到登录页面
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/test-back-btn',
        component: TestBackBtn
    },
    {
        path: '/overview',
        name: 'Overview',
        component: Manage,
        meta: {
            title: '管理后台'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Signup  from '../pages/signup/signup.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
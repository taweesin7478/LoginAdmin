import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../views/Layout.vue'
import User from '../views/User.vue'
import Feedback from '../views/Feedback.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '*',
            name: 'wildcard',
            redirect: '/'
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/',
            component: Login
        },
        {
            path: '',
            name: 'layout',
            component: Layout,
            children: [
                { path: '/User', name: 'User', component: User, meta: { requiresAuth: true } },
                { path: '/Feedback', name: 'Feedback', component: Feedback, meta: { requiresAuth: true } },
            ]
        },
    ]
})
export default router
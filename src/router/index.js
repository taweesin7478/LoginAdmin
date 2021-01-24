import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../views/Layout.vue'
import User from '../views/User.vue'
import Test from '../views/Test.vue'
import Dashboard from '../views/Dashboard.vue'

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
                { path: '/Test', name: 'Test', component: Test, meta: { requiresAuth: true } },
                { path: '/Dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
            ]
        },
    ]
})
export default router
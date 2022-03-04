import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../views/Layout.vue'
import User from '../views/User.vue'
import Test from '../views/Test.vue'
import Admin from '../views/Admin.vue'
import Remove from '../views/Remove.vue'
import Dashboard from '../views/Dashboard.vue'
import Uncode from '../views/Uncode.vue'
import Test2 from '../views/Test2.vue'

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
                { path: '/Admin', name: 'Admin', component: Admin, meta: { requiresAuth: true } },
                { path: '/Test', name: 'Test', component: Test, meta: { requiresAuth: true } },
                { path: '/Test2', name: 'Test2', component: Test2, meta: { requiresAuth: true } },
                { path: '/Remove', name: 'Remove', component: Remove, meta: { requiresAuth: true } },
                { path: '/Uncode', name: 'Uncode', component: Uncode, meta: { requiresAuth: true } },
                { path: '/Dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
            ]
        },
    ]
})
export default router
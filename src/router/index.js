import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'

const routes = [{
        path: '/countries',
        // redirect: '/countries',
        name: 'countries',
        component: Home,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/cities',
        name: 'cities',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/',
        name: 'login',
        component: login
    },
    // {
    //     path: '/:id/cities',
    //     name: 'city',
    //     component: city

    // }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('accessToken') == null) {
            next({
                path: '/',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
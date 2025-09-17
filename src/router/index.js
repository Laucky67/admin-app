import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('@/views/Main.vue'),
        redirect: '/home',
        children:[
            {
                path: 'home',
                name: 'Home',
                component: () => import('@/views/Home.vue')
            },
            {
                path: 'products',
                name: 'Products',
                component: () => import('@/views/Products.vue')
            },
        ]
    },
    {
        path: '/data-visualization',
        name: 'DataVisualization',
        component: () => import('@/views/DataVisualization.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
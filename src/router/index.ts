import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

function getChildrenRoute() {
    const view = import.meta.globEager('../view/controller/*vue')
    const routes = [
        {
            path: '/',
            name: 'main',
            component: () => import('../view/main.vue')
        },
        {
            path: '/detail',
            name: 'detail',
            component: () => import('../view/controller/detail.vue'),
            children: getChildrenRoutes()
        },
        {
            path: '/institution',
            name: 'institution',
            component: () => import('../view/controller/institution.vue'),
            children: getChildrenRouters()
        },
    ] as RouteRecordRaw[]
    Object.entries(view).forEach(([file, module]) => {
        const route = getRouteByModule(file, module)
        if (route.name != 'detail' && route.name != 'institution') {
            routes.push(route)
        }

    })
    return routes
}
function getChildrenRoutes() {
    const view = import.meta.globEager('../view/controller/gamedetail/*.vue')
    const routes = [
    ] as RouteRecordRaw[]
    Object.entries(view).forEach(([file, module]) => {
        const route = getRouteByModule(file, module)
        routes.push(route)
    })
    return routes
}
function getChildrenRouters() {
    const view = import.meta.globEager('../view/controller/institution/*.vue')
    const routes = [
        // {
        //     path: '/rule',
        //     name: 'rule',
        //     component: () => import('../view/controller/gamedetail/rule.vue')
        // },
    ] as RouteRecordRaw[]
    Object.entries(view).forEach(([file, module]) => {
        const route = getRouteByModule(file, module)
        // if (route.name != 'rule') {
        routes.push(route)
        // }
    })
    return routes
}
function getRouter() {
    const view = import.meta.globEager('../view/*.vue')
    const routes = [
        {
            path: '/',
            name: 'home',
            component: () => import('../view/home.vue'),
            children: getChildrenRoute()
        },

    ] as RouteRecordRaw[]
    Object.entries(view).forEach(([file, module]) => {
        const route = getRouteByModule(file, module)
        if (route.name != 'home' && route.name != 'main') {
            routes.push(route)
        }
    })
    console.log(routes)
    return routes
}


function getRouteByModule(file: string, module: { [key: string]: any }) {
    const name = file.split('/').pop()?.split('.').shift()
    const route = {
        path: `/${name}`,
        name,
        component: module.default
    } as RouteRecordRaw
    return route
}

const router = createRouter({
    history: createWebHistory(),
    routes: getRouter(),

})

export default router

// 导航守卫
import { storage } from '../plugin/storage'
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {

    if (to.path === "/login" || to.path === "/reg") {
        sessionStorage.clear()
        next();
    } else {
        const uid = sessionStorage.getItem('uid')
        // console.log(sessionStorage.getItem('uid'), storage.get('uid'));
        if (uid === undefined || uid === null) {
            next("/login");
        } else {
            next();
        }
    }

});
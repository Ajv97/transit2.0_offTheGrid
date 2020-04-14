import Vue from "vue";
import Router from "vue-router";
import Buses from "../views/Buses.vue";
import BusesActive from "../views/BusesActive";
import BusesInactive from "../views/BusesInactive";
import Dashboard from "../views/Dashboard.vue";
import Admins from "../views/Admins.vue";
import Routes from "../views/Routes.vue";
import {store} from '../store/store'
import RoutesActive from "../views/RoutesActive";
import RoutesInactive from "../views/RoutesInactive";

Vue.use(Router);

const routes = [
    {
        path: "/",
        name: "",
        component: Dashboard,
        meta: {
            nav: true,
            requiresAuth: true
        }
    },
    {
        path: "/buses/all",
        name: "Buses",
        component: Buses,
        meta: {
            nav: true,
            requiresAuth: true
        }
    },
    {
        path: "/buses/active",
        name: "Buses",
        component: BusesActive,
        meta: {
            nav: true,
            requiresAuth: true
        }
    },
    {
        path: "/buses/inactive",
        name: "Buses",
        component: BusesInactive,
        meta: {
            nav: true,
            requiresAuth: true
        }
    },
    {
        path: "/admins",
        name: "Admins",
        component: Admins,
        meta: {
            nav: true,
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: "/routes/all",
        name: "Routes",
        component: Routes,
        meta: {
            nav: true,
            requiresAuth: true
        }
    },
    {
        path: "/routes/active",
        name: "Routes",
        component: RoutesActive,
        meta: {
            nav: true,
            requiresAuth: true
        }
    },
    {
        path: "/routes/inactive",
        name: "Routes",
        component: RoutesInactive,
        meta: {
            nav: true,
            requiresAuth: true
        }
    },
    {
        path: "/dispatchers",
        name: "Dispatchers",
        component: () =>
            import("../views/Dispatchers.vue"),
        meta: {
            nav: true,
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import("../views/Login.vue"),
        meta: {
            nav: false
        }
    },
    {
        path: "/registerpage",
        name: "Register",
        component: () =>
            import("../views/registerPage.vue"),
        meta: {
            nav: true,
            requiresAuth: true,
            requiresAdmin: true
        }
    }
];

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    let requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
    let admin = store.getters.admin;
    let token = store.getters.token;
    // when route requires auth and there's no current user, redirect to '/login'
    console.log(requiresAuth, " ", token)
    if (requiresAuth && !token) {
        next('/login');
        // when we go to login route and are already logged in, we can skip this page
        // so we redirect to the homepage
    } //else if (to.path === '/login' && token) {
      //next('/dashboard');
    //}
    else if (to.path === '/registerpage' && requiresAdmin && token && admin) {
        next('/registerpage');
    } else if (to.path === '/Dispatchers' && requiresAdmin && token && admin) {
        next('/Dispatchers')
    } else if (to.path === '/Admins' && requiresAdmin && token && admin) {
        next('/Admins')
    } else {
        next();
    }
});

export default router;

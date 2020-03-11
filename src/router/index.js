import Vue from "vue";
import Router from "vue-router";
import Buses from "../views/Buses.vue";
import Dashboard from "../views/Dashboard.vue";
import Admins from "../views/Admins.vue";
import Routes from "../views/Routes.vue";

Vue.use(Router);


const router = new Router({
    routes: [
        {
            path: "/",
            name: "",
            component: Dashboard,
            meta: {
                nav: true
            }
        },
        {
            path: "/buses/*",
            name: "Buses",
            component: Buses,
            meta: {
                nav: true
            }
        },
        {
            path: "/admins",
            name: "Admins",
            component: Admins,
            meta: {
                nav: true
            }
        },
        {
            path: "/routes/*",
            name: "Routes",
            component: Routes,
            meta: {
                nav: true
            }
        },
        {
            path: "/dispatchers",
            name: "Dispatchers",
            component: () =>
                import("../views/Dispatchers.vue"),
            meta: {
                nav: true
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
        }
    ]
});

// router.beforeEach((to, from, next) => {
//     let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//     let token = localStorage.getItem("ISToken");
//     // when route requires auth and there's no current user, redirect to '/login'
//     if (requiresAuth && !token) {
//         next('/login');
//         // when we go to login route and are already logged in, we can skip this page
//         // so we redirect to the homepage
//     } else if (to.path === '/login' && token) {
//         next('/');
//     } else {
//         next();
//     }
// });

export default router;

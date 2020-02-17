import Vue from "vue";
import VueRouter from "vue-router";
import Buses from "../views/Buses.vue";
import Dashboard from "../views/Dashboard.vue";
import Admins from "../views/Admins.vue";
import Routes from "../views/Routes.vue";

Vue.use(VueRouter);

const routes = [
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
];

const router = new VueRouter({
    routes
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch((err) => err);
};

const Index = () => import("@/views/horse/Index.vue");
const List = () => import("@/views/horse/HorseList.vue");
const Single = () => import("@/views/horse/HorseSingle.vue");

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "list", path: "/list", component: List },
    { name: "single", path: "/:id([0-9]_\\d+)", component: Single },
];

const router = new VueRouter({
    mode: "history",
    base: "/horse",
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.fullPath.includes("/#")) {
        next(to.fullPath.replace("/#", ""));
    }
    next();
});

export default router;

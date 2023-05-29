import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch((err) => err);
};

const Index = () => import("@/views/exam/Index.vue");
const Paper = () => import("@/views/exam/Paper.vue");
const Question = () => import("@/views/exam/Question.vue");

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "paper", path: "/paper/:id?", component: Paper },
    { name: "question", path: "/question/:id?", component: Question },
];

const router = new VueRouter({
    routes,
    base: "/exam",
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                x: 0,
                y: 0,
            };
        }
    },
});
router.beforeEach((to, from, next) => {
    if (to.fullPath.includes("/#")) {
        next(to.fullPath.replace("/#", ""));
    }
    next();
});
export default router;

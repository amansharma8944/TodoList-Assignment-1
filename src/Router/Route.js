import LoginPage from "@/components/login/LoginPage.vue";
import PageNotFound from "@/components/pagenotfound/PageNotFound.vue";
import TodoComponent from "@/components/TodoComponent.vue";
import { auth } from "@/firebase/firebase";
import Vue from "vue";
import VueRouter from "vue-router";
// import { component } from "vue/types/umd";
// import Home from "@/views/Home.vue";
// import About from "@/views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "homepage",
    component: TodoComponent,
    meta: {
      requiredAuth: true,
    },
  },
  { path: "/loginPage", name: "loginpage", component: LoginPage },

  {
    path: "*",
    component: PageNotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        next();
      } else {
        next("/loginpage");
      }
    });
  } else {
    next();
  }
});

export default router;

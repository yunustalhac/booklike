import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";
const routes = [
  {
    name: "HomePage",
    path: "/",
    component: () => import("@/views/homePage.vue")
  },
  {
    name: "LoginPage",
    path: "/login",
    component: () => import("@/views/loginPage.vue")
  },
  {
    name: "RegisterPage",
    path: "/register",
    component: () => import("@/views/registerPage.vue")
  },
  {
    name: "NewBookmarkPage",
    path: "/new",
    component: () => import("@/views/NewBookmark")
  },
  {
    name: "Favorites",
    path: "/favorites",
    meta: {
      componentName: "appBookmarkList"
    },
    component: () => import("@/views/accauntPage.vue")
  },
  {
    name: "Likes",
    path: "/likes",
    meta: {
      componentName: "appBookmarkList"
    },
    component: () => import("@/views/accauntPage.vue")
  },
  {
    name: "Settings",
    path: "/settings",
    meta: {
      componentName: "userSettings"
    },
    component: () => import("@/views/accauntPage.vue")
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

router.beforeEach((to, _, next) => {
  const authRequiredRoutes = ["HomePage"];
  const authNotRequiredRoutes = ["LoginPage", "RegisterPage"];
  const _isAuthenticated = store.getters._isAuthenticated;

  if (authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next(false);

  if (authRequiredRoutes.indexOf(to.name) > -1) {
    if (_isAuthenticated) next();
    else next({ name: "LoginPage" });
  } else {
    next();
  }
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Overview from "../views/Overview.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/overview",
    name: "Overview",
    component: Overview,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

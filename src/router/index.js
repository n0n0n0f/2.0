import { createRouter, createWebHistory } from 'vue-router'
import CatalogPage from "@/pages/CatalogPage.vue";
import OrderPage from "@/pages/OrderPage.vue";
import BasketPage from "@/pages/BasketPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegistrationPage from "@/pages/RegistrationPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: CatalogPage
    },
    {
      path: '/order',
      name: 'order',
      component: OrderPage
    },
    {
      path: '/basket',
      name: 'basket',
      component: BasketPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationPage
    },
  ]
})

export default router
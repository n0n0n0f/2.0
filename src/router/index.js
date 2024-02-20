import { createRouter, createWebHistory } from 'vue-router'
import CatalogPage from "@/views/CatalogPage.vue";
import OrderPage from '@/views/OrderPage.vue';
import BasketPage from "@/views/BasketPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: CatalogPage
    },
    {
      path: '/orders',
      name: 'orders',
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
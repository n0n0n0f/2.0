<template>
  <div>
    <h2>Оформленные товары</h2>
    <div v-if="orders.length === 0">
      <p>У вас пока нет оформленных заказов.</p>
    </div>
    <div v-else>
      <div v-for="order in orders" :key="order.id" class="order">
        <p>Заказ №{{ order.id }}</p>
        <ul>
          <li v-for="item in order.cartItems" :key="item.id">
            {{ item.name }} - {{ item.quantity }} шт.
          </li>
        </ul>
        <p>Общая стоимость: {{ order.total }}</p>
      </div>
    </div>
    <router-link to="/">Назад</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Получаем список оформленных заказов из хранилища Vuex
const orders = computed(() => store.state.orders);

</script>

<style scoped>
/* Стили для страницы оформленных товаров */
.order {
  margin-bottom: 20px;
}
</style>

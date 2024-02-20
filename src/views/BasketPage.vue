<template>
  <div class="cart">
    <div v-for="item in cartItems" :key="item.id">
      <img :src="item.image" :alt="item.name" width="100">
      <p>{{ item.name }}</p>
      <p>Цена: {{ item.price }}</p>
      <p>Количество: {{ item.quantity }}</p>
      <button @click="increaseQuantity(item.id)">+</button>
      <button @click="decreaseQuantity(item.id)">-</button>
      <button @click="removeFromCart(item.id)">Удалить</button>
    </div>
    <p>Общая стоимость: {{ total }}</p>
    <button @click="checkout">Оформить заказ</button>
    <router-link to="/">Назад</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const cartItems = computed(() => store.state.cartItems);
const total = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
});

const increaseQuantity = (itemId) => {
  store.commit('increaseQuantity', itemId);
};

const decreaseQuantity = (itemId) => {
  store.commit('decreaseQuantity', itemId);
};

const removeFromCart = (itemId) => {
  store.commit('removeFromCart', itemId);
};

const checkout = () => {
  // Здесь можно добавить логику оформления заказа
  router.push('/orders');
};
</script>

<style scoped>
/* Стили для корзины */
</style>

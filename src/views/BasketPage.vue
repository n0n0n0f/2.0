<template>
  <div class="cart">
    <div v-for="item in cartItems" :key="item.id">
      <p>{{ item.name }}</p>
      <p>Цена: {{ item.price }}</p>
      <p>Количество: {{ item.quantity }}</p>
      <button @click="increaseQuantity(item)">+</button>
      <button @click="decreaseQuantity(item)">-</button>
      <button @click="removeFromCart(item)">Удалить</button>
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

const increaseQuantity = (item) => {
  store.commit('increaseQuantity', item.id);
};

const decreaseQuantity = (item) => {
  store.commit('decreaseQuantity', item.id);
};

const removeFromCart = (item) => {
  store.commit('removeFromCart', item.id);
};

const checkout = () => {
  // Здесь можно добавить логику оформления заказа
  router.push('/orders');
};
</script>

<style scoped>
/* Стили для корзины */
</style>

<template>
  <div class="basket-page">
    <div v-if="cartItems.length === 0">
      <p>Ваша корзина пуста.</p>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id">
        <img class="product_image" :src="item.image" :alt="item.name">
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
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const cartItems = computed(() => store.state.cartItems || []); // Добавляем проверку на существование cartItems
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
  store.dispatch('placeOrder').then(() => {
    router.push('/orders'); // Переход на страницу оформленных заказов после успешного оформления заказа
  }).catch(error => {
    console.error('Ошибка при оформлении заказа:', error);
    // Обработка ошибки при оформлении заказа
  });
};
</script>

<style scoped>
.product_image{
  width: 200px;
  height: 200px;
}
</style>

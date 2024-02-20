<template>
  <div class="checkout-page">
    <h1>Оформление заказа</h1>
    <div v-if="cartItems.length === 0 && !checkoutEnabled">
      <p>Ваша корзина пуста.</p>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img  :src="item.image" :alt="item.name" class="cart-item-image">
        <h2 class="cart-item-name">{{ item.name }}</h2>
        <p class="cart-item-quantity">Количество: {{ item.quantity }}</p>
      </div>
      <button @click="checkout" class="checkout-btn">Подтвердить заказ</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const cartItems = computed(() => store.state.cartItems);
const checkoutEnabled = ref(false);
const orderPageActive = ref(false);

const checkout = () => {
  const order = [...cartItems.value];
  store.commit('clearCart');
  store.commit('addOrder', order);
  router.push('/order');
};
</script>

<style scoped>
.cart-item-image{
  width: 200px;
  height: 200px;
}
</style>
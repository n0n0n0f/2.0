<template>
  <div class="checkout-page">
    <h1 class="title-basket">Оформление заказа</h1>
    <div v-if="cartItems.length === 0 && !checkoutEnabled">
      <p>Ваша корзина пуста.</p>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="order-card">
        <img :src="item.image" :alt="item.name" class="product_image">
        <div class="order-details">
          <p>{{ item.name }}</p>
          <p>Количество: {{ item.quantity }}</p>
        </div>
      </div>
      <div class="checkout-btn-container">
        <button @click="checkout" class="checkout-btn">Подтвердить заказ</button>
      </div>
      <router-link to="/" class="back-link">Назад</router-link>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

const store = useStore();
const router = useRouter();

const cartItems = computed(() => store.state.cartItems);
const checkoutEnabled = ref(false);

const checkout = () => {
  const order = [...cartItems.value];
  store.commit('clearCart');
  store.commit('addOrder', order);
  router.push('/order');
};
</script>

<style scoped>
.checkout-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.title-basket {
  color: #8B4513;
}

.order-card {
  background-color: #c0a68f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: #D3AA8BFF;
  display: flex;
  align-items: center;
  gap: 20px;
  width: 500px;
  margin-bottom: 15px;
  margin-top: 20px;
}

.product_image {
  max-width: 150px;
  height: 150px;
}

.order-details {
  flex-grow: 1;
}

.checkout-btn-container {
  display: flex;
  justify-content: center;
}

.checkout-btn {
  padding: 10px 20px;
  background-color: #A0522D;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 40px;
}

.checkout-btn:hover {
  background-color: #A0522D;
}

.back-link {
  color: #A0522D;
  text-decoration: none;
}

</style>
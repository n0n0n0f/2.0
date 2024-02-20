<template>
  <div class="cart">
    <div v-if="cartItems.length === 0">
      <p>Ваша корзина пуста.</p>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="order-card">
        <img class="product_image" :src="item.image" :alt="item.name">
        <div class="order-details">
          <p>{{ item.name }}</p>
          <p>Цена: {{ item.price }}</p>
          <p>Количество: {{ item.quantity }}</p>
        </div>
        <div class="buttons">
          <button @click="increaseQuantity(item.id)">+</button>
          <button @click="decreaseQuantity(item.id)">-</button>
          <button @click="removeFromCart(item.id)">Удалить</button>
        </div>
      </div>
      <div class="footer">
        <p class="total">Общая стоимость: {{ total }}</p>
        <button @click="activateOrderPage" class="checkout-btn">Оформить заказ</button>
        <router-link to="/" class="back-link">Назад</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const cartItems = computed(() => store.state.cartItems || []);
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

const activateOrderPage = () => {
  store.commit('setOrderPageActive', true);
  router.push('/orders');
};
</script>
<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  align-items: center;
}

.order-card {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  width: 500px;
}

.product_image {
  max-width: 150px;
}

.order-details {
  flex-grow: 1;
}

.buttons button {
  padding: 5px 10px;
  border: none;
  background-color: #A0522D;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 2px;
}

.buttons button:hover {
  background-color: #A0522D;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.total {
  font-weight: bold;
  color: #8B4513;
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

.back-link:hover {
  text-decoration: underline;
}
</style>
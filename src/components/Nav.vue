<template>
  <div class="nav-block">
    <nav class="nav-list">
      <router-link to="/">Каталог</router-link>
      <router-link v-if="isAuthenticated" to="/orders">Оформленные товары</router-link>
      <router-link to="/basket">Корзина ({{ totalItemsInCart }})</router-link>
    </nav>
    <div>
      <div v-if="isAuthenticated">
        <div v-if="currentUser">
          {{ currentUser.email }}
          <button @click="logout">Выход</button>
        </div>
        <div v-else>
          <!-- Пользователь авторизован, но информация о пользователе не доступна -->
          <p>Добро пожаловать!</p>
          <button @click="logout">Выход</button>
        </div>
      </div>
      <div v-else>
        <!-- Пользователь не авторизован -->
        <router-link to="/login">Вход</router-link>
        <router-link to="/registration">Регистрация</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const totalItemsInCart = computed(() => {
  if (!store.state.cartItems) return 0; // Проверяем существование cartItems
  return store.state.cartItems.reduce((total, item) => total + item.quantity, 0);
});

const isAuthenticated = computed(() => store.state.isAuthenticated);
const currentUser = computed(() => store.state.currentUser);

const logout = () => {
  store.dispatch('logoutUser');
};
</script>
<style scoped>
.nav-block {
  display: flex;
  justify-content: space-between;
}

.nav-list {
  display: flex;
  gap: 10px;
}

.nav-list .item {
  background: none;
  padding: 10px 20px;
  cursor: pointer;
}
</style>

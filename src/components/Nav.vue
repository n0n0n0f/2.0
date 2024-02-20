<template>
  <div class="nav-block">
    <nav class="nav-list">
      <item @click="$router.push('/')">Каталог</item>
      <item @click="$router.push('/basket')">Корзина ({{ totalItemsInCart }})</item>
    </nav>
    <div>
      <div v-if="isAuthenticated">
        <div v-if="currentUser">
          {{ currentUser.email }}
          <button @click="logout">Выход</button>
        </div>
        <div v-else>
          <div class="welcome">
          <p>Добро пожаловать!</p>
          <button @click="logout" class="nav-btn">Выход</button>
          </div>
        </div>
      </div>
      <div v-else>
        <router-link to="/login" class="nav-btn">Вход</router-link>
        <router-link to="/registration" class="nav-btn">Регистрация</router-link>
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
  align-items: center;
}

.nav-list {
  display: flex;
  gap: 10px;
}

.nav-list .item {
  background: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  color: #301801;
}

.nav-list .item:hover {
  background-color: #DEB887;
  color: white;
}

/* Выравниваем кнопки по вертикали */
.nav-list .item,
nav > div {
  display: flex;
  align-items: center;
}

/* Фон вокруг кнопок */
nav > div {
  background-color: #f8f9fa;
  padding: 5px;
  border-radius: 10px;
}

/* Стили для кнопок входа, регистрации и выхода */
.nav-btn {
  background-color: #A0522D;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

.nav-btn:hover {
  background-color: #8B4513;
}

/* Стили для надписи "Добро пожаловать!" */
.welcome {
  display: flex;
  align-items: center;
  color: #301801;
}

/* Отступ между надписью и кнопкой */
.welcome p {
  margin-right: 10px;
}
</style>

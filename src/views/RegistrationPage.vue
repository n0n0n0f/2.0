<template>
  <div v-if="!isLoggedIn">
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
  <div v-else>
    <p>Вы уже авторизованы.</p>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import api from '@/services/api'; // Импорт вашего API

const store = useStore();
const email = ref('');
const password = ref('');

const isLoggedIn = computed(() => !!store.state.currentUser);

const register = async () => {
  try {
    const user = { email: email.value, password: password.value };
    const token = await api.register(user); // Используем ваш API для регистрации
    store.commit('setUser', token); // Сохраняем токен пользователя в хранилище Vuex
    // Переход на другую страницу, например, на главную страницу
    router.push({ name: 'catalog' });
  } catch (error) {
    console.error('Ошибка регистрации:', error.message);
  }
};
</script>

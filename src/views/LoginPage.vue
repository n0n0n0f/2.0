<template>
  <div>
    <h2>Вход</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Войти</button>
      <router-link v-if="!isLoggedIn" to="/registration">Регистрация</router-link>
    </form>
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

const login = async () => {
  try {
    const user = { email: email.value, password: password.value };
    const token = await api.login(user); // Используем ваш API для аутентификации
    store.commit('setUser', token); // Сохраняем токен пользователя в хранилище Vuex
    // Переход на другую страницу, например, на главную страницу
    router.push({ name: 'catalog' });
  } catch (error) {
    console.error('Ошибка входа:', error.message);
  }
};
</script>
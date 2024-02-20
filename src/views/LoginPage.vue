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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const login = async () => {
  try {
    const user = { email: email.value, password: password.value };
    await store.dispatch('loginUser', user);
    // Перенаправляем пользователя на главную страницу после успешного входа
    router.push('/');
  } catch (error) {
    console.error('Ошибка входа:', error.message);
  }
};
</script>
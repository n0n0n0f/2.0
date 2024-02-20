<template>
  <div>
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
</template>

<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';
import api from '@/services/api';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const register = async () => {
  try {
    const user = { email: email.value, password: password.value };
    await api.register(user); // Используем ваш API для регистрации
    // Перенаправляем пользователя на главную страницу после успешной регистрации
    router.push('/');
  } catch (error) {
    console.error('Ошибка регистрации:', error.message);
  }
};
</script>

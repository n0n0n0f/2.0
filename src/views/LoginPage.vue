<template>
  <div class="login-form">
    <h2>Вход</h2>
    <form @submit.prevent="login">
      <div class="form-group" :class="{ 'has-error': emailError }">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required @input="validateEmail">
        <span v-if="emailError" class="error-message">Неверный формат email</span>
      </div>
      <div class="form-group" :class="{ 'has-error': passwordError }">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required @input="validatePassword">
        <span v-if="passwordError" class="error-message">Пароль должен быть не менее 6 символов</span>
      </div>
      <button type="submit" class="login-btn">Войти</button>
      <router-link v-if="!isLoggedIn" to="/registration" class="register-link">Зарегистрироваться</router-link>
      <div class="button-group">
        <router-link class="back-btn" to="/">Назад</router-link>
      </div>
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
const emailError = ref(false);
const passwordError = ref(false);

const isLoggedIn = computed(() => !!store.state.currentUser);

const validateEmail = () => {
  // Пример простой валидации email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = !emailPattern.test(email.value);
};

const validatePassword = () => {
  passwordError.value = password.value.length < 6;
};

const login = async () => {
  try {
    const user = { email: email.value, password: password.value };
    const token = await api.login(user); // Используем ваш API для аутентификации
    store.commit('setUser', token); // Сохраняем токен пользователя в хранилище Vuex
    router.push({ name: 'catalog' });
  } catch (error) {
    console.error('Ошибка входа:', error.message);
  }
};

</script>

<style scoped>
.login-form {
  width: 300px;
  margin: 15px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #FFE4C4;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
  width: 250px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.has-error input[type="email"],
.has-error input[type="password"] {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
}

.login-btn {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #A0522D;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #8B4513;
}

.register-link {
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #A0522D;
}

.back-btn {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: #8B4513;
  margin-top: 10px;
}

.button-group {
  margin-top: 10px;
}
</style>
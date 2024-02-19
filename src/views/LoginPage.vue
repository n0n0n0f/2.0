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
      <router-link to="/registration">Регистрация</router-link>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  setup() {
    const store = useStore();
    const email = ref('');
    const password = ref('');

    const login = () => {
      console.log('Trying to login...');
      const user = { email: email.value, password: password.value };
      console.log('User:', user);
      store.dispatch('loginUser', user)
          .then(() => console.log('Login successful'))
          .catch(error => console.error('Login error:', error));
    };}}

</script>

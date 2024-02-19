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

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  setup() {
    const store = useStore();
    const email = ref('');
    const password = ref('');

    const register = () => {
      const user = { email: email.value, password: password.value };
      store.dispatch('loginUser', user); // Пока что использовал loginUser, потом замените на registerUser
    };

    return { email, password, register };
  }
};
</script>

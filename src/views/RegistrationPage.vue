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
import { useRouter } from 'vue-router'; // Импортируем useRouter из vue-router

export default {
  setup() {
    const store = useStore();
    const router = useRouter(); // Получаем объект router

    const email = ref('');
    const password = ref('');

    const register = async () => {
      try {
        const user = { email: email.value, password: password.value };
        await store.dispatch('registerUser', user); // Ожидаем завершения регистрации

        // После успешной регистрации перенаправляем пользователя на страницу входа
        router.push({ name: 'login' }); // Переход на страницу с именем 'login'
      } catch (error) {
        console.error('Ошибка регистрации:', error);
      }
    };

    return { email, password, register };
  }
};
</script>
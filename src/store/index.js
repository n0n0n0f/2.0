// store/index.js
import { createStore } from 'vuex';
import api from '@/services/api'; // Импортировать ваш сервис API

const store = createStore({
  state() {
    return {
      currentUser: null, // Включить currentUser в начальное состояние
      cartItems: [],
    };
  },
  mutations: {
    setUser(state, user) {
      state.currentUser = user;
    },
    clearUser(state) {
      state.currentUser = null;
      state.cartItems = []; // Очистить cartItems при выходе
    },
  },
  actions: {
    async loginUser({ commit }, user) {
      try {
        const authenticatedUser = await api.login(user); // Использовать сервис API для аутентификации
        commit('setUser', authenticatedUser);
      } catch (error) {
        console.error('Ошибка входа:', error);
        throw error;
      }
    },
    async registerUser({ commit }, user) {
      try {
        const registeredUser = await api.register(user); // Использовать сервис API для регистрации
        commit('setUser', registeredUser);
      } catch (error) {
        console.error('Ошибка регистрации:', error);
        throw error;
      }
    },
    logoutUser({ commit }) {
      commit('clearUser');
    },
  },
});

export default store;

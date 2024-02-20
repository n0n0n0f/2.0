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
    addToCart(state, newItem) {
      const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id);
      if (existingItemIndex !== -1) {
        // Если товар уже есть в корзине, увеличиваем его количество
        state.cartItems[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Если товара нет в корзине, добавляем его
        state.cartItems.push(newItem);
      }
      // Обновляем состояние с помощью Vue.set
      state.cartItems = [...state.cartItems];
    },
    // Мутация для удаления товара из корзины
    removeFromCart(state, itemId) {
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
    },
    // Мутация для увеличения количества товара в корзине
    increaseQuantity(state, itemId) {
      const item = state.cartItems.find(item => item.id === itemId);
      if (item) {
        item.quantity++;
        // Обновляем состояние с помощью Vue.set
        state.cartItems = [...state.cartItems];
      }
    },
    // Мутация для уменьшения количества товара в корзине
    decreaseQuantity(state, itemId) {
      const item = state.cartItems.find(item => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
        // Обновляем состояние с помощью Vue.set
        state.cartItems = [...state.cartItems];
      }
    },
    setUser(state, user) {
      state.currentUser = user;
    },
    clearUser(state) {
      state.currentUser = null;
      state.cartItems = []; // Очистить cartItems при выходе
    },
  },
  actions: {
    async addToCart({ commit }, newItem) {
      commit('addToCart', newItem);
    },
    // Действие для удаления товара из корзины
    async removeFromCart({ commit }, itemId) {
      commit('removeFromCart', itemId);
    },
    // Действие для увеличения количества товара в корзине
    async increaseQuantity({ commit }, itemId) {
      commit('increaseQuantity', itemId);
    },
    // Действие для уменьшения количества товара в корзине
    async decreaseQuantity({ commit }, itemId) {
      commit('decreaseQuantity', itemId);
    },
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

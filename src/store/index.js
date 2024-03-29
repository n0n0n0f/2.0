// store/index.js
import { createStore } from 'vuex';
import api from '@/services/api'; // Импортировать ваш сервис API

const store = createStore({
  state() {
    return {
      currentUser: null,
      isAuthenticated: true, // Добавить флаг авторизации и установить по умолчанию как false
      orders: [],
      cartItems: [],
      checkoutEnabled: false,
      orderPageActive: false
    };
  },
  mutations: {
    setOrderPageActive(state, isActive) {
      state.orderPageActive = isActive;
    },
    registerUser(state, userData) {
      state.isAuthenticated = true;
      state.currentUser = userData;
    },
    updateCheckoutStatus(state, status) {
      state.checkoutEnabled = status;
    },
    addToCart(state, newItem) {
      const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id);
      if (existingItemIndex !== -1) {
        // Если товар уже есть в корзине, увеличиваем его количество
        state.cartItems[existingItemIndex].quantity++;
      } else {
        // Если товара нет в корзине, добавляем его
        newItem.quantity = 1; // Устанавливаем количество товара в 1
        state.cartItems.push(newItem);
      }
    },
    // Мутация для удаления товара из корзины
    removeFromCart(state, itemId) {
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
    },
    addOrder(state, order) {
      // Добавляем поле cartItems в объект order перед добавлением в список заказов
      order.cartItems = state.cartItems;
      state.orders.push(order);
    },
    // Мутация для очистки корзины
    clearCart(state) {
      state.cartItems = [];
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
    setUser(state, token) {
      state.isAuthenticated = true; // Устанавливаем флаг как true при успешной авторизации
      state.currentUser = token;
    },
    clearUser(state) {
      state.isAuthenticated = false; // Сбрасываем флаг при выходе пользователя
      state.currentUser = null;
    }
  },
  actions: {
    // Действие для увеличения количества товара в корзине
    async increaseQuantity({ commit }, itemId) {
      commit('increaseQuantity', itemId);
    },
    // Действие для уменьшения количества товара в корзине
    async decreaseQuantity({ commit }, itemId) {
      commit('decreaseQuantity', itemId);
    },
    async registerUser({ commit }, user) {
      try {
        const registeredUser = await api.register(user); // Использовать сервис API для регистрации
        commit('setUser', registeredUser); // Сохраняем данные зарегистрированного пользователя
        return registeredUser; // Возвращаем данные зарегистрированного пользователя
      } catch (error) {
        console.error('Ошибка регистрации:', error);
        throw error;
      }
    },
    async loginUser({ commit }, user) {
      try {
        const authenticatedUser = await api.login(user); // Использовать сервис API для аутентификации
        commit('setUser', authenticatedUser); // Устанавливаем пользователя в хранилище
        return authenticatedUser; // Возвращаем аутентифицированного пользователя
      } catch (error) {
        console.error('Ошибка входа:', error);
        throw error;
      }
    },
    logoutUser({ commit }) {
      commit('clearUser');
    },
    async addToCart({ commit }, newItem) {
      commit('addToCart', newItem);
    },
    async removeFromCart({ commit }, itemId) {
      commit('removeFromCart', itemId);
    },
    async placeOrder({ commit, state }) {
      try {
        const order = await api.placeOrder(state.cartItems);
        commit('addOrder', order);
        commit('clearCart');
      } catch (error) {
        console.error('Ошибка размещения заказа:', error);
        throw error;
      }
    }
  },
});
export default store;

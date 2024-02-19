
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
      userRole: null,
      cartItems: []

    }
  },
  mutations: {
    addToCart(state, product) {
      state.cartItems.push(product);
    }
  },
  actions: {
    // actions для асинхронных операций, если они нужны
  },
  modules: {
    // Другие модули Vuex, если они нужны
  }
})

export default store

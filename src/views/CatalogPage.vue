<template>
  <div class="catalog-page">
    <h1>Каталог товаров</h1>
    <div v-if="!isLoggedIn">
      <router-link to="/login">Войти</router-link> /
      <router-link to="/registration">Регистрация</router-link>
    </div>
    <div v-else>
      <router-link to="/logout">Выход</router-link>
    </div>
    <div class="product-cart">
      <div v-for="product in products" :key="product.id" class="product">
        <img :src="product.image" :alt="product.name" class="product-image">
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <button @click="addToCart(product)" class="product-price-btn">{{ product.price }}</button>
      </div>
    </div>
    <router-link v-if="isLoggedIn && isClient" to="/order">Ранее оформленные заказы</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isLoggedIn = computed(() => store.state.isLoggedIn);
const isClient = computed(() => store.state.userRole === 'Client');
const products = ref([
  {
    id: 1,
    name: 'ryzen 7 7800',
    description: '8 ядер 16 потоков',
    price: 16000,
    image: 'https://main-cdn.sbermegamarket.ru/big1/hlr-system/-63/482/592/633/152/1/100028082023b0.jpg'
  },
  {
    id: 2,
    name: 'gigabyte 3070',
    description: '12gb ram 2034mZh',
    price: 35000,
    image: 'https://allsoft.ru/upload/medialibrary/24d/24d13c5e6b8c850dcdac48148755fd4b.jpeg'
  },
  {
    id: 3,
    name: 'msi b550 gaming plus',
    description: 'AM4 ddr4 4200mZh',
    price: 15000,
    image: 'https://ir.ozone.ru/s3/multimedia-w/c1000/6286686428.jpg'
  },
]);

const addToCart = (product) => {
  store.commit('addToCart', product);
};
</script>

<style scoped>
.product {
  margin-bottom: 20px;
}

.product-image {
  max-width: 100%;
}

.product-name {
  font-size: 18px;
  margin-top: 10px;
}

.product-description {
  margin-top: 5px;
  color: #666;
}

.product-price-btn {
  margin-top: 5px;
  font-weight: bold;
  padding: 5px 10px;
  cursor: pointer;
}

.product-cart {
  display: flex;
  justify-content: space-evenly;
}

.product-image {
  width: 200px;
  height: 200px;
}
</style>

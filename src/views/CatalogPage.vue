<template>
  <div class="catalog-page">
    <h1 class="catalog-title">Каталог товаров</h1>
    <div class="product-cart">
      <div v-for="product in products" :key="product.id" class="product">
        <img :src="product.image" :alt="product.name" class="product-image">
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <div v-if="isAuthenticated">
          <p class="product-price">Цена: {{ product.price }}</p>
          <button @click="addToCart(product)" class="product-btn">В корзину</button>
        </div>
        <div v-else>
          <p>Чтобы добавить товар в корзину, пожалуйста, авторизуйтесь</p>
        </div>
      </div>
    </div>
    <router-link v-if="isLoggedIn && isClient" to="/order" class="back-link">Ранее оформленные заказы</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isAuthenticated = computed(() => store.state.isAuthenticated);
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
  if (isAuthenticated.value) {
    store.commit('addToCart', product);
  } else {
    console.log('Пользователь не аутентифицирован. Невозможно добавить товар в корзину.');
  }
};
</script>

<style scoped>
.catalog-page {
  padding: 20px;
}

.catalog-title {
  color: #301801;
}

.product-cart {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product {
  width: calc(33.33% - 20px);
  margin-bottom: 20px;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
}

.product-image {
  max-width: 150px;
  height: 150px;
  border: 1px solid rgb(147, 80, 21);
  border-radius: 12px;
}

.product-name {
  font-size: 18px;
  margin-top: 10px;
}

.product-description {
  margin-top: 5px;
  color: #666;
}

.product-price {
  margin-top: 5px;
  font-weight: bold;
}

.product-btn {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #A0522D;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.product-btn:hover {
  background-color: #8B4513;
}

.back-link {
  color: #A0522D;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}
</style>

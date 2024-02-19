<template>
  <div class="nav-block">
    <nav class="nav-list">
      <item @click="$router.push('/')">Каталог</item>
      <item @click="$router.push('/order')">Оформленные товары</item>
      <item @click="$router.push('/basket')">Корзина ({{ $store.state.cartItems.length }})</item>
    </nav>
    <nav class="nav-list">
      <item @click="$router.push('/authorization')">Вход</item>
    </nav>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import Item from "@/components/Item.vue";

const store = useStore();
</script>

<style scoped>
.nav-block {
  display: flex;
  justify-content: space-between;
}

.nav-list {
  display: flex;
  gap: 10px;
}

.nav-list .item {
  background: none;
  padding: 10px 20px;
}
</style>

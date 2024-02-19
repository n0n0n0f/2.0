<script setup>
import item from "@/components/Item.vue";
</script>

<template>
  <div class="nav-block">
    <nav class="nav-list">
      <item @click="$router.push('/')">Каталог</item>
      <item @click="$router.push('/order')">Оформленные товары</item>
      <item @click="$router.push('/basket')">Корзина</item>
    </nav>
    <nav class="nav-list">
      <item @click="$router.push('/authorization')">Вход</item>
    </nav>
  </div>
</template>

<style scoped>
.nav-block{
  display: flex;
  justify-content: space-between;
}

.nav-list{
  display: flex;
  gap: 6px;
}
</style>
<script setup>
import { RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
</script>

<template>
  <Header></Header>
  <div class="page">

    <RouterView />
  </div>
</template>

<style scoped>
.page{
  background: #FFFAF0;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px; /* Если нужен внутренний отступ */
}

</style>
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
  background: #ECEEF6;
}
</style>
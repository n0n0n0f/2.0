<script setup>
import { RouterView } from 'vue-router'
import HeaderApp from "@/components/HeaderApp.vue";
</script>

<template>
  <HeaderApp></HeaderApp>
  <div class="page">
    <RouterView />
  </div>
</template>

<style scoped>
.page{
  background: #ECEEF6;
}
</style>
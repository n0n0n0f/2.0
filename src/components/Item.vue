<script setup>
</script>

<template>
  <a href="#" class="item">
    <slot></slot>
  </a>
</template>

<style scoped>
.item {
  color: black;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.item:hover {
  background-color: #f0f0f0;
}
</style>
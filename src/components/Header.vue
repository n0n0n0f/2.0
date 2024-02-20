<script setup>
import Nav from "@/components/Nav.vue";
</script>

<template>
  <header class="header">
    <Nav></Nav>
  </header>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();
    const isLoggedIn = computed(() => !!store.state.currentUser);
    const currentUser = computed(() => store.state.currentUser);

    const logout = () => {
      store.dispatch('logoutUser');
    };

    return {isLoggedIn, currentUser, logout};
  }
};
</script>

<style scoped>
.header {
  width: 1600px;
  background-color: #FDF5E6;
  margin: 0 auto 20px;
  padding: 0 20px; /* Если нужен внутренний отступ */

}
</style>
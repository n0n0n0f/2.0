<script setup>
import Nav from "@/components/Nav.vue";
</script>

<template>
  <header class="header">
    <Nav></Nav>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  background-color: #f8f9fa;
  padding: 10px;
}
</style>

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

    return { isLoggedIn, currentUser, logout };
  }
};
</script>


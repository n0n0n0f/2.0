import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Item from '@/components/Item.vue'; // Путь к компоненту Item.vue

const app = createApp(App);

app.component('Item', Item); // Зарегистрировать компонент глобально

app.use(router);
app.use(store);
app.mount('#app');

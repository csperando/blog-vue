import './assets/main.css';
import { router } from "./router";

import { createPinia } from 'pinia';
const pinia = createPinia();

import { createApp } from 'vue';
import App from './App.vue';

import './index.css';

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app');

import '@/assets/styles/index.scss';

import { createApp } from 'vue';

import App from './App.vue';
import 'virtual:svg-icons-register';
import router from './router';
import GlobalComponents from '@/components/index';

const app = createApp(App);
app.use(router);
app.use(GlobalComponents);
app.mount('#app');

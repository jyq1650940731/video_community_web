import '@/assets/styles/index.scss';

import { createApp } from 'vue';

import App from './App.vue';
import 'virtual:svg-icons-register';
import router from './router';
import GlobalComponents from '@/components/index';
import NPlayer from '@nplayer/vue';

const app = createApp(App);
app.use(router);
app.use(GlobalComponents);
app.use(NPlayer);
app.mount('#app');

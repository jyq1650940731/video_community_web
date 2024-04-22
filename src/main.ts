import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import 'virtual:svg-icons-register';
import globalComponents from '@/components';
import router from './router';


const app = createApp(App);
app.use(globalComponents);
app.use(router);
app.mount('#app')

/*
 * @Author: YourName
 * @Date: 2024-05-17 17:33:04
 * @LastEditTime: 2024-05-22 09:45:31
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\main.ts
 * 版权声明
 */
import '@/assets/styles/index.scss';

import { createApp } from 'vue';

import App from './App.vue';
import 'virtual:svg-icons-register';
import pinia from './stores';
import router from './router';
import '@/router/permissions';
import GlobalComponents from '@/components/index';
import NPlayer from '@nplayer/vue';

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(GlobalComponents);
app.use(NPlayer);
app.mount('#app');

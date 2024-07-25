/*
 * @Author: YourName
 * @Date: 2024-05-22 14:35:24
 * @LastEditTime: 2024-06-03 14:36:43
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\vite.config.ts
 * 版权声明
 */
import { fileURLToPath, URL } from 'node:url';

import { UserConfigExport, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { UndrawUiResolver } from 'undraw-ui/es/resolvers';
import {
  createStyleImportPlugin,
  ElementPlusResolve,
} from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  let env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      VueSetupExtend(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], //图标存放路径
        symbolId: 'icon-[dir]-[name]',
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        // targets to transform
        resolvers: [ElementPlusResolver()],
        // dts: '/auto-import.d.ts',
        eslintrc: {
          enabled: false, // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
        },
      }),
      Components({
        resolvers: [ElementPlusResolver(), UndrawUiResolver],
      }),
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            resolveStyle: (name) => {
              return `element-plus/theme-chalk/${name}.css`;
            },
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./src/types', import.meta.url)),
        images: fileURLToPath(new URL('./src/assets/images', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "sass:math";`,
        },
      },
    },
    server: {
      //用来配置跨域
      host: 'localhost',
      port: 5174,
      proxy: {
        '/dev-api': {
          target: env.VITE_SERVE,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ''),
        },
      },
    },
  };
};

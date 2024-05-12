import { fileURLToPath, URL } from 'node:url';

import { UserConfigExport, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
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
      }),
      Components({
        resolvers: [ElementPlusResolver()],
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
    // server: {
    //   //用来配置跨域
    //   host: 'localhost',
    //   port: 5174,
    //   proxy: {
    //     '/dev-api': {
    //       target: env.VITE_SERVE,
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/dev-api/, ''),
    //     },
    //   },
    // },
  };
};

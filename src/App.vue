<!--
 * @Author: YourName
 * @Date: 2024-05-22 14:35:24
 * @LastEditTime: 2024-07-04 19:43:43
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_web\src\App.vue
 * 版权声明
-->
<style scoped lang="scss"></style>

<template>
  <el-config-provider :locale="zhCn">
    <div class="vab-theme-white">
      <router-view :key="router.currentRoute.value.fullPath"></router-view>
    </div>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus';
const router = useRouter();
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>

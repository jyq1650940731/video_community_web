<!--
 * @Author: YourName
 * @Date: 2024-05-22 16:37:14
 * @LastEditTime: 2024-06-14 10:34:07
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_web\src\views\platform\upload\index.vue
 * 版权声明
-->
<template>
  <div class="video-up-app">
    <div class="platform-upload">
      <!-- 导航栏 -->
      <nav-bar
        :navBarItem="navBarData"
        @clickBarItem="clickBarItem"
        v-show="isNavBarShow"
      ></nav-bar>
      <router-view @changeNavBarShow="changeNavBarShow"></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup name="PlatformUpload">
import route from '@/router/route';

const isNavBarShow = ref(true);
const navBarData = reactive([
  { name: '视频投稿', path: '/platform/upload/video' },
  { name: '专栏投稿', path: '/platform/upload/text' },
]);

const clickBarItem = (path: any) => {
  if (path != route.path) {
    route.push(path);
  }
};

const changeNavBarShow = (flag: boolean) => {
  isNavBarShow.value = flag;
};
</script>

<style scoped lang="scss">
.video-up-app {
  height: 100%;
  min-width: 1000px;
  max-width: 1100px;
  margin: 0 auto 0;
  background-color: #fff;
  background-clip: padding-box;
  border-top: 16px solid transparent;
  box-sizing: border-box;
  min-height: calc(100vh - 64px);
  padding-bottom: 20px;
  display: flow-root;
}
</style>

<template>
  <div class="platform-page">
    <header-bar :isFixHeaderBar="true"></header-bar>
    <!-- 左侧导航 -->
    <div class="platform-nav">
      <div class="nav-upload-btn">
        <svg-icon name="upload" width="22" class="icon-shangchuan"></svg-icon>
        投稿
      </div>
      <!-- <el-menu :default-active="$route.path" class="nav-menu">
        <el-menu-item index="/platform/home">
          <i class="iconfont icon-shouye"></i>
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="/platform/upload-manager">
          <template #title>
            <i class="iconfont icon-gaojian"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="/platform/upload-manager/manuscript">
            稿件管理
          </el-menu-item>
          <el-menu-item index="/platform/upload-manager/appeal">
            申诉管理
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/platform/data-up">
          <i class="iconfont icon-shuju"></i>
          <span>数据中心</span>
        </el-menu-item>
        <el-sub-menu index="/platform/interaction">
          <template #title>
            <i class="iconfont icon-hudong"></i>
            <span>互动管理</span>
          </template>
          <el-menu-item index="/platform/comment">评论管理</el-menu-item>
          <el-menu-item index="/platform/danmu">弹幕管理</el-menu-item>
        </el-sub-menu>
      </el-menu> -->
    </div>
    <!-- 主体 -->
    <div class="platform-main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.platform-nav {
  position: fixed;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  padding-top: 64px;
  top: 0;
  left: 0;
  border-right: 1px solid #f4f4f4;
  background: #fff;
  z-index: 10;
  height: 100%;
  width: 200px;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #ddd;
  }

  .icon-shangchuan {
    margin-right: 6px;
  }

  .nav-upload-btn {
    width: 136px;
    height: 40px;
    border-radius: 2px;
    margin: 24px auto 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--el-color-primary);
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      background: var(--el-color-primary-light-3);
    }
  }
}

.platform-main {
  padding-top: 64px;
  position: relative;
  background: #fafafa;
  /* min-width: 1124px; */
  display: flow-root;
  min-height: 100%;
  width: calc(100vw - 200px);
  margin-left: 200px;
}

/* element 导航元素 */
.el-menu {
  border-right: unset !important;
}

.platform-nav {
  --el-menu-active-color: var(--brand_blue);
  --el-menu-level-padding: 40px;
}

// .platform-nav /deep/ .el-sub-menu__title:hover,
// .el-menu-item:hover {
//   background-color: var(--graph_bg_thin) !important;
// }
</style>

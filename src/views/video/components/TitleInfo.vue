<template>
  <div class="video-box_report">
    <h1 class="video-info-title">{{ info.title }}</h1>
    <ul class="video-info-meta">
      <li class="view item">
        <svg-icon name="view" class="view-icon" width="20px"></svg-icon>
        <p class="view-text">{{ handleNums(info.play) }}</p>
      </li>
      <li class="dm item">
        <svg-icon name="dm" class="view-icon" width="20px"></svg-icon>
        <p class="dm-text">{{ handleNums(info.danmu) }}</p>
      </li>
      <li class="update-ip item">
        <p class="update-ip-text">{{ info.uploadDate }}</p>
      </li>
      <li class="copyright item">
        <svg-icon
          name="forbid"
          class="view-icon copyright-icon"
          width="16px"
        ></svg-icon>
        <p class="copyright-text">未经作者授权，禁止转载</p>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { handleNum } from '@/utils/utils.js';

defineProps(['info']);

const handleNums = (number: any) => {
  return handleNum(number);
};
</script>
<style lang="scss" scoped>
.video-box_report {
  height: 100px;
  box-sizing: border-box;
  padding-top: 22px;

  .video-info-title {
    font-size: 22px;
    line-height: 34px;
    flex-shrink: 0;
    font-weight: 500;
    color: var(--text1);
    line-height: 28px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .video-info-meta {
    margin-top: 6px;
    position: relative;
    display: flex;
    align-items: center;
    color: var(--text3);
    height: 24px;
    overflow: hidden;
    box-sizing: border-box;
  }

  .item {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    margin-right: 12px;
    overflow: hidden;

    .view-icon {
      margin-right: 4px;
    }

    .copyright-icon {
      color: #fd676f;
    }
  }
}
</style>

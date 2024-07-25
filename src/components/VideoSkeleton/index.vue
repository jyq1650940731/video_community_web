<template>
  <div
    class="bala-video-card__skeleton"
    :class="loading ? 'loading_animation' : 'hide'"
  >
    <div class="bala-video-card__skeleton--cover"></div>
    <div class="bala-video-card__skeleton--info">
      <div class="bala-video-card__skeleton--right">
        <p class="bala-video-card__skeleton--text"></p>
        <p class="bala-video-card__skeleton--text short"></p>
        <p class="bala-video-card__skeleton--light"></p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
});
</script>
<style lang="scss" scoped>
.bala-video-card__skeleton {
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.bala-video-card__skeleton.hide {
  visibility: hidden;
}

.bala-video-card__skeleton--cover {
  padding-top: var(--cover-radio);
  border-radius: 6px;
  background-color: var(--graph_bg_regular);
}

.bala-video-card__skeleton--info {
  margin-top: var(--info-margin-top);
  display: -webkit-flex;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.bala-video-card__skeleton--right {
  min-width: 0;
  flex: 1;
}

.bala-video-card__skeleton--text {
  margin-bottom: 4px;
  width: 94%;
  height: calc(var(--title-line-height) - 4px);
  border-radius: 4px;
  background-color: var(--graph_bg_regular);
}

.bala-video-card__skeleton--text.short {
  width: 72%;
}

.bala-video-card__skeleton--light {
  margin-top: 8px;
  width: 50%;
  height: var(--subtitle-line-height);
  border-radius: 4px;
  background-color: var(--graph_bg_regular);
}
</style>

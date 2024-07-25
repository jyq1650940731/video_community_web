<template>
  <!-- 相关视频列表 -->
  <div class="recommend-list">
    <div class="next-play">
      <p class="rec-title">
        接下来播放
        <el-switch
          v-model="state.swtichVal"
          size="large"
          inactive-text="自动连播"
        />
      </p>
      <!-- 视频卡片 -->
      <div class="video-page-card-small" v-if="videos.length > 0">
        <div class="card-box">
          <div class="pic-box">
            <div class="pic" @click="changeVideo(videos[0].video.vid)">
              <img :src="videos[0].video.coverUrl" alt="" />
              <span class="duration">
                {{ handleDuration(videos[0].video.duration) }}
              </span>
            </div>
          </div>
          <div class="info">
            <p class="title" @click="changeVideo(videos[0].video.vid)">
              {{ videos[0].video.title }}
            </p>
            <a
              :href="`/space/${videos[0].user.uid}`"
              target="_blank"
              class="upname"
            >
              <svg-icon name="up" width="18" height="18"></svg-icon>
              <span class="name">
                {{ videos[0].user.nickname }}
              </span>
            </a>
            <div class="playinfo">
              <svg-icon name="player" width="18" height="18"></svg-icon>
              {{ handleNum(videos[0].stats.play) }}&nbsp;&nbsp;
              <svg-icon name="danmu" width="18" height="18"></svg-icon>
              {{ handleNum(videos[0].stats.danmu) }}
            </div>
          </div>
        </div>
      </div>
      <!-- 分隔线 -->
      <div class="split-line"></div>
    </div>
    <div class="rec-list" v-if="videos.length > 1">
      <!-- 视频卡片 -->
      <div
        class="video-page-card-small"
        v-for="(item, index) in videos.slice(1)"
        :key="index"
      >
        <div class="card-box">
          <div class="pic-box">
            <div class="pic" @click="changeVideo(item.video.vid)">
              <img :src="item.video.coverUrl" alt="" />
              <span class="duration">
                {{ handleDuration(item.video.duration) }}
              </span>
            </div>
          </div>
          <div class="info">
            <p class="title" @click="changeVideo(item.video.vid)">
              {{ item.video.title }}
            </p>
            <a :href="`/space/${item.user.uid}`" target="_blank" class="upname">
              <svg-icon name="up" width="18" height="18"></svg-icon>
              <span class="name">{{ item.user.nickname }}</span>
            </a>
            <div class="playinfo">
              <svg-icon name="player" width="18" height="18"></svg-icon>
              {{ handleNum(item.stats.play) }}&nbsp;&nbsp;
              <svg-icon name="danmu" width="18" height="18"></svg-icon>
              {{ handleNum(item.stats.danmu) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { handleTime, handleNum, handleDate } from '@/utils/utils.js';

defineProps(['videos']);
const emit = defineEmits(['changeVideoById']);
const state = reactive({
  autonext: false,
  swtichVal: true,
});
const changeVideo = (vid: number) => {
  emit('changeVideoById', vid);
};
// 处理播放时长
const handleDuration = (time: any) => {
  return handleTime(time);
};

// 处理大于一万的数字
const handleNums = (number: any) => {
  return handleNum(number);
};

// 处理投稿时间
const handleUploadDate = (date: any) => {
  return handleDate(date);
};
</script>
<style lang="scss" scoped>
.recommend-list {
  margin-top: 18px;
}

.rec-title {
  font-size: 15px;
  -webkit-font-smoothing: antialiased;
  color: var(--text1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  line-height: 20px;
}

.split-line {
  width: 100%;
  height: 1px;
  background: var(--line_regular);
}

.rec-list {
  margin-top: 18px;
}

.video-page-card-small {
  margin-bottom: 15px;
}

.video-page-card-small a {
  color: #222;
  background-color: transparent;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  -webkit-text-decoration-skip: objects;
}

.video-page-card-small .card-box {
  display: flex;
}

.video-page-card-small .card-box .pic-box {
  position: relative;
  width: 189px;
  height: 107px;
  border-radius: 6px;
  background: var(--graph_weak);
  flex: 0 0 auto;
}

.video-page-card-small .card-box .pic-box .pic {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.video-page-card-small .card-box .pic-box .pic img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: crisp-edges;
}

.video-page-card-small .card-box .pic-box .pic .duration {
  position: absolute;
  bottom: 6px;
  right: 6px;
  color: #fff;
  height: 20px;
  line-height: 20px;
  transition: opacity 0.3s;
  z-index: 5;
  font-size: 13px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  padding: 0 4px;
}

.video-page-card-small .card-box .info {
  margin-left: 10px;
  flex: 1;
  font-size: 14px;
  line-height: 15px;
}

.video-page-card-small .card-box .info .title {
  cursor: pointer;
  color: var(--text1);
  display: block;
  font-size: 15px;
  line-height: 19px;
  transition: color 0.3s;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  word-break: break-word;
  -webkit-line-clamp: 2;
  -webkit-font-smoothing: antialiased;
}

.video-page-card-small .card-box .info .title:hover {
  color: var(--brand_blue);
}

.video-page-card-small .card-box .info .upname {
  cursor: pointer;
  margin: 2px 0;
  height: 20px;
  color: var(--text3);
  transition: color 0.3s;
  display: flex;
  align-items: center;
}

.video-page-card-small .card-box .info .upname:hover {
  color: var(--brand_pink);
}

.video-page-card-small .card-box .info .upname svg {
  margin-right: 4px;
  fill: var(--text3);
  transition: fill 0.3s;
}

.video-page-card-small .card-box .info .upname:hover svg {
  fill: var(--brand_pink);
}

.video-page-card-small .card-box .info .upname .name {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  word-break: break-word;
  -webkit-line-clamp: 1;
}

.video-page-card-small .card-box .info .playinfo {
  color: var(--text3);
  fill: var(--text3);
  display: inline-flex;
  align-items: center;
}

.video-page-card-small .card-box .info .playinfo svg {
  margin-right: 4px;
}

.playinfo-dm {
  margin-left: 8px;
}
</style>

<!--
 * @Author: YourName
 * @Date: 2024-06-01 17:40:29
 * @LastEditTime: 2024-06-02 12:16:01
 * @LastEditors: YourName
 * @Description: 3
 * @FilePath: \video_community_web\src\views\space\children\SpaceVideos.vue
 * 版权声明
-->
<template>
  <div class="page-video">
    <div class="col-full">
      <div class="contribution-sidenav">
        <div class="nav-container playlist-container">
          <div class="contribution-list-container">
            <ul class="contribution-list">
              <li class="contribution-item cur">
                <a class="text">视频</a>
                <span class="num">{{ useSpace.videoCount }}</span>
              </li>
              <li class="contribution-item">
                <a class="text">图文</a>
                <span class="num">{{ 0 }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="main-content">
        <div class="space-video">
          <h3 class="page-head">
            <span class="t">
              {{ useUser.userinfo.uid === useSpace.uid ? '我' : 'TA' }}的视频
            </span>
            <div class="be-tab" v-if="useSpace.videoCount > 1">
              <ul class="be-tab-inner">
                <li
                  class="be-tab-item"
                  :class="{ active: state.rule === 1 }"
                  @click="handleRule(1)"
                >
                  <span>最新发布</span>
                </li>
                <li
                  class="be-tab-item"
                  :class="{ active: state.rule === 2 }"
                  @click="handleRule(2)"
                >
                  <span>最多播放</span>
                </li>
                <li
                  class="be-tab-item"
                  :class="{ active: state.rule === 3 }"
                  @click="handleRule(3)"
                >
                  <span>最多点赞</span>
                </li>
              </ul>
              <div
                class="be-tab-cursor"
                :style="`transform: translateX(${63 * (state.rule - 1)}px); width: 48px;`"
              ></div>
            </div>
            <div class="page-head__right">
              <div class="item">
                <svg-icon
                  name="type_one"
                  width="20"
                  class="icon"
                  :class="{ active: state.type == 1 }"
                  @click="state.type = 1"
                ></svg-icon>
                <svg-icon
                  name="type_two"
                  width="20"
                  class="icon"
                  :class="{ active: state.type == 2 }"
                  @click="state.type = 2"
                ></svg-icon>
              </div>
            </div>
          </h3>
          <div class="section">
            <div class="content">
              <ul
                class="cube-list clearfix"
                :style="state.type === 1 ? '' : 'display: none;'"
              >
                <li
                  class="small-item"
                  v-for="(item, index) in useSpace.videos"
                  :key="index"
                >
                  <a
                    :href="`/video/${item.video.vid}`"
                    target="_blank"
                    class="cover"
                  >
                    <img
                      v-if="item.video.coverUrl"
                      :src="item.video.coverUrl"
                      alt=""
                    />
                    <span v-if="item.video.duration" class="length">
                      {{ handleDuration(item.video.duration) }}
                    </span>
                  </a>
                  <a
                    :href="`/video/${item.video.vid}`"
                    target="_blank"
                    class="title"
                    :title="item.video.title"
                  >
                    {{ item.video.title }}
                  </a>
                  <div class="meta">
                    <span class="play" v-if="item.stats">
                      <svg-icon
                        name="g_player"
                        class="icon"
                        width="16"
                      ></svg-icon>

                      <span class="num">{{ handleNum(item.stats.play) }}</span>
                    </span>
                    <span class="time" v-if="item.stats">
                      {{ handleDate(item.video.uploadDate) }}
                    </span>
                  </div>
                </li>
              </ul>
              <ul
                class="list-list"
                :style="state.type === 2 ? '' : 'display: none;'"
              >
                <li
                  class="list-item clearfix"
                  v-for="(item, index) in useSpace.videos"
                  :key="index"
                >
                  <a
                    :href="`/video/${item.video.vid}`"
                    target="_blank"
                    class="cover"
                  >
                    <img
                      v-if="item.video.coverUrl"
                      :src="item.video.coverUrl"
                      alt=""
                    />
                    <span v-if="item.video.duration" class="length">
                      {{ handleDuration(item.video.duration) }}
                    </span>
                  </a>
                  <div class="c">
                    <div class="title-row">
                      <a
                        :href="`/video/${item.video.vid}`"
                        target="_blank"
                        class="title"
                        :title="item.video.title"
                      >
                        {{ item.video.title }}
                      </a>
                    </div>
                    <div class="desc" :title="item.video.descr">
                      {{ item.video.descr }}
                    </div>
                    <div class="meta clearfix">
                      <span class="play" title="播放数" v-if="item.stats">
                        <svg-icon
                          name="g_player"
                          class="icon"
                          width="16"
                        ></svg-icon>
                        <span class="num">
                          {{ handleNum(item.stats.play) }}
                        </span>
                      </span>
                      <span class="danmu" title="弹幕数" v-if="item.stats">
                        <svg-icon
                          name="g_danmu"
                          class="icon"
                          width="16"
                        ></svg-icon>
                        <span class="num">
                          {{ handleNum(item.stats.danmu) }}
                        </span>
                      </span>
                      <span class="time" title="投稿时间" v-if="item.stats">
                        {{ handleDate(item.video.uploadDate) }}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="be-pager flex_center">
                <el-pagination
                  background
                  layout="total, sizes, prev, pager, next"
                  :total="useSpace.videoCount"
                  :page-size="state.size"
                  :current-page="state.page"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                ></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/modules/user';
import { useSpaceStore } from '@/stores/modules/space';
import { handleTime, handleNum, handleDate } from '@/utils/utils.js';
const useUser = useUserStore();
const useSpace = useSpaceStore();
const state = reactive({
  rule: 1,
  type: 1,
  page: 1,
  size: 10,
});

onMounted(() => {
  initData();
});

const initData = () => {
  if (useSpace.videos.length > 0) return;
  useSpace.getVisitUserVideos(state.rule, 1, 10);
  //   useSpace.getVisitUserCollection();
  useSpace.getVisitUserGoodVides(0, 20);
};

const handleSizeChange = (val: number) => {
  state.size = val;
  useSpace.getVisitUserVideos(state.rule, state.page, val);
};
const handleCurrentChange = (val: number) => {
  state.page = val;
  useSpace.getVisitUserVideos(state.rule, val, state.size);
};
const handleRule = (rule: number) => {
  state.rule = rule;
  useSpace.getVisitUserVideos(rule, 1, 10);
};
const handleDuration = (time: any) => {
  return handleTime(time);
};

// 处理大于一万的数字
const handleNums = (number: any) => {
  return handleNum(number);
};
</script>

<style scoped>
.page-video {
  width: 1283px;
  margin: 0 auto;
  position: relative;
}
.col-full {
  display: flex;
  width: 100%;
  background: #fff;
  box-shadow: 0 0 0 1px #eee;
  border-radius: 4px;
  position: absolute;
}

.el-pagination {
  justify-content: center;
}

.contribution-sidenav {
  position: relative;
  float: left;
  width: 180px;
  margin-right: -1px;
  font-size: 14px;
  color: #222;
  border-right: 1px solid #eee;
  box-sizing: border-box;
}

.contribution-list-container {
  position: relative;
  max-height: 420px;
  margin: 10px 0 20px;
  overflow: hidden;
}

.contribution-item {
  position: relative;
  padding-left: 30px;
  transition: background-color 0.3s ease;
  white-space: nowrap;
  font-size: 0;
  overflow: hidden;
  cursor: pointer;
}

.contribution-item:hover {
  background-color: #f4f5f7;
}

.contribution-item.cur {
  background-color: var(--brand_blue);
}

.contribution-sidenav .text {
  display: inline-block;
  line-height: 44px;
  width: 100px;
  margin-right: 5px;
  font-size: 14px;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contribution-sidenav .num {
  display: inline-block;
  width: 32px;
  font-size: 12px;
  color: #99a2aa;
  vertical-align: middle;
  text-align: center;
  font-family: Arial;
}

.contribution-item.cur .num,
.contribution-item.cur .text {
  color: #fff;
}

.main-content {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  border-left: 1px solid #eee;
  min-height: 600px;
}

ol,
ul {
  list-style: none;
}

.space-video * {
  box-sizing: initial;
}

.page-head {
  position: relative;
}

.t {
  display: inline-block;
  vertical-align: middle;
  font-size: 20px;
  line-height: 26px;
  height: 26px;
  color: #222;
}

.be-tab,
.be-tab-item {
  position: relative;
  font-family:
    PingFang SC,
    Helvetica Neue,
    Microsoft YaHei,
    sans-serif;
}

.be-tab {
  display: inline-block;
  line-height: 18px;
  vertical-align: middle;
  margin-left: 20px;
}

.be-tab-item {
  float: left;
  font-size: 14px;
  margin-right: 20px;
  line-height: 28px;
  vertical-align: top;
  cursor: pointer;
}

.active {
  color: var(--brand_blue);
}

.be-tab-item {
  padding: 0 0 3px;
  margin-right: 15px;
  font-size: 12px;
}

.be-tab-cursor {
  left: 0;
  border-bottom: 1px solid var(--brand_blue);
  transform: translateX(0);
  transition:
    width 0.2s ease,
    transform 0.2s ease;
}

.be-tab-cursor,
.be-tab-cursor:after {
  position: absolute;
  bottom: 0;
  height: 0;
  width: 0;
}

.be-tab-cursor:after {
  content: '';
  left: 50%;
  transform: translateX(-50%);
  border-bottom: 3px solid var(--brand_blue);
  border-top: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
}

.page-head__right {
  position: absolute;
  top: 6px;

  right: 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}

.page-head__right .item {
  display: flex;
}

.page-head__right .icon {
  fill: var(--text2);
  margin-left: 15px;
  cursor: pointer;
}

.page-head__right .icon:hover {
  fill: var(--brand_blue);
}

.page-head__right .icon.active {
  fill: var(--brand_blue);
}

.section {
  position: relative;
}

.content {
  margin-left: -10px;
}

.cube-list {
  display: block;
  width: 900px;
  margin-top: 10px;
}

.clearfix:after,
.clearfix:before {
  content: ' ';
  display: table;
}

.clearfix:after {
  content: '.';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
  font-size: 0;
}

.small-item {
  display: block;
  float: left;
  width: 160px;
  position: relative;
  margin: 0 0 3px;
  padding: 10px;
  font-family:
    PingFang SC,
    Helvetica Neue,
    Microsoft YaHei,
    sans-serif;
}

.small-item .cover {
  background: url('~assets/img/bilibili/video-placeholder.png') 50%;
  background-size: cover;
  border-radius: 4px;
  display: block;
  width: 160px;
  height: 100px;
  overflow: hidden;
  position: relative;
}

.cover img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: crisp-edges;
}

.small-item .length {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  line-height: 18px;
  font-size: 12px;
  padding: 0 4px;
  position: absolute;
  z-index: 5;
  transition: background 0.2s ease;
  right: 4px;
  bottom: 6px;
  border-radius: 2px;
}

.small-item .title {
  display: block;
  line-height: 20px;
  height: 38px;
  margin-top: 6px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  line-break: anywhere;
  font-size: 12px;
}

.small-item .meta {
  color: #999;
  white-space: nowrap;
  font-size: 0;
  margin-top: 5px;
  height: 16px;
  line-height: 16px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}

.small-item .meta > span {
  display: inline-block;
  white-space: nowrap;
  height: 16px;
  line-height: 18px;
  font-size: 12px;
  overflow: hidden;
}

.small-item .meta > span:first-child {
  width: 92px;
}

.small-item .meta .play,
.small-item .meta .time,
.small-item .meta .danmu {
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
}

.small-item .meta .num {
  margin-left: 3px;
}

.small-item .meta svg {
  fill: #999;
}

.list-item {
  border-bottom: 1px solid #eee;
  display: block;
  padding: 20px 0;
  position: relative;
  line-height: 1;
  margin: 0 10px;
}

.list-item .cover {
  background: url('~assets/img/bilibili/video-placeholder.png') 50%;
  background-size: cover;
  border-radius: 4px;
  width: 160px;
  height: 100px;
  display: block;
  float: left;
  overflow: hidden;
  position: relative;
}

.list-item .cover .length {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  line-height: 20px;
  padding: 0 6px;
  z-index: 5;
  transition: background 0.2s ease;
  right: 4px;
  bottom: 6px;
  border-radius: 2px;
}

.list-item .c {
  margin-left: 180px;
  margin-right: 10px;
  font-family:
    PingFang SC,
    Helvetica Neue,
    Microsoft YaHei,
    sans-serif;
}

.list-item .title {
  font-size: 18px;
  height: 20px;
  margin-bottom: 10px;
  display: inline-block;
  max-width: 680px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-item .desc {
  color: #777;
  line-height: 20px;
  overflow: hidden;
  height: 40px;
  margin-bottom: 17px;
  font-size: 12px;
}

.list-item .meta {
  height: 18px;
  line-height: 18px;
  fill: #aaa;
  color: #aaa;
}

.list-item .meta {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}

.list-item .meta > span {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px;
  line-height: 18px;
}

.list-item .meta .danmu,
.list-item .meta .play,
.list-item .meta .time {
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  font-size: 12px;
}

.list-item .meta .num {
  margin-left: 3px;
}

.be-pager {
  margin: 15px 0;
}

@media (min-width: 1420px) {
  .cube-list {
    width: 1070px;
  }

  .small-item {
    width: 190px;
  }

  .small-item .cover,
  .list-item .cover {
    width: 190px;
    height: 119px;
  }

  .list-item .c {
    margin-left: 210px;
  }

  .title-row .title {
    max-width: 800px;
  }

  .list-item .desc {
    height: 60px;
  }
}
</style>

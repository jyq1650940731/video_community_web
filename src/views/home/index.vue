<!--
 * @Author: YourName
 * @Date: 2024-05-16 15:23:25
 * @LastEditTime: 2024-06-28 23:51:27
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_web\src\views\home\index.vue
 * 版权声明
-->
<template>
  <div class="bala-container">
    <header class="bala-header" ref="headerRef">
      <!-- 导航 -->
      <header-bar :isFixHeaderBar="state.isFixHeaderBar"></header-bar>
      <!-- 动画 -->
      <header-banner></header-banner>
      <header-channel
        :channelLink="channelLink"
        :rchannelLink="rchannelLink"
        :isFixChannel="state.isFixChannel"
      ></header-channel>
    </header>

    <main class="bala-layout" ref="mainRef">
      <div class="recommended-container_floor-aside">
        <div class="container">
          <recommended-swipe :swipeList="carouselJson"></recommended-swipe>
          <!-- 随机推荐 -->
          <div
            shadow="hover"
            class="feed-card"
            v-for="(item, index) in state.randomVideos"
            :key="index"
          >
            <div class="bala-video-card">
              <video-skeleton :loading="state.loadingVideos"></video-skeleton>
              <inline-player
                :data="item"
                v-if="!state.loadingVideos"
              ></inline-player>
            </div>
          </div>
          <!-- 懒加载 -->
          <div
            class="feed-card"
            v-for="(item, index) in state.moreVideos"
            :key="index"
          >
            <div class="bala-video-card">
              <video-skeleton :loading="state.loadingMore"></video-skeleton>
              <inline-player
                :data="item"
                v-if="!state.loadingMore"
              ></inline-player>
            </div>
          </div>
        </div>
        <div class="feed-roll-btn">
          <div
            class="roll-btn"
            @click="
              getRandomVideos();
              state.refreshTime++;
            "
          >
            <el-icon
              class="iconfont"
              :style="`transform: rotate(${state.refreshTime * 360}deg);`"
            >
              <Refresh />
            </el-icon>
            <span>换一换</span>
          </div>
        </div>
      </div>
    </main>

    <el-backtop :right="80" :bottom="100" />
  </div>
</template>
<script lang="ts" setup name="home">
import HeaderBanner from './components/HeaderBanner.vue';
import { onMounted, reactive, ref } from 'vue';

import carouselJson from '@/assets/json/carousel.json';
import rchannelLink from '@/assets/json/rchannellink.json';

import {
  getRandomVideos as getRandomVideosApi,
  getMoreVideosByIds,
} from '@/api/video';
import { videoType } from '@/types/info';

const mainRef = ref();
const headerRef = ref();

const state = reactive({
  headerHight: 0,
  bottomDistance: 0,
  isFixHeaderBar: false,
  isFixChannel: false,
  loadingVideos: false,
  loadingMore: false,
  refreshTime: 0,
  hasMore: true,
  vids: [] as string[],
  randomVideos: [],
  moreVideos: [] as videoType[],
});

const pageData = reactive([]);

onMounted(() => {
  getRandomVideos();
  state.headerHight = headerRef.value.clientHeight;
  window.addEventListener('scroll', handleScroll);
});

const getRandomVideos = async () => {
  state.loadingVideos = true;
  state.vids = [];
  const { result } = await getRandomVideosApi();
  result.forEach((item: any) => {
    const vid = item.video.vid;
    state.vids.push(vid);
    state;
  });
  state.randomVideos = result;
  state.loadingVideos = false;
};

const getMoreVideos = async () => {
  state.loadingMore = true;
  const vids = state.vids.join(',');
  const { result } = await getMoreVideosByIds({ vids });
  state.vids.push(result.vids);
  state.hasMore = result.more;
  state.moreVideos.push(...result.videos);
  state.loadingMore = false;
  console.log(state.moreVideos);
};

const handleScroll = async () => {
  // 计算页面底部距离
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  state.bottomDistance = documentHeight - (window.scrollY + windowHeight);

  // 导航栏
  if (window.scrollY >= 64 && !state.isFixHeaderBar) {
    state.isFixHeaderBar = true;
    state.isFixHeaderBar = true;
  } else if (window.scrollY < 64 && state.isFixHeaderBar) {
    state.isFixHeaderBar = false;
    state.isFixHeaderBar = false;
  }

  // 频道栏
  if (window.scrollY >= state.headerHight && !state.isFixChannel) {
    state.isFixChannel = true;
  } else if (window.scrollY < state.headerHight && state.isFixChannel) {
    state.isFixChannel = false;
  }

  // 当距离底部小于800且有更多数据时触发加载数据的函数;
  if (state.bottomDistance < 800 && state.hasMore && !state.loadingMore) {
    await getMoreVideos();
  }
};

const channelLink = reactive([
  {
    id: 1,
    name: '番剧',
    path: '/v/anime',
    hasChild: 1,
  },
  {
    id: 2,
    name: '电影',
    path: '/movie',
    hasChild: 0,
  },
  {
    id: 3,
    name: '番剧',
    path: '/v/anime',
    hasChild: 1,
  },
  {
    id: 4,
    name: '国创',
    path: '/v/guochuang',
    hasChild: 1,
  },
  {
    id: 5,
    name: '电视剧',
    path: '/tv',
    hasChild: 1,
  },
  {
    id: 6,
    name: '综艺',
    path: '/variety',
    hasChild: 1,
  },
  {
    id: 7,
    name: '纪录片',
    path: '/documentary',
    hasChild: 1,
  },
  {
    id: 8,
    name: 'VLOG',
    path: '/v/life/daily',
    hasChild: 1,
  },
  {
    id: 9,
    name: '搞笑',
    path: '/v/life/funny',
    hasChild: 1,
  },
  {
    id: 10,
    name: '单机游戏',
    path: '/v/game/stand_alone',
    hasChild: 1,
  },
  {
    id: 11,
    name: '公益',
    path: '/love',
    hasChild: 1,
  },
  {
    id: 12,
    name: '公开课',
    path: '/mooc',
    hasChild: 1,
  },
  {
    id: 13,
    name: '专栏',
    path: '/read/home',
    hasChild: 1,
  },
  {
    id: 42,
    name: '直播',
    path: '/live',
    hasChild: 1,
  },
  {
    id: 23,
    name: '活动',
    path: '/activity',
    hasChild: 1,
  },
  {
    id: 34,
    name: '课堂',
    path: '/cheese',
    hasChild: 1,
  },
  {
    id: 55,
    name: '社区中心',
    path: '/community',
    hasChild: 1,
  },
  {
    id: 66,
    name: '新歌热榜',
    path: '/song',
    hasChild: 1,
  },
  {
    id: 71,
    name: '美食',
    path: '/v/anime',
    hasChild: 1,
  },
  {
    id: 82,
    name: '生活',
    path: '/v/anime',
    hasChild: 1,
  },
  {
    id: 49,
    name: '汽车',
    path: '/v/anime',
    hasChild: 1,
  },
  {
    id: 120,
    name: '时尚',
    path: '/v/anime',
    hasChild: 1,
  },
  {
    id: 131,
    name: '动物圈',
    path: '/v/anime',
    hasChild: 1,
  },
  {
    id: 112,
    name: '咨询',
    path: '/v/anime',
    hasChild: 1,
  },
]);
</script>
<style lang="scss" scoped>
.bala-container {
  min-height: 64px;
  position: relative;
  margin: 0 auto;
  max-width: 2560px;
  width: 100%;
  .el-backtop {
    margin-left: 20px;
  }
  .recommended-container_floor-aside {
    position: relative;
    padding-bottom: 60px;

    .container {
      grid-gap: 20px;
      display: grid;
      position: relative;
      width: 100%;
      grid-template-columns: repeat(5, 1fr);

      .feed-card:nth-of-type(n + 8) {
        margin-top: 40px;
      }
      .el-card {
        border: 0;
      }
      .recommended-swipe {
        position: relative;
        grid-column: 1 / 3;
        grid-row: 1 / 3;
      }
    }
  }

  .bala-layout {
    position: relative;
    background-color: #fff;
    margin: 0 auto;
    padding: 0 var(--layout-padding);
    max-width: calc(1980px + 2 * var(--layout-padding));
    width: 100%;
  }
}

.feed-roll-btn {
  position: absolute;
  left: 100%;
  top: 0;
  z-index: 2;
  transform: translate(10px);
}

.feed-roll-btn .roll-btn {
  flex-direction: column;
  margin-left: 0;
  height: auto;
  width: 40px;
  padding: 9px;
  background-color: #fff;
  color: var(--text1);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  font-size: 12px;
  border: 1px solid var(--line_regular);
  transform-origin: center;
  transition: 0.2s;
  cursor: pointer;
  line-height: 1.15;
}

.feed-roll-btn .roll-btn:hover {
  background-color: var(--graph_bg_thick);
}

.feed-roll-btn .roll-btn .iconfont {
  line-height: 16px;
  margin-bottom: 6px;
  transition: transform 0.5s ease;
  font-size: 16px;
}
</style>

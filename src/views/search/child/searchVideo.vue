<template>
  <div class="search-video">
    <div class="search-page i_wrapper">
      <template v-if="state.videoList.length > 0">
        <div class="container">
          <div
            shadow="hover"
            class="feed-card"
            v-for="(item, index) in state.videoList"
            :key="index"
          >
            <div class="bala-video-card">
              <video-skeleton :loading="state.loading"></video-skeleton>
              <inline-player :data="item" v-if="!state.loading"></inline-player>
            </div>
          </div>
        </div>
        <div class="search-bottom flex_center">
          <el-pagination
            background
            v-show="state.videoList.length > 0"
            layout="prev, pager, next"
            :total="useSearch.matchingCount[0]"
            :page-size="30"
            :pager-count="7"
            :current-page="state.page"
            @current-change="pageChange"
          ></el-pagination>
        </div>
      </template>
      <div class="no-more" v-else>
        <img src="@/assets/images/nodata.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleTime } from '@/utils/utils.js';
import { useSearchStore } from '@/stores/modules/search';
import { getMatchingVideo } from '@/api/search';
import type { LocationQueryValue } from 'vue-router';
const useSearch = useSearchStore();
const route = useRoute();

const state = reactive({
  page: 1, // 当前页码
  videoList: [], // 查询到的相关视频
  loading: true, // 正在查询中
  keyword: '' as LocationQueryValue | LocationQueryValue[],
});
onMounted(() => {
  if (route.query.keyword) {
    searchVideos();
  }
});

watch(
  () => route.query.keyword,
  (newVal) => {
    state.page = 1;
    searchVideos();
  },
);

const searchVideos = async () => {
  state.keyword = route.query.keyword;
  state.videoList = [];
  state.loading = true;
  const keyword = encodeURIComponent(String(state.keyword)); // 对特殊字符进行编译
  const { result } = await getMatchingVideo({
    keyword: state.keyword,
    page: state.page,
  });

  if (!result) return;
  state.videoList = result;
  state.loading = false;
};

// 换页
const pageChange = (page: number) => {
  state.page = page;
  searchVideos();
};
</script>

<style scoped>
.search-page {
  padding-bottom: 30px !important;
  margin-top: 30px !important;
  position: relative;
}

.container {
  grid-gap: 20px;
  display: grid;
  position: relative;
  width: 100%;
}

.no-more {
  position: relative;
  width: 100%;
  height: calc(100% - 210px);
  flex: 1;
}

.no-more img {
  width: 20%;
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translate(-50%, 0);
}

@media (max-width: 1399.9px) {
  .container {
    grid-column: span 4;
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1400px) {
  .container {
    grid-column: span 5;
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 1700px) {
  .container {
    grid-column: span 6;
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (min-width: 2200px) {
  .container {
    grid-column: span 7;
    grid-template-columns: repeat(7, 1fr);
  }
}

.search-bottom {
  margin: 50px 0 20px;
}
</style>

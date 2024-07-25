<!--
 * @Author: YourName
 * @Date: 2024-06-04 09:48:28
 * @LastEditTime: 2024-06-13 19:09:13
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_web\src\views\search\index.vue
 * 版权声明
-->
<template>
  <div class="search">
    <header-bar :isFixHeaderBar="true" :isShowSearchInput="false"></header-bar>
    <div class="search-layout">
      <div
        class="search-entry-page"
        v-if="routerIndex === -1 || !route.query.keyword"
      >
        <div class="search-center">
          <h1 class="search-center-title">
            <img src="@/assets/images/logo_blue.png" alt="" />
            <span class="center-title-text">搜索</span>
          </h1>
          <search-input style="margin-top: 30px"></search-input>
        </div>
      </div>
      <div v-else>
        <div class="search-header">
          <div class="search-input">
            <search-input></search-input>
            <div class="search-tabs i_wrapper">
              <nav class="navbar">
                <ul class="nav">
                  <li
                    class="nav-item"
                    :class="{ active: index === routerIndex }"
                    v-for="(item, index) in state.router"
                    :key="index"
                    @click="changeNav(item.path)"
                  >
                    <div class="nav-text">
                      {{ item.name }}
                      <div
                        class="nav-slider"
                        v-if="index === routerIndex"
                      ></div>
                    </div>
                    <span class="nav-num">
                      {{ useSearch.matchingCount[index] }}
                    </span>
                  </li>
                </ul>
              </nav>
            </div>
            <hr class="search-line" />
          </div>
        </div>
        <div class="search-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSearchStore } from '@/stores/modules/search';
import { useRoute } from 'vue-router';
import { addSearchWord, getCount as getCountApi } from '@/api/search';
import router from '@/router';
const useSearch = useSearchStore();
const route = useRoute();

const state = reactive({
  keyword: '' as any,
  router: [
    { path: '/search/video', name: '视频' },
    { path: '/search/user', name: '用户' },
  ],
});
onMounted(() => {
  if (route.query.keyword) handleAddSearchWord();
});
watch(
  () => route.query.keyword,
  (newVal) => {
    handleAddSearchWord();
  },
);

const routerIndex = computed(() => {
  return state.router.findIndex((item) => route.path.startsWith(item.path));
});
// 添加搜索词条
const handleAddSearchWord = async () => {
  state.keyword = route.query.keyword;
  const formdata = new FormData();
  formdata.append('keyword', state.keyword);
  await addSearchWord(formdata);
  getCount();
};

// 获取个分类相关数量
const getCount = async () => {
  const keyword = encodeURIComponent(state.keyword); // 对特殊字符进行编译
  const { result } = await getCountApi({ keyword });
  useSearch.updateMatchingCount(result);
};

// 跳转对应类型
const changeNav = (path: string) => {
  if (route.path.startsWith(path)) return;
  router.push(`${path}?keyword=${state.keyword}`);
};
</script>
<style scoped>
.search-layout {
  position: relative;
  background-color: #fff;
  margin: 0 auto;
  padding: 0 var(--layout-padding);
  padding-top: 64px;
  max-width: calc(1980px + 2 * var(--layout-padding));
  width: 100%;
  min-height: 100vh;
}

.search-entry-page {
  height: calc(100vh - 64px);
  z-index: 2;
  position: relative;
}

.search-center {
  top: 40%;
  position: absolute;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.search-center-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
}

.search-center-title img {
  transform: translateY(4px);
  margin-right: 12px;
}

.center-title-text {
  position: relative;
  line-height: 1;
  padding-left: 25px;
  color: var(--brand_blue);
}

.center-title-text::before {
  content: '';
  position: absolute;
  left: 0;
  width: 2px;
  height: 100%;
  background: var(--brand_blue);
}

.search-input {
  margin: 30px 0 20px;
}

.navbar::after {
  content: '';
  display: block;
  height: 4px;
}

.nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  list-style: none;
  position: relative;
}

.nav-item {
  display: inline-block;
  padding: var(--v_sm) 24px;
  font-size: var(--v_fs_3);
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.nav-item:first-child {
  padding-left: 0 !important;
}

.nav-text {
  color: var(--v_text2);
  white-space: nowrap;
  margin-right: var(--v_xsx);
  -webkit-transition: color 0.2s;
  transition: color 0.2s;
  position: relative;
}

.nav-item:hover .nav-text,
.nav-item.active .nav-text {
  color: var(--brand_blue) !important;
}

.nav-slider {
  position: absolute;
  width: 100%;
  height: 3px;
  background-color: var(--brand_blue);
  top: 30px;
}

.nav-num {
  padding: 1px var(--v_xxs);
  border-radius: var(--v_smx);
  font-size: var(--v_fs_6);
  color: var(--v_text2);
  background: var(--v_graph_bg_regular);
}

.search-line {
  margin-top: 3px;
  border: none;
  border-top: 1px solid var(--line_light);
}

.search-content {
  min-height: 200px;
}
</style>

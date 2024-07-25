<template>
  <!-- 输入框 -->
  <form id="nav-searchform" ref="formRef" :model="form" @submit.prevent>
    <div class="nav-search-content">
      <el-input
        class="nav-search-input"
        v-model="form.searchVal"
        @focus="searchPopShow()"
        @keydown.enter="goSearch()"
        @input="handleInput"
        placeholder="请输入搜索内容"
        @compositionstart="state.isComposite = true"
        @compositionend="compositionend"
      ></el-input>
    </div>
    <div
      class="nav-search-clean"
      v-show="form.searchVal"
      @click="form.searchVal = ''"
    >
      <el-icon size="16">
        <CircleCloseFilled />
      </el-icon>
    </div>
    <div class="nav-search-btn" @click="goSearch()">
      <el-icon>
        <Search />
      </el-icon>
    </div>
  </form>
  <div
    class="search-panel"
    :style="state.isSearchPopShow ? '' : 'display: none;'"
    ref="searchPopRef"
  >
    <div class="history" v-if="form.searchVal == ''">
      <div class="header">
        <div class="title">搜索历史</div>
        <div class="clear" @click.stop="removeAllHistories">清空</div>
      </div>
      <div
        class="histories-wrap"
        :style="
          state.isHistoryOpen ? 'max-height: 171px;' : 'max-height: 91px;'
        "
      >
        <div class="histories">
          <div
            class="history-item"
            v-for="(item, index) in state.histories"
            :key="index"
          >
            <div class="history-text" @click.stop="clickItemToSearch(item)">
              {{ item }}
            </div>
            <div class="close" @click.stop="removeHistory(index)">
              <el-icon><Close /></el-icon>
            </div>
          </div>
        </div>
      </div>
      <div
        class="history-fold"
        v-if="state.isHistoryOpen"
        @click.stop="state.isHistoryOpen = false"
      >
        <div class="fold-text">收起</div>
        <el-icon><ArrowUp /></el-icon>
      </div>
      <div class="history-fold" v-else @click.stop="state.isHistoryOpen = true">
        <div class="fold-text">展开更多</div>
        <el-icon><ArrowDown /></el-icon>
      </div>
    </div>
    <div class="trending" v-if="state.form.searchVal == ''">
      <div class="header">
        <div class="title">balabala热搜</div>
      </div>
      <div class="trendings-double" v-if="state.screenWidth >= 1450">
        <div class="trendings-col" style="max-width: calc(50% - 5px)">
          <div
            class="trending-item"
            v-for="(item, index) in useSearch.trendings.filter(
              (itm: any, idx: number) => idx % 2 === 0,
            )"
            :key="index"
          >
            <div
              class="trending-wrap"
              @click.stop="clickItemToSearch(item.content)"
            >
              <div class="trendings-rank" :class="index < 2 ? 'topThree' : ''">
                {{ index * 2 + 1 }}
              </div>
              <div class="trendings-text">{{ item.content }}</div>
              <img
                src="@/assets/images/icon_new.png"
                alt=""
                class="trending-mark"
                v-if="item.type === 1"
              />
              <img
                src="@/assets/images/icon_hot.png"
                alt=""
                class="trending-mark"
                v-if="item.type === 2"
              />
            </div>
          </div>
        </div>
        <div class="trendings-col" style="max-width: calc(50% - 5px)">
          <div
            class="trending-item"
            v-for="(item, index) in useSearch.trendings.filter(
              (itm: any, idx: number) => idx % 2 !== 0,
            )"
            :key="index"
          >
            <div
              class="trending-wrap"
              @click.stop="clickItemToSearch(item.content)"
            >
              <div class="trendings-rank" :class="index < 1 ? 'topThree' : ''">
                {{ index * 2 + 2 }}
              </div>
              <div class="trendings-text">{{ item.content }}</div>
              <img
                src="@/assets/images/icon_new.png"
                alt=""
                class="trending-mark"
                v-if="item.type === 1"
              />
              <img
                src="@/assets/images/icon_hot.png"
                alt=""
                class="trending-mark"
                v-if="item.type === 2"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="trendings-double" v-else>
        <div class="trendings-col" style="margin-right: unset">
          <div
            class="trending-item"
            v-for="(item, index) in useSearch.trendings"
            :key="index"
          >
            <div
              class="trending-wrap"
              @click.stop="clickItemToSearch(item.content)"
            >
              <div class="trendings-rank" :class="index < 3 ? 'topThree' : ''">
                {{ index + 1 }}
              </div>
              <div class="trendings-text">{{ item.content }}</div>
              <img
                src="@/assets/images/icon_new.png"
                alt=""
                class="trending-mark"
                v-if="item.type === 1"
              />
              <img
                src="@/assets/images/icon_hot.png"
                alt=""
                class="trending-mark"
                v-if="item.type === 2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="suggestions" v-if="state.form.searchVal != ''">
      <div
        class="suggest-item"
        v-for="(item, index) in state.matchingWord"
        :key="index"
        v-html="highlightKeyword(state.form.searchVal, item)"
        @click.stop="clickItemToSearch(item)"
      ></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router';
import { RouteLocationRaw } from 'vue-router';
import { highlightKeyword } from '@/utils/utils.js';
import { useSearchStore } from '@/stores/modules/search';
import { getHotSearch, getSearchWord } from '@/api/search';
import { reactive, ref } from 'vue';
const useSearch = useSearchStore();

const formRef = ref();
const searchPopRef = ref();
const state = reactive({
  form: {
    searchVal: '',
  },
  isSearchPopShow: false,
  // 搜索历史
  histories: [] as string[],
  // 是否展开搜索历史
  isHistoryOpen: false,
  // 是否正在输入中文
  isComposite: false,
  // 搜索推荐词
  matchingWord: [],
  // 屏幕宽度
  screenWidth: window.innerWidth,
});
const { form } = state;

onMounted(() => {
  getCurrentHotSearch();
  // 页面渲染后创建点击事件的监听器
  window.addEventListener('click', handleOutsideClick);
  // 在页面加载时从本地存储中加载搜索历史
  loadFromLocalStorage();
  // 监听窗口大小变化，更新屏幕宽度
  window.addEventListener('resize', updateScreenWidth);
});
onBeforeUnmount(() => {
  // 页面结束渲染前销毁事件的监听器
  window.removeEventListener('click', handleOutsideClick);
  window.removeEventListener('resize', updateScreenWidth);
});

//api
// 获取搜索推荐
const getMatchingWord = async () => {
  if (state.form.searchVal.trim() === '') return;
  const keyword = encodeURIComponent(state.form.searchVal); // 对特殊字符进行编译
  const { result } = await getSearchWord({ keyword });
  state.matchingWord = result;
  // console.log("推荐搜索词:", this.matchingWord);
};

//热搜列表
const getCurrentHotSearch = async () => {
  const { result } = await getHotSearch();
  useSearch.updateTrendings(result);
  //   console.log(result);
};

// 点击搜索框和气泡框外的空白处关闭气泡
const handleOutsideClick = (event: { target: any }) => {
  const formElement = formRef.value; // 输入框元素
  const popoverElement = searchPopRef.value; // 气泡框元素
  if (
    !formElement.contains(event.target) &&
    !popoverElement.contains(event.target)
  ) {
    searchPopHide();
  }
};
const updateScreenWidth = () => {
  state.screenWidth = window.innerWidth;
};
const removeAllHistories = () => {
  state.histories = [];
  localStorage.removeItem('historiesSearch');
};
// 删除单个搜索历史
const removeHistory = (index: number) => {
  state.histories.splice(index, 1);
  saveToLocalStorage();
};
// 点击条目搜索
const clickItemToSearch = (value: any) => {
  state.form.searchVal = value;
  goSearch();
};
// 前往搜索的回调
const goSearch = () => {
  searchPopHide();
  let input = state.form.searchVal.trim();
  const index = state.histories.indexOf(input);
  if (index != -1) {
    // 值已存在，移除该值
    state.histories.splice(index, 1);
  }
  state.histories.unshift(input); // 在列表开头插入新记录
  saveToLocalStorage();
  if (input === '') {
    // 输入空白符跳转搜索首页
    openNewPage('/search');
  } else {
    // 否则就跳搜索详情页
    openNewPage(`/search/video?keyword=${input}`);
  }
};
// 打开新标签页
const openNewPage = (route: RouteLocationRaw) => {
  window.open(router.resolve(route).href, '_blank');
};
const handleInput = () => {
  if (state.isComposite) return; // 如果正在输入拼音 就终止触发函数
  getMatchingWord();
};

// 完成中文输入
const compositionend = () => {
  state.isComposite = false;
  handleInput();
};

// 显示搜索气泡框
const searchPopShow = () => {
  state.isSearchPopShow = true;
  getMatchingWord();
  // console.log("显示热搜框: ", this.isSearchPopShow);
};
// 隐藏搜索气泡框
const searchPopHide = () => {
  state.isSearchPopShow = false;
  // console.log("显示热搜框: ", this.isSearchPopShow);
};
const saveToLocalStorage = () => {
  localStorage.setItem('historiesSearch', JSON.stringify(state.histories));
};
const loadFromLocalStorage = () => {
  const storedList = localStorage.getItem('historiesSearch');
  // console.log("浏览器中的搜索历史: ", storedList);
  if (storedList) {
    state.histories = JSON.parse(storedList);
  }
};
</script>

<style lang="scss" scoped>
.center-search-container {
  flex: 1 auto;
  /* 宽度占80% 居中*/
  height: 40px;
}

.center-search-container .is-focus {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.center-search-container .center-search__bar {
  position: relative;
  margin: 0 auto;
  min-width: 181px;
  max-width: 500px;
}

.center-search-container .center-search__bar {
  position: relative;
  margin: 0 auto;
  min-width: 181px;
  max-width: 500px;
}

#nav-searchform {
  display: flex;
  align-items: center;
  padding: 0 48px 0 4px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  border: 1px solid var(--line_regular);
  height: 40px;
  border-radius: 8px;
  background-color: var(--graph_bg_regular);
  opacity: 0.9;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fff;
    opacity: 1;
  }
}

.nav-search-content {
  flex: 1;
}

.nav-search-input {
  :deep() {
    .el-input__wrapper {
      background-color: #ffffff00;
      border-radius: 6px;
      box-shadow: none;
      padding: 1px 30px 1px 11px;
    }
  }
}

.nav-search-input-active {
  :deep() {
    .el-input__wrapper {
      background-color: #0000001a;
    }
  }
}

.nav-search-input {
  :deep() {
    .el-input__inner {
      color: var(--text2);
    }

    .el-input__inner:focus {
      color: var(--text1);
    }
  }
}

.nav-search-clean {
  position: absolute;
  width: 16px;
  height: 16px;
  right: 55px;
  cursor: pointer;
  color: var(--graph_weak);
}

.nav-search-btn {
  position: absolute;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  color: var(--text1);
  line-height: 32px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-search-btn:hover {
  background-color: var(--graph_bg_thick);
}

.nav-search-clean:hover {
  color: var(--graph_icon);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}
.search-panel {
  width: 100%;
  max-height: 612px;
  overflow-y: auto;
  background: var(--bg1);
  border: 1px solid var(--line_regular);
  border-top: none;
  border-radius: 0 0 8px 8px;
  padding: 13px 0 16px;
  -webkit-font-smoothing: antialiased;
  .title {
    height: 24px;
    font-size: 16px;
    line-height: 24px;
  }
  .clear {
    font-size: 12px;
    line-height: 15px;
    height: 15px;
    color: var(--text3);
    cursor: pointer;

    &:hover {
      color: var(--brand_blue);
    }
  }
  .histories-wrap {
    padding: 0 16px;
    overflow: hidden;
  }

  .histories {
    display: flex;
    flex-wrap: wrap;
    margin-top: 12px;
    margin-right: -10px;
    margin-bottom: 4px;
  }

  .histories .history-item {
    position: relative;
    box-sizing: border-box;
    height: 30px;
    padding: 7px 10px 8px;
    font-size: 12px;
    line-height: 15px;
    background: var(--graph_bg_thin);
    border-radius: 4px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    .history-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 96px;
      color: var(--text2);
    }
    &:hover {
      .history-text {
        color: var(--brand_blue);
      }
    }
  }

  .histories .history-item .close {
    display: none;
    box-sizing: border-box;
    position: absolute;

    top: -6px;
    right: -3px;
    padding: 2px;
    &:hover {
      color: var(--brand_blue);
    }
  }

  .histories .history-item:hover .close {
    display: block;
  }

  .histories .history-item .close i {
    color: #fff;
    background-color: #ccc;
    border-radius: 50%;
  }

  .history-fold {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    margin: 0 auto 14px;
    color: var(--text3);
    cursor: pointer;
  }

  .history-fold:hover {
    color: var(--brand_blue);
  }

  .fold-text {
    font-size: 12px;
    line-height: 15px;
    height: 15px;
  }

  .trendings-double {
    display: flex;
  }

  .trendings-double .trendings-col {
    flex: 1;
  }

  .trendings-double .trendings-col:first-child {
    margin-right: 10px;
  }

  .trending-wrap {
    box-sizing: border-box;
    height: 38px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 16px;
  }

  .trending-item:hover {
    background-color: var(--graph_bg_thick);
  }

  .trending-item .trendings-rank {
    margin-right: 10px;
    color: var(--text3);
  }

  .trending-item .topThree {
    color: var(--text2) !important;
  }

  .trending-item .trendings-text {
    font-size: 14px;
    line-height: 17px;
    height: 17px;
    margin-right: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0;
    color: var(--text2);
  }

  .trending-item .trending-mark {
    height: 14px;
    margin-right: 16px;
  }

  .suggestions {
    margin-top: -6px;
    margin-bottom: -6px;
  }

  .suggest-item {
    height: 32px;
    display: block;
    line-height: 32px;
    font-size: 14px;
    position: relative;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    padding: 0 16px;
    margin-bottom: 4px;
  }

  .suggest-item:hover,
  .suggest-item:focus {
    outline: none;
    background: var(--graph_bg_thick);
  }
}
</style>

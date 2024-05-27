<!--
 * @Author: YourName
 * @Date: 2024-05-24 11:55:16
 * @LastEditTime: 2024-05-26 14:44:08
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_web\src\components\CategorySelect\index.vue
 * 版权声明
-->
<template>
  <div class="category-select">
    <div
      class="select-controller"
      ref="categorySelectControllerRef"
      :class="state.isShowPop ? 'select-controller-selecting' : ''"
      @click="
        () => {
          state.isShowPop = !state.isShowPop;
        }
      "
    >
      <p class="select-item-inserted">
        {{ category[0].name }} → {{ category[1].name }}
      </p>
      <i
        class="iconfont icon-xiajiantou"
        :class="state.isShowPop ? 'selecting-icon' : ''"
      ></i>
    </div>
    <div
      class="drop-container"
      ref="categoryPopRef"
      :style="state.isShowPop ? '' : 'display: none;'"
    >
      <div class="drop-main">
        <div v-if="categoryList.length != 0">
          <div
            class="drop-main-item"
            :class="state.mainIndex == index ? 'drop-main-item-selected' : ''"
            v-for="(item, index) in categoryList"
            :key="index"
            @click="selectMain(index)"
          >
            {{ item.mcName }}
          </div>
        </div>
      </div>
      <div class="drop-sub" v-if="categoryList.length != 0">
        <div
          class="drop-sub-item"
          v-for="(item, index) in categoryList[state.mainIndex].scList"
          :key="index"
          @click="changeCategory(index)"
        >
          <p
            class="item-name"
            :class="
              category[0].id == item.mcId && category[1].id == item.scId
                ? 'drop-sub-item-selected'
                : ''
            "
          >
            {{ item.scName }}
          </p>
          <p class="item-descr" v-if="item.descr">{{ item.descr }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="CategorySelect">
import type { categoryType } from '@/types/info';

import { useCategoryStore } from '@/stores/modules/category';

const emit = defineEmits(['category']);

const { category } = defineProps({
  category: {
    type: Array<categoryType>,
    default: [
      { id: 'anime', name: '番剧' },
      { id: 'finish', name: '完结动画' },
    ],
  },
});
const { categoryList } = storeToRefs(useCategoryStore());

const categorySelectControllerRef = ref();
const categoryPopRef = ref();

const state = reactive({
  isShowPop: false,
  mainIndex: 0,
  subIndex: 0,
});

onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
});
onBeforeUnmount(() => {
  window.removeEventListener('click', handleOutsideClick);
});

//子分支
const changeCategory = (subIndex: number) => {
  state.subIndex = subIndex;
  const main = {
    id: categoryList.value[state.mainIndex].mcId,
    name: categoryList.value[state.mainIndex].mcName,
  };
  const sub = {
    id: categoryList.value[state.mainIndex].scList[subIndex].scId,
    name: categoryList.value[state.mainIndex].scList[subIndex].scName,
  };
  emit('category', [main, sub]); // 将分区更新回父组件
  state.isShowPop = false;
};

// 点击主分类的回调
const selectMain = (mainIndex: number) => {
  state.mainIndex = mainIndex;
  let dm = document.querySelector('.drop-main');
  let dmis = document.querySelector('.drop-main-item');
  if (dm && dmis)
    dm.scrollTo({
      behavior: 'smooth',
      top: dmis.clientHeight * mainIndex, // 滚动mainIndex个元素高度
    });
};

const handleOutsideClick = (event: { target: any }) => {
  const csc = categorySelectControllerRef.value;
  const cp = categoryPopRef.value;
  if (!csc.contains(event.target) && !cp.contains(event.target)) {
    state.isShowPop = false;
  }
};
</script>

<style scoped>
.category-select {
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ccc;
}

.select-controller {
  padding: 7px 12px;
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
    inset;
  border-radius: 4px;
  min-width: 200px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #99a2aa;
  transition: border 0.3s ease;
  background: #fff;
  --el-input-hover-border-color: var(--el-border-color-hover);
}

.select-controller:hover {
  box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset;
}

.select-controller-selecting {
  border-color: var(--el-color-primary);
}

.icon-xiajiantou {
  transition: transform 0.3s;
}

.selecting-icon {
  transform: rotate(180deg);
}

.select-item-inserted {
  color: #222;
  line-height: 22px;
  height: 22px;
  font-size: 14px;
  display: inline-block;
  white-space: nowrap;
}

.drop-container {
  background: #fff;
  border: 1px solid #e5e9ef;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14);
  border-radius: 4px;
  position: absolute;
  left: 0;
  top: 46px;
  z-index: 10;
  display: flex;
}

.drop-main {
  padding: 12px 0;
  width: 128px;
  height: 264px;
  overflow-x: hidden;
  overflow-y: auto;
}

.drop-main-item {
  padding: 12px 24px;
  width: 128px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drop-sub {
  border-left: 1px solid #e5e9ef;
  padding-top: 12px;
  min-width: 256px;
  height: 264px;
  overflow-x: hidden;
  overflow-y: auto;
}

.drop-sub-item {
  padding: 12px 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  min-width: 128px;
}

.item-name {
  font-size: 14px;
  color: #212121;
  margin-right: 18px;
  white-space: nowrap;
}

.item-descr {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
}

.drop-main-item:hover,
.drop-sub-item:hover {
  background-color: #f4f5f7;
}

.drop-main-item-selected,
.drop-sub-item-selected {
  color: var(--el-color-primary);
}
</style>

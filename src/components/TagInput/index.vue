<template>
  <div class="tag-input">
    <div class="tag-input-container" :class="isFocus ? 'isfocus' : ''">
      <el-tag
        v-for="(tag, index) in tags"
        :key="tag"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        ref="InputRef"
        v-model="inputValue"
        class="input-instance"
        size="small"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
        placeholder="按回车键Enter创建标签"
      />
      <p class="tag-last-wrp">还可以添加{{ 10 - tags.length }}个标签</p>
    </div>
  </div>
  <!-- 推荐标签 -->
  <div class="tag-wrp" v-if="rcmTags.length != 0">
    <p class="tag-label">推荐标签:</p>
    <div class="tag-list">
      <div
        class="hot-tag-container"
        :class="
          tags.findIndex((curr) => curr == item) != -1 ? 'isTagSelected' : ''
        "
        v-for="(item, index) in rcmTags"
        @click="handleActiveTag(item)"
        :key="index"
      >
        <div class="hot-tag-item">
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="TagInput">
import { useCategoryStore } from '@/stores/modules/category';
const { categoryList } = storeToRefs(useCategoryStore());

const props = defineProps(['category']);
const tags = reactive<String[]>(['测试视频']);
const isFocus = ref(false);
const inputValue = ref('');
const handleClose = (tag: string) => {
  tags.splice(tags.indexOf(tag), 1);
};
const handleInputConfirm = () => {
  if (tags.findIndex((curr) => curr == inputValue.value) != -1) {
    ElMessage.error('标签已存在，不能重复添加！');
    return;
  }
  if (tags.length >= 10) {
    ElMessage.error('以达到上限啦！');
    return;
  }
  if (inputValue.value) {
    tags.push(inputValue.value);
  }
  inputValue.value = '';
};

const handleActiveTag = (tag) => {
  if (tags.length >= 10) {
    ElMessage.error('以达到上限啦！');
    return;
  }
  tags.push(tag);
};

// 计算属性基本使用
const rcmTags = computed(() => {
  console.log(props);

  for (let i = 0; i < categoryList.value.length; i++) {
    if (categoryList.value[i].mcId == props.category[0].id) {
      for (let j = 0; j < categoryList.value[i].scList.length; j++) {
        if (categoryList.value[i].scList[j].scId == props.category[1].id) {
          return categoryList.value[i].scList[j].rcmTag;
        }
      }
    }
  }
  return [];
});

defineExpose({
  tags,
});
</script>

<style scoped lang="scss">
.tag-input {
  min-height: 40px;
  width: 100%;
}
.tag-input-container {
  --el-input-hover-border-color: var(--el-border-color-hover);
  min-height: 40px;
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
    inset;
  border-radius: 4px;
  padding: 0 10px 0 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  transition: var(--el-transition-box-shadow);
  box-sizing: border-box;
  :deep() {
    .el-input {
      height: auto !important;
      line-height: 1 !important;
    }
    .el-input__wrapper {
      padding: unset;
      box-shadow: none;
      width: 100%;
      // height: auto;
      // line-height: 1;
    }
    .el-tag {
      height: 28px;
      margin: 6px 6px 6px 0;
      font-size: 14px;
    }
  }
}

.tag-input-container:hover,
.isfocus {
  box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset;
}

.tag-pre-wrp {
  display: flex;
  flex-wrap: wrap;
}

.label-item-container {
  margin: 4px 6px 4px 0;
  background: var(--brand_pink);
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 9px 0 11px;
  cursor: pointer;
}

.label-item-content {
  line-height: 30px;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #fff;
  font-size: 12px;
}

.icon-close {
  color: #fff;
  font-size: 13px;
  width: 9px;
}

.input-instance {
  flex: 1;
  min-width: 240px;
}

.input-val {
  display: block;
  width: 100%;
  color: #222;
  line-height: 22px;
  height: 22px;
  font-size: 14px;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  background-color: transparent;
}

.tag-last-wrp {
  font-size: 14px;
  color: #858585;
  cursor: default;
}

.tag-wrp {
  display: flex;
  margin-top: 15px;
  width: 100%;
  .tag-label {
    padding-top: 5px;
    font-size: 14px;
    color: #222;
  }
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
  }
  .hot-tag-container {
    text-align: center;
    padding: 0 15px 0 16px;
    margin: 6px 0 6px 12px;
    height: 30px;
    color: #6d757a;
    cursor: pointer;
    border-radius: 4px;
    background: #f6f6f6;
    font-size: 12px;
    color: #212121;
    line-height: 14px;
    border: none;
  }
  .isTagSelected {
    background: var(--el-color-primary);
    color: #fff;
    pointer-events: none;
    cursor: not-allowed;
    border: 0;
  }
  .hot-tag-item {
    font-size: 12px;
    line-height: 30px;
  }
}
</style>

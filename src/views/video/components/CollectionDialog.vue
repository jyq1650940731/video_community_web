<!--
 * @Author: YourName
 * @Date: 2024-05-31 15:09:55
 * @LastEditTime: 2024-06-05 11:17:20
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_web\src\views\video\components\CollectionDialog.vue
 * 版权声明
-->
<template>
  <!-- 登录框 -->
  <el-dialog
    style="border-radius: 10px"
    v-model="state.dialogVisible"
    center
    width="420"
    title="添加到收藏夹"
    :close-on-click-modal="false"
    destroy-on-close
    align-center
    @close="close"
  >
    <el-form :model="form" @submit.prevent>
      <el-form-item prop="type" style="margin-bottom: 5px">
        <el-checkbox-group v-model="form.currentCollectionIds">
          <el-checkbox
            v-for="collection in useCollection.collectiones"
            :value="collection.fid"
            name="currentCollectionIds"
            size="large"
          >
            {{ collection.title }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          @keyup.enter="handleAddCollection"
          v-model="form.addColletcion"
          placeholder="新建收藏夹"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><Plus /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="bottom">
      <el-button
        :disabled="state.isDisabled"
        type="primary"
        @click="handleCollectionVideo"
      >
        确认
      </el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
import { useCollectionStore } from '@/stores/modules/collection';

const useCollection = useCollectionStore();
const emit = defineEmits(['updataVideo']);
const props = defineProps(['vid']);

const state = reactive({
  dialogVisible: false,
  isDisabled: true,
});

const form = reactive({
  addCollectionIds: [],
  currentCollectionIds: [] as string[],
  cancelCollectionIds: [],
  addColletcion: '',
});

watch(
  () => useCollection.lastCollectionIds,
  (newVal) => {
    form.currentCollectionIds = [...newVal];
  },
);
watch(
  () => form.currentCollectionIds,
  (newVal) => {
    if (useCollection.lastCollectionIds.length > newVal.length) {
      // 减少了
      state.isDisabled = !useCollection.lastCollectionIds.some((item) => {
        return !newVal.includes(item);
      });
    } //增加了
    else {
      state.isDisabled = !newVal.some((item) => {
        return !useCollection.lastCollectionIds.includes(item);
      });
    }
  },
);

const close = () => {
  state.dialogVisible = false;
};

const handleAddCollection = async () => {
  if (!form.addColletcion) ElMessage.warning('请输入收藏夹名称');
  await useCollection.addCollection({
    title: form.addColletcion,
    desc: '',
    visible: 1,
  });
  form.addColletcion = '';
};
const handleCollectionVideo = async () => {
  await useCollection.addAndCancelCollectionVideo(
    form.currentCollectionIds,
    props.vid,
  );
  emit('updataVideo');
  ElMessage.success('操作成功！');
  close();
};

defineExpose({ state });
</script>
<style lang="scss" scoped>
.el-form {
  padding: 0 26px;
  :deep() {
    .el-input__wrapper {
      padding: 4px 11px;
    }
  }
}
.el-checkbox-group {
  .el-checkbox {
    display: block;
    display: flex;
    margin-bottom: 18px;
    :deep() {
      .el-checkbox__inner {
        width: 22px;
        height: 22px;
        margin-right: 20px;
        box-shadow: 0 0 0 1px
          var(--el-input-border-color, var(--el-border-color)) inset;
        &:after {
          height: 10px;
          left: 7px;
          top: 3px;
          width: 6px;
        }
      }
      .el-checkbox__label {
        color: var(--text1);
      }
    }
  }
}

.bottom {
  height: 62px;
  text-align: center;
  margin: 0 36px;
  border-top: 1px solid var(--line_regular);
  .el-button {
    margin-top: 18px;
    line-height: 40px;
    padding: 8px 65px;
  }
}
</style>

import { categorylistApi } from '@/api/category';
import type { categoryListType } from '@/types/info';

export const useCategoryStore = defineStore('category', () => {
  const state = reactive<{ categoryList: categoryListType[] }>({
    categoryList: [],
  });

  const getCategoryList = async () => {
    const { result } = await categorylistApi();
    state.categoryList = result;
  };

  return {
    ...toRefs(state),
    getCategoryList,
  };
});

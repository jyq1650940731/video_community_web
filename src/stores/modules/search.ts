/*
 * @Author: YourName
 * @Date: 2024-06-04 11:42:28
 * @LastEditTime: 2024-06-04 14:58:49
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\stores\modules\search.ts
 * 版权声明
 */
export const useSearchStore = defineStore('search', () => {
  const state = reactive({
    trendings: [] as never[],
    // 搜索到的相关数据数量 [视频, 用户]
    matchingCount: [0, 0],
  });

  const updateTrendings = (trendings: never[]) => {
    state.trendings = trendings;
  };
  const updateMatchingCount = (matchingCount: number[]) => {
    state.matchingCount = matchingCount;
  };

  return {
    ...toRefs(state),
    updateTrendings,
    updateMatchingCount,
  };
});

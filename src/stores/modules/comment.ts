export const useCategoryStore = defineStore('comment', () => {
  const state = reactive({});

  return {
    ...toRefs(state),
  };
});

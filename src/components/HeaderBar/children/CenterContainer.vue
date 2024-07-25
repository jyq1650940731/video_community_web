<template>
  <div class="center-search-container">
    <div class="center-search__bar">
      <search-input></search-input>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SearchInput from './SearchInput.vue';
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
</style>

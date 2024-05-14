<template>
  <svg :style="{ width: width, height: height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>
<script lang="ts" setup>
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  width: {
    default: 30
  },
  height: {
    default: 30,
  },
  name: String,
  color: String,
});
</script>
<style lang="less" scoped></style>
  
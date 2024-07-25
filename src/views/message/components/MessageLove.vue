<template>
  <div class="message-love"></div>
</template>
<script setup lang="ts">
import { clearUnread } from '@/api/message';
onMounted(() => {
  handleClearUnread();
});
const handleClearUnread = () => {
  const formData = new FormData();
  formData.append('column', 'love');
  clearUnread(formData);
};
</script>

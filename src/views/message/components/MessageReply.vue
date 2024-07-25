<template>
  <div class="message-reply"></div>
</template>

<script setup lang="ts">
import { clearUnread } from '@/api/message';
onMounted(() => {
  handleClearUnread();
});
const handleClearUnread = () => {
  const formData = new FormData();
  formData.append('column', 'reply');
  clearUnread(formData);
};
</script>

<template>
    <channel v-bind="$attrs"></channel>
    <channel-fixed v-bind="$attrs" v-show="isFixChannel"></channel-fixed>
</template>
<script lang='ts' setup>
import Channel from './children/Channel.vue';
import ChannelFixed from './children/ChannelFixed.vue';

defineProps(['isFixChannel'])
</script>
<style lang='scss' scoped name="HeaderChannel">
.bala-header_channel {
    position: relative;
    width: 100%;
    max-width: calc(1980px + 2 * var(--layout-padding));
    margin: 0 auto;
    padding: 0 var(--layout-padding);
    display: flex;
    align-items: center;
    background: var(--bg1);

    --left_width: 140px;
    --left_width_item: 70px;
    --item_height: 28px;
}
</style>

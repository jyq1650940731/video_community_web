<template>
    <div class="bala-header_bar" :class="isFixHeaderBar ? 'slide-down' : ''">
        <left-entry :listBar="listBar" :isFixHeaderBar="isFixHeaderBar"></left-entry>
        <center-container></center-container>
        <right-entry></right-entry>
    </div>
</template>
<script lang='ts' setup>
import LeftEntry from './children/LeftEntry.vue';
import CenterContainer from './children/CenterContainer.vue';
import RightEntry from './children/RightEntry.vue';
import { reactive } from 'vue';

const listBar = reactive([
    {
        id: 1,
        name: '番剧',
    },
    {
        id: 2,
        name: '漫画',
    },
    {
        id: 3,
        name: '直播',
    }, {
        id: 4,
        name: '游戏中心',
    }
])

defineProps(['isFixHeaderBar'])
</script>
<style lang='scss' scoped>
.bala-header_bar {
    position: absolute;
    top: 0;
    z-index: 1002;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    max-width: 2560px;
    width: 100%;
    height: 64px;


}

.slide-down {
    position: fixed;
    top: 0;
    left: unset;
    animation: headerSlideDown .3s linear forwards;
    background: var(--bg1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08);
    background: var(--bg1_float);

    :deep() {

        .entry-title,
        .default-entry,
        .right-entry__outside,
        .download-entry,
        .right-entry__outside .right-entry-icon,
        .left-entry__title,
        .left-entry__title .mini-header__title {
            color: var(--text1);
        }

    }

}
</style>

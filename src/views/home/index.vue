<template>
    <div class="bala-container">
        <header class="bala-header" ref="headerRef">
            <!-- 导航 -->
            <header-bar :isFixHeaderBar="state.isFixHeaderBar"></header-bar>
            <!-- 动画 -->
            <header-banner></header-banner>
            <header-channel :channelLink="channelLink" :rchannelLink="rchannelLink"
                :isFixChannel="state.isFixChannel"></header-channel>
        </header>

        <main class="bala-layout" ref="mainRef">
            <div class="recommended-container_floor-aside">
                <div class="container">
                    <recommended-swipe :swipeList="carouselJson"></recommended-swipe>
                    <div class="feed-card" v-for="index in 11" :key="index">
                        <div class="bala-video-card">
                            <video-skeleton></video-skeleton>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script lang='ts' setup name="home">
import HeaderBanner from './components/HeaderBanner.vue';
import { onMounted, reactive, ref } from 'vue';

import carouselJson from '@/assets/json/carousel.json';
import rchannelLink from '@/assets/json/rchannellink.json';

const mainRef = ref();
const headerRef = ref();

const state = reactive({
    headerHight: 0,
    bottomDistance: 0,
    isFixHeaderBar: false,
    isFixChannel: false
})


onMounted(() => {
    state.headerHight = headerRef.value.clientHeight;
    window.addEventListener('scroll', handleScroll);
});

const handleScroll = () => {
    // 计算页面底部距离
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    state.bottomDistance = documentHeight - (window.scrollY + windowHeight);
    console.log(window.scrollY);

    // 导航栏
    if (window.scrollY >= 64 && !state.isFixHeaderBar) {
        state.isFixHeaderBar = true;
        state.isFixHeaderBar = true;
    } else if (window.scrollY < 64 && state.isFixHeaderBar) {
        state.isFixHeaderBar = false;
        state.isFixHeaderBar = false;
    }

    // 频道栏
    if (window.scrollY >= state.headerHight && !state.isFixChannel) {
        state.isFixChannel = true;
    } else if (window.scrollY < state.headerHight && state.isFixChannel) {
        state.isFixChannel = false;
    }


    // 当距离底部小于800且有更多数据时触发加载数据的函数
    // if (bottomDistance < 800 && this.hasMore && !this.loadingMore) {
    //     await this.getCumulativeVideos();
    // }
}

const channelLink = reactive([
    {
        id: 1,
        name: "番剧"
    },
    {
        id: 2,
        name: "番剧"
    },
    {
        id: 3,
        name: "番剧"
    },
    {
        id: 4,
        name: "番剧"
    },
    {
        id: 5,
        name: "番剧"
    },
    {
        id: 6,
        name: "番剧"
    }
    , {
        id: 7,
        name: "番剧"
    }, {
        id: 8,
        name: "番剧"
    }, {
        id: 9,
        name: "番剧"
    }, {
        id: 10,
        name: "番剧"
    }, {
        id: 11,
        name: "番剧"
    }, {
        id: 12,
        name: "番剧"
    }, {
        id: 13,
        name: "番剧"
    },
    {
        id: 42,
        name: "番剧"
    },
    {
        id: 23,
        name: "番剧"
    },
    {
        id: 34,
        name: "番剧"
    },
    {
        id: 55,
        name: "番剧"
    },
    {
        id: 66,
        name: "番剧"
    }
    , {
        id: 71,
        name: "番剧"
    }, {
        id: 82,
        name: "番剧"
    }, {
        id: 49,
        name: "番剧"
    }, {
        id: 120,
        name: "番剧"
    }, {
        id: 131,
        name: "番剧"
    }, {
        id: 112,
        name: "番剧"
    }
]);


</script>
<style lang='scss' scoped>
.bala-container {
    min-height: 64px;
    position: relative;
    margin: 0 auto;
    max-width: 2560px;
    width: 100%;

    .recommended-container_floor-aside {
        position: relative;
        padding-bottom: 60px;

        .container {
            grid-gap: 20px;
            display: grid;
            position: relative;
            width: 100%;
            grid-template-columns: repeat(5, 1fr);

            .recommended-swipe {
                position: relative;
                grid-column: 1 / 3;
                grid-row: 1 / 3;
            }
        }
    }


    .bala-layout {
        position: relative;
        background-color: #fff;
        margin: 0 auto;
        padding: 0 var(--layout-padding);
        max-width: calc(1980px + 2* var(--layout-padding));
        width: 100%;
    }
}
</style>

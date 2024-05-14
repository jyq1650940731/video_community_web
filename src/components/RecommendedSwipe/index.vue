<template>
    <div class="recommended-swipe">
        <div class="recommended-swipe-core">
            <!-- 骨架屏 -->
            <div class="recommended-swipe-shim">
                <div class="bala-video-card" v-for="index in 2" :key="index">
                    <video-skeleton></video-skeleton>
                </div>
                <div class="shim-card"></div>
                <div class="shim-card"></div>
            </div>
            <!-- 轮播图主体 -->
            <div class="recommended-swipe-body">
                <div class="carousel-area">
                    <el-carousel :interval="5000" arrow="always" motion-blur>
                        <el-carousel-item v-for="(item) in  swipeList " :key="item.target"
                            :style="{ backgroundColor: item.color }">
                            <div class="carousel-slide">
                                <router-link target="_blank" :to="item.target" class="carousel-inner">
                                    <img :src="item.url" alt="">
                                </router-link>
                                <div class="shadow"
                                    :style="`background: linear-gradient(to top, ${item.color}, ${item.color}00);`">
                                </div>
                            </div>
                            <div class="carousel-title">
                                {{ item.title }}
                            </div>
                        </el-carousel-item>
                    </el-carousel>

                </div>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
defineProps({
    swipeList: {
        type: Array as any,
    }
})

</script>
<style lang='scss' scoped>
:deep() {
    .el-carousel {
        --el-carousel-indicator-height: 4px;
        height: 100%;

        .el-carousel__container {
            height: 100%;
        }

        .el-carousel__indicators--horizontal {
            bottom: 25px;
            left: 22%;
        }

        .el-icon {
            width: 18px;
            height: 2em;
        }

        .el-icon svg {
            height: 2em;
            width: 2em;
        }
    }
}


.carousel-slide {
    position: relative;

    .carousel-inner {
        height: 100%;
        width: 100%;
        position: relative;
        display: inline-block;
        line-height: 1;
        vertical-align: middle;
        background-color: var(--graph_bg_regular);
        cursor: pointer;

        img {
            display: block;
            width: 100%;
            height: 100%;
            -o-object-fit: inherit;
            object-fit: inherit;
            box-shadow: 0 0 30px 10px rgba(255, 255, 255, .7) inset;
        }
    }
}

.carousel-title {
    font-size: 20px;
    color: white;
    position: absolute;
    bottom: 54px;
    left: 15px;
}

.recommended-swipe-core {
    position: relative;
    width: 100%;

    .recommended-swipe-shim {
        opacity: 0;
        visibility: hidden;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        pointer-events: none;
        grid-column: span 2;
        grid-row: span 2;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 20px;
        width: 100%;
        display: grid;

        .shim-card {
            width: 100%;
            height: 0;
            padding-top: 56.25%;
        }
    }

    .recommended-swipe-body {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        transform: translateZ(0);
        border-radius: 6px;
        overflow: hidden;
        background-color: var(--graph_bg_regular);

        .carousel-area {
            position: relative;
            width: 100%;
            height: 100%;
            flex-shrink: 0;
            z-index: 0;
        }
    }
}

.shadow {
    position: absolute;
    width: 100%;
    height: 30%;
    bottom: 0;
    pointer-events: none;
}
</style>

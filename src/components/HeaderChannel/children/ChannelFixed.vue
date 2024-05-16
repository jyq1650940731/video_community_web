<template>
    <div class="header-channel_fixed">
        <div class="header-channel_fixed-container" :class="isChannelDown ? 'header-channel_fixed-down' : ''"
            @mouseenter="isChannelDown = true;" @mouseleave="isChannelDown = false;">
            <div class="header-channel_fixed-left">
                <div class="left-fixed-channel">
                    <svg-icon name="dynamic" color="#61666d" width="25px" height="34px" />
                    <span>动态</span>
                </div>
                <div class="left-fixed-channel">
                    <svg-icon name="popular" color="#61666d" width="25px" height="34px" />
                    <span>热门</span>
                </div>
            </div>
            <div class="header-channel_fixed-center"></div>
            <div class="header-channel_fixed-right">
                <div class="header-channel_fixed-right-left">
                    <div class="left-top">
                        <router-link to="/" target="_black" v-for="(item) in channelLink" :key="item.id"
                            style="letter-spacing:2px;" class="header-channel_fixed-right-item">{{ item.name
                            }}</router-link>
                    </div>
                </div>
                <div class="header-channel_fixed-right-right">
                    <router-link to="" target="_black" v-for="(item) in rchannelLink"
                        class="header-channel_fixed-right-item">
                        {{ item.name }}
                    </router-link>
                </div>
            </div>
            <div class="header-channel_fixed-arrow">
                <el-icon :style="isChannelDown ? 'transform: rotate(180deg);' : ''">
                    <ArrowDownBold />
                </el-icon>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup name="channelFixed">
import { ref } from 'vue';
const isChannelDown = ref(false);

defineProps({
    channelLink: {
        type: Array as any
    },
    rchannelLink: {
        type: Array as any
    }
})
</script>
<style lang='scss' scoped>
.header-channel_fixed {
    width: 100%;
    min-width: 1100px;
    max-width: 2560px;
    display: flex;
    justify-content: center;
    background: var(--bg1_float);
    z-index: 1001;
    position: fixed;
    top: 63px;
    letter-spacing: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08);
    animation: headerSlideDown .2s linear forwards;

    --left_width: 140px;
    --left_width_item: 70px;
    --item_height: 28px;

    &-container {
        max-height: 56px;
        overflow: hidden;
        transition: max-height .2s;
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        padding: 14px var(--layout-padding, 60px) 14px var(--layout-padding, 30px);

        .header-channel_fixed-left {
            display: flex;
            min-width: var(--left_width);
            width: var(--left_width);
            flex-wrap: wrap;
            color: var(--text2);
            align-self: start;

            .left-fixed-channel {
                cursor: pointer;
                display: flex;
                width: var(--left_width_item);
                height: 28px;
                margin-bottom: 14px;
                align-items: center;

                &:hover {
                    color: var(--brand_pink);
                }

                svg {
                    position: relative;
                    margin-right: 5px;
                }
            }

        }
    }

    &-center {
        height: 14px;
        width: 1px;
        margin-right: 10px;
        background: var(--line_regular);
    }

    &-right {
        display: inline-grid;
        flex: 1;
        height: 100%;
        position: relative;
        grid-template-columns: repeat(15, 1fr);

        &-left {
            grid-column: span 12;
            grid-template-columns: repeat(12, 1fr);

            display: inline-grid;
            position: relative;

            .left-top {
                display: inline-grid;
                grid-template-rows: repeat(2, 1fr);
                position: relative;
                grid-auto-flow: column;
                grid-column: span 12;
                grid-template-columns: repeat(12, 1fr);
                grid-gap: 14px 10px;
            }


        }

        &-item {
            height: var(--item_height);
            line-height: var(--item_height);
            border: 1px solid var(--line_light);
            background: var(--graph_bg_thin);
            border-radius: 6px;
            text-align: center;
            cursor: pointer;
            color: var(--text2);

            &:hover {
                background: var(--graph_bg_thick);
                transition: 0.2s;
            }
        }
    }

    &-right-right {
        display: inline-grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-flow: column;
        grid-template-rows: var(--item_height) var(--item_height);
        grid-column: span 3;
    }

    &-right .left-bottom,
    &-right-right,
    &-right-left .left-top,
    &-right {
        grid-gap: 14px 10px;
    }

    &-arrow {
        position: absolute;
        right: calc(var(--layout-padding, 60px) - 40px);
        width: 26px;
        height: 28px;
        padding: 6px;
        margin-left: 10px;
        align-self: start;
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 4px;

        .el-icon {
            transition: .2s;
        }

        &:hover {
            background-color: var(--graph_bg_thick);
        }
    }

    &-down {
        max-height: 150px;
    }


}



.header-channel_fixed-down {
    max-height: 150px;
}
</style>

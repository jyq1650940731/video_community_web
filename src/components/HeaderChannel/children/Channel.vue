<template>
    <div class="bala-header_channel">
        <div class="channel-icons">
            <router-link to="/" class="channel-icons__item">
                <div class="icon-bg icon-bg__dynamic">
                    <svg-icon name="dynamic" color="#fff" />
                </div>
                <span class="icon-title">动态</span>
            </router-link>
            <router-link to="/" class="channel-icons__item">
                <div class="icon-bg icon-bg__popular">
                    <svg-icon name="popular" color="#fff"></svg-icon>
                </div>
                <span class="icon-title">热门</span>
            </router-link>
        </div>
        <div class="right-channel-container">
            <div class="channel-items__left">
                <router-link to="/" v-for="(item) in channelLink" :key="item.id" style="letter-spacing:2px;"
                    class="channel-link">{{
                        item.name }}</router-link>
            </div>
            <div class="channel-items__right">
                <router-link to="/" v-for="(item) in rchannelLink" :key="item.id" class="channel-link__right">
                    <component class="side-icon" :is="item.icon"></component>
                    <span>{{ item.name }}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup name="channel">

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
.channel-icons {
    z-index: 0;
    display: flex;
    align-items: center;

    .channel-icons__item {
        position: relative;
        display: flex;
        flex-direction: column;
        margin-right: 24px;
        // color: var(--text2);
        cursor: pointer;

        .icon-bg {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 8px;
            border-radius: 50%;
            transition: background-color .3s;
            color: #fff;
            width: 46px;
            height: 46px;
        }

        .icon-title {
            text-align: center;
            line-height: 18px;
        }

    }
}


.right-channel-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.channel-items__left {
    display: grid;
    width: 100%;
    grid-auto-flow: column;
    grid-column: span 4;
    grid-gap: 12px;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(12, 1fr);
    border-right: 1px solid var(--line_regular);
    padding-right: 30px;
    position: relative;

    .channel-link {
        display: inline-block;
        box-sizing: content-box;
        width: 100%;
        height: 100%;
        border: 1px solid var(--line_light);
        border-radius: 6px;
        background-color: var(--graph_bg_thin);
        color: var(--text2);
        text-align: center;
        font-weight: 400;
        transition: background-color .3s, color .3s;
        height: 30px;
        line-height: 30px;

        &:hover {
            background-color: var(--graph_bg_thick);
            color: var(--text1);
        }
    }


}

.channel-items__right {
    width: 258px;
    grid-column: span 1;
    grid-row-gap: 10px;
    grid-auto-flow: column;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    flex-shrink: 0;

    .channel-link__right {
        letter-spacing: 2px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        height: 100%;
        color: var(--text2);
        text-align: center;
        font-weight: 400;
        transition: color .3s;
        cursor: pointer;

        &:hover {
            color: var(--brand_pink);
        }


        .side-icon {
            margin-right: 4px;
            width: 20px;
            height: 20px;
            fill: var(--text2);
            transition: fill .3s;
        }
    }
}

@media (max-width: 1139.9px) {
    .bala-header_channel {
        width: 1020px;
    }
}

@media (max-width: 1366.9px) {
    .bala-header_channel {
        height: 100px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .bala-header_channel {
        height: 110px;
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .bala-header_channel {
        height: 120px;
    }
}

@media (min-width: 2200px) {
    .bala-header_channel {
        height: 130px;
    }
}



@media (max-width: 1366.9px) {
    .channel-icons {
        margin-right: 4px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .channel-icons {
        margin-right: 8px;
    }
}

@media (min-width: 1701px) {
    .channel-icons {
        margin-right: 20px;
    }
}

.channel-icons__item {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-right: 16px;
    color: var(--text1);
    cursor: pointer;
}

@media (max-width: 1099.9px) {
    .channel-icons__item {
        margin-right: 10px;
    }
}

@media (min-width: 1100px) and (max-width: 1366.9px) {
    .channel-icons__item {
        margin-right: 16px;
    }
}

@media (min-width: 1367px) and (max-width: 2199.9px) {
    .channel-icons__item {
        margin-right: 24px;
    }
}

@media (min-width: 2200px) {
    .channel-icons__item {
        margin-right: 32px;
    }
}
</style>


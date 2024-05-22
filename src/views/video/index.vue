<template>
    <div class="video-page">
        <header-bar :isFixHeaderBar="true"></header-bar>
        <div class="video-container">
            <div class="left-container" :style="`width: ${wrapSize.width}px;`">
                <title-info></title-info>
                <bala-player></bala-player>
                <div class="video-toolbar-container">
                    <div class="video-toolbar-left"><!---->
                        <div class="video-toolbar-left-main">
                            <div class="toolbar-left-item-wrap">
                                <div title="点赞（Q）" class="video-like video-toolbar-left-item"><!---->
                                    <svg-icon name="zan" class="video-like-icon video-toolbar-item-icon"></svg-icon>
                                    <span class="video-like-info video-toolbar-item-text">2.9万</span>
                                </div> <!---->
                            </div>
                            <div class="toolbar-left-item-wrap">
                                <div title="收藏（E）" class="video-fav video-toolbar-left-item">
                                    <svg-icon name="collection" class="video-like-icon video-toolbar-item-icon"></svg-icon>
                                    <span class="video-fav-info video-toolbar-item-text">2067</span>
                                </div> <!---->
                            </div>
                        </div>
                    </div>
                    <div class="video-toolbar-right">
                        <div class="video-tool-more video-toolbar-right-item">
                            <span class="video-tool-more-reference">
                                <svg-icon name="more"
                                    class="video-tool-more-icon video-toolbar-item-icon van-popover__reference"></svg-icon>
                            </span>
                        </div>
                    </div>
                </div>
                <!-- 简介评论区 -->
                <div class="left-container-under-player">
                    <!-- 简介 -->
                    <div class="video-desc-container">
                        <div class="basic-desc-info" ref="descRef" :style="showAllDesc ? 'height: auto;' : 'height: 84px;'">
                            <span class="desc-info-text">
                                {{ video.desc }}
                            </span>
                        </div>
                        <div class="toggle-btn" v-if="descTooLong">
                            <span class="toggle-btn-text" @click="showAllDesc = !showAllDesc">
                                {{ showAllDesc ? '收起' : '展开更多' }}
                            </span>
                        </div>
                    </div>
                    <!-- 标签 -->
                    <div class="video-tag-container">
                        <div class="topic-tag">
                            <router-link to="/" target="_blank" class="tag-link">标签</router-link>
                        </div>
                        <div class="topic-tag">
                            <router-link to="/" target="_blank" class="tag-link">标签</router-link>
                        </div>

                    </div>
                    <!-- 评论 -->
                    <bala-comment></bala-comment>
                </div>
            </div>
            <div class="right-container">
                <right-upinfo :user="user"></right-upinfo>
                <danmu-box :boxHeight="playerSize.height"></danmu-box>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
import TitleInfo from './components/TitleInfo.vue'
import RightUpinfo from './components/RightUpinfo.vue'
import BalaComment from './components/BalaComment.vue'
import BalaPlayer from './components/BalaPlayer.vue';


const descRef = ref();

const state = reactive({
    user: {
        uid: 0,
        avatarUrl:
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    },
    video: {
        title: '测试',
        desc: ` "梦想之地「匹诺康尼」，一座悬于银河的星际酒店。住客们游走于梦境与现实，享受纸醉金迷的奢华生活。
                《崩坏：星穹铁道》「匹诺康尼」音乐由HOYO - MiX团队制作。让我们与HOYO - MiX一起走近这个梦想之地以及她幕后的音乐创作故事。
                梦想之地「匹诺康尼」，一座悬于银河的星际酒店。住客们游走于梦境与现实，享受纸醉金迷的奢华生活。
                《崩坏：星穹铁道》「匹诺康尼」音乐由HOYO - MiX团队制作。让我们与HOYO - MiX一起走近这个梦想之地以及她幕后的音乐创作故事。"`,
        videoUrl: 'https://v-cdn.zjol.com.cn/280443.mp4'

    },
    showAllDesc: true,
    descTooLong: false,
    playerSize: {
        width: 704,
        height: 442,
    },
    wrapSize: {
        width: 704,
        height: 442,
    },

})
const { playerSize, user, wrapSize, showAllDesc, descTooLong, video } = toRefs(state);

onMounted(() => {
    changeWindowSize();
    window.addEventListener('resize', changeWindowSize)
});
nextTick(() => {
    if (descRef.value.clientHeight > 84) {
        descTooLong.value = true;
        showAllDesc.value = false;
    }
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', changeWindowSize);
});

const changeWindowSize = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let rightWidth, bottomHeight;   // 整体布局的right-container宽度和底部的发送弹幕栏的高度
    if (windowWidth < 1681) {
        rightWidth = 380;
        bottomHeight = 46;
    } else {
        rightWidth = 441;
        bottomHeight = 56;
    }

    let heigth = (windowHeight - 64) * 0.7;    // 初始使高为屏高的70%
    let width = (heigth - bottomHeight) * (16 / 9);    // 初始根据比例计算宽

    // 限制宽的范围
    if ((windowWidth - width - rightWidth) < 112) {
        // 表示宽度溢出了，重新计算宽并用其计算高
        width = windowWidth - rightWidth - 112;
        heigth = width * (9 / 16) + bottomHeight;
    }

    // 最后限制高的范围，并以最后高为准计算最后宽
    if (windowWidth < 1681) {
        heigth = Math.max(424, heigth);
    } else {
        heigth = Math.max(434, heigth);
    }
    heigth = Math.min(1010, heigth);
    width = (heigth - bottomHeight) * (16 / 9);
    // 更新宽高
    wrapSize.value.width = width;
    wrapSize.value.height = heigth;
};
</script>
<style lang='scss' scoped>
.video-container {
    width: auto;
    padding: 64px 10px 0px;
    max-width: 2540px;
    min-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    box-sizing: content-box;
    position: relative;


    .left-container {
        position: sticky;
        height: fit-content;

        .video-toolbar-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 16px;
            padding-bottom: 12px;
            line-height: 28px;
            border-bottom: 1px solid var(--line_regular);

            .video-toolbar-left {
                position: relative;
                display: flex;
                align-items: center;
                user-select: none;

                &-main {
                    position: relative;
                    display: flex;
                    align-items: center;
                    user-select: none;
                }

                .toolbar-left-item-wrap {
                    position: relative;
                    margin-right: 18px;

                    .video-toolbar-left-item {
                        position: relative;
                        display: flex;
                        align-items: center;
                        width: 100px;
                        white-space: nowrap;
                        transition: all .3s;
                        font-weight: 500;
                        color: var(--text2);
                        cursor: pointer;

                        &:hover {
                            color: var(--brand_blue);
                        }

                        .video-toolbar-item-icon {
                            flex-shrink: 0;
                            margin-right: 8px;
                        }

                        .video-toolbar-item-text {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            word-break: break-word;
                            white-space: nowrap;
                        }
                    }
                }
            }

            .video-toolbar-right {
                display: flex;
                align-items: center;
                user-select: none;

                .video-toolbar-right-item {
                    display: inline-flex;
                    align-items: center;
                    color: var(--text2);
                    transition: all .3s;
                    cursor: pointer;

                    &:hover {
                        color: var(--brand_blue);
                    }
                }
            }

        }


        .left-container-under-player {
            .video-desc-container {
                margin: 16px 0;


                .basic-desc-info {
                    white-space: pre-line;
                    letter-spacing: 0;
                    color: var(--text1);
                    font-size: 15px;
                    line-height: 24px;
                    overflow: hidden;
                }
            }

            .toggle-btn {
                margin-top: 10px;
                font-size: 13px;
                line-height: 18px;

                &-text {
                    cursor: pointer;
                    color: var(--text2);

                    &:hover {
                        color: var(--brand_blue);
                    }
                }
            }

            .video-tag-container {
                padding-bottom: 6px;
                margin: 16px 0 20px 0;
                border-bottom: 1px solid var(--line_regular);
                display: flex;
                flex-wrap: wrap;

                .topic-tag {
                    // float: left;
                    margin: 0 12px 8px 0;
                }

                .tag-link {
                    color: var(--text2);
                    background: var(--graph_bg_regular);
                    height: 28px;
                    line-height: 28px;
                    border-radius: 14px;
                    font-size: 13px;
                    padding: 0 12px;
                    box-sizing: border-box;
                    transition: all .3s;
                    display: inline-flex;
                    align-items: center;
                    cursor: pointer;
                }
            }
        }



    }

    .right-container {
        width: 411px;
        flex: none;
        margin-left: 30px;
        position: relative;
    }
}
</style>

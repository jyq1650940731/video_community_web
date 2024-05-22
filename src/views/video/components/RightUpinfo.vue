<template>
    <div class="up-panel-container">
        <div class="up-info-container">
            <div class="up-info--left">
                <div class="up-avatar-wrap">
                    <router-link to="" target="_blank">
                        <el-avatar :src="user.avatarUrl" />
                    </router-link>
                </div>
            </div>
            <div class="up-info--right">
                <div class="up-info__detail">
                    <div class="up-detail">
                        <div class="up-detail-top">
                            <router-link to="/" target="_blank" class="up-name">
                                海棠加的
                            </router-link>
                            <router-link to="/" target="_blank" class="send-msg">
                                <el-icon>
                                    <Message />
                                </el-icon>
                                发消息
                            </router-link>
                        </div>
                        <div title="此时，一个10年后的亿万富翁点了下关注！٩(￥A￥)۶" class="up-description up-detail-bottom">
                            此时，一个10年后的亿万富翁点了下关注！٩(￥A￥)۶
                        </div>
                    </div>
                </div>
                <div class="up-info__btn-panel">
                    <div class="upinfo-btn-panel">
                        <el-button class="follow-btn" type="primary"> + 关注 94.6万</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>


defineProps({
    user: {
        type: Object,
        default: {
            uid: 0,
            avatarUrl:
                'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        }
    }
})
</script>
<style lang='scss' scoped>
.up-info-container {
    box-sizing: border-box;
    height: 108px;
    display: flex;
    align-items: center;

    .up-avatar-wrap {
        width: 48px;
        height: 48px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .up-avatar {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: var(--graph_weak);
        }
    }

    .up-info--right {
        margin-left: 12px;
        flex: 1;
        overflow: auto;

        .up-info__detail {
            margin-bottom: 5px;

            .up-detail-top {
                display: flex;
                align-items: center;

                .send-msg {
                    color: var(--text2);
                    font-size: 14px;
                    transition: color 0.3s;
                    flex-shrink: 0;

                    display: flex;
                    align-items: center;

                    i {
                        margin-right: 2px;
                        font-weight: bold;
                    }

                    &:hover {
                        color: var(--el-color-primary);
                        ;
                    }
                }

                .up-name {
                    font-size: 16px;
                    color: #FB7299;
                    font-weight: 500;
                    position: relative;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    margin-right: 12px;
                    max-width: calc(100% - 12px - 56px);
                }
            }

            .up-description {
                margin-top: 2px;
                line-height: 16px;
                height: 16px;
                color: var(--text3);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }


        }

        .upinfo-btn-panel {
            clear: both;
            display: flex;
            margin-top: 5px;
            white-space: nowrap;
        }

        .el-button {
            padding: 0;
            line-height: 30px;
            height: 30px;
            max-width: 230px;
            flex: 1 1 auto;
            border-radius: 6px;
        }
    }
}
</style>

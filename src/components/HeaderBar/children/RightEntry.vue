<template>
    <ul class="right-entry">
        <li class="header-avatar-wrap" v-if="!isLogin">
            <div class="default-login">
                登录
            </div>
        </li>
        <li class="header-avatar-wrap" v-else>
            <router-link to="/" class="header-avatar-wrap--container mini-avatar--small">
                <div class="bala-avatar">
                    <el-avatar :src="circleUrl" />
                </div>
            </router-link>
        </li>
        <li class="v-popover-wrap">
            <router-link to="/" class="right-entry__outside">
                <svg-icon name="message" class="right-entry-icon" :width="25" :height="25"></svg-icon>
                <span class="right-entry-text">消息</span>
            </router-link>
        </li>
        <li class="v-popover-wrap">
            <router-link to="/" class="right-entry__outside">
                <svg-icon name="message" class="right-entry-icon" :width="25" :height="25"></svg-icon>
                <span class="right-entry-text">消息</span>
            </router-link>
        </li>
        <li class="v-popover-wrap">
            <router-link to="/" class="right-entry__outside">
                <svg-icon name="message" class="right-entry-icon" :width="25" :height="25"></svg-icon>
                <span class="right-entry-text">消息</span>
            </router-link>
        </li>
        <li class="right-entry-item right-entry-item--upload">
            <div class="upload-buttom">
                <svg-icon name="upload" class="tg-upload" :width="20"></svg-icon>
                <span>投稿</span>
            </div>
        </li>
    </ul>
</template>
<script lang='ts' setup>
const state = reactive({
    avatarUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    isLogin: false
})

const { circleUrl, isLogin } = toRefs(state)
const avatarUrl = '';
</script>
<style lang='scss' scoped>
.right-entry {
    display: flex;
    align-items: center;
    margin-left: 20px;
    flex-shrink: 0;

    .header-avatar-wrap {
        position: relative;
        box-sizing: content-box;
        padding-right: 20px;
        width: 50px;
        height: 50px;
        cursor: pointer;

        &:hover {
            .mini-avatar--small {
                top: 15px;
                left: -35px;
                width: 90px;
                height: 90px;
            }
        }

        .default-login {
            position: absolute;
            top: 5px;
            left: 10px;
            z-index: 2;
            display: block;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background-color: var(--Pi4);
            text-align: center;
            line-height: 38px;
            color: rgba(255, 255, 255, 0.9);
        }

        .header-avatar-wrap--container {
            position: relative;
            z-index: 2;
        }

        .mini-avatar--small {
            position: absolute;
            top: 5px;
            left: 10px;
            z-index: 2;
            display: block;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            box-sizing: border-box;
            /* 让内边距不增加宽度 */
            border: 2px solid #fff;
            transition: width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease;
            /* 添加平滑过渡效果 */
        }

        // .header-avatar-wrap:hover .mini-avatar--small.shrink {
        //     animation: shrink 0.3s both;
        //     /* 初始状态为缩小 */
        // }


        .bala-avatar {
            position: relative;
            display: inline-block;
            line-height: 1;
            width: 100%;
            height: 100%;
            vertical-align: middle;
            border-radius: 50%;
            background-color: transparent;

            .el-avatar {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: inherit;
                border-radius: 50%;
                image-rendering: -webkit-optimize-contrast;
            }
        }
    }

    .right-entry__outside {
        display: flex;
        align-items: center;
        flex-direction: column;
        flex-shrink: 0;
        margin-right: 0;
        min-width: 50px;
        text-align: center;
        font-size: 13px;
        color: #fff;
        cursor: pointer;

        .right-entry-icon {
            margin-bottom: 2px;
            color: #fff;
            -webkit-font-smoothing: antialiased;
        }

        .right-entry-text {}
    }

    .right-entry-item--upload {
        margin-left: 15px;
    }

    .upload-buttom {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90px;
        height: 34px;
        border-radius: 8px;
        background: #fb7299;
        color: #fff;
        text-align: center;
        font-size: 14px;
        line-height: 34px;
        cursor: pointer;
        transition: background-color .3s;

        &:hover {
            background-color: #f992af;
        }

        .tg-upload {
            margin-right: 5px;
            line-height: 34px;
            margin-top: -2px;
        }
    }
}
</style>

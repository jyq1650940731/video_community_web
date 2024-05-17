<template>
    <el-popover placement="bottom" trigger="hover" :width="!isLogin ? 360 : 120" v-model:visible="popoverVisible">
        <template #reference>
            <div class="right-entry__outside" @click="() => {
                !isLogin ? gotoLogin() : goToMessage()
            }">
                <svg-icon name="message" class="right-entry-icon" :width="25" :height="25" />
                <span class="right-entry-text">消息</span>
            </div>
        </template>
        <div class="not-login_tips" v-if="!isLogin">
            <p class="not-login_tips-text">登录即可查看消息动态</p>
            <div class="not-login-btn" @click="gotoLogin">
                立即登录
            </div>
        </div>
        <el-menu class="message-entry_list" v-else>
            <el-menu-item v-for="(item, index) in menuList" :key="item" :index="index + ''" class="message-entry_list-item">
                <span>{{ item }}</span>
            </el-menu-item>
        </el-menu>
    </el-popover>
</template>
<script lang='ts' setup>
import { useUserStore } from '@/stores/modules/user';
const { isLogin } = storeToRefs(useUserStore());


const { gotoLogin } = defineProps({
    gotoLogin: {
        type: Function,
        require: true,
    }
})

const menuList = ['回复我的', '@我的', '收到的赞', '系统消息', '我的消息'];


const popoverVisible = ref(false);
const goToMessage = () => {
    popoverVisible.value = false;
}
</script>
<style lang='scss' scoped>
.message-entry_list {
    border-right: 0;
}

.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-menu-item {
    padding-left: 15px;
}

.el-menu-item {
    height: 38px;
    line-height: 1;
    color: var(--text2);

    &:hover {
        background-color: transparent;
        color: var(--el-color-primary);
    }
}

.el-popover {
    padding: 0;
}

.el-popover {
    --el-popover-padding: 0;
}

:deep() {
    .el-popover {
        padding: 0 0 0 10px;
    }
}


.right-entry__outside {
    margin-right: 0;
    min-width: 50px;
    text-align: center;
    font-size: 13px;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-shrink: 0;

    .right-entry-icon {
        margin-bottom: 2px;
        color: #fff;
        -webkit-font-smoothing: antialiased;
    }

}




.not-login {


    &_tips {
        user-select: none;
        padding: 10px 15px;
        width: 340px;

        &-text {
            margin-bottom: 20px;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            color: var(--text3)
        }

    }

    &-btn {
        border-radius: 8px;
        color: #fff;
        background-color: var(--Lb5);
        height: 40px;
        width: 100%;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
            background-color: var(--Lb3);
        }
    }
}
</style>

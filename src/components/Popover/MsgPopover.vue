<!--
 * @Author: YourName
 * @Date: 2024-05-17 17:33:04
 * @LastEditTime: 2024-06-28 18:17:53
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_web\src\components\Popover\MsgPopover.vue
 * 版权声明
-->
<template>
  <el-popover
    placement="bottom"
    trigger="hover"
    :width="!isLogin ? 360 : 120"
    v-model:visible="popoverVisible"
  >
    <template #reference>
      <el-badge
        :value="useMessage.msgCount"
        :hidden="useMessage.msgCount > 0 ? false : true"
        class="item"
      >
        <div class="right-entry__outside" @click="handleLink('reply')">
          <svg-icon
            name="message"
            class="right-entry-icon"
            :width="25"
            :height="25"
          />
          <span class="right-entry-text">消息</span>
        </div>
      </el-badge>
    </template>
    <div class="not-login_tips" v-if="!isLogin">
      <p class="not-login_tips-text">登录即可查看消息动态</p>
      <div class="not-login-btn" @click="handleLink()">立即登录</div>
    </div>
    <el-menu class="message-entry_list" v-else>
      <el-badge
        :value="useMessage.msgUnread[index]"
        class="el-menu_badge"
        v-for="(item, index) in menuList"
        :hidden="useMessage.msgUnread[index] > 0 ? false : true"
        :key="item.path"
        :index="index"
      >
        <el-menu-item
          class="message-entry_list-item"
          @click="handleLink(item.path)"
        >
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-badge>
    </el-menu>
  </el-popover>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/modules/user';
import { useMessageStore } from '@/stores/modules/message';
import router from '@/router';
const { isLogin, userinfo } = storeToRefs(useUserStore());
const useMessage = useMessageStore();
const { gotoLogin } = defineProps({
  gotoLogin: {
    type: Function,
    require: true,
    default: () => {
      console.log('处理');
    },
  },
});
const menuList = [
  { name: '回复我的', path: 'reply' },
  { name: '@我的', path: 'at' },
  { name: '收到的赞', path: 'love' },
  { name: '系统消息', path: 'system' },
  { name: '我的消息', path: 'whisper' },
];

const popoverVisible = ref(false);
const handleLink = (path?: any) => {
  if (!isLogin.value) {
    gotoLogin();
  } else {
    popoverVisible.value = false;
    window.open(router.resolve(`/message/${path}`).href, '_blank');
  }
};
</script>
<style lang="scss" scoped>
.message-entry_list {
  border-right: 0;
}

.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container)
  .el-menu-item {
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
  .el-badge__content.is-fixed {
    right: calc(1px + var(--el-badge-size) / 2 + 20px);
  }
  .el-menu_badge {
    .el-badge__content.is-fixed {
      right: calc(1px + var(--el-badge-size) / 2);
      top: 18px;
    }
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
      color: var(--text3);
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

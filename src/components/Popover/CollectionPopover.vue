<template>
  <el-popover
    placement="bottom"
    trigger="hover"
    :disabled="isLogin ? true : false"
    :width="!isLogin ? 360 : 0"
    v-model:visible="popoverVisible"
  >
    <template #reference>
      <router-link :to="`space/${userinfo.uid}/favlist`">
        <div class="right-entry__outside" @click="handleLink">
          <svg-icon
            name="collectionK"
            class="right-entry-icon"
            :width="25"
            :height="25"
          />
          <span class="right-entry-text">收藏</span>
        </div>
      </router-link>
    </template>
    <div class="not-login_tips" v-if="!isLogin">
      <p class="not-login_tips-text">登录即可查看收藏动态</p>
      <div class="not-login-btn" @click="handleLink">立即登录</div>
    </div>
  </el-popover>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/modules/user';
const { isLogin, userinfo } = storeToRefs(useUserStore());

const { gotoLogin } = defineProps({
  gotoLogin: {
    type: Function,
    require: true,
    default: () => {},
  },
});

const popoverVisible = ref(false);

const handleLink = () => {
  if (!isLogin.value) {
    gotoLogin();
  } else {
    popoverVisible.value = false;
  }
};
</script>
<style lang="scss" scoped>
.message-entry_list {
  border-right: 0;
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

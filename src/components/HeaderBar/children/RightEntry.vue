<template>
  <ul class="right-entry">
    <li class="header-avatar-wrap" v-if="!isLogin">
      <div class="default-login" @click="setLoginDialogVisible(true)">登录</div>
    </li>
    <li
      class="header-avatar-wrap"
      v-else
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <router-link
        :to="`/space/${userinfo.uid}`"
        class="header-avatar-wrap--container mini-avatar--small"
      >
        <div class="bala-avatar">
          <el-avatar :src="userinfo.avatarUrl" />
        </div>
      </router-link>
      <div
        class="v-popover to-bottom"
        :style="{ pointerEvents: isPopoverShow ? 'auto' : 'none' }"
      >
        <div
          class="avatar-panel-popover"
          :class="isPopoverShow ? 'popShow' : 'popHide'"
        >
          <div class="big-avatar"></div>
          <router-link class="nickname-item" to="/">
            {{ userinfo.nickname }}
          </router-link>
          <div class="counts-item">
            <router-link to="/" class="single-count-item" target="_blank">
              <div class="count-num">{{ userinfo.followsCount }}</div>
              <div class="count-text">关注</div>
            </router-link>
            <router-link to="/" class="single-count-item" target="_blank">
              <div class="count-num">{{ userinfo.fansCount }}</div>
              <div class="count-text">粉丝</div>
            </router-link>
            <router-link to="/" class="single-count-item" target="_blank">
              <div class="count-num">{{ userinfo.videoCount }}</div>
              <div class="count-text">动态</div>
            </router-link>
          </div>
          <div class="links-item">
            <router-link to="/account" class="single-link-item" target="_blank">
              <div class="link-title">
                <svg-icon name="user" class="link-icon" width="18"></svg-icon>
                <span>个人中心</span>
              </div>
              <el-icon class="link-icon--right">
                <ArrowRight />
              </el-icon>
            </router-link>
            <router-link to="/" class="single-link-item" target="_blank">
              <div class="link-title">
                <svg-icon name="tg" class="link-icon" width="18"></svg-icon>
                <span>投稿管理</span>
              </div>
              <el-icon class="link-icon--right">
                <ArrowRight />
              </el-icon>
            </router-link>
          </div>
          <div class="split-line"></div>
          <div class="logout-item" @click="handleLogout">
            <el-icon class="link-icon">
              <SwitchButton />
            </el-icon>
            <span>退出登录</span>
          </div>
        </div>
      </div>
    </li>
    <li class="v-popover-wrap">
      <msg-popover :gotoLogin="gotoLogin"></msg-popover>
    </li>
    <li class="v-popover-wrap">
      <collection-popover :gotoLogin="gotoLogin"></collection-popover>
    </li>
    <li class="v-popover-wrap">
      <history-popover :gotoLogin="gotoLogin"></history-popover>
    </li>
    <li>
      <router-link to="/" target="_black" class="right-entry__outside">
        <svg-icon
          name="creation"
          class="right-entry-icon"
          :width="25"
          :height="25"
        />
        <span class="right-entry-text">创作中心</span>
      </router-link>
    </li>
    <li class="right-entry-item right-entry-item--upload">
      <div class="upload-buttom" @click="handleLinktTo('/platform/upload')">
        <svg-icon name="upload" class="tg-upload" :width="20"></svg-icon>
        <span>投稿</span>
      </div>
    </li>
  </ul>

  <!-- 登录框 -->
  <LoginRegister></LoginRegister>
</template>
<script lang="ts" setup>
import router from '@/router';
import { useUserStore } from '@/stores/modules/user';
import { ElMessage, ElMessageBox } from 'element-plus';
import { RouteLocationRaw } from 'vue-router';
const { isLogin, userinfo } = storeToRefs(useUserStore());
const { userLogout, setLoginDialogVisible } = useUserStore();

let outTimer: any;
let inTimer: any;

const popoverVisible = ref(false);
const state = reactive({
  isHistoryOpen: false,
  // 头像气泡框的显隐
  popoverDisplay: 'none',
  isPopoverShow: false,
  // 屏幕宽度
  screenWidth: window.innerWidth,
});
const { isPopoverShow, popoverDisplay, screenWidth } = toRefs(state);

const handleMouseEnter = () => {
  clearTimeout(outTimer); // 这里要清除隐藏的计时器，否则在0.2秒内出入头像，会导致头像变大但气泡突然消失
  inTimer = setTimeout(() => {
    popoverDisplay.value = '';
    isPopoverShow.value = true;
  }, 100);
};
const handleMouseLeave = () => {
  clearTimeout(inTimer); // 清除显示计时器防止快速经过头像时的气泡闪烁
  isPopoverShow.value = false;
  outTimer = setTimeout(() => {
    popoverDisplay.value = 'none';
  }, 200);
};

const handleLogout = () => {
  ElMessageBox.confirm('是否确认退出?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    userLogout();
    ElMessage({
      type: 'success',
      message: '已退出登录！',
    });
  });
};

const gotoLogin = () => {
  popoverVisible.value = false;
  setLoginDialogVisible(true);
};

const handleLinktTo = (route: RouteLocationRaw) => {
  console.log(router.resolve(route).href);

  if (isLogin.value) window.open(router.resolve(route).href);
  else gotoLogin();
};
</script>
<style lang="scss" scoped>
.v-popover {
  position: absolute;
  z-index: 1;
  padding-top: 20px;
  margin-left: -20px;
  cursor: default;
}

.to-bottom {
  top: 100%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  /* 水平左移半个元素身位，使其水平与父元素居中 */
}

.avatar-panel-popover {
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  padding: 0 24px 18px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--line_regular);

  .big-avatar {
    display: block;
    margin-bottom: 4px;
    width: 80px;
    height: 80px;
    opacity: 0;
  }

  .nickname-item {
    margin-top: -40px;
    display: flex;
    justify-content: center;
    margin-bottom: 2px;
    font-size: 18px;
    color: rgb(251, 114, 153);
  }

  .counts-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    padding: 0 20px;

    .single-count-item {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      transition: color 0.2s;

      .count-num {
        color: var(--text1);
        font-size: 18px;
        transition: color 0.2s;
      }

      .count-text {
        color: var(--text3);
        font-weight: 400;
        font-size: 12px;
        transition: color 0.2s;
      }

      &:hover .count-text,
      &:hover .count-num {
        color: var(--brand_blue);
      }
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
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--Lb5);
      text-align: center;
      line-height: 40px;
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
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
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-sizing: border-box;
      /* 让内边距不增加宽度 */
      border: 2px solid #fff;
      transition:
        width 0.3s ease,
        height 0.3s ease,
        top 0.3s ease,
        left 0.3s ease;
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

  .upload-buttom {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 34px;
    border-radius: 8px;
    background: var(--brand_blue);
    color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 34px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--Lb4);
    }

    .tg-upload {
      margin-right: 5px;
      line-height: 34px;
      margin-top: -2px;
    }
  }
}

.links-item {
  .single-link-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
    padding: 0 14px;
    height: 38px;
    border-radius: 8px;
    color: var(--text2);
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
    white-space: nowrap;

    &:hover {
      background-color: var(--graph_bg_thick);
    }

    .link-title {
      display: flex;
      align-items: center;
    }
  }
}

.link-icon {
  font-size: 18px;
  margin-right: 16px;
}

.split-line {
  margin: 10px 0;
  width: 100%;
  height: 1px;
  background: var(--line_regular);
}

.logout-item {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  border-radius: 8px;
  color: var(--text2);
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--graph_bg_thick);
  }
}

.popHide {
  display: none;
  animation: fade-out 0.2s ease-out forwards;
  transform-origin: top;
  /* 设置动画的旋转点为顶部 */
}

.popShow {
  display: block;
  animation: fade-in 0.2s ease-out forwards;
  transform-origin: top;
}
</style>

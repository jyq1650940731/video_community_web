<!--
 * @Author: YourName
 * @Date: 2024-05-29 17:10:12
 * @LastEditTime: 2024-06-28 15:37:33
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_web\src\views\space\index.vue
 * 版权声明
-->
<template>
  <div class="space-page">
    <header-bar :isFixHeaderBar="true"></header-bar>
    <div class="space-container">
      <!-- 头图部分 -->
      <div class="h">
        <div class="wrapper">
          <div
            class="h-inner"
            :style="`background-image: url('${useSpace.userinfo.bgUrl}');`"
          >
            <div class="h-gradient"></div>
            <div class="h-user">
              <div class="h-info">
                <div class="avatar-container">
                  <el-avatar :size="60" :src="useSpace.userinfo.avatarUrl" />
                </div>
                <div class="h-basic">
                  <div class="basic-top">
                    <span class="h-name">{{ useSpace.userinfo.nickname }}</span>
                    <span
                      class="icon gender"
                      :class="
                        useSpace.userinfo.gender === 0
                          ? 'female'
                          : useSpace.userinfo.gender === 1
                            ? 'male'
                            : ''
                      "
                    ></span>
                  </div>
                  <div class="basic-bottom">
                    <h3 class="h-sign">
                      {{ useSpace.userinfo.description }}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="h-action" v-if="current.uid !== useUser.userinfo.uid">
              <div class="h-f-btn h-follow">关注</div>
              <div class="h-f-btn h-message" @click="createChat">发消息</div>
              <div class="be-dropdown h-add-to-black">
                <i class="iconfont icon-gengduo"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 导航栏 -->
      <div class="n">
        <div class="wrapper n-wrapper">
          <div class="n-inner">
            <!-- 左边 -->
            <div class="n-tab-links">
              <el-menu
                :default-active="current.route"
                class="el-menu-demo"
                mode="horizontal"
              >
                <el-menu-item :index="`/space/${current.uid}`" @click="goPath">
                  <svg-icon name="p_home" width="20" height="22"></svg-icon>
                  主页
                </el-menu-item>
                <el-menu-item
                  :index="`/space/${current.uid}/dynamic`"
                  @click="goPath"
                >
                  <svg-icon name="p_dt" width="20" height="22"></svg-icon>
                  动态
                </el-menu-item>
                <el-menu-item
                  :index="`/space/${current.uid}/videos`"
                  @click="goPath"
                >
                  <svg-icon name="p_upload" width="20" height="22"></svg-icon>
                  投稿
                </el-menu-item>
                <el-menu-item
                  :index="`/space/${current.uid}/favlist`"
                  @click="goPath"
                >
                  <svg-icon
                    name="p_collection"
                    width="20"
                    height="22"
                  ></svg-icon>
                  收藏
                </el-menu-item>
              </el-menu>
            </div>
            <!-- 右边 -->
            <div class="n-statistics">
              <div
                class="n-data n-follow"
                :title="useSpace.userinfo.followsCount"
              >
                <p class="n-data-k">关注</p>
                <p class="n-data-v">
                  {{ handleNums(useSpace.userinfo.followsCount) }}
                </p>
              </div>
              <div class="n-data n-fans" :title="useSpace.userinfo.fansCount">
                <p class="n-data-k">粉丝</p>
                <p class="n-data-v">
                  {{ handleNums(useSpace.userinfo.fansCount) }}
                </p>
              </div>
              <div class="n-data" :title="useSpace.userinfo.loveCount">
                <p class="n-data-k">获赞数</p>
                <p class="n-data-v">
                  {{ handleNums(useSpace.userinfo.loveCount) }}
                </p>
              </div>
              <div class="n-data" :title="useSpace.userinfo.playCount">
                <p class="n-data-k">播放数</p>
                <p class="n-data-v">
                  {{ handleNums(useSpace.userinfo.playCount) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="s-space">
        <router-view v-slot="{ Component }">
          <component :is="Component"></component>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router';
import { useUserStore } from '@/stores/modules/user';
import { useSpaceStore } from '@/stores/modules/space';
import { handleNum } from '@/utils/utils.js';

const useUser = useUserStore();
const useSpace = useSpaceStore();
const route = useRoute();

const current = reactive({
  route: route.fullPath,
  uid: Number(route.params.uid),
});
useSpace.setUid(current.uid);

onMounted(() => {
  useSpace.getVisitUserinfo();
});

const goPath = (ev: any) => {
  router.push(ev.index);
};
// 处理大于一万的数字
const handleNums = (number: any) => {
  return handleNum(number);
};
// 创建聊天
const createChat = () => {
  if (!useUser.userinfo.uid) {
    useUser.isLogin = true;
    return;
  }
  window.open(router.resolve(`/message/whisper/${current.uid}`).href, '_blank');
};
</script>
<style lang="scss" scoped>
.el-avatar {
  border: 2px solid hsla(0, 0%, 100%, 0.4);
}
.el-menu {
  height: 100%;
  .el-menu-item {
    padding: 0;
    margin-right: 31px;
  }
}
:deep() {
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
  .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    background-color: initial;
  }
}
.bala-header_bar {
  background-color: #fff;
}
.space-container {
  width: auto;
  padding: 64px 0px 0px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-sizing: content-box;
  position: relative;
}
.wrapper {
  width: 1283px;
  margin: 0 auto;
  position: relative;
}

.h {
  position: relative;
  z-index: 10;

  .h-name {
    display: inline-block;
    margin-right: 5px;
    font-weight: 700;
    line-height: 18px;
    font-size: 18px;
    vertical-align: middle;
    color: #fff;
  }

  .h-inner {
    // background-image: url('https://tinypic.host/images/2023/11/15/69PB2Q5W9D2U7L.png');
    background-position: 50%;
    background-size: cover;
    transition:
      background-image 0.2s ease,
      background-size 1s ease;
    padding-top: 116px;
    position: relative;
  }
  .h-user {
    position: relative;
    z-index: 1;
  }
  .h-info {
    margin-left: 20px;
    padding-bottom: 16px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
  }
  .h-basic {
    margin-left: 22px;
    .basic-top {
      display: inline-flex;
      align-items: center;
    }
  }

  .basic-bottom {
    margin-top: 6px;
  }
  .icon {
    vertical-align: middle;
    background-repeat: no-repeat;
    display: inline-block;
    background-image: url('@/assets/images/icons.png');
  }
  .gender {
    display: none;
    width: 21px;
    height: 18px;
    margin-right: 5px;
    vertical-align: middle;
    background-position: -212px -922px;
  }

  .gender.male {
    display: inline-block;
    background-position: -212px -472px;
  }

  .gender.female {
    display: inline-block;
    background-position: -211px -404px;
  }
  .h-sign {
    background: transparent;
    border-radius: 4px;
    border: none;
    box-shadow: none;
    color: hsla(0, 0%, 100%, 0.8);
    font-size: 12px;
    font-family: Microsoft Yahei;
    line-height: 26px;
    height: 26px;
    margin-left: -5px;
    padding: 0 5px;
    position: relative;
    top: -1px;
    width: 730px;
    font-weight: 400;
  }
}
.n {
  margin-bottom: 10px;

  .n-inner {
    height: 66px;
    background: #fff;
    box-shadow: 0 0 0 1px #eee;
    border-radius: 0 0 4px 4px;
    padding: 0 20px;
    display: flex;
  }

  .n-tab-links {
    flex: 1;
    vertical-align: middle;
  }

  svg {
    margin-right: 3px;
  }

  .n-text {
    font-size: 13px;
  }
  .n-statistics {
    height: 66px;
  }

  .n-data {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
    float: left;
    height: 66px;
    padding: 10px 5px;
    text-align: center;
    box-sizing: border-box;
  }

  .n-data .n-data-k {
    line-height: 14px;
    font-size: 12px;
    color: #99a2aa;
  }

  .n-data .n-data-v {
    line-height: 16px;
    margin-top: 5px;
    color: #222;
    font-size: 12px;
  }

  .n-data.active .n-data-k,
  .n-data.active .n-data-v {
    color: var(--brand_blue);
  }

  .n-follow,
  .n-fans {
    cursor: pointer;
  }

  .n-follow:hover p,
  .n-fans:hover p {
    color: var(--brand_blue);
  }

  .n-cursor {
    background: var(--brand_blue);
    width: 0;
    height: 3px;
    transition: all 0.2s ease;
    position: absolute;
    bottom: -1px;
    left: 0;
  }
}
.h-action {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
}

.h-f-btn {
  background: rgba(0, 0, 0, 0.45);
  box-shadow: 0 0 0 2px hsla(0, 0%, 100%, 0.3);
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  float: left;
  text-align: center;
  margin: 0 20px 17px 0;
  width: 76px;
  line-height: 30px;
}

.h-f-btn:hover {
  background: rgba(0, 0, 0, 0.5);
}

.h-follow {
  background: var(--brand_blue);
  box-shadow: 0 0 0 2px #fff;
  color: #fff;
}

.h-follow:hover {
  background: var(--Lb4);
}

.h-add-to-black {
  float: left;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.h-add-to-black .icon-gengduo {
  color: #fff;
  font-size: 20px;
}
.be-dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.s-space {
  width: 1283px;
  margin: 0 auto;
}
</style>

<template>
  <div class="account-home">
    <div class="index-info">
      <div class="home-head">
        <img :src="useUser.userinfo.avatarUrl" alt="" />
        <a
          :href="`/space/${useUser.userinfo.uid}`"
          target="_blank"
          class="gotoSpace"
        >
          个人空间
        </a>
      </div>
      <div class="home-right">
        <div class="home-top-msg">
          <span class="home-top-msg-name">
            {{ useUser.userinfo.nickname }}
          </span>
          <span class="home-userstatus">正式会员</span>
        </div>
        <div class="home-top-level">
          <span class="home-top-level-all">
            <div class="home-top-progress-wrap">
              <span class="home-top-level-head home-top-level-head-active">
                LV{{ handleLevel(28800) }}
              </span>
              <span class="home-top-level-up">
                <span class="home-top-level-upgo" style="width: 100%"></span>
              </span>
              <div class="home-top-level-mask-warp">
                <span class="home-level-mask-icon"></span>
                <span class="home-level-mask-top"></span>
              </div>
            </div>
            <span class="home-to-update" @click="$router.push('/account/info')">
              修改资料
            </span>
            <a
              :href="`/space/${useUser.userinfo.uid}`"
              target="_blank"
              class="home-to-space"
            >
              个人空间
              <i class="iconfont icon-youjiantou"></i>
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleLevel } from '@/utils/utils.js';
import { useUserStore } from '@/stores/modules/user';
const useUser = useUserStore();
</script>

<style scoped>
.account-home {
  padding: 50px 20px 0;
  width: 829px;
}

.index-info {
  border-bottom: 1px solid #e5e9ef;
  padding-bottom: 40px;
  position: relative;
}

.home-head {
  display: inline-block;
  vertical-align: top;
  position: relative;
  cursor: pointer;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
}

.home-head img {
  width: 100%;
  height: 100%;
}

.gotoSpace {
  position: absolute;
  text-align: center;
  width: 64px;
  height: 64px;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.66);
  font-size: 12px;
  color: #fff;
  border-radius: 64px;
  line-height: 64px;
  cursor: pointer;
  display: none;
}

.home-head:hover .gotoSpace {
  display: block;
}

.home-right {
  display: inline-block;
  margin-left: 16px;
  width: 684px;
}

.home-top-msg {
  display: flex;
  align-items: center;
}

.home-top-msg-name {
  display: inline-block;
  font-size: 18px;
  font-weight: 700;
  color: var(--text1);
  margin-right: 8px;
  cursor: default;
}

.home-user-spec {
  background-color: var(--brand_blue);
  color: #fff;
  border-radius: 4px;
  display: inline-block;
  cursor: pointer;
}

.home-userstatus {
  border: 1px solid #99a2aa;
  margin: 0 8px;
  color: #99a2aa;
  border-radius: 4px;
  cursor: default;
}

.home-user-spec,
.home-userstatus {
  font-size: 12px;
  box-sizing: border-box;
  padding: 2px 4px;
}

.home-top-level {
  position: relative;
}

.home-top-level-all {
  display: inline-flex;
  align-items: center;
  width: 684px;
  margin-top: 10px;
  height: 24px;
}

.home-top-progress-wrap {
  display: inline-flex;
  position: relative;
}

.home-top-level-head {
  width: 62px;
  height: 24px;
  font-weight: 700;
  color: #ff905a;
  padding-left: 10px;
  font-size: 12px;
  line-height: 24px;
  cursor: default;
  display: inline-block;
  /* background: url('@/assets/images/icons.png') no-repeat; */
}

.home-top-level-up {
  width: 280px;
  height: 24px;
  line-height: 24px;
  background-color: #e5e9ef;
  margin-left: -15px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  display: inline-block;
  position: relative;
  text-indent: -9999px;
  text-align: center;
}

.home-top-level-upgo {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ff905a;
  width: 0;
  height: 24px;
  transition: all 0.3s ease-in-out;
  transition-delay: 0.3s;
  border-radius: 0 4px 4px 0;
}

.home-top-level-number {
  height: 24px;
  color: #99a2aa;
  margin-left: 8px;
  font-size: 12px;
  line-height: 24px;
  cursor: default;
}

.now-num {
  color: var(--text1);
}

.num-icon {
  margin: 0 2px;
}

.home-to-update {
  right: 90px;
  line-height: 20px;
  font-size: 12px;
}

.home-to-space {
  right: 0;
  display: inline-flex;
  justify-content: center;
}

.home-to-space .icon-youjiantou {
  font-size: 12px;
}

.home-to-space,
.home-to-update {
  position: absolute;
  top: 8px;
  width: 84px;
  height: 24px;
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #ced3db;
  color: #6d757a;
  text-align: center;
  cursor: pointer;
  line-height: 23px;
  font-size: 12px;
}

.home-to-space:hover,
.home-to-update:hover {
  border: 1px solid var(--brand_blue);
  color: var(--brand_blue);
}

.home-top-bp {
  margin-top: 15px;
}

.coin {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  fill: var(--brand_blue);
}

.curren-b-num {
  display: inline-block;
  height: 20px;
  margin-right: 12px;
  line-height: 20px;
  font-size: 14px;
  color: var(--text1);
  cursor: default;
  vertical-align: top;
}
</style>

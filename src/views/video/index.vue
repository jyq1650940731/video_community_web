<template>
  <div class="video-page">
    <header-bar :isFixHeaderBar="true"></header-bar>
    <div class="video-container">
      <div
        class="left-container"
        ref="leftContainerRef"
        :style="`width: ${wrapSize.width}px;`"
      >
        <title-info :info="state.titleInfo"></title-info>
        <bala-player :video="state.video"></bala-player>
        <div class="video-toolbar-container">
          <div class="video-toolbar-left">
            <!---->
            <div class="video-toolbar-left-main">
              <div class="toolbar-left-item-wrap">
                <div
                  title="点赞（Q）"
                  class="video-like video-toolbar-left-item"
                  :class="state.own.love > 0 && useUser.isLogin ? 'on' : ''"
                  @click="handleIsLove"
                >
                  <!---->
                  <svg-icon
                    name="zan"
                    class="video-like-icon video-toolbar-item-icon"
                  ></svg-icon>
                  <span class="video-like-info video-toolbar-item-text">
                    {{ useUser.currentVideoAttrs.good }}
                  </span>
                </div>
                <!---->
              </div>
              <div class="toolbar-left-item-wrap">
                <div
                  title="收藏（E）"
                  class="video-fav video-toolbar-left-item"
                  :class="
                    useCollection.lastCollectionIds.length > 0 &&
                    useUser.isLogin
                      ? 'on'
                      : ''
                  "
                  @click="openCollectionDialog"
                >
                  <svg-icon
                    name="collection"
                    class="video-like-icon video-toolbar-item-icon"
                  ></svg-icon>
                  <span class="video-fav-info video-toolbar-item-text">
                    {{ state.stats.collect }}
                  </span>
                </div>
                <!---->
              </div>
            </div>
          </div>
          <div class="video-toolbar-right">
            <div class="video-tool-more video-toolbar-right-item">
              <span class="video-tool-more-reference">
                <svg-icon
                  name="more"
                  class="video-tool-more-icon video-toolbar-item-icon van-popover__reference"
                ></svg-icon>
              </span>
            </div>
          </div>
        </div>
        <!-- 简介评论区 -->
        <div class="left-container-under-player">
          <!-- 简介 -->
          <div class="video-desc-container">
            <div
              class="basic-desc-info"
              ref="descRef"
              :style="showAllDesc ? 'height: auto;' : 'height: 84px;'"
            >
              <span class="desc-info-text">
                {{ state.video.descr }}
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
            <div class="topic-tag" v-for="item in state.video.tags">
              <router-link
                :to="`/search/video?keyword=${item}`"
                target="_blank"
                class="tag-link"
              >
                {{ item }}
              </router-link>
            </div>
          </div>
          <!-- 评论 -->
          <div class="box-normal" v-if="!useUser.isLogin">
            <div class="reply-box-avatar">
              <div class="teriteri-avatar">
                <!-- <VAvatar :img="this.$store.state.user.avatar_url" :size="isWideWindow ? 48 : 40" :auth="this.$store.state.user.auth" /> -->
              </div>
            </div>

            <div class="reply-box-wrap">
              <div
                class="disable-mask"
                :style="!useUser.isLogin ? '' : 'display:none;'"
              >
                <span>
                  请先
                  <span
                    class="to-login-btn"
                    @click="useUser.setLoginDialogVisible(true)"
                  >
                    登录
                  </span>
                  后发表评论 (・ω・)
                </span>
              </div>
            </div>
          </div>
          <bala-comment :up="user" :video="video" v-else></bala-comment>
        </div>
      </div>
      <div class="right-container" ref="rightContainerRef">
        <right-upinfo :user="state.user"></right-upinfo>
        <danmu-box :boxHeight="playerSize.height"></danmu-box>
        <!-- 相关视频 -->
        <recommen-videos
          :videos="state.videos"
          @changeVideoById="changeVideo"
        ></recommen-videos>
      </div>
    </div>
  </div>
  <!-- 收藏夹 -->
  <collection-dialog
    ref="collectionRef"
    :vid="state.vid"
    @updataVideo="getVideoDetail"
  ></collection-dialog>
</template>
<script lang="ts" setup name="videoDetails">
import TitleInfo from './components/TitleInfo.vue';
import RightUpinfo from './components/RightUpinfo.vue';
import BalaComment from './components/BalaComment.vue';
import BalaPlayer from './components/BalaPlayer.vue';
import CollectionDialog from './components/CollectionDialog.vue';
import { getMoreVideosByIds, getVideoById } from '@/api/video';
import { isGood } from '@/api/user';
import type {
  videoType,
  userinfoType,
  statsWithCurrentVideoType,
  ownStatsWithVideoType,
} from '@/types/info';
import { useRoute } from 'vue-router';
import RecommenVideos from './components/RecommenVideos.vue';
import router from '@/router';
import { useUserStore } from '@/stores/modules/user';
import { useCollectionStore } from '@/stores/modules/collection';
import { addPlayWithUser, addPlayWithVisitor } from '@/api/video';
import { getCollectionFiles } from '@/api/collection';

const route = useRoute();
const descRef = ref();
const collectionRef = ref();
const leftContainerRef = ref();
const rightContainerRef = ref();
const useUser = useUserStore();
const useCollection = useCollectionStore();

const state = reactive({
  vid: '',
  vids: [] as String[],
  isGood: false,
  titleInfo: {
    uploadDate: '',
    title: '',
    play: 0,
    danmu: 0,
  },
  user: {} as userinfoType,
  own: {} as ownStatsWithVideoType,
  video: {} as videoType,
  stats: {} as statsWithCurrentVideoType,
  videos: [] as videoType[],
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
});
const { playerSize, user, wrapSize, showAllDesc, descTooLong, video } =
  toRefs(state);

onMounted(async () => {
  await getVideoDetail();

  changeWindowSize();
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', changeWindowSize, { passive: true });
});

watch(
  () => useUser.isLogin,
  async (newVal) => {
    if (newVal) {
      await getVideoDetail();
      useCollection.getCurrentCollectionFiles(state.vid);
    }
  },
);

nextTick(() => {
  if (descRef.value.clientHeight > 84) {
    descTooLong.value = true;
    showAllDesc.value = false;
  }
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', changeWindowSize);
});

const getVideoDetail = async () => {
  state.vids = [];
  state.videos = [];
  state.vid = route.params.vid as string;
  state.vids.push(state.vid);
  const { result } = await getVideoById({
    vid: state.vid,
  });
  increasePlay();
  getRecommenVideos();
  getRecommenVideos();
  await useCollection.getCollectionesWithOwn();
  if (useCollection.collectiones.length > 0)
    useCollection.getCurrentCollectionFiles(state.vid);
  useUser.setCurrentVideoAttrs(result.stats);
  getTitleInfo(result);
  result.video.tags = result.video.tags
    .split('\r\n')
    .filter((tag: string) => tag.trim() !== '');
  state.video = result.video;
  state.user = result.user;
  state.stats = result.stats;
};

const getRecommenVideos = async () => {
  const { result } = await getMoreVideosByIds({ vids: state.vids.join(',') });
  state.vids.push(...result.vids);
  state.videos.push(...result.videos);
};

const getTitleInfo = (data: any) => {
  state.titleInfo.danmu = data.stats.danmu;
  state.titleInfo.play = data.stats.play;
  state.titleInfo.title = data.video.title;
  state.titleInfo.uploadDate = data.video.uploadDate;
};

const openCollectionDialog = () => {
  if (!useUser.userinfo.uid) {
    useUser.setLoginDialogVisible(true);
    return;
  }
  collectionRef.value.state.dialogVisible = true;
};

const increasePlay = async () => {
  if (useUser.isLogin) {
    const { result } = await addPlayWithUser({ vid: state.vid });
    state.own = result;
  } else {
    await addPlayWithVisitor({ vid: state.vid });
  }
};

const handleIsLove = async () => {
  if (!useUser.userinfo.uid) {
    useUser.setLoginDialogVisible(true);
    return;
  }
  const love = state.own.love;
  let isSet = false;
  if (love == 0) {
    isSet = true;
  }
  await isGood({ vid: state.vid, isLove: true, isSet });
  if (isSet) state.own.love = 1;
  else state.own.love = 0;
  useUser.setCurrentGoodNum(isSet);
};

const changeVideo = (vid: number) => {
  router.push({
    name: 'videoDetails',
    params: {
      vid,
    },
  });
};

const changeWindowSize = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  let rightWidth, bottomHeight; // 整体布局的right-container宽度和底部的发送弹幕栏的高度
  if (windowWidth < 1681) {
    rightWidth = 380;
    bottomHeight = 46;
  } else {
    rightWidth = 441;
    bottomHeight = 56;
  }

  let heigth = (windowHeight - 64) * 0.7; // 初始使高为屏高的70%
  let width = (heigth - bottomHeight) * (16 / 9); // 初始根据比例计算宽

  // 限制宽的范围
  if (windowWidth - width - rightWidth < 112) {
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

// 处理窗口滚动触发的事件
const handleScroll = () => {
  const windowHeight = window.innerHeight;
  const leftPart = leftContainerRef.value;
  const rightPart = rightContainerRef.value;
  let scrollTop =
    document.documentElement.clientHeight || document.body.clientHeight;

  if (!leftPart) return;
  if (leftPart.clientHeight <= windowHeight - 64) {
    leftPart.style.top = '64px';
  } else {
    leftPart.style.top = `-${leftPart.clientHeight - windowHeight}px`;
  }
};
</script>
<style lang="scss" scoped>
.video-page {
  background-color: var(--bg1);
}
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
            transition: all 0.3s;
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
          .on {
            color: var(--brand_blue);
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
          transition: all 0.3s;
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
          transition: all 0.3s;
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

.box-normal {
  display: flex;
  z-index: 2;
  padding-right: 25px;

  .reply-box-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 80px;
    height: 48px;
  }
  .reply-box-wrap {
    position: relative;
    flex: 1;
    transition: 0.2s;
    border: 1px solid #e3e5e7;
    border-radius: 6px;
    background-color: var(--bg3);
    overflow-x: hidden;
  }
  .disable-mask {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    font-size: 12px;
    color: var(--text3);
    background-color: var(--bg3);
  }

  .to-login-btn {
    padding: 3px 5px;
    border-radius: 4px;
    background-color: var(--brand_blue);
    color: #fff;
    margin: 0 3px;
    cursor: pointer;
  }
}
</style>

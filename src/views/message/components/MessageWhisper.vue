<template>
  <div class="message-whisper">
    <div class="im">
      <div class="left">
        <div class="title">
          <span>近期消息</span>
        </div>
        <div class="list-container" ref="chatListRef">
          <div class="list">
            <div
              class="list-item"
              :class="{ active: useMessage.chatId === item.user.uid }"
              @click="handleChangeChat(item.user.uid)"
              v-for="(item, index) in useMessage.chatList"
              :key="index"
            >
              <el-avatar class="avatar" :size="40" :src="item.user.avatarUrl" />
              <div class="name-box">
                <div class="name">{{ item.user.nickname }}</div>
                <div class="last-word" v-if="item.detail.list.length > 0">
                  {{
                    item.detail.list[item.detail.list.length - 1].withdraw === 1
                      ? `${item.detail.list[item.detail.list.length - 1].userId === useUser.userinfo.uid ? '你' : '对方'}撤回了一条消息`
                      : item.detail.list[item.detail.list.length - 1].content
                  }}
                </div>
              </div>
              <div class="close">
                <svg
                  @click.stop="handleCloseChat(item.user.uid)"
                  t="1702107603641"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="7402"
                  width="20"
                  height="20"
                >
                  <path
                    d="M791.67016602 269.61962891l-37.28979493-37.28320313L512 474.71020508l-242.3737793-242.3803711-37.28979492 37.28979493L474.71020508 512l-242.3737793 242.38037109 37.28320313 37.28979493L512 549.28979492l242.38037109 242.3803711 37.28979493-37.28979493L549.28979492 512z"
                    p-id="7403"
                  ></path>
                </svg>
              </div>
              <div class="notify notify-number" v-if="item.chat.unread > 0">
                {{ item.chat.unread }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <router-view v-if="useMessage.chatId > 0"></router-view>
        <div class="placeholder" v-else>
          <div class="placeholder-img is-im"></div>
          <div class="tip">快找小伙伴聊天吧 ( ゜- ゜)つロ</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user';
import { useMessageStore } from '@/stores/modules/message';
import { useSocketStore } from '@/stores/modules/websocket';
import { createChat, deleteChat, getRecentList } from '@/api/message';
import router from '@/router';
const route = useRoute();
const useUser = useUserStore();
const useMessage = useMessageStore();
const useSocket = useSocketStore();
const chatListRef = ref();
const state = reactive({
  more: true, // 是否还有更多聊天
  loading: false, // 是否正在加载更多聊天
});
onMounted(async () => {
  useMessage.upDataIsChatPage(true);
  await getChatList();
  if (route.path === '/message/whisper') {
    // 自动打开第一个聊天
    if (useMessage.chatList.length > 0) {
      handleChangeChat(useMessage.chatList[0].chat.userId);
    }
  } else {
    // 否则就是直接用url进入的/message/whisper/{mid}的子页面
    await handleCreateChat();
  }
  const scrollContainer = chatListRef.value;
  scrollContainer.addEventListener('scroll', handleScroll);
});
onBeforeUnmount(() => {
  useMessage.upDataIsChatPage(false);
});
// 获取聊天列表
const getChatList = async () => {
  if (!state.more || state.loading) return;
  state.loading = true;
  const { result } = await getRecentList({
    offset: useMessage.chatList.length,
  });
  state.more = result.more;
  useMessage.upDataChatList(result.list);
  nextTick(() => {
    state.loading = false;
  });
};

// 创建聊天
const handleCreateChat = async () => {
  const { result, code } = await createChat(route.params.mid);
  if (code !== 200) useMessage.upDataChatId(-1);
  if (result) useMessage.chatList.unshift(result);
  useMessage.upDataChatId(Number(route.params.mid));
};

const handleChangeChat = (mid: number) => {
  router.push(`/message/whisper/${mid}`);
};

// 移除聊天
const handleCloseChat = async (uid: number) => {
  let i = useMessage.chatList.findIndex((item) => item.user.uid === uid);
  useMessage.chatList.splice(i, 1); // 移除这个元素
  if (Number(route.params.mid) === uid) {
    // 如果移除的是当前聊天 就打开第一个聊天
    if (useMessage.chatList.length > 0) {
      handleChangeChat(useMessage.chatList[0].chat.userId);
    } else {
      useMessage.chatId = -1;
    }
  }
  deleteChat(uid);
};

const handleScroll = async () => {
  const scrollContainer = chatListRef.value;
  const isAtBottom =
    scrollContainer.scrollHeight - scrollContainer.scrollTop <=
    scrollContainer.clientHeight + 100;
  if (isAtBottom) {
    // console.log("触底啦")
    await getChatList();
  }
};

watch(
  () => route.path,
  () => {
    if (route.path.startsWith('/message/whisper/')) {
      useMessage.chatId = Number(route.params.mid);
    } else {
      useMessage.chatId = -1;
    }
  },
);
</script>

<style scoped>
.message-whisper {
  height: calc(100vh - 138px);
}

.im {
  font-size: 12px;
  color: #666;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  border-radius: 4px;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
}

.left {
  width: 240px;
  border-right: 1px solid #e9eaec;
  position: relative;
}

.left .title {
  padding-left: 24px;
  line-height: 35px;
  height: 36px;
  border-bottom: 1px solid #e9eaec;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
}

.left .list-container {
  height: calc(100% - 36px);
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}

.left .list-container::-webkit-scrollbar {
  width: 4px;
}

.left .list-container::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #ddd;
}

.list-item {
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  padding: 19px 24px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.active {
  background-color: #e4e5e6;
}

.list-item:hover {
  background-color: #e4e5e6;
}

.list-item .avatar {
  width: 40px;
  height: 40px;
  margin-right: 8px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  position: relative;
}

.list-item .name-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.list-item .last-word,
.list-item .name {
  overflow: hidden;
  width: 155px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.list-item .name {
  color: #333;
  font-size: 14px;
  min-height: 16px;
  line-height: 1;
}

.list-item .last-word {
  color: #999;
  padding: 8px 0;
  margin-bottom: -6px;
}

.list-item .close {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 24px;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
  opacity: 0;
  -webkit-transition: 300ms;
  transition: 300ms;
  fill: #999;
}

.list-item:hover .close {
  -webkit-transform: translateX(0);
  transform: translateX(0);
  opacity: 1;
}

.notify {
  text-align: center;
  position: absolute;
  background-color: var(--stress_red);
}

.notify-number {
  color: #fff;
  line-height: 16px;
  font-size: 12px;
  border-radius: 8px;
  height: 16px;
  min-width: 16px;
  top: 20px;
  right: 8px;
  padding: 0 4px;
}

.right {
  width: calc(100% - 240px);
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.placeholder {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.placeholder .placeholder-img {
  width: 402px;
  height: 304px;
}

.placeholder .is-im {
  background-image: url('~assets/img/bilibili/no_message.png');
  background-size: 402px 204px;
  margin-bottom: 32px;
  height: 204px;
}

.placeholder .tip {
  color: #8896b8;
  font-size: 14px;
  line-height: 1.5em;
}
</style>

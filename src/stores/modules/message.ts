import type { chatListType } from '@/types/info';
import { getMsgUnread as getMsgUnreadApi } from '@/api/message';
import { useUserStore } from './user';
import { useSocketStore } from './websocket';
export const useMessageStore = defineStore('message', () => {
  const state = reactive({
    msgUnread: [0, 0, 0, 0, 0, 0],
    // 聊天列表
    chatList: [] as chatListType[],
    // 当前聊天对象的uid (不是聊天的id)
    chatId: -1,
    // 当前页面是否在聊天界面
    isChatPage: false,
  });
  const upDataChatList = (data: any) => {
    console.log(data);
    state.chatList.push(...data);
  };
  const upDataIsChatPage = (isChat: boolean) => {
    state.isChatPage = isChat;
  };
  const getMsgUnread = async () => {
    const { result } = await getMsgUnreadApi();
    const data = result;
    state.msgUnread[0] = data.reply;
    state.msgUnread[1] = data.at;
    state.msgUnread[2] = data.love;
    state.msgUnread[3] = data.system;
    state.msgUnread[4] = data.whisper;
    state.msgUnread[5] = data.dynamic;
  };
  const upDataChatId = (id: number) => {
    state.chatId = id;
  };
  const msgCount = computed(() => {
    let count = 0;
    for (let i = 0; i < state.msgUnread.length; i++) {
      count += state.msgUnread[i];
    }
    return count;
  });
  const handleWsMessage = (msg: any) => {
    const useUser = useUserStore();
    const useSocket = useSocketStore();
    const data = useSocket.message;
    switch (data && data.type) {
      case 'error': {
        // 系统错误
        if (data.data === '登录已过期') {
          //   state.isLogin = false;
          //   state.user = {};
          state.msgUnread = [0, 0, 0, 0, 0, 0];
          //   state.attitudeToVideo = {};
          //   state.favorites = [];
          //   state.likeComment = [];
          //   state.dislikeComment = [];
        }
        ElMessage.error(data.data);
        break;
      }
      case 'reply': {
        // 回复我的
        let content = data.data;
        // console.log(content);
        switch (content.type) {
          case '全部已读': {
            state.msgUnread[0] = 0; // 清除回复我的的未读数
            break;
          }
          case '接收': {
            state.msgUnread[0]++;
            break;
          }
        }
        break;
      }
      case 'at': {
        // @ 我的
        let content = data.data;
        // console.log(content);
        switch (content.type) {
          case '全部已读': {
            state.msgUnread[1] = 0; // 清除@我的的未读数
            break;
          }
          case '接收': {
            state.msgUnread[1]++;
            break;
          }
        }
        break;
      }
      case 'love': {
        // 收到的赞
        let content = data.data;
        // console.log(content);
        switch (content.type) {
          case '全部已读': {
            state.msgUnread[2] = 0; // 清除收到的赞的未读数
            break;
          }
          case '接收': {
            state.msgUnread[2]++;
            break;
          }
        }
        break;
      }
      case 'system': {
        // 系统通知
        let content = data.data;
        // console.log(content);
        switch (content.type) {
          case '全部已读': {
            state.msgUnread[3] = 0; // 清除系统通知的未读数
            break;
          }
          case '接收': {
            state.msgUnread[3]++;
            break;
          }
        }
        break;
      }
      case 'whisper': {
        // 我的消息（私聊）
        let content = data.data;
        // console.log(content);
        switch (content.type) {
          case '全部已读': {
            state.msgUnread[4] = 0; // 清除我的消息的未读数
            state.chatList.forEach((item) => {
              item.chat.unread = 0; // 将聊天列表中的全部未读清除
            });
            break;
          }
          case '已读': {
            const chatid = content.id; // 聊天id（不是url那个参数mid）
            const count = content.count;
            state.msgUnread[4] = Math.max(0, state.msgUnread[4] - count); // 减少相应的未读数
            let chat = state.chatList.find((item) => item.chat.id === chatid);
            if (chat) {
              chat.chat.unread = 0; // 清除对应聊天的未读
            }
            break;
          }
          case '移除': {
            const chatid = content.id; // 聊天id（不是url那个参数mid）
            const count = content.count;
            state.msgUnread[4] = Math.max(0, state.msgUnread[4] - count); // 减少相应的未读数
            let i = state.chatList.findIndex((item) => item.chat.id === chatid);
            if (i !== -1) {
              // 如果是当前聊天先关闭窗口
              if (state.chatList[i].user.uid === state.chatId)
                state.chatId = -1;
              state.chatList.splice(i, 1); // 再移除这个聊天
            }
            break;
          }
          case '接收': {
            const chat = content.chat;
            const detail = content.detail; // 新消息详情
            const user = content.user;
            // 按时间从最近到最远排序
            const sortByLatestTime = (list: any) => {
              list.sort((a: any, b: any) => {
                const timeA = new Date(a.chat.latestTime).getTime();
                const timeB = new Date(b.chat.latestTime).getTime();
                return timeB - timeA;
              });
            };
            if (detail.userId === useUser.userinfo.uid) {
              // 如果发送方是自己
              let chatItem = state.chatList.find(
                (item) => item.chat.userId === detail.anotherId,
              );
              if (chatItem && state.isChatPage) {
                // 如果该聊天存在并且当前在聊天界面 就尾插新消息以及更新时间并重排序
                chatItem.detail.list.push(detail);
                chatItem.chat.latestTime = chat.latestTime;
                sortByLatestTime(state.chatList);
              }
            } else {
              // 如果发送方是别人 需要判断当前是否有一个页面在该聊天窗口以更新全部未读数
              if (!content.online) {
                state.msgUnread[4]++;
              }
              // 不需判断当前页面是否聊天页面了 都要更新消息
              let chatItem = state.chatList.find(
                (item) => item.chat.userId === detail.userId,
              );
              if (chatItem) {
                // 如果原来有这个聊天就更新数据
                chatItem.detail.list.push(detail);
                chatItem.chat = chat;
                sortByLatestTime(state.chatList);
              } else {
                // 如果没有就创建聊天
                chatItem = {
                  chat: chat,
                  user: user,
                  detail: {
                    more: true,
                    list: [],
                  },
                };
                chatItem.detail.list.push(detail);
                state.chatList.unshift(chatItem);
              }
            }
            break;
          }
          case '撤回': {
            const msgId = content.id;
            const sendId = content.sendId;
            const acceptId = content.acceptId;
            let chat;
            if (sendId === useUser.userinfo.uid) {
              // 发送者是自己，找接收者的聊天
              chat = state.chatList.find(
                (item) => item.chat.userId === acceptId,
              );
            } else {
              // 发送者是对方，找发送者的聊天
              chat = state.chatList.find((item) => item.chat.userId === sendId);
            }
            if (chat) {
              // 找到对应消息更改字段
              let msg = chat.detail.list.find((item) => item.id === msgId);
              if (msg) {
                msg.withdraw = 1;
              }
            }
            break;
          }
        }
        break;
      }
      case 'dynamic': {
        // 动态
        let content = data.content;
        // console.log(content);
        switch (content.type) {
          case '全部已读': {
            state.msgUnread[5] = 0; // 清除动态的未读数
            break;
          }
          case '接收': {
            state.msgUnread[5]++;
            break;
          }
        }
        break;
      }
    }
  };
  const init = () => {
    upDataChatList([]);
    upDataIsChatPage(false);
    upDataChatId(-1);
    state.msgUnread = [0, 0, 0, 0, 0, 0];
  };
  return {
    ...toRefs(state),
    msgCount,
    upDataChatList,
    handleWsMessage,
    upDataIsChatPage,
    upDataChatId,
    getMsgUnread,
    init,
  };
});

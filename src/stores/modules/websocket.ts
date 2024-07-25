/*
 * @Author: YourName
 * @Date: 2024-06-03 14:12:04
 * @LastEditTime: 2024-06-18 14:31:39
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\stores\modules\websocket.ts
 * 版权声明
 */

import type { msgChatType } from '@/types/info';
import Socket from '@/utils/websocket';

interface WebSocketModel {
  message: any;
  exhibitWs: Socket | null;
}
export const useSocketStore = defineStore('socket', () => {
  // const URL = import.meta.env.VITE_WS_URL;

  const state = reactive<WebSocketModel>({
    message: null,
    exhibitWs: null,
  });
  const initExhibitSocket = (URL: any) => {
    const resp = new Socket(URL, (message) => {
      state.message = JSON.parse(message);
    });
    state.exhibitWs = resp;
  };
  return {
    ...toRefs(state),
    initExhibitSocket,
  };
});

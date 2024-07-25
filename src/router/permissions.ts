/*
 * @Author: jyq
 * @Date: 2024-05-22 09:28:59
 * @LastEditTime: 2024-06-18 11:22:46
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\router\permissions.ts
 * 版权声明
 */
import router from '.';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { useUserStore } from '@/stores/modules/user';
import { useCategoryStore } from '@/stores/modules/category';
import { useSocketStore } from './../stores/modules/websocket';
import { useMessageStore } from '@/stores/modules/message';
router.beforeEach(async (to, from, next) => {
  nprogress.start();
  const router = useRouter();
  const useMessage = useMessageStore();
  const { token, userinfo, handleUserinfo } = useUserStore();

  const { getCategoryList } = useCategoryStore();
  if (useCategoryStore().categoryList.length == 0) {
    getCategoryList();
  }
  if (token) {
    if (!userinfo.uid) {
      handleUserinfo();
      useMessage.getMsgUnread();
    }
    const useSocket = useSocketStore();
    // 建立链接
    if (!useSocket.exhibitWs) {
      await useSocket.initExhibitSocket(import.meta.env.VITE_WS_URL);
      if (useSocket.exhibitWs)
        useSocket.exhibitWs.send({
          code: 100,
          content: token,
        });
    }
  }
  next();
});

router.afterEach((to, from) => {
  nprogress.done();
});

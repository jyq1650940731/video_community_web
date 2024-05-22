/*
 * @Author: jyq
 * @Date: 2024-05-22 09:28:59
 * @LastEditTime: 2024-05-22 10:28:37
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\router\permissions.ts
 * 版权声明
 */
import router from '.';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { useUserStore } from '@/stores/modules/user';

router.beforeEach(async (to, from, next) => {
  nprogress.start();
  const router = useRouter();
  const { token, userinfo, handleUserinfo } = useUserStore();
  if (token) {
    if (!userinfo.uid) {
      await handleUserinfo();
    }
  }
  next();
});

router.afterEach((to, from) => {
  // to and from are both route objects.
  nprogress.done();
});

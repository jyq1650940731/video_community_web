/*
 * @Author: YourName
 * @Date: 2024-05-22 14:35:24
 * @LastEditTime: 2024-05-26 18:50:30
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\router\permissions.ts
 * 版权声明
 */
/*
 * @Author: jyq
 * @Date: 2024-05-22 09:28:59
 * @LastEditTime: 2024-05-26 18:48:28
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

router.beforeEach(async (to, from, next) => {
  nprogress.start();
  const router = useRouter();
  const { token, userinfo, handleUserinfo } = useUserStore();
  const { getCategoryList } = useCategoryStore();
  if (useCategoryStore().categoryList.length == 0) {
    getCategoryList();
  }
  if (token) {
    if (!userinfo.uid) {
      handleUserinfo();
    }
  }
  next();
});

router.afterEach((to, from) => {
  nprogress.done();
});

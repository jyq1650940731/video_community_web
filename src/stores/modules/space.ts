/*
 * @Author: YourName
 * @Date: 2024-06-01 20:06:26
 * @LastEditTime: 2024-06-02 18:45:19
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\stores\modules\space.ts
 * 版权声明
 */
import {
  getCollectionsWithUser,
  getCollectionsWithVisitor,
} from '@/api/collection';
import { getOneUserinfo } from '@/api/user';
import { getUserGoodVideos, getUserVideos } from '@/api/video';
import { useUserStore } from './user';
import type { collectionType, userinfoType } from '@/types/info';
import type { videosType } from './../../types/info';

export const useSpaceStore = defineStore('space', () => {
  const useUser = useUserStore();

  const state = reactive({
    uid: 0,
    userinfo: {} as userinfoType,
    videos: [] as videosType[],
    videoCount: 0,
    collections: [] as collectionType[],
    loves: [] as videosType[],
  });

  const setUid = async (uid: number) => {
    state.uid = uid;
  };
  const getVisitUserVideos = async (
    rule: number,
    page: number,
    quantity: number,
  ) => {
    const { result } = await getUserVideos({
      uid: state.uid,
      rule,
      page,
      quantity,
    });
    state.videos = result.list;
    state.videoCount = result.count;
  };

  const getVisitUserCollection = async () => {
    if (useUser.isLogin) {
      const { result } = await getCollectionsWithUser({ uid: state.uid });
      state.collections = result;
    } else {
      const { result } = await getCollectionsWithVisitor({ uid: state.uid });
      state.collections = result;
    }
  };

  const getVisitUserGoodVides = async (offset: number, quantity: number) => {
    const { result } = await getUserGoodVideos({
      uid: state.uid,
      offset,
      quantity,
    });
    state.loves = result;
  };

  const getVisitUserinfo = async () => {
    const { result } = await getOneUserinfo({ uid: state.uid });
    state.userinfo = result;
  };

  return {
    ...toRefs(state),
    setUid,
    getVisitUserVideos,
    getVisitUserCollection,
    getVisitUserGoodVides,
    getVisitUserinfo,
  };
});

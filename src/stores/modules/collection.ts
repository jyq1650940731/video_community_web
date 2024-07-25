import {
  addCollection as addCollectionApi,
  getCollectionFiles,
  getCollectionsWithUser,
  getVisitUserCollectionVideos,
  videoCollection,
} from '@/api/collection';
import type { addCollectionkData, collectionVideosData } from '@/types/api';
import type { collectionType } from '@/types/info';
import { useUserStore } from '@/stores/modules/user';

const useUser = useUserStore();

export const useCollectionStore = defineStore('collectione', () => {
  const state = reactive({
    fid: 0,
    collectiones: [] as collectionType[],
    lastCollectionIds: [] as string[],
    addCollectionIds: [],
    currentCollectionIds: [],
    cancelCollectionIds: [],
    collectionVideos: [],
  });

  const getCollectionesWithOwn = async () => {
    if (useUser.isLogin) {
      const uid = useUser.userinfo.uid;
      const { result } = await getCollectionsWithUser({ uid });
      state.collectiones = result;
    }
  };

  const getCurrentCollectionFiles = async (vid: any) => {
    const { result } = await getCollectionFiles({ vid });
    state.lastCollectionIds = result;
  };
  const addCollection = async (data: addCollectionkData) => {
    const { result } = await addCollectionApi(data);
    state.collectiones.push(result);
  };
  const addAndCancelCollectionVideo = async (
    currentIds: string[],
    vid: any,
  ) => {
    const adds = currentIds
      .filter((item) => !state.lastCollectionIds.includes(item))
      .join(',');

    const removes = state.lastCollectionIds
      .filter((item) => !currentIds.includes(item))
      .join(',');

    const formData = new FormData();
    formData.append('vid', vid);
    formData.append('adds', adds);
    formData.append('removes', removes);
    await videoCollection(formData);
  };

  const getCollectionVideos = (data: collectionVideosData) => {
    return getVisitUserCollectionVideos(data);
  };

  return {
    ...toRefs(state),
    getCollectionesWithOwn,
    getCurrentCollectionFiles,
    addCollection,
    addAndCancelCollectionVideo,
    getCollectionVideos,
  };
});

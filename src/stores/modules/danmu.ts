/*
import { getDanmuList } from './../../api/danmu';
 * @Author: YourName
 * @Date: 2024-06-04 22:46:52
 * @LastEditTime: 2024-06-14 22:51:55
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\stores\modules\danmu.ts
 * 版权声明
 */
import { deleteDanmu, getDanmuList as getDanmuListApi } from '@/api/danmu';
import type { idData } from '@/types/api';
import type { sendDanmuType } from './../../types/info';
export const useDanmuStore = defineStore('danmu', () => {
  const state = reactive({
    danmuList: [] as sendDanmuType[],
    dataList: [],
    sortType: 0,
  });

  const updateDanmuList = (list: sendDanmuType[]) => {
    state.danmuList = list;
  };

  const updataList = (list: never[], type = 0) => {
    switch (type) {
      case 1:
        // 时间升序
        list.sort((a, b) => a.timePoint - b.timePoint);
        break;
      case 2:
        // 时间降序
        list.sort((a, b) => b.timePoint - a.timePoint);
        break;
      case 3:
        // 内容升序
        list.sort((a, b) => {
          const contentA = a.content;
          const contentB = b.content;
          return contentA.localeCompare(contentB, 'zh-Hans-CN', {
            sensitivity: 'accent',
          });
        });
        break;
      case 4:
        // 内容降序
        list.sort((a, b) => {
          const contentA = a.content;
          const contentB = b.content;
          return contentB.localeCompare(contentA, 'zh-Hans-CN', {
            sensitivity: 'accent',
          });
        });
        break;
      case 5:
        // 日期升序
        list.sort(
          (a, b) =>
            new Date(a.createDate).getTime() - new Date(b.createDate).getTime(),
        );
        break;
      case 6:
        // 日期降序
        list.sort(
          (a, b) =>
            new Date(b.createDate).getTime() - new Date(a.createDate).getTime(),
        );
        break;
      default:
        // 日期升序
        list.sort(
          (a, b) =>
            new Date(a.createDate).getTime() - new Date(b.createDate).getTime(),
        );
        break;
    }
    state.dataList = list;
  };

  const getDanmuList = async (vid: number) => {
    const { result } = await getDanmuListApi(vid);

    if (!result || result.length == 0) return;
    updataList(result);
    updateDanmuList(convertDanmu(result));
  };

  const filterDanmuList = (id: number) => {
    return state.danmuList.filter((item: sendDanmuType) => item.id != id);
  };

  const delDanmu = async (data: idData) => {
    await deleteDanmu(data);
    filterDanmuList(data.id);
  };

  const convertDanmu = (data: any[]) => {
    if (!data) return [];
    const newList = [] as sendDanmuType[];
    data.forEach((item) => {
      let danmu: sendDanmuType = {
        id: item.id,
        time: item.timePoint.toFixed(1),
        text: item.content,
      };
      newList.push(danmu);
    });
    return newList;
  };

  return {
    ...toRefs(state),
    updateDanmuList,
    updataList,
    getDanmuList,
    delDanmu,
  };
});

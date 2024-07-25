/*
 * @Author: YourName
 * @Date: 2024-06-05 09:27:22
 * @LastEditTime: 2024-06-05 09:56:05
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\api\danmu.ts
 * 版权声明
 */

import request from '@/utils/request';
import type { idData, responseData } from '@/types/api';
import type { vidData } from './../types/api';

enum API {
  DANMU_LIST_URL = '/danmu-list',
  DELETE_DANMU = 'DELETE_DANMU',
}

/**
 * 获取弹幕列表
 * @param vid   视频ID
 * @return  CustomResponse对象
 */
export const getDanmuList = (vid: number) =>
  request<any, responseData>({
    url: API.DANMU_LIST_URL + `/${vid}`,
    method: 'get',
  });

/**
 * 删除弹幕
 * @param id    弹幕id
 * @return  响应对象
 */
export const deleteDanmu = (data: idData) =>
  request<any, responseData>({
    url: API.DELETE_DANMU,
    method: 'post',
    data,
  });

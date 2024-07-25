/*
 * @Author: YourName
 * @Date: 2024-05-31 17:37:24
 * @LastEditTime: 2024-06-03 00:14:48
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\api\collection.ts
 * 版权声明
 */
import request from '@/utils/request';
import type {
  cancelCollectData,
  collectionVideosData,
  fidData,
  isCollectionData,
  responseData,
  uidData,
} from '@/types/api';
import type { addCollectionkData } from '@/types/api';
import type { vidData } from './../types/api';

enum API {
  USERCOLLECTIONES_URL = '/collection/getAll/user',
  VISITORCOLLECTIONES_URL = '/collection/getAll/visitor',
  ADDCOLLECTION_URL = '/collection/create',
  VIDEOCOLLECTION_URL = '/video/collect',
  COLLECTIONFILES_URL = '/video/collectedFiles',
  VISITUSERCOLLECTIONVIDEOS_URL = '/video/userCollect',
  CANCELCOLLECT_URL = '/video/cancelCollect',
}

export const getCollectionsWithUser = (params: any) =>
  request<any, responseData>({
    url: API.USERCOLLECTIONES_URL,
    method: 'get',
    params,
  });

export const getCollectionsWithVisitor = (params: any) =>
  request<any, responseData>({
    url: API.VISITORCOLLECTIONES_URL,
    method: 'get',
    params,
  });

export const addCollection = (data: addCollectionkData) =>
  request<any, responseData>({
    url: API.ADDCOLLECTION_URL,
    method: 'post',
    data,
  });

//当前用户的该视频收藏列表
export const getCollectionFiles = (params: vidData) =>
  request<any, responseData>({
    url: API.COLLECTIONFILES_URL,
    method: 'get',
    params,
  });

//添加/取消收藏
export const videoCollection = (data: FormData) =>
  request<any, responseData>({
    url: API.VIDEOCOLLECTION_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'post',
    data,
  });

/**
 * 获取某个收藏夹的视频
 * @param fid   收藏夹ID
 * @param rule  排序规则 1 最近收藏 2 最多播放 3 最新投稿
 * @param page  分页  从1开始
 * @param quantity  每页查询数量
 * @return  视频信息列表
 */
export const getVisitUserCollectionVideos = (params: collectionVideosData) =>
  request<any, responseData>({
    url: API.VISITUSERCOLLECTIONVIDEOS_URL,
    method: 'get',
    params,
  });

export const cancelCollect = (formData: FormData) => {
  request<any, responseData>({
    url: API.CANCELCOLLECT_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'post',
    data: formData,
  });
};

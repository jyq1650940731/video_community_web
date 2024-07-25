/*
 * @Author: YourName
 * @Date: 2024-05-22 22:41:05
 * @LastEditTime: 2024-06-21 15:14:18
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\api\video.ts
 * 版权声明
 */
import request from '@/utils/request';
import type {
  responseData,
  ASKCHUNKData,
  uploadChunkData,
  serVideoData,
} from '@/types/api';

enum API {
  ASKCHUNK_URL = '/video/askChunk',
  UPLOAD_URL = '/video/uploadChunk',
  UPLOADFORM_URL = '/video/uploadForm',
  VIDEORANDOM_URL = '/video/random/visitor',
  VIDEOMORE_URL = '/video/more/visitor',
  VIDEO_URL = '/video/getvideo',
  ADDPLAYVISITOR_URL = '/video/play/visitor',
  ADDPLAYUSER_URL = '/video/play/user',
  USERVIDEOS_URL = '/video/userVideos',
  USERGOODVIDEOS_URL = '/video/userLove',
}

export const askCurrentChunk = (params: ASKCHUNKData) =>
  request<any, responseData>({
    url: API.ASKCHUNK_URL,
    method: 'get',
    params,
  });

export const uploadCurrentChunk = (formData: FormData) =>
  request<any, responseData>({
    url: API.UPLOAD_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'post',
    data: formData,
  });

export const uploadFormApi = (formData: FormData) =>
  request<any, responseData>({
    url: API.UPLOADFORM_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'post',
    data: formData,
  });

export const getRandomVideos = () =>
  request<any, responseData>({
    url: API.VIDEORANDOM_URL,
    method: 'get',
  });

//懒加载获取更多视频

export const getMoreVideosByIds = (params: any) =>
  request<any, responseData>({
    url: API.VIDEOMORE_URL,
    method: 'get',
    params,
  });

export const getVideoById = (params: any) =>
  request<any, responseData>({
    url: API.VIDEO_URL,
    method: 'get',
    params,
  });

//播放量+1
export const addPlayWithVisitor = (data: any) =>
  request<any, responseData>({
    url: API.ADDPLAYVISITOR_URL,
    method: 'post',
    data,
  });

export const addPlayWithUser = (data: any) =>
  request<any, responseData>({
    url: API.ADDPLAYUSER_URL,
    method: 'post',
    data,
  });

/**
 * 获取用户视频投稿
 * @param uid   用户id
 * @param rule  排序方式 1 投稿日期 2 播放量 3 点赞数
 * @param page  分页 从1开始
 * @param quantity  每页查询数量
 * @return  视频信息列表
 */
export const getUserVideos = (params: any) =>
  request<any, responseData>({
    url: API.USERVIDEOS_URL,
    method: 'get',
    params,
  });

/**
 * 获取用户最近点赞视频列表
 * @param uid   用户uid
 * @param offset    偏移量，即当前已查询到多少条视频
 * @param quantity  查询数量
 * @return  视频信息列表
 */
export const getUserGoodVideos = (params: any) =>
  request<any, responseData>({
    url: API.USERGOODVIDEOS_URL,
    method: 'get',
    params,
  });

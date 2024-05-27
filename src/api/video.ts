/*
 * @Author: YourName
 * @Date: 2024-05-22 22:41:05
 * @LastEditTime: 2024-05-27 14:35:33
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\api\video.ts
 * 版权声明
 */
import request from '@/utils/request';
import type { responseData, ASKCHUNKData, uploadChunkData } from '@/types/api';

enum API {
  ASKCHUNK_URL = '/video/askChunk',
  UPLOAD_URL = '/video/uploadChunk',
  UPLOADFORM_URL = '/video/uploadForm',
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

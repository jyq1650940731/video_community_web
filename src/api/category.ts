/*
 * @Author: YourName
 * @Date: 2024-05-25 23:44:59
 * @LastEditTime: 2024-06-03 15:58:39
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\api\category.ts
 * 版权声明
 */
import request from '@/utils/request';
import type { responseData } from '@/types/api';

enum API {
  CATEGORYLIST_URL = '/category/getall',
}

export const categorylistApi = () =>
  request<any, responseData>({
    url: API.CATEGORYLIST_URL,
    method: 'get',
  });

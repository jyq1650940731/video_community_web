/*
 * @Author: YourName
 * @Date: 2024-05-22 14:35:24
 * @LastEditTime: 2024-06-12 17:38:06
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\api\user.ts
 * 版权声明
 */
import request from '@/utils/request';
import type { isGoodData, responseData } from '@/types/api';
import type { loginForm } from '@/types/request';
import type { uidData } from '@/types/api';

enum API {
  LOGIN_URL = '/login',
  REGISTER_URL = '/register',
  USERINFO_URL = '/user/userinfo',
  LOGOUT_URL = '/user/logout',
  ISGOOD_URL = '/video/islove',
  ONEUSER_URL = '/user/info/getOne',
  UPDATE_AVATAR_URL = '/user/avatar/update',
  UPDATE_USERINFO_URL = '/user/info/update',
  UPDATE_PASSWORD_URL = '/user/password/update',
}

export const login = (data: loginForm) =>
  request<any, responseData>({
    url: API.LOGIN_URL,
    method: 'post',
    data,
  });

export const register = (data: loginForm) =>
  request<any, responseData>({
    url: API.REGISTER_URL,
    method: 'post',
    data,
  });

export const logout = () => {
  request({
    url: API.LOGOUT_URL,
    method: 'get',
  });
};
export const getUserinfo = () =>
  request<any, responseData>({
    url: API.USERINFO_URL,
    method: 'get',
  });

//赞不赞
export const isGood = (data: isGoodData) =>
  request<any, responseData>({
    url: API.ISGOOD_URL,
    method: 'post',
    data,
  });

//获取一条用户信息
export const getOneUserinfo = (params: uidData) =>
  request<any, responseData>({
    url: API.ONEUSER_URL,
    method: 'get',
    params,
  });

export const upDataAvatar = (data: any) =>
  request<any, responseData>({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: API.UPDATE_AVATAR_URL,
    method: 'post',
    data,
  });

export const upDataUserinfo = (data: any) =>
  request<any, responseData>({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: API.UPDATE_USERINFO_URL,
    method: 'post',
    data,
  });

export const upDataPassword = (data: any) =>
  request<any, responseData>({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: API.UPDATE_PASSWORD_URL,
    method: 'post',
    data,
  });

/*
 * @Author: YourName
 * @Date: 2024-05-22 14:35:24
 * @LastEditTime: 2024-05-22 22:41:46
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\api\user.ts
 * 版权声明
 */
/*
 * @Author: YourName
 * @Date: 2024-05-17 17:33:04
 * @LastEditTime: 2024-05-22 09:34:47
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\api\user.ts
 * 版权声明
 */
import request from '@/utils/request';
import type { responseData } from '@/types/api';
import type { loginForm } from '@/types/request';

enum API {
  LOGIN_URL = '/login',
  REGISTER_URL = '/register',
  USERINFO_URL = '/user/userinfo',
  LOGOUT_URL = '/user/logout',
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
